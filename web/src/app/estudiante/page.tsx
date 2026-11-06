"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { malla } from "@/lib/malla-cliente";
import { api, detenerNarracion, ICONOS, narrar, nuevoRequestId, rotuloEscena } from "@/lib/cliente";
import type { Brecha, Caso, Escena, Motivo, Reaccion, Respuesta } from "@/lib/tipos";

const btn = "rounded-lg bg-teal-700 text-white px-5 py-2 disabled:opacity-50";
const btn2 = "rounded-lg border border-teal-700 text-teal-800 px-4 py-2";
const campo = "w-full rounded border border-neutral-400 p-2 bg-white";
const REACCIONES: { r: Reaccion; t: string }[] = [
  { r: "imaginaba", t: "😀 Sí, así lo imaginaba" },
  { r: "sorprendio", t: "😮 Me sorprendió" },
  { r: "no_gusto", t: "🙁 No me gustó" },
];
const MOTIVOS: { m: Motivo; t: string }[] = [
  { m: "gusto", t: "Gusto" },
  { m: "empleabilidad", t: "Empleabilidad" },
  { m: "presion", t: "Presión de otros" },
  { m: "otro", t: "Otro" },
];
const nombreRamo = (id: string) => malla.find((r) => r.id === id)?.nombre ?? id;

/** Lógica del recorrido: una escena a la vez, sigue `siguiente`, nunca repite. */
function useRecorrido() {
  const [escenas, setEscenas] = useState<Escena[]>([]);
  const [cargado, setCargado] = useState(false);
  const [visitadas, setVisitadas] = useState<string[]>([]);
  const [actualId, setActualId] = useState<string | null>(null);
  const [eleccion, setEleccion] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [reaccionActual, setReaccionActual] = useState<Reaccion | null>(null);
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    api<Escena[]>("/api/escenas").then((r) => {
      setEscenas(r.data);
      setActualId(r.data[0]?.id ?? null);
      setCargado(true);
    });
  }, []);

  const actual = escenas.find((e) => e.id === actualId) ?? null;
  const elegir = (opcionId: string) => setEleccion(opcionId);
  const reaccionar = (r: Reaccion) => {
    if (!actual || !eleccion) return;
    setReaccionActual(r);
    setRespuestas((prev) => [...prev.filter((x) => x.escenaId !== actual.id), { escenaId: actual.id, opcionId: eleccion, reaccion: r }]);
  };
  const siguiente = () => {
    if (!actual) return;
    const vis = [...visitadas, actual.id];
    const sig = actual.opciones.find((o) => o.id === eleccion)?.siguiente;
    const proxima = (sig && !vis.includes(sig) && escenas.some((e) => e.id === sig) ? sig : null) ?? escenas.find((e) => !vis.includes(e.id))?.id ?? null;
    setVisitadas(vis); setEleccion(null); setReaccionActual(null); detenerNarracion();
    if (proxima) setActualId(proxima); else { setActualId(null); setTerminado(true); }
  };
  return { escenas, cargado, visitadas, actual, eleccion, elegir, reaccionActual, reaccionar, siguiente, respuestas, terminado };
}

