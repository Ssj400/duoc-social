"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { malla } from "@/lib/malla-cliente";
import { api, nuevoRequestId, rotuloEscena, TIPOS, TXT_FALLBACK } from "@/lib/cliente";
import type { Escena, Opcion, Plantilla } from "@/lib/tipos";

const campo = "w-full rounded border border-neutral-400 p-2 bg-white";
const btn = "rounded-lg bg-teal-700 text-white px-5 py-2 disabled:opacity-50";

type OpEd = { texto: string; loQueSuelePasar: string };
const vacias = (): OpEd[] => [0, 1, 2].map(() => ({ texto: "", loQueSuelePasar: "" }));

function useGeneracion() {
  const actual = useRef("");
  const [cargando, setCargando] = useState(false);
  const [escena, setEscena] = useState<Escena | null>(null);
  const [fallback, setFallback] = useState(false);
  async function generar(plantilla: Plantilla) {
    const requestId = nuevoRequestId();
    actual.current = requestId;
    setCargando(true); setFallback(false); setEscena(null);
    const r = await api<{ escena?: Escena; fallback?: boolean; requestId?: string }>("/api/escenas/generar", "POST", { plantilla, requestId });
    if (r.data.requestId !== actual.current) return; // respuesta tardía/obsoleta
    setCargando(false);
    if (r.data.escena) setEscena(r.data.escena);
    else setFallback(true);
  }
  return { cargando, escena, setEscena, fallback, setFallback, generar };
}

