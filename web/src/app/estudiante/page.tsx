"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { malla } from "@/lib/malla-cliente";
import { api, detenerNarracion, ICONOS, narrar, nuevoRequestId, rotuloEscena } from "@/lib/cliente";
import catalogo from "@/data/catalogo.json";
import { DexGuia, CaminoSemestres, EstanteInsignias, ToastInsignia, type EstacionEstado, type InsigniaDef } from "@/components/game";
import { Button, Card, Chip, DexCard, Eyebrow, SceneCard, SourceChip, Titulo, claseCampo } from "@/components/ui";
import type { Brecha, Caso, Escena, Etiqueta, Motivo, Reaccion, Respuesta, RecomendadoUI } from "@/lib/tipos";

const campo = claseCampo;
const REACCIONES: { r: Reaccion; t: string }[] = [
  { r: "imaginaba", t: "😀 Así lo imaginaba" },
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

const ETIQUETAS = catalogo.etiquetas as Etiqueta[];
const PREGUNTAS = [
  { n: 1, t: "¿Qué te imaginas haciendo?" },
  { n: 2, t: "¿Qué te entusiasma?" },
  { n: 3, t: "¿Qué te preocupa?" },
];


function Onboarding({ alEmpezar }: { alEmpezar: (e: string[]) => void }) {
  const [sel, setSel] = useState<Record<number, string[]>>({ 1: [], 2: [], 3: [] });
  const tog = (n: number, id: string) =>
    setSel((s) => ({ ...s, [n]: s[n].includes(id) ? s[n].filter((x) => x !== id) : [...s[n], id] }));
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <Eyebrow>Antes de empezar</Eyebrow>
        <Titulo>Cuéntanos qué te imaginas</Titulo>
      </div>
      <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">Tus respuestas son tuyas: no se comparten con tu tutor salvo que lo elijas.</div>
      {PREGUNTAS.map((q) => (
        <Card key={q.n}>
          <fieldset className="space-y-3">
            <legend className="space-y-1">
              <span className="block text-xs font-semibold text-slate-500">Paso {q.n} de 3</span>
              <span className="block text-lg font-extrabold tracking-tight text-slate-900">{q.t} <span className="text-sm font-normal text-slate-500">(puedes marcar varias o ninguna)</span></span>
            </legend>
            <div className="flex gap-2 flex-wrap">
              {ETIQUETAS.filter((e) => e.preguntas.includes(q.n)).map((e) => (
                <Chip key={e.id} selected={sel[q.n].includes(e.id)} onClick={() => tog(q.n, e.id)}>{e.label}</Chip>
              ))}
            </div>
          </fieldset>
        </Card>
      ))}
      <Button className="w-full" onClick={() => alEmpezar([...new Set(Object.values(sel).flat())])}>Empezar simulación</Button>
    </section>
  );
}

const ICONO_ITEM: Record<string, string> = { escena: "🎮", ramo: "📘", persona: "💬", recurso: "🗺️" };

function Explorar({ etiquetas, respuestas }: { etiquetas: string[]; respuestas: Respuesta[] }) {
  const [items, setItems] = useState<RecomendadoUI[] | null>(null);
  const [ocultos, setOcultos] = useState<string[]>([]);
  const actual = useRef("");
  useEffect(() => {
    const requestId = nuevoRequestId();
    actual.current = requestId;
    api<{ recomendados?: RecomendadoUI[]; requestId?: string }>("/api/recomendados", "POST", {
      etiquetas, reacciones: respuestas.map((r) => ({ escenaId: r.escenaId, reaccion: r.reaccion })), requestId,
    }).then((r) => { if (r.data.requestId === actual.current) setItems(r.data.recomendados ?? []); });
  }, [etiquetas, respuestas]);
  const visibles = (items ?? []).filter((i) => !ocultos.includes(i.itemId));
  return (
    <section className="space-y-3" aria-label="Para seguir explorando">
      <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Para seguir explorando</h2>
      {items === null && <p>Pensando ideas…</p>}
      <ul className="space-y-3">
        {visibles.map((i) => (
          <li key={i.itemId}>
            <Card className="flex gap-3 items-start">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-50 text-xl" aria-hidden>{ICONO_ITEM[i.tipo] ?? "✨"}</span>
              <div className="flex-1 min-w-0"><strong className="text-slate-900">{i.titulo}</strong><div className="text-base">{i.porQue}</div></div>
              <Button variant="ghost" className="!px-3 !py-1 text-sm" onClick={() => setOcultos((o) => [...o, i.itemId])}>Ocultar</Button>
            </Card>
          </li>
        ))}
        <li><Button variant="secondary" className="w-full justify-start">Conversarlo con tu tutor</Button></li>
        <li><Button variant="secondary" className="w-full justify-start">Seguir explorando</Button></li>
      </ul>
      <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">Esto no mide si la carrera es para ti: son ideas para explorar, basadas solo en lo que marcaste.</div>
    </section>
  );
}

