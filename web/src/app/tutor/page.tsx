"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api, ESTADOS } from "@/lib/cliente";
import { Card, Eyebrow, Badge, LinkButton } from "@/components/ui";
import type { Caso } from "@/lib/tipos";

export default function PaginaTutor() {
  const [casos, setCasos] = useState<Caso[]>([]);
  useEffect(() => {
    const cargar = () => api<Caso[]>("/api/casos").then((r) => setCasos(Array.isArray(r.data) ? r.data : []));
    cargar();
    const t = setInterval(cargar, 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Eyebrow>Seguimiento</Eyebrow>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Casos compartidos</h1>
      </div>
      <LinkButton href="/tutor/plantilla" variant="secondary">Crear escena (plantilla)</LinkButton>
      {casos.length === 0 && <Card><p>Aún no hay casos compartidos con autorización activa.</p></Card>}
      <ul className="space-y-3">
        {casos.map((c) => (
          <li key={c.id}>
            <Link href={`/tutor/caso/${c.id}`} className="block">
              <Card className="flex items-center justify-between gap-3 hover:border-violet-200">
                <span><strong className="text-slate-900">{c.alias}</strong> · {c.brechas.length} brecha(s) · {ESTADOS[c.estado]}</span>
                <Badge tono="violet">{ESTADOS[c.estado]}</Badge>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
