"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { malla } from "@/lib/malla-cliente";
import { api, ESTADOS, TXT_NO_DIAGNOSTICO } from "@/lib/cliente";
import type { Caso, Motivo } from "@/lib/tipos";

const btn = "rounded-lg bg-teal-700 text-white px-5 py-2 disabled:opacity-50";
const btn2 = "rounded-lg border border-teal-700 text-teal-800 px-4 py-2";
const campo = "w-full rounded border border-neutral-400 p-2 bg-white";
const PLANTILLAS = [
  { id: "1a1", t: "Conversación 1:1", accion: "Conversación 1:1 con el estudiante", responsable: "Tutor", mensaje: "Hola, vi lo que compartiste y me gustaría conversar contigo, a tu ritmo, sobre cómo vas." },
  { id: "par", t: "Hablar con estudiante de 3er año", accion: "Conversación con un estudiante de 3er año", responsable: "Tutor (coordina)", mensaje: "Si te interesa, puedo conectarte con alguien de 3er año para que cuente cómo es el ramo." },
  { id: "voc", t: "Orientación vocacional", accion: "Derivar a orientación vocacional", responsable: "Tutor (deriva)", mensaje: "Hay una instancia de orientación vocacional por si quieres explorar opciones. Tú decides si la quieres." },
  { id: "cambio", t: "Info cambio de carrera", accion: "Entregar información sobre cambio de carrera", responsable: "Tutor", mensaje: "Si te sirve, puedo contarte cómo informarte sobre un cambio de carrera. Cambiarse también es una decisión válida." },
  { id: "otra", t: "Otra", accion: "", responsable: "", mensaje: "" },
];
const NOM_MOTIVO: Record<Motivo, string> = { gusto: "Gusto", empleabilidad: "Empleabilidad", presion: "Presión de otros", otro: "Otro" };

function useCaso(id: string) {
  const [caso, setCaso] = useState<Caso | null>(null);
  const [noDisponible, setNoDisponible] = useState(false);
  const [cargado, setCargado] = useState(false);
  const cargar = useCallback(async () => {
    const r = await api<{ caso?: Caso }>(`/api/casos/${id}`);
    setCargado(true);
    if (r.ok && r.data.caso) { setCaso(r.data.caso); setNoDisponible(false); } else { setCaso(null); setNoDisponible(true); }
  }, [id]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargar();
    const t = setInterval(cargar, 5000);
    return () => clearInterval(t);
  }, [cargar]);
  return { caso, noDisponible, cargado, cargar };
}

export default function CasoCliente({ id }: { id: string }) {
  const { caso, noDisponible, cargado, cargar } = useCaso(id);
  const [sel, setSel] = useState<string | null>(null);
  const [accion, setAccion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [responsable, setResponsable] = useState("");
  const [fecha, setFecha] = useState("");
  const [notas, setNotas] = useState("");
  const [error, setError] = useState("");

  const elegir = (p: (typeof PLANTILLAS)[number]) => { setSel(p.id); setAccion(p.accion); setResponsable(p.responsable); setMensaje(p.mensaje); };
  async function registrar() {
    setError("");
    const p = PLANTILLAS.find((x) => x.id === sel);
    const r = await api(`/api/casos/${id}`, "PATCH", { paso: { plantilla: p?.t ?? "Otra", accion: accion + (mensaje ? ` · Mensaje: ${mensaje}` : ""), responsable, fecha, nota: notas || undefined } });
    if (!r.ok) setError("Completa acción, responsable y fecha."); else cargar();
  }
  async function marcar(estado: "ayuda_recibida" | "no_aceptado") { await api(`/api/casos/${id}`, "PATCH", { estado }); cargar(); }

  if (!cargado) return <p>Cargando…</p>;
  if (noDisponible || !caso)
    return (
      <div className="space-y-3">
        <p role="status">El estudiante pausó o retiró la autorización.</p>
        <Link href="/tutor" className="underline">Volver a casos</Link>
      </div>
    );
  return (
    <div className="space-y-5">
      <Link href="/tutor" className="underline">← Casos</Link>
      <h1 className="text-2xl font-bold">{caso.alias}</h1>
      <p className="rounded bg-neutral-100 border p-3">{TXT_NO_DIAGNOSTICO}</p>
      <section className="space-y-2">
        <h2 className="font-bold">Brechas (con escena y fuente)</h2>
        <ul className="space-y-2">
          {caso.brechas.map((b) => (
            <li key={b.id} className="rounded border bg-white p-3">
              <p>{b.texto}</p>
              <p className="text-sm flex gap-2 flex-wrap">Escena {b.escenaId} · {b.estado} · fuentes: {b.citas.map((c) => <span key={c} className="rounded-full bg-neutral-200 px-2">{c.startsWith("malla:") ? (malla.find((r) => r.id === c)?.nombre ?? c) : c}</span>)}</p>
            </li>
          ))}
        </ul>
        {caso.motivos && (
          <p><strong>Motivo (compartido por el estudiante):</strong> {caso.motivos.length ? caso.motivos.map((m) => NOM_MOTIVO[m]).join(", ") : "ninguno marcado"}{caso.motivoOtro ? ` · ${caso.motivoOtro}` : ""}</p>
        )}
      </section>
      <section className="space-y-3">
        <h2 className="font-bold">Plantilla de siguiente paso</h2>
        <div className="flex gap-2 flex-wrap">
          {PLANTILLAS.map((p) => <button key={p.id} className={btn2} aria-pressed={sel === p.id} onClick={() => elegir(p)}>{p.t}</button>)}
        </div>
        {sel && (
          <div className="space-y-2">
            <label className="block">Acción<input className={campo} value={accion} onChange={(e) => setAccion(e.target.value)} /></label>
            <label className="block">Mensaje (editable)<textarea className={campo} rows={2} value={mensaje} onChange={(e) => setMensaje(e.target.value)} /></label>
            <div className="grid gap-2 sm:grid-cols-2">
              <label>Responsable<input className={campo} value={responsable} onChange={(e) => setResponsable(e.target.value)} /></label>
              <label>Fecha<input type="date" className={campo} value={fecha} onChange={(e) => setFecha(e.target.value)} /></label>
            </div>
            {error && <p role="alert">{error}</p>}
            <button className={btn} onClick={registrar}>Registrar</button>
          </div>
        )}
        {caso.pasos.length > 0 && (
          <ul className="list-disc pl-6">{caso.pasos.map((p, i) => <li key={i}>{p.accion} · {p.responsable} · {p.fecha}</li>)}</ul>
        )}
      </section>
      <label className="block">Notas del tutor (no modifican lo que declaró el estudiante)
        <textarea className={campo} rows={2} value={notas} onChange={(e) => setNotas(e.target.value)} />
      </label>
      <section className="space-y-2">
        <p>Seguimiento: <strong>{ESTADOS[caso.estado]}</strong> (Nuevo → Gestión iniciada → Ayuda recibida)</p>
        <div className="flex gap-2 flex-wrap">
          <button className={btn2} onClick={() => marcar("ayuda_recibida")}>Ayuda recibida</button>
          <button className={btn2} onClick={() => marcar("no_aceptado")}>El estudiante no aceptó</button>
        </div>
        <p className="text-sm">Gestión iniciada no es lo mismo que ayuda recibida. Cambiarse de carrera también es un buen resultado.</p>
      </section>
    </div>
  );
}