export default function PaginaPlantilla() {
  const [plantillas, setPlantillas] = useState<Plantilla[]>([]);
  const [p, setP] = useState<Plantilla | null>(null);
  const g = useGeneracion();
  const [manual, setManual] = useState({ titulo: "", narracion: "", opciones: vacias() });
  const [publicada, setPublicada] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Plantilla[]>("/api/plantillas").then((r) => {
      setPlantillas(r.data);
      setP(r.data.find((x) => x.ramoId === "malla:DSY1103") ?? r.data[0] ?? null);
    });
  }, []);

  if (!p) return <p>Cargando…</p>;
  const set = (k: keyof Plantilla, v: string) => setP({ ...p, [k]: v });
  const ramosSem3 = malla.filter((r) => r.semestre === 3);

  async function aprobar() {
    if (!g.escena) return;
    const e = g.escena;
    const r = await api(`/api/escenas/${e.id}/aprobar`, "POST", { titulo: e.titulo, narracion: e.narracion, opciones: e.opciones });
    if (r.ok) { setPublicada(true); g.setEscena(null); } else setError("No se pudo publicar.");
  }
  async function publicarManual() {
    setError("");
    const r = await api("/api/escenas/manual", "POST", { plantilla: p, ...manual });
    if (r.ok) { setPublicada(true); g.setFallback(false); } else setError("Completa título, narración y las 3 opciones.");
  }
  const setOp = (i: number, k: keyof Opcion, v: string) => {
    if (!g.escena) return;
    g.setEscena({ ...g.escena, opciones: g.escena.opciones.map((o, j) => (j === i ? { ...o, [k]: v } : o)) });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Plantilla de escena <span className="text-sm bg-amber-200 text-amber-950 px-2 rounded">Demo</span></h1>
        <Link href="/tutor" className="underline">Ver casos</Link>
      </div>
      {publicada && <p role="status" className="rounded bg-teal-50 border border-teal-700 p-3">Escena publicada. Ya la ve el estudiante.</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <label>Ramo
          <select className={campo} value={p.id} onChange={(e) => { setP(plantillas.find((x) => x.id === e.target.value) ?? p); g.setEscena(null); g.setFallback(false); }}>
            {plantillas.map((x) => (
              <option key={x.id} value={x.id}>{malla.find((r) => r.id === x.ramoId)?.nombre}</option>
            ))}
          </select>
        </label>
        <label>Momento
          <input className={campo} value={p.momento} onChange={(e) => set("momento", e.target.value)} />
        </label>
      </div>
      <fieldset>
        <legend>Tipo</legend>
        <div className="flex gap-3 flex-wrap">
          {TIPOS.map((t) => (
            <label key={t} className="flex gap-1 items-center"><input type="radio" name="tipo" checked={p.tipo === t} onChange={() => set("tipo", t)} />{t}</label>
          ))}
        </div>
      </fieldset>
      <label className="block">Situación típica (tus palabras)
        <textarea className={campo} rows={3} value={p.situacion} onChange={(e) => set("situacion", e.target.value)} />
      </label>
      <label className="block">¿Qué suele sorprender a los de primer año?
        <textarea className={campo} rows={2} value={p.sorprende} onChange={(e) => set("sorprende", e.target.value)} />
      </label>
      <label className="block">¿Qué hace quien le va bien?
        <textarea className={campo} rows={2} value={p.leVaBien} onChange={(e) => set("leVaBien", e.target.value)} />
      </label>
      <label className="block">Tu rol (sin nombre si prefieres)
        <input className={campo} value={p.rolAutor} onChange={(e) => set("rolAutor", e.target.value)} />
      </label>
      <p className="text-sm text-neutral-600">Ramos del 3er semestre disponibles en la demo: {ramosSem3.map((r) => r.nombre).join(", ")}.</p>
      <button className={btn} disabled={g.cargando} onClick={() => { setPublicada(false); g.generar(p); }}>
        {g.cargando ? "Generando…" : "✨ Generar escena con IA"}
      </button>

      {g.escena && (
        <section aria-label="Vista previa" className="space-y-3 rounded border border-neutral-300 bg-white p-4">
          <h2 className="font-bold">Vista previa (editable)</h2>
          <input aria-label="Título" className={campo} value={g.escena.titulo} onChange={(e) => g.setEscena({ ...g.escena!, titulo: e.target.value })} />
          <textarea aria-label="Narración" className={campo} rows={3} value={g.escena.narracion} onChange={(e) => g.setEscena({ ...g.escena!, narracion: e.target.value })} />
          {g.escena.opciones.map((o, i) => (
            <div key={o.id} className="grid gap-2 sm:grid-cols-2">
              <input aria-label={`Opción ${i + 1}`} className={campo} value={o.texto} onChange={(e) => setOp(i, "texto", e.target.value)} />
              <input aria-label={`Lo que suele pasar ${i + 1}`} className={campo} value={o.loQueSuelePasar} onChange={(e) => setOp(i, "loQueSuelePasar", e.target.value)} />
            </div>
          ))}
          <p className="flex gap-2 flex-wrap items-center">Fuentes: {g.escena.citas.map((c) => <span key={c} className="rounded-full bg-neutral-200 px-2 text-sm">{c}</span>)}</p>
          <p className="text-sm">{rotuloEscena(p.rolAutor)}</p>
          <button className={btn} onClick={aprobar}>Aprobar y publicar</button>
        </section>
      )}

      {g.fallback && (
        <section aria-label="Escena manual" className="space-y-3 rounded border border-neutral-300 bg-white p-4">
          <p role="alert">{TXT_FALLBACK}</p>
          <input aria-label="Título" placeholder="Título" className={campo} value={manual.titulo} onChange={(e) => setManual({ ...manual, titulo: e.target.value })} />
          <textarea aria-label="Narración" placeholder="Narración (termina con ¿Qué haces?)" className={campo} rows={3} value={manual.narracion} onChange={(e) => setManual({ ...manual, narracion: e.target.value })} />
          {manual.opciones.map((o, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-2">
              <input aria-label={`Opción ${i + 1}`} placeholder={`Opción ${i + 1}`} className={campo} value={o.texto} onChange={(e) => setManual({ ...manual, opciones: manual.opciones.map((x, j) => (j === i ? { ...x, texto: e.target.value } : x)) })} />
              <input aria-label={`Lo que suele pasar ${i + 1}`} placeholder="Lo que suele pasar" className={campo} value={o.loQueSuelePasar} onChange={(e) => setManual({ ...manual, opciones: manual.opciones.map((x, j) => (j === i ? { ...x, loQueSuelePasar: e.target.value } : x)) })} />
            </div>
          ))}
          {error && <p role="alert">{error}</p>}
          <button className={btn} onClick={publicarManual}>Publicar escena</button>
        </section>
      )}
    </div>
  );
}
