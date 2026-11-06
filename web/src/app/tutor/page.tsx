"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api, ESTADOS } from "@/lib/cliente";
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Casos compartidos</h1>
        <Link href="/tutor/plantilla" className="underline">Crear escena (plantilla)</Link>
      </div>
      {casos.length === 0 && <p>Aún no hay casos compartidos con autorización activa.</p>}
      <ul className="space-y-2">
        {casos.map((c) => (
          <li key={c.id}>
            <Link href={`/tutor/caso/${c.id}`} className="block rounded border bg-white p-3 hover:border-teal-700">
              <strong>{c.alias}</strong> · {c.brechas.length} brecha(s) · {ESTADOS[c.estado]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