function Recorrido({ rec, alTerminar }: { rec: ReturnType<typeof useRecorrido>; alTerminar: () => void }) {
  const { actual, eleccion, visitadas, escenas } = rec;
  const total = escenas.length;
  useEffect(() => {
    if (!actual || eleccion) return;
    const h = (e: KeyboardEvent) => {
      const i = Number(e.key) - 1;
      if ([0, 1, 2].includes(i) && actual.opciones[i] && !(e.target instanceof HTMLTextAreaElement)) rec.elegir(actual.opciones[i].id);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [actual, eleccion, rec]);

  if (!rec.cargado) return <p>Cargando…</p>;
  if (rec.terminado || !actual)
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Tu recorrido</h1>
        {rec.respuestas.length === 0 && <p>No hay escenas publicadas todavía.</p>}
        <ol className="space-y-2">
          {rec.respuestas.map((r) => {
            const e = escenas.find((x) => x.id === r.escenaId)!;
            const op = e.opciones.find((o) => o.id === r.opcionId);
            return (
              <li key={r.escenaId} className="rounded border bg-white p-3">
                <strong>{e.titulo}</strong>
                <div>Elegiste: {op?.texto}</div>
                <div>{REACCIONES.find((x) => x.r === r.reaccion)?.t}</div>
              </li>
            );
          })}
        </ol>
        <button className={btn} onClick={alTerminar}>Ver qué noté</button>
      </section>
    );

  const op = actual.opciones.find((o) => o.id === eleccion);
  return (
    <section className="space-y-4" aria-live="polite">
      <div className="flex justify-between text-base">
        <ol className="flex gap-2">{["Sem 1", "Sem 2", "Sem 3"].map((s, i) => <li key={s} className={i === 2 ? "font-bold" : "text-neutral-500"}>{i === 2 ? "● " : ""}{s}{i < 2 ? " ─" : ""}</li>)}</ol>
        <span>Escena {visitadas.length + 1} de {total}</span>
      </div>
      <div className="text-5xl" aria-hidden>{ICONOS[actual.tipo]}</div>
      <p className="text-base">3er semestre · {actual.momento} · {nombreRamo(actual.ramoId)} · {actual.tipo} <span className="bg-amber-200 text-amber-950 px-2 rounded text-sm">Simulación</span></p>
      <h1 className="text-xl font-bold">{actual.titulo}</h1>
      <p>{actual.narracion}</p>
      <button className={btn2} onClick={() => narrar(`${actual.narracion}`)} aria-label="Escuchar la escena">🔊 Escuchar</button>
      <p className="font-semibold">¿Qué harías?</p>
      <ul className="space-y-2">
        {actual.opciones.map((o, i) => (
          <li key={o.id}>
            <button disabled={!!eleccion} onClick={() => rec.elegir(o.id)} aria-pressed={eleccion === o.id}
              className={`w-full text-left rounded border-2 p-3 ${eleccion === o.id ? "border-teal-700 bg-teal-50" : "border-neutral-300 bg-white"}`}>
              [{i + 1}] {o.texto}
            </button>
          </li>
        ))}
      </ul>
      {op && (
        <div className="space-y-3 rounded bg-white border p-4">
          <p><strong>Lo que suele pasar:</strong> {op.loQueSuelePasar}</p>
          <p className="flex gap-2 flex-wrap items-center text-base">Fuente: {actual.citas.map((c) => <span key={c} className="rounded-full bg-neutral-200 px-2 text-sm">{c.startsWith("malla:") ? `malla · ${nombreRamo(c)}` : "experiencia del tutor"}</span>)}</p>
          <p className="text-sm">{rotuloEscena("un tutor (ficticio)")}</p>
          <p className="font-semibold">¿Esto es lo que imaginabas de tu carrera?</p>
          <div className="flex gap-2 flex-wrap">
            {REACCIONES.map((x) => (
              <button key={x.r} onClick={() => rec.reaccionar(x.r)} aria-pressed={rec.reaccionActual === x.r}
                className={`rounded border-2 px-3 py-2 ${rec.reaccionActual === x.r ? "border-teal-700 bg-teal-50" : "border-neutral-300"}`}>{x.t}</button>
            ))}
          </div>
          <button className={btn} disabled={!rec.reaccionActual} onClick={rec.siguiente}>Siguiente escena →</button>
        </div>
      )}
    </section>
  );
}

type BrechaUI = Brecha & { editando?: boolean };

function Brechas({ rec, alContinuar }: { rec: ReturnType<typeof useRecorrido>; alContinuar: (b: Brecha[], m: { motivos: Motivo[]; otro: string }) => void }) {
  const [comentario, setComentario] = useState("");
  const [brechas, setBrechas] = useState<BrechaUI[] | null>(null);
  const [fallback, setFallback] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [motivos, setMotivos] = useState<Motivo[]>([]);
  const [otro, setOtro] = useState("");
  const actual = useRef("");

  async function ver() {
    const requestId = nuevoRequestId();
    actual.current = requestId;
    setCargando(true);
    const r = await api<{ brechas: Brecha[]; fallback?: boolean; requestId?: string }>("/api/brechas", "POST", { respuestas: rec.respuestas, comentario: comentario || undefined, requestId });
    if (r.data.requestId !== actual.current) return;
    setCargando(false);
    setFallback(!!r.data.fallback);
    setBrechas(r.data.brechas ?? []);
  }
  const upd = (id: string, p: Partial<BrechaUI>) => setBrechas((bs) => bs!.map((b) => (b.id === id ? { ...b, ...p } : b)));
  const tog = (m: Motivo) => setMotivos((ms) => (ms.includes(m) ? ms.filter((x) => x !== m) : [...ms, m]));
  const utiles = (brechas ?? []).filter((b) => b.estado === "confirmada" || b.estado === "editada");

  if (!brechas)
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Antes de seguir</h1>
        <label className="block">¿Quieres agregar algo? (opcional)
          <textarea className={campo} rows={3} value={comentario} onChange={(e) => setComentario(e.target.value)} />
        </label>
        <button className={btn} disabled={cargando} onClick={ver}>{cargando ? "Pensando…" : "Ver qué noté"}</button>
      </section>
    );

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Según lo que marcaste, esto podría no calzar con lo que esperabas</h1>
      {fallback && <p className="text-sm">Esta vez las armamos con una regla simple, sin IA.</p>}
      {brechas.length === 0 && <p>No marcaste nada que sorprendiera. No hay nada que compartir.</p>}
      <ul className="space-y-3">
        {brechas.map((b) => (
          <li key={b.id} className={`rounded border bg-white p-3 space-y-2 ${b.estado === "descartada" ? "opacity-50" : ""}`}>
            {b.editando ? (
              <textarea aria-label="Editar brecha" className={campo} value={b.texto} onChange={(e) => upd(b.id, { texto: e.target.value })} />
            ) : <p>{b.texto}</p>}
            <p className="text-sm">Escena {b.escenaId} · {b.citas.join(", ")} · estado: {b.estado}</p>
            <div className="flex gap-2">
              {b.editando
                ? <button className={btn2} onClick={() => upd(b.id, { editando: false, estado: "editada" })}>Guardar</button>
                : <>
                    <button className={btn2} onClick={() => upd(b.id, { estado: "confirmada" })}>Confirmar</button>
                    <button className={btn2} onClick={() => upd(b.id, { editando: true })}>Editar</button>
                    <button className={btn2} onClick={() => upd(b.id, { estado: "descartada" })}>Descartar</button>
                  </>}
            </div>
          </li>
        ))}
      </ul>
      <fieldset className="space-y-2">
        <legend>¿Qué pesó más al elegir esta carrera? (varias o ninguna; solo tú lo marcas)</legend>
        <div className="flex gap-2 flex-wrap">
          {MOTIVOS.map((m) => (
            <button key={m.m} aria-pressed={motivos.includes(m.m)} onClick={() => tog(m.m)}
              className={`rounded border-2 px-3 py-2 ${motivos.includes(m.m) ? "border-teal-700 bg-teal-50" : "border-neutral-300"}`}>{m.t}</button>
          ))}
        </div>
        {motivos.includes("otro") && <input aria-label="Otro motivo" className={campo} value={otro} onChange={(e) => setOtro(e.target.value)} />}
      </fieldset>
      <button className={btn} disabled={!utiles.length} onClick={() => alContinuar(utiles.map((b) => ({ id: b.id, texto: b.texto, escenaId: b.escenaId, citas: b.citas, estado: b.estado })), { motivos, otro })}>Continuar →</button>
      {!utiles.length && brechas.length > 0 && <p className="text-sm">Confirma o edita al menos una para continuar.</p>}
    </section>
  );
}

