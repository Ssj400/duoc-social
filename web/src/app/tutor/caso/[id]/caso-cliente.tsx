"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { malla } from "@/lib/malla-cliente";
import { api, ESTADOS, TXT_NO_DIAGNOSTICO } from "@/lib/cliente";
import { Button, Card, Chip, Eyebrow, SourceChip, claseCampo } from "@/components/ui";
import type { Caso, Motivo } from "@/lib/tipos";

const campo = claseCampo;
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
        <p role="status" className="rounded-2xl bg-slate-100 p-4">El estudiante pausó o retiró la autorización.</p>
        <Link href="/tutor" className="font-semibold text-violet-700 hover:underline">Volver a casos</Link>
      </div>
    );
  const PASOS = ["nuevo", "gestion_iniciada", "ayuda_recibida"] as const;
  const idx = PASOS.indexOf(caso.estado as (typeof PASOS)[number]);
  const lab = (e: string) => ESTADOS[e as Caso["estado"]];
  const eti = "block space-y-1 font-semibold text-slate-800";
  return (
    <div className="space-y-5">
      <Link href="/tutor" className="font-semibold text-violet-700 hover:underline">← Casos</Link>
      <div className="space-y-1"><Eyebrow>Caso compartido</Eyebrow><h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{caso.alias}</h1></div>
      <p className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">{TXT_NO_DIAGNOSTICO}</p>
      <section className="space-y-3">
        <h2 className="font-extrabold tracking-tight text-slate-900 text-lg">Brechas (con escena y fuente)</h2>
        <ul className="space-y-3">
          {caso.brechas.map((b) => (
            <li key={b.id}>
              <Card className="space-y-2">
                <p className="text-slate-800">{b.texto}</p>
                <p className="text-sm flex gap-1.5 flex-wrap items-center">Escena {b.escenaId} · {b.estado} · fuentes: {b.citas.map((c) => <SourceChip key={c} icono={c.startsWith("malla:") ? "📘" : "📎"}>{c.startsWith("malla:") ? (malla.find((r) => r.id === c)?.nombre ?? c) : c}</SourceChip>)}</p>
              </Card>
            </li>
          ))}
        </ul>
        {caso.motivos && (
          <p><strong>Motivo (compartido por el estudiante):</strong> {caso.motivos.length ? caso.motivos.map((m) => NOM_MOTIVO[m]).join(", ") : "ninguno marcado"}{caso.motivoOtro ? ` · ${caso.motivoOtro}` : ""}</p>
        )}
      </section>
      <Card className="space-y-3">
        <h2 className="font-extrabold tracking-tight text-slate-900 text-lg">Plantilla de siguiente paso</h2>
        <div className="flex gap-2 flex-wrap">
          {PLANTILLAS.map((p) => <Chip key={p.id} selected={sel === p.id} onClick={() => elegir(p)}>{p.t}</Chip>)}
        </div>
        {sel && (
          <div className="space-y-3">
            <label className={eti}>Acción<input className={campo} value={accion} onChange={(e) => setAccion(e.target.value)} /></label>
            <label className={eti}>Mensaje (editable)<textarea className={campo} rows={2} value={mensaje} onChange={(e) => setMensaje(e.target.value)} /></label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className={eti}>Responsable<input className={campo} value={responsable} onChange={(e) => setResponsable(e.target.value)} /></label>
              <label className={eti}>Fecha<input type="date" className={campo} value={fecha} onChange={(e) => setFecha(e.target.value)} /></label>
            </div>
            {error && <p role="alert">{error}</p>}
            <Button onClick={registrar}>Registrar</Button>
          </div>
        )}
        {caso.pasos.length > 0 && (
          <ul className="list-disc pl-6">{caso.pasos.map((p, i) => <li key={i}>{p.accion} · {p.responsable} · {p.fecha}</li>)}</ul>
        )}
      </Card>
      <label className={eti}>Notas del tutor (no modifican lo que declaró el estudiante)
        <textarea className={campo} rows={2} value={notas} onChange={(e) => setNotas(e.target.value)} />
      </label>
      <Card className="space-y-4">
        <p>Seguimiento: <strong className="text-slate-900">{ESTADOS[caso.estado]}</strong> (Nuevo → Gestión iniciada → Ayuda recibida)</p>
        <ol className="flex items-center gap-2" aria-hidden>
          {PASOS.map((e, i) => (
            <li key={e} className="flex flex-1 items-center gap-2">
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${i <= idx ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500"}`}>{i + 1}</span>
              <span className={`text-xs ${i <= idx ? "font-bold text-slate-900" : "text-slate-500"}`}>{lab(e)}</span>
            </li>
          ))}
        </ol>
        <div className="flex gap-2 flex-wrap">
          <Button variant="secondary" onClick={() => marcar("ayuda_recibida")}>Ayuda recibida</Button>
          <Button variant="secondary" onClick={() => marcar("no_aceptado")}>El estudiante no aceptó</Button>
        </div>
        <p className="text-sm">Gestión iniciada no es lo mismo que ayuda recibida. Cambiarse de carrera también es un buen resultado.</p>
      </Card>
    </div>
  );
}
