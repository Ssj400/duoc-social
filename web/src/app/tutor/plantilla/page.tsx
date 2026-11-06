"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { malla } from "@/lib/malla-cliente";
import { api, ICONOS, nuevoRequestId, rotuloEscena, TIPOS, TXT_FALLBACK } from "@/lib/cliente";
import { Button, Card, Chip, Badge, SceneCard, SourceChip, claseCampo } from "@/components/ui";
import type { Escena, Opcion, Plantilla } from "@/lib/tipos";

const campo = claseCampo;

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
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">Plantilla de escena <Badge tono="amber">Demo</Badge></h1>
        <Link href="/tutor" className="text-sm font-semibold text-violet-700 hover:underline">Ver casos</Link>
      </div>
      {publicada && <p role="status" className="rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 p-4">Escena publicada. Ya la ve el estudiante.</p>}
      <Card className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1 font-semibold text-slate-800">Ramo
          <select className={campo} value={p.id} onChange={(e) => { setP(plantillas.find((x) => x.id === e.target.value) ?? p); g.setEscena(null); g.setFallback(false); }}>
            {plantillas.map((x) => (
              <option key={x.id} value={x.id}>{malla.find((r) => r.id === x.ramoId)?.nombre}</option>
            ))}
          </select>
        </label>
        <label className="block space-y-1 font-semibold text-slate-800">Momento
          <input className={campo} value={p.momento} onChange={(e) => set("momento", e.target.value)} />
        </label>
      </div>
      <fieldset>
        <legend className="font-semibold text-slate-800 mb-2">Tipo</legend>
        <div className="flex gap-2 flex-wrap">
          {TIPOS.map((t) => (
            <Chip key={t} selected={p.tipo === t} onClick={() => set("tipo", t)}>{ICONOS[t]} {t}</Chip>
          ))}
        </div>
      </fieldset>
      <label className="block space-y-1 font-semibold text-slate-800">Situación típica (tus palabras)
        <textarea className={campo} rows={3} value={p.situacion} onChange={(e) => set("situacion", e.target.value)} />
      </label>
      <label className="block space-y-1 font-semibold text-slate-800">¿Qué suele sorprender a los de primer año?
        <textarea className={campo} rows={2} value={p.sorprende} onChange={(e) => set("sorprende", e.target.value)} />
      </label>
      <label className="block space-y-1 font-semibold text-slate-800">¿Qué hace quien le va bien?
        <textarea className={campo} rows={2} value={p.leVaBien} onChange={(e) => set("leVaBien", e.target.value)} />
      </label>
      <label className="block space-y-1 font-semibold text-slate-800">Tu rol (sin nombre si prefieres)
        <input className={campo} value={p.rolAutor} onChange={(e) => set("rolAutor", e.target.value)} />
      </label>
      <p className="text-sm text-slate-500">Ramos del 3er semestre disponibles en la demo: {ramosSem3.map((r) => r.nombre).join(", ")}.</p>
      <Button className="w-full" disabled={g.cargando} onClick={() => { setPublicada(false); g.generar(p); }}>
        {g.cargando ? "Generando…" : "✨ Generar escena con IA"}
      </Button>
      </Card>

      {g.escena && (
        <section aria-label="Vista previa" className="space-y-3">
          <h2 className="font-extrabold tracking-tight text-slate-900 text-lg">Vista previa (editable)</h2>
          <SceneCard tipo={p.tipo} icono={ICONOS[p.tipo]} momento={p.momento}
            titulo={<input aria-label="Título" className={campo} value={g.escena.titulo} onChange={(e) => g.setEscena({ ...g.escena!, titulo: e.target.value })} />}
            narracion={<textarea aria-label="Narración" className={`${campo} text-base`} rows={3} value={g.escena.narracion} onChange={(e) => g.setEscena({ ...g.escena!, narracion: e.target.value })} />}>
            {g.escena.opciones.map((o, i) => (
              <div key={o.id} className="grid gap-2 sm:grid-cols-2 rounded-2xl border border-slate-200 p-3">
                <input aria-label={`Opción ${i + 1}`} className={campo} value={o.texto} onChange={(e) => setOp(i, "texto", e.target.value)} />
                <input aria-label={`Lo que suele pasar ${i + 1}`} className={campo} value={o.loQueSuelePasar} onChange={(e) => setOp(i, "loQueSuelePasar", e.target.value)} />
              </div>
            ))}
            <p className="flex gap-2 flex-wrap items-center text-sm">Fuentes: {g.escena.citas.map((c) => <SourceChip key={c}>{c}</SourceChip>)}</p>
            <p className="text-sm text-slate-500">{rotuloEscena(p.rolAutor)}</p>
            <Button className="w-full" onClick={aprobar}>Aprobar y publicar</Button>
          </SceneCard>
        </section>
      )}

      {g.fallback && (
        <section aria-label="Escena manual" className="space-y-3 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <p role="alert" className="rounded-xl bg-slate-100 p-3 text-sm">{TXT_FALLBACK}</p>
          <input aria-label="Título" placeholder="Título" className={campo} value={manual.titulo} onChange={(e) => setManual({ ...manual, titulo: e.target.value })} />
          <textarea aria-label="Narración" placeholder="Narración (termina con ¿Qué haces?)" className={campo} rows={3} value={manual.narracion} onChange={(e) => setManual({ ...manual, narracion: e.target.value })} />
          {manual.opciones.map((o, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-2">
              <input aria-label={`Opción ${i + 1}`} placeholder={`Opción ${i + 1}`} className={campo} value={o.texto} onChange={(e) => setManual({ ...manual, opciones: manual.opciones.map((x, j) => (j === i ? { ...x, texto: e.target.value } : x)) })} />
              <input aria-label={`Lo que suele pasar ${i + 1}`} placeholder="Lo que suele pasar" className={campo} value={o.loQueSuelePasar} onChange={(e) => setManual({ ...manual, opciones: manual.opciones.map((x, j) => (j === i ? { ...x, loQueSuelePasar: e.target.value } : x)) })} />
            </div>
          ))}
          {error && <p role="alert">{error}</p>}
          <Button className="w-full" onClick={publicarManual}>Publicar escena</Button>
        </section>
      )}
    </div>
  );
}
