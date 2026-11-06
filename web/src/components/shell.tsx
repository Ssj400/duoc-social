"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const NAV = [
  { href: "/", label: "Inicio", icono: "🏠" },
  { href: "/estudiante", label: "Simular", icono: "🎮" },
  { href: "/ruta", label: "Ruta", icono: "🗺️" },
];
const NAV_ESCRITORIO = [...NAV, { href: "/tutor", label: "Tutor", icono: "🧑‍🏫" }];

export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const tutor = path.startsWith("/tutor");
  const ruta = path.startsWith("/ruta");
  return (
    <div className={`max-w-6xl mx-auto min-h-screen ${tutor ? "" : "pb-24 lg:pb-8"}`}>
      <header className="bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm lg:rounded-b-3xl">
        <div className="flex items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-700 text-white font-extrabold shadow-md shadow-violet-300">E</span>
            <span><span className="block text-lg font-extrabold leading-none tracking-tight text-slate-900">educadex</span>
              <span className="block text-[11px] text-slate-500 mt-0.5 truncate max-w-[52vw] sm:max-w-none">Ingeniería en Informática · Desarrollo de Software · Duoc UC</span></span>
          </Link>
          <nav aria-label="Escritorio" className="hidden lg:flex items-center gap-1">
            {NAV_ESCRITORIO.map((n) => {
              const activo = n.href === "/" ? path === "/" : path.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href} aria-current={activo ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activo ? "bg-violet-100 text-violet-700" : "text-slate-600 hover:bg-slate-100"}`}>
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-[11px] font-bold">DEMO</span>
            <Link href="/" className="text-sm font-semibold text-violet-700 underline-offset-2 hover:underline whitespace-nowrap">Cambiar rol</Link>
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
      <main className={ruta ? "" : "px-5 py-6 lg:py-8"}>{children}</main>
      {!tutor && (
        <nav aria-label="Principal" className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200">
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
