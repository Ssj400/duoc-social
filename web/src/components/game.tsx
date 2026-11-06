import type { ReactNode } from "react";
import { Eyebrow } from "./ui";

export function DexAvatar({ className = "h-10 w-10 text-lg" }: { className?: string }) {
  return (
    <span aria-hidden className={`anim-rebote grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-400 via-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-300/60 ring-4 ring-violet-100 ${className}`}>✨</span>
  );
}

/** Dex acompañante: burbuja con un aviso neutro; nunca opina sobre el motivo ni el ajuste del estudiante. */
export function DexGuia({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <DexAvatar />
      <div className="relative rounded-2xl rounded-tl-sm bg-white border border-violet-100 shadow-md shadow-violet-100/60 px-4 py-3 text-sm text-slate-700">
        <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-violet-600">Dex · guía con IA</span>
        {children}
      </div>
    </div>
  );
}

export type EstacionEstado = "hecha" | "actual" | "futura";
const SEMS = ["Sem 1", "Sem 2", "Sem 3", "Sem 4"];
const ICONOS_SEM = ["📘", "💻", "🧩", "🚀"];

function Nodo({ estado, i }: { estado: EstacionEstado; i: number }) {
  const cls = estado === "hecha" ? "bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-md shadow-violet-300"
    : estado === "actual" ? "bg-white text-violet-700 border-2 border-violet-600 anim-pulso"
    : "bg-slate-100 text-slate-400 border border-slate-200";
  return (
    <span className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-xl ${cls}`}>
      <span aria-hidden>{estado === "futura" ? "🔒" : ICONOS_SEM[i]}</span>
      {estado === "hecha" && <span aria-hidden className="absolute -right-1 -bottom-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-[11px] font-bold text-white ring-2 ring-white">✓</span>}
    </span>
  );
}

export function CaminoSemestres({ estados, vertical = false }: { estados: EstacionEstado[]; vertical?: boolean }) {
  const txt = (e: EstacionEstado) => (e === "hecha" ? "recorrido" : e === "actual" ? "estás aquí" : "próximo");
  if (vertical)
    return (
      <ol aria-label="Camino de semestres" className="relative space-y-5">
        <span aria-hidden className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-violet-400 to-slate-200" />
        {SEMS.map((s, i) => (
          <li key={s} className="relative flex items-center gap-3" aria-current={estados[i] === "actual" ? "step" : undefined}>
            <Nodo estado={estados[i]} i={i} />
            <span><span className={`block font-bold ${estados[i] === "futura" ? "text-slate-400" : "text-slate-900"}`}>{s}</span><span className="text-xs text-slate-500">{txt(estados[i])}</span></span>
          </li>
        ))}
      </ol>
    );
  return (
    <ol aria-label="Camino de semestres" className="flex items-center justify-between rounded-2xl bg-white/80 border border-violet-100 px-3 py-3 shadow-sm">
      {SEMS.map((s, i) => (
        <li key={s} className="flex flex-1 items-center last:flex-none" aria-current={estados[i] === "actual" ? "step" : undefined}>
          <span className="flex flex-col items-center gap-1">
            <Nodo estado={estados[i]} i={i} />
            <span className={`text-[11px] font-bold ${estados[i] === "futura" ? "text-slate-400" : "text-slate-800"}`}>{s}</span>
          </span>
          {i < SEMS.length - 1 && <span aria-hidden className={`mx-1 mb-4 h-1 flex-1 rounded-full ${estados[i] === "hecha" ? "bg-violet-400" : "bg-slate-200"}`} />}
        </li>
      ))}
    </ol>
  );
}

export type InsigniaDef = { id: string; icono: string; titulo: string; ganada: boolean };

export function EstanteInsignias({ insignias }: { insignias: InsigniaDef[] }) {
  return (
    <div>
      <Eyebrow>Insignias de exploración</Eyebrow>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {insignias.map((b) => (
          <li key={b.id} className={`flex items-center gap-2 rounded-2xl border px-2.5 py-2 text-xs font-semibold transition ${b.ganada ? "border-violet-200 bg-gradient-to-br from-violet-50 to-white text-violet-800 shadow-sm" : "border-dashed border-slate-200 bg-slate-50 text-slate-400"}`}>
            <span aria-hidden className={`text-xl ${b.ganada ? "" : "grayscale opacity-50"}`}>{b.ganada ? b.icono : "🔒"}</span>
            <span>{b.titulo}<span className="sr-only">{b.ganada ? " (obtenida)" : " (bloqueada)"}</span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ToastInsignia({ insignia }: { insignia: InsigniaDef | null }) {
  if (!insignia) return null;
  return (
    <div key={insignia.id} role="status" className="anim-pop pointer-events-none fixed bottom-24 lg:bottom-8 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 rounded-2xl bg-violet-700 px-5 py-3 text-white shadow-2xl shadow-violet-400/50">
      <span aria-hidden className="text-2xl">{insignia.icono}</span>
      <span><span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-violet-200">Insignia desbloqueada</span><span className="font-bold">{insignia.titulo}</span></span>
    </div>
  );
}
