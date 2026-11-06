"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const NAV = [
  { href: "/", label: "Inicio", icono: "🏠" },
  { href: "/estudiante", label: "Simular", icono: "🎮" },
  { href: "/ruta", label: "Ruta", icono: "🗺️" },
];

export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const tutor = path.startsWith("/tutor");
  const ruta = path.startsWith("/ruta");
  const ancho = tutor ? "max-w-2xl" : ruta ? "max-w-5xl" : "max-w-md";
  return (
    <div className={`${ancho} mx-auto min-h-screen bg-slate-50 ${tutor ? "" : "pb-24"}`}>
      <header className="bg-white border-b border-slate-100">
        <div className="flex items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-600 text-white font-extrabold">E</span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">educadex</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-[11px] font-bold">DEMO</span>
            <Link href="/" className="text-sm font-semibold text-violet-700 underline-offset-2 hover:underline">Cambiar rol</Link>
          </div>
        </div>
        <p className="px-5 pb-2 text-xs text-slate-500">DEMO · datos ficticios · selector de rol sin autenticación</p>
      </header>
      {tutor && (
        <nav aria-label="Tutor" className="flex gap-5 px-5 py-3 text-sm font-semibold text-violet-700">
          <Link href="/tutor/plantilla" className="hover:underline">Plantillas</Link>
          <Link href="/tutor" className="hover:underline">Casos</Link>
          <Link href="/" className="hover:underline">Inicio</Link>
        </nav>
      )}
      <main className={ruta ? "" : "px-5 py-6"}>{children}</main>
      {!tutor && (
        <nav aria-label="Principal" className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200">
          <ul className="max-w-md mx-auto grid grid-cols-3">
            {NAV.map((n) => {
              const activo = n.href === "/" ? path === "/" : path.startsWith(n.href);
              return (
                <li key={n.href}>
                  <Link href={n.href} aria-current={activo ? "page" : undefined}
                    className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-semibold ${activo ? "text-violet-700" : "text-slate-500"}`}>
                    <span className="text-xl" aria-hidden>{n.icono}</span>{n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
