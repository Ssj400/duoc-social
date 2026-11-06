import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

const FOCO = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl bg-white border border-slate-100 shadow-sm p-5 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "text-violet-600" }: { children: ReactNode; className?: string }) {
  return <p className={`uppercase text-[11px] tracking-[0.18em] font-bold ${className}`}>{children}</p>;
}

type Variante = "primary" | "secondary" | "ghost" | "white";
const VARIANTES: Record<Variante, string> = {
  primary: "bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-3 shadow-sm",
  secondary: "bg-white border border-slate-200 hover:border-violet-300 text-slate-800 font-semibold px-5 py-3",
  ghost: "text-slate-600 hover:bg-slate-100 font-medium px-4 py-2",
  white: "bg-white text-violet-700 hover:bg-violet-50 font-bold px-5 py-3 shadow-sm",
};
export const claseBoton = (v: Variante = "primary", extra = "") =>
  `inline-flex items-center justify-center gap-2 rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed ${FOCO} ${VARIANTES[v]} ${extra}`;

export function Button({ variant = "primary", className = "", ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variante }) {
  return <button {...p} className={claseBoton(variant, className)} />;
}
export function LinkButton({ href, variant = "primary", children, className = "" }: { href: string; variant?: Variante; children: ReactNode; className?: string }) {
  return <Link href={href} className={claseBoton(variant, className)}>{children}</Link>;
}

export function Chip({ selected, children, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button type="button" aria-pressed={selected} {...p}
      className={`rounded-full border px-4 py-2 text-base font-medium transition ${FOCO} ${selected ? "bg-violet-600 text-white border-violet-600" : "bg-white text-slate-700 border-slate-200 hover:border-violet-300"}`}>
      {children}
    </button>
  );
}

const TONOS = {
  violet: "bg-violet-100 text-violet-700",
  amber: "bg-amber-100 text-amber-800",
  emerald: "bg-emerald-100 text-emerald-700",
  slate: "bg-slate-100 text-slate-600",
};
export function Badge({ children, tono = "slate" }: { children: ReactNode; tono?: keyof typeof TONOS }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${TONOS[tono]}`}>{children}</span>;
}

export function SourceChip({ children, icono = "📎" }: { children: ReactNode; icono?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-600 px-3 py-1 text-xs font-medium">
      <span aria-hidden>{icono}</span>{children}
    </span>
  );
}

export function IconoIA() {
  return <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-violet-600 text-white text-lg">✨</span>;
}

export function DexCard({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="rounded-3xl bg-violet-50 border border-violet-100 p-5 flex gap-4">
      <IconoIA />
      <div className="space-y-1">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">{title}</h2>
        {children && <div className="text-slate-600">{children}</div>}
      </div>
    </div>
  );
}

export function Titulo({ children }: { children: ReactNode }) {
  return <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{children}</h1>;
}

export const claseCampo = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400";

export const BANDA: Record<string, string> = {
  clase: "bg-sky-100 border-sky-200",
  laboratorio: "bg-violet-100 border-violet-200",
  prueba: "bg-amber-100 border-amber-200",
  practica: "bg-emerald-100 border-emerald-200",
  equipo: "bg-fuchsia-100 border-fuchsia-200",
};

export function SceneCard({ tipo, icono, momento, titulo, children, narracion }: {
  tipo: string; icono: string; momento: string; titulo: ReactNode; narracion?: ReactNode; children?: ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
      <div className={`flex items-center justify-between border-b px-5 py-6 ${BANDA[tipo] ?? "bg-slate-100 border-slate-200"}`}>
        <span className="text-6xl" aria-hidden>{icono}</span>
        <span className="rounded-full bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 text-xs font-bold">Simulación</span>
      </div>
      <div className="p-5 space-y-3">
        <Eyebrow>{momento}</Eyebrow>
        <div className="text-xl font-extrabold tracking-tight text-slate-900">{titulo}</div>
        {narracion && <div className="text-lg leading-relaxed text-slate-700">{narracion}</div>}
        {children}
      </div>
    </div>
  );
}
