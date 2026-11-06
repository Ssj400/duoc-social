#!/usr/bin/env python3
"""Prueba de punta a punta de la API de la demo (estudiante, tutor y consentimiento).

Uso: con la app corriendo (npm run dev o npm start), desde web/:
    python3 scripts/prueba_e2e.py [URL]      # por defecto http://localhost:3000

Reinicia el estado en memoria de la demo al empezar y al terminar.
Funciona en modo simulado y con el modelo real; con el modelo real hace unas 4 llamadas.
"""
import json, sys, urllib.error, urllib.request
B = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000").rstrip("/")
def call(method, path, body=None):
    req = urllib.request.Request(B + path, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return r.status, json.loads(r.read() or b"null")
    except urllib.error.HTTPError as e: return e.code, json.loads(e.read() or b"null")
ok = True
def check(name, cond, extra=""):
    global ok; ok &= bool(cond); print(("PASS " if cond else "FAIL ") + name + (f"  [{extra}]" if extra else ""))

check("reiniciar demo", call("POST", "/api/demo/reiniciar")[0] == 200)
for page in ["/", "/estudiante", "/tutor", "/tutor/plantilla", "/ruta"]:
    with urllib.request.urlopen(B + page, timeout=30) as r: check(f"GET {page} 200", r.status == 200)
s, pl = call("GET", "/api/plantillas"); check("plantillas", s == 200 and len(pl) > 0, f"{len(pl)} plantillas")
s, esc0 = call("GET", "/api/escenas"); check("escenas list", s == 200, str(type(esc0).__name__))
s, g = call("POST", "/api/escenas/generar", {"plantilla": pl[0], "requestId": "t1"})
check("generar escena", s == 200 and ("escena" in g or g.get("fallback")), json.dumps(g)[:160])
s, g2 = call("POST", "/api/escenas/generar", {"plantilla": {"id": "no-existe"}})
check("generar: plantilla desconocida -> 400", s == 400)
if "escena" in g:
    eid = g["escena"]["id"]; check("nueva escena es borrador", g["escena"]["estado"] == "borrador")
    s, a = call("POST", f"/api/escenas/{eid}/aprobar", {}); check("aprobar", s == 200 and a["escena"]["estado"] == "aprobada")
s, a = call("POST", "/api/escenas/no-existe/aprobar", {}); check("aprobar inexistente -> 404", s == 404)
s, escs = call("GET", "/api/escenas")
lista = escs if isinstance(escs, list) else escs.get("escenas", [])
aprob = [e for e in lista if e.get("estado") == "aprobada"]
check("hay escenas aprobadas para el estudiante", len(aprob) > 0, f"{len(aprob)} aprobadas de {len(lista)}")
borr = [e for e in lista if e.get("estado") != "aprobada"]
check("GET /api/escenas no entrega borradores al estudiante", not borr, f"{len(borr)} no aprobadas visibles")
resp = [{"escenaId": e["id"], "opcionId": e["opciones"][0]["id"], "reaccion": "sorprendio"} for e in aprob[:2]]
s, rec = call("POST", "/api/recomendados", {"etiquetas": [], "reacciones": [{"escenaId": r["escenaId"], "reaccion": r["reaccion"]} for r in resp]})
check("recomendados", s == 200, f"{len(rec.get('recomendados', []))} recs, fallback={rec.get('fallback')}")
txt = json.dumps(rec, ensure_ascii=False)
check("recomendados sin porcentajes", "%" not in txt)
s, br0 = call("POST", "/api/brechas", {"respuestas": [dict(r, reaccion="imaginaba") for r in resp]})
check("reacción 'imaginaba' no genera brechas", s == 200 and not br0.get("brechas"))
s, br = call("POST", "/api/brechas", {"respuestas": resp, "comentario": "pensé que era más práctico"})
check("brechas", s == 200 and br.get("brechas"), f"{len(br.get('brechas', []))} brechas, fallback={br.get('fallback')}")
s, c0 = call("POST", "/api/casos", {"brechas": br.get("brechas", [])})
check("caso sin brechas confirmadas -> 400", s == 400)
conf = [dict(b, estado="confirmada") for b in br.get("brechas", [])][:1]
s, c = call("POST", "/api/casos", {"brechas": conf, "incluirMotivo": False, "motivos": ["presion"]})
check("compartir caso", s == 200 and "caso" in c)
cid = c["caso"]["id"]; check("motivo no se comparte si incluirMotivo=false", "motivos" not in c["caso"])
s, lst = call("GET", "/api/casos"); check("tutor ve el caso activo", any(x["id"] == cid for x in lst))
s, p = call("PATCH", f"/api/casos/{cid}", {"paso": {"accion": "Conversación 1:1", "responsable": "Tutor", "fecha": "2026-11-09"}})
check("tutor agrega paso", s == 200, json.dumps(p)[:120])
s, p = call("PATCH", f"/api/casos/{cid}", {"paso": {"accion": "", "responsable": "Tutor", "fecha": ""}}); check("paso incompleto -> 400", s == 400)
s, p = call("PATCH", f"/api/casos/{cid}", {"autorizacion": "pausada"}); check("estudiante pausa", s == 200)
s, lst = call("GET", "/api/casos"); check("pausado: tutor ya no lo ve", not any(x["id"] == cid for x in lst))
s, g = call("GET", f"/api/casos/{cid}"); check("pausado: detalle 404 para tutor", s == 404)
s, p = call("PATCH", f"/api/casos/{cid}", {"autorizacion": "activa"}); check("reanudar", s == 200)
s, p = call("PATCH", f"/api/casos/{cid}", {"autorizacion": "retirada"}); check("retirar", s == 200)
s, p = call("PATCH", f"/api/casos/{cid}", {"autorizacion": "activa"}); check("retirada es final -> 409", s == 409)
s, p = call("PATCH", f"/api/casos/{cid}", {"autorizacion": "x"}); check("valor inválido -> 400", s in (400, 409))

# Regresión: «Reiniciar demo» deshace lo que el tutor editó en una escena de ejemplo.
s, escs = call("GET", "/api/escenas"); e = escs[0]
call("POST", f"/api/escenas/{e['id']}/aprobar", {"titulo": "EDITADO EN ENSAYO"})
call("POST", "/api/demo/reiniciar")
s, escs = call("GET", "/api/escenas")
check("reiniciar restaura escenas editadas", next(x for x in escs if x["id"] == e["id"])["titulo"] == e["titulo"])

# /ruta muestra las escenas que el tutor aprueba durante la demo, y no los borradores.
def html(path):
    with urllib.request.urlopen(B + path, timeout=30) as r: return r.read().decode()
s, g = call("POST", "/api/escenas/generar", {"plantilla": pl[0]})
if "escena" in g:
    nid = g["escena"]["id"]
    check("/ruta no muestra borradores", nid not in html("/ruta"))
    call("POST", f"/api/escenas/{nid}/aprobar", {})
    h = html("/ruta")
    check("/ruta muestra la escena recién aprobada", nid in h)
call("POST", "/api/demo/reiniciar")
print("TODO OK" if ok else "HAY FALLAS")
sys.exit(0 if ok else 1)