function Recorrido({ rec, etiquetas, alTerminar }: { rec: ReturnType<typeof useRecorrido>; etiquetas: string[]; alTerminar: () => void }) {
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
      <section className="space-y-5">
        <div className="space-y-2">
          <Eyebrow>Lo que viviste</Eyebrow>
          <Titulo>Tu recorrido</Titulo>
        </div>
        {rec.respuestas.length === 0 && <p>No hay escenas publicadas todavía.</p>}
        <ol className="relative space-y-3 border-l-2 border-violet-200 ml-4 pl-6">
          {rec.respuestas.map((r, n) => {
            const e = escenas.find((x) => x.id === r.escenaId)!;
            const op = e.opciones.find((o) => o.id === r.opcionId);
            const re = REACCIONES.find((x) => x.r === r.reaccion)?.t ?? "";
            return (
              <li key={r.escenaId} className="relative">
                <span className="absolute -left-[41px] top-4 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-white text-sm font-bold ring-4 ring-slate-50">{n + 1}</span>
                <Card className="space-y-1 flex items-center gap-4">
                  <span aria-hidden className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 text-3xl -rotate-6">{re.split(" ")[0]}</span>
                  <div className="space-y-1">
                  <strong className="text-slate-900">{e.titulo}</strong>
                  <div>Elegiste: {op?.texto}</div>
                  <div className="text-lg">{re}</div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ol>
        <Explorar etiquetas={etiquetas} respuestas={rec.respuestas} />
        <Button className="w-full" onClick={alTerminar}>Ver qué noté</Button>
      </section>
    );

  const op = actual.opciones.find((o) => o.id === eleccion);
  const n = visitadas.length + 1;
  return (
    <section className="space-y-4" aria-live="polite">
      <div className="flex items-center justify-between gap-2 text-sm lg:hidden">
        <span className="font-bold text-violet-700">3er semestre</span>
        <span className="font-semibold text-slate-700">Escena {n} de {total}</span>
      </div>
      <div><span className="inline-flex rounded-full bg-violet-50 border border-violet-100 text-violet-700 px-3 py-1 text-xs font-bold">🧭 {visitadas.length === 0 ? "Explorando tu primera situación" : `Exploraste ${visitadas.length} ${visitadas.length === 1 ? "situación" : "situaciones"}`}</span></div>
      <SceneCard key={actual.id} tipo={actual.tipo} icono={ICONOS[actual.tipo]}
        momento={`${actual.momento} · ${actual.tipo}`}
        titulo={<h1>{actual.titulo}</h1>} narracion={<p>{actual.narracion}</p>}>
        <Button variant="secondary" className="!rounded-full !px-4 !py-2 text-sm" onClick={() => narrar(`${actual.narracion}`)} aria-label="Escuchar la escena">🔊 Escuchar</Button>
      </SceneCard>
      <p className="font-extrabold tracking-tight text-slate-900 text-lg">¿Qué harías?</p>
      <ul key={actual.id} className="space-y-3 anim-entrar">
        {actual.opciones.map((o, i) => (
          <li key={o.id}>
            <button disabled={!!eleccion} onClick={() => rec.elegir(o.id)} aria-pressed={eleccion === o.id}
              className={`w-full text-left flex gap-3 items-start rounded-2xl border-2 p-4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${eleccion === o.id ? "border-violet-600 bg-violet-50 shadow-lg shadow-violet-300/60 ring-4 ring-violet-100" : "border-slate-200 bg-white hover:border-violet-300 hover:-translate-y-0.5 hover:shadow-lg"} ${eleccion && eleccion !== o.id ? "opacity-60" : ""}`}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-100 text-violet-700 font-bold text-sm">{i + 1}</span>
              <span className="text-slate-800">{o.texto}</span>
            </button>
          </li>
        ))}
      </ul>
      {op && (
        <div className="space-y-4">
          <Card className="anim-revelar space-y-3 !bg-violet-50 !border-violet-100">
            <p className="text-slate-700"><strong>Lo que suele pasar:</strong> {op.loQueSuelePasar}</p>
            <p className="flex gap-2 flex-wrap items-center text-sm">Fuente: {actual.citas.map((c) => <SourceChip key={c} icono={c.startsWith("malla:") ? "📘" : "📎"}>{c.startsWith("malla:") ? `malla · ${nombreRamo(c)}` : "experiencia del tutor"}</SourceChip>)}</p>
            <p className="text-sm text-slate-500">{rotuloEscena("un tutor (ficticio)")}</p>
          </Card>
          <p className="font-extrabold tracking-tight text-slate-900 text-lg">¿Esto es lo que imaginabas de tu carrera?</p>
          <div className="grid grid-cols-3 gap-2">
            {REACCIONES.map((x) => {
              const [emo, ...txt] = x.t.split(" ");
              return (
                <button key={x.r} onClick={() => rec.reaccionar(x.r)} aria-pressed={rec.reaccionActual === x.r} aria-label={x.t}
                  className={`flex flex-col items-center gap-1 rounded-2xl border-2 px-2 py-3 text-center text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${rec.reaccionActual === x.r ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-300/60 scale-105" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:-translate-y-0.5 hover:shadow-lg"}`}>
                  <span className="text-3xl" aria-hidden>{emo}</span><span>{txt.join(" ")}</span>
                </button>
              );
            })}
          </div>
          <Button className="w-full" disabled={!rec.reaccionActual} onClick={rec.siguiente}>Siguiente escena →</Button>
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
        <Titulo>Antes de seguir</Titulo>
        <Card>
          <label className="block space-y-2 font-semibold text-slate-800">¿Quieres agregar algo? (opcional)
            <textarea className={campo} rows={3} placeholder="Ej.: pensé que iba a programar más solo" value={comentario} onChange={(e) => setComentario(e.target.value)} />
            <span className="block text-xs font-normal text-slate-500">No escribas datos personales (nombre, RUT, salud). Este comentario se usa para proponer tus brechas.</span>
          </label>
        </Card>
        <Button className="w-full" disabled={cargando} onClick={ver}>{cargando ? "Pensando…" : "Ver qué noté"}</Button>
      </section>
    );

  return (
    <section className="space-y-4">
      <DexCard eyebrow="Propuesto por Dex (IA) · tú decides" title="Según lo que marcaste, esto podría no calzar con lo que esperabas" />
      {fallback && <p className="text-sm">Esta vez las armamos con una regla simple, sin IA.</p>}
      {brechas.length === 0 && <p>No marcaste nada que sorprendiera. No hay nada que compartir.</p>}
      <ul className="space-y-3">
        {brechas.map((b) => (
          <li key={b.id}>
          <Card className={`space-y-3 ${b.estado === "descartada" ? "opacity-50" : ""}`}>
            {b.editando ? (
              <textarea aria-label="Editar brecha" className={campo} value={b.texto} onChange={(e) => upd(b.id, { texto: e.target.value })} />
            ) : <p className="text-slate-800 flex gap-2">{(b.estado === "confirmada" || b.estado === "editada") && <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 text-sm">✓</span>}<span>{b.texto}</span></p>}
            <div className="flex gap-1.5 flex-wrap items-center text-xs">
              <SourceChip icono="🎮">Escena {b.escenaId}</SourceChip>
              {b.citas.map((c) => <SourceChip key={c}>{c}</SourceChip>)}
              <span className="text-slate-500">estado: {b.estado}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {b.editando
                ? <Button variant="secondary" className="!px-4 !py-2 text-sm" onClick={() => upd(b.id, { editando: false, estado: "editada" })}>Guardar</Button>
                : <>
                    <Button variant="secondary" className="!px-4 !py-2 text-sm" onClick={() => upd(b.id, { estado: "confirmada" })}>Confirmar</Button>
                    <Button variant="secondary" className="!px-4 !py-2 text-sm" onClick={() => upd(b.id, { editando: true })}>Editar</Button>
                    <Button variant="ghost" className="!py-2 text-sm" onClick={() => upd(b.id, { estado: "descartada" })}>Descartar</Button>
                  </>}
            </div>
          </Card>
          </li>
        ))}
      </ul>
      <Card><fieldset className="space-y-3">
        <legend className="font-extrabold tracking-tight text-slate-900 mb-2">¿Qué pesó más al elegir esta carrera? <span className="text-sm font-normal text-slate-500">(varias o ninguna; solo tú lo marcas)</span></legend>
        <div className="flex gap-2 flex-wrap">
          {MOTIVOS.map((m) => (
            <Chip key={m.m} selected={motivos.includes(m.m)} onClick={() => tog(m.m)}>{m.t}</Chip>
          ))}
        </div>
        {motivos.includes("otro") && <input aria-label="Otro motivo" className={campo} value={otro} onChange={(e) => setOtro(e.target.value)} />}
      </fieldset></Card>
      <Button className="w-full" disabled={!utiles.length} onClick={() => alContinuar(utiles.map((b) => ({ id: b.id, texto: b.texto, escenaId: b.escenaId, citas: b.citas, estado: b.estado })), { motivos, otro })}>Continuar →</Button>
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

  if (fin === "privado") return <Card><p role="status" className="text-slate-800 font-semibold">Listo. Nada se compartió; solo tú ves este resumen.</p></Card>;
  if (caso)
    return (
      <section className="space-y-3" aria-live="polite">
        <Titulo>Compartido</Titulo>
        <Card className="space-y-4">
          <p role="status" className="text-slate-800 font-semibold flex gap-2 items-center"><span aria-hidden className={`grid h-7 w-7 place-items-center rounded-full text-sm ${aut === "activa" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{aut === "activa" ? "✓" : "•"}</span>Estado: {aut === "activa" ? "Compartido con tu tutor" : aut === "pausada" ? "Pausado: tu tutor no lo ve" : "Autorización retirada: tu tutor ya no lo ve"}</p>
          <div className="flex gap-2 flex-wrap">
            {aut === "activa" && <Button variant="secondary" onClick={() => cambiar("pausada")}>Pausar</Button>}
            {aut === "pausada" && <Button variant="secondary" onClick={() => cambiar("activa")}>Reactivar</Button>}
            {aut !== "retirada" && <Button variant="ghost" onClick={() => cambiar("retirada")}>Retirar autorización</Button>}
          </div>
        </Card>
      </section>
    );
  return (
    <section className="space-y-4">
      <Titulo>¿Quieres compartir tu resumen con tu tutor?</Titulo>
      <Card className="space-y-3">
        <fieldset className="space-y-2">
          <legend className="font-extrabold tracking-tight text-slate-900 mb-2">Elige qué incluir</legend>
          <label className="flex gap-3 items-center rounded-2xl border border-slate-200 p-3 text-slate-800"><input className="h-5 w-5 accent-violet-600" type="checkbox" checked={incBrechas} onChange={(e) => setIncBrechas(e.target.checked)} /> Brechas</label>
          <label className="flex gap-3 items-center rounded-2xl border border-slate-200 p-3 text-slate-800"><input className="h-5 w-5 accent-violet-600" type="checkbox" checked={incMotivo} onChange={(e) => setIncMotivo(e.target.checked)} /> Motivo</label>
        </fieldset>
        <p className="text-sm text-slate-600">Puedes pausarlo o retirarlo cuando quieras. Si no compartes, nada cambia y nadie más lo verá.</p>
      </Card>
      {error && <p role="alert">{error}</p>}
      <div className="flex gap-2 flex-col">
        <Button onClick={compartir}>Compartir con mi tutor</Button>
        <Button variant="secondary" onClick={() => setFin("privado")}>No, guardarlo solo para mí</Button>
      </div>
    </section>
  );
}

const SEM_DEFS: Omit<InsigniaDef, "ganada">[] = [
  { id: "primera", icono: "🧭", titulo: "Primera escena" },
  { id: "lab", icono: "🧪", titulo: "Visitaste un laboratorio" },
  { id: "equipo", icono: "🤝", titulo: "Trabajo en equipo" },
  { id: "completo", icono: "🗺️", titulo: "Recorrido completo" },
];

function Estacion({ rec }: { rec: ReturnType<typeof useRecorrido> }) {
  if (rec.respuestas.length === 0) return <p className="text-xs text-slate-500">Aquí irán tus sellos, uno por escena.</p>;
  return (
    <div>
      <Eyebrow>Tu recorrido</Eyebrow>
      <ol className="mt-3 flex flex-wrap gap-2">
        {rec.respuestas.map((r, n) => {
          const e = rec.escenas.find((x) => x.id === r.escenaId);
          const emo = REACCIONES.find((x) => x.r === r.reaccion)?.t.split(" ")[0] ?? "";
          return (
            <li key={r.escenaId} title={e?.titulo} className="flex flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700 -rotate-2">
              <span aria-hidden className="text-2xl">{emo}</span>Escena {n + 1}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function PaginaEstudiante() {
  const rec = useRecorrido();
  const [fase, setFase] = useState<"onboarding" | "recorrido" | "brechas" | "compartir">("onboarding");
  const [etiquetas, setEtiquetas] = useState<string[]>([]);
  const [conf, setConf] = useState<{ brechas: Brecha[]; motivo: { motivos: Motivo[]; otro: string } } | null>(null);
  const alTerminar = useCallback(() => setFase("brechas"), []);

  // Insignias: solo por escenas vistas y su tipo, nunca por la opción elegida ni la reacción.
  const vistas = [...rec.visitadas, ...(rec.actual && fase === "recorrido" ? [rec.actual.id] : [])];
  const tipos = vistas.map((id) => rec.escenas.find((e) => e.id === id)?.tipo);
  const ganadas: Record<string, boolean> = {
    primera: vistas.length > 0, lab: tipos.includes("laboratorio"), equipo: tipos.includes("equipo"), completo: rec.terminado,
  };
  const insignias: InsigniaDef[] = SEM_DEFS.map((d) => ({ ...d, ganada: ganadas[d.id] }));
  const nGanadas = insignias.filter((b) => b.ganada).length;
  const [prevN, setPrevN] = useState(0);
  const [toast, setToast] = useState<InsigniaDef | null>(null);
  if (nGanadas !== prevN) { // se ajusta durante el render: sin efectos ni temporizadores
    setPrevN(nGanadas);
    if (nGanadas > prevN) setToast(insignias.filter((b) => b.ganada).slice(-1)[0] ?? null);
  }

  const estados: EstacionEstado[] = rec.terminado || fase === "brechas" || fase === "compartir"
    ? ["real", "por_explorar", "simulada", "por_explorar"]
    : ["real", "por_explorar", "simulando", "por_explorar"]; // las escenas de la demo son de 3er semestre

  const dex = fase === "onboarding" ? "Elige lo que quieras; también puedes no marcar nada."
    : fase === "recorrido" && !rec.terminado ? (!rec.eleccion ? "¿Qué harías tú en esta situación?" : !rec.reaccionActual ? "Marca cómo te hizo sentir; no hay respuestas correctas." : "Cuando quieras, pasa a la siguiente escena.")
    : fase === "compartir" ? "Tú decides qué compartir y con quién."
    : "Revisa lo que noté: tú decides qué queda.";

  let paso;
  if (fase === "onboarding") paso = <Onboarding alEmpezar={(e) => { setEtiquetas(e); setFase("recorrido"); }} />;
  else if (fase === "recorrido") paso = <Recorrido rec={rec} etiquetas={etiquetas} alTerminar={alTerminar} />;
  else if (fase === "brechas" || !conf) paso = <Brechas rec={rec} alContinuar={(brechas, motivo) => { setConf({ brechas, motivo }); setFase("compartir"); }} />;
  else paso = <Compartir brechas={conf.brechas} motivo={conf.motivo} />;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
      <div className="space-y-4 min-w-0 lg:order-1">
        <div className="lg:hidden space-y-3">
          <CaminoSemestres estados={estados} />
          <DexGuia>{dex}</DexGuia>
        </div>
        {paso}
        <details className="lg:hidden rounded-2xl bg-white border border-violet-100 px-4 py-3 shadow-sm">
          <summary className="cursor-pointer font-bold text-violet-700">Insignias de exploración ({nGanadas}/{insignias.length})</summary>
          <div className="mt-3 space-y-4"><EstanteInsignias insignias={insignias} /><Estacion rec={rec} /></div>
        </details>
      </div>
      <aside aria-label="Tu camino" className="hidden lg:block lg:order-2 sticky top-6 space-y-6 rounded-3xl bg-white/90 border border-violet-100 p-5 shadow-xl shadow-violet-200/50">
        <DexGuia>{dex}</DexGuia>
        <div><Eyebrow>Camino de semestres</Eyebrow><div className="mt-4"><CaminoSemestres estados={estados} vertical /></div></div>
        <EstanteInsignias insignias={insignias} />
        <Estacion rec={rec} />
      </aside>
      <ToastInsignia insignia={toast} />
    </div>
  );
}
