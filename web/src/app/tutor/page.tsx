"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api, ESTADOS } from "@/lib/cliente";
import { Card, Eyebrow, Badge } from "@/components/ui";
import type { Caso } from "@/lib/tipos";

export default function PaginaTutor() {
  const [casos, setCasos] = useState<Caso[]>([]);
  useEffect(() => {
    const cargar = () => api<Caso[]>("/api/casos").then((r) => setCasos(Array.isArray(r.data) ? r.data : []));
    cargar();
    const t = setInterval(cargar, 5000);
    return () => clearInterval(t);
  }, []);
  const PASOS = ["nuevo", "gestion_iniciada", "ayuda_recibida"] as const;
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Eyebrow>Seguimiento</Eyebrow>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Casos compartidos</h1>
      </div>
      <Link href="/tutor/plantilla" className="block">
        <Card className="flex items-center justify-between gap-3 shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-xl">
          <span><strong className="text-slate-900">Crear escena desde plantilla</strong><span className="block text-sm text-slate-500">Convierte tu experiencia en una escena para primer año.</span></span>
          <span className="font-semibold text-violet-700">Crear →</span>
        </Card>
      </Link>
      {casos.length === 0 && <Card><p>Aún no hay casos compartidos con autorización activa.</p></Card>}
      <ul className="grid gap-5 md:grid-cols-2">
        {casos.map((c) => {
          const idx = PASOS.indexOf(c.estado as (typeof PASOS)[number]);
          return (
            <li key={c.id}>
              <Link href={`/tutor/caso/${c.id}`} className="block h-full">
                <Card className="h-full space-y-4 shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-xl">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-extrabold text-slate-900">{c.alias}</p>
                      <p className="text-sm text-slate-500">{c.brechas.length} brecha(s)</p>
                    </div>
                    <Badge tono="violet">{ESTADOS[c.estado]}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5" aria-hidden>
                    {PASOS.map((e, i) => <span key={e} className={`h-1.5 flex-1 rounded-full ${i <= idx ? "bg-violet-500" : "bg-slate-100"}`} />)}
                  </div>
                  <span className="block text-sm font-semibold text-violet-700">Ver caso →</span>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