function Compartir({ brechas, motivo }: { brechas: Brecha[]; motivo: { motivos: Motivo[]; otro: string } }) {
  const [incBrechas, setIncBrechas] = useState(true);
  const [incMotivo, setIncMotivo] = useState(false); // desmarcado por defecto
  const [caso, setCaso] = useState<Caso | null>(null);
  const [fin, setFin] = useState<"privado" | null>(null);
  const [aut, setAut] = useState<Caso["autorizacion"]>("activa");
  const [error, setError] = useState("");

  async function compartir() {
    setError("");
    if (!incBrechas) { setFin("privado"); return; }
    const r = await api<{ caso?: Caso }>("/api/casos", "POST", {
      brechas, incluirMotivo: incMotivo,
      ...(incMotivo ? { motivos: motivo.motivos, motivoOtro: motivo.otro || undefined } : {}),
    });
    if (r.data.caso) setCaso(r.data.caso); else setError("No se pudo compartir.");
  }
  async function cambiar(a: Caso["autorizacion"]) {
    if (!caso) return;
    const r = await api<{ autorizacion: Caso["autorizacion"] }>(`/api/casos/${caso.id}`, "PATCH", { autorizacion: a });
    if (r.ok) setAut(r.data.autorizacion);
  }

  if (fin === "privado") return <p role="status">Listo. Nada se compartió; solo tú ves este resumen.</p>;
  if (caso)
    return (
      <section className="space-y-3" aria-live="polite">
        <h1 className="text-2xl font-bold">Compartido</h1>
        <p role="status">Estado: {aut === "activa" ? "Compartido con tu tutor" : aut === "pausada" ? "Pausado: tu tutor no lo ve" : "Autorización retirada: tu tutor ya no lo ve"}</p>
        <div className="flex gap-2">
          {aut === "activa" && <button className={btn2} onClick={() => cambiar("pausada")}>Pausar</button>}
          {aut === "pausada" && <button className={btn2} onClick={() => cambiar("activa")}>Reactivar</button>}
          {aut !== "retirada" && <button className={btn2} onClick={() => cambiar("retirada")}>Retirar autorización</button>}
        </div>
      </section>
    );
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">¿Quieres compartir tu resumen con tu tutor?</h1>
      <fieldset className="space-y-1">
        <legend>Elige qué incluir</legend>
        <label className="flex gap-2"><input type="checkbox" checked={incBrechas} onChange={(e) => setIncBrechas(e.target.checked)} /> Brechas</label>
        <label className="flex gap-2"><input type="checkbox" checked={incMotivo} onChange={(e) => setIncMotivo(e.target.checked)} /> Motivo</label>
      </fieldset>
      <p>Puedes pausarlo o retirarlo cuando quieras. Si no compartes, nada cambia y nadie más lo verá.</p>
      {error && <p role="alert">{error}</p>}
      <div className="flex gap-2 flex-wrap">
        <button className={btn} onClick={compartir}>Compartir con mi tutor</button>
        <button className={btn2} onClick={() => setFin("privado")}>No, guardarlo solo para mí</button>
      </div>
    </section>
  );
}

export default function PaginaEstudiante() {
  const rec = useRecorrido();
  const [fase, setFase] = useState<"recorrido" | "brechas" | "compartir">("recorrido");
  const [conf, setConf] = useState<{ brechas: Brecha[]; motivo: { motivos: Motivo[]; otro: string } } | null>(null);
  const alTerminar = useCallback(() => setFase("brechas"), []);
  if (fase === "recorrido") return <Recorrido rec={rec} alTerminar={alTerminar} />;
  if (fase === "brechas" || !conf) return <Brechas rec={rec} alContinuar={(brechas, motivo) => { setConf({ brechas, motivo }); setFase("compartir"); }} />;
  return <Compartir brechas={conf.brechas} motivo={conf.motivo} />;
}
