"use client";
// Portado del prototipo de Figma Make «Simulador de Asignaturas» (RUTA), con estos cambios
// deliberados respecto del prototipo:
// - Datos reales de la malla (códigos, semestre, horas, SCT, prerrequisitos), no inventados.
// - Sin porcentajes de avance ni puntajes (ia.md: ningún porcentaje en la app).
// - Sin perfil «Postulante»: el MVP es para estudiantes de primer año ya matriculados.
// - Sin «descubre si esta carrera es para ti»: la app muestra, no decide.
// - Sin contenidos/unidades inventados: la malla no los describe; lo que pasa en clase
//   viene solo de experiencias de tutores con escena aprobada.
import Link from "next/link";
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import * as I from "./iconos";

export type Experiencia = {
  escenaId: string; momento: string; tipo: string; situacion: string;
  sorprende: string; leVaBien: string; rolAutor: string;
};
export type RamoRuta = {
  id: string; codigo: string; nombre: string; semestre: number; categoria: string; linea: string;
  horas: number; sct: number; formato: string; certificacion?: string;
  prerrequisitos: { codigo: string; nombre: string }[];
  habilita: { codigo: string; nombre: string }[];
  experiencias: Experiencia[];
};
type Modo = "estudiante" | "explorar";

const FUENTE: CSSProperties = { fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif" };
const GRILLA: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(30,74,68,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,74,68,0.06) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  maskImage: "linear-gradient(to left, #000, transparent)",
  WebkitMaskImage: "linear-gradient(to left, #000, transparent)",
};
const etiqueta = "text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#687b77]";

/** Color e ícono por línea curricular (misma paleta del prototipo). */
const rango = (r: RamoRuta) => (r.categoria === "Especialidad" ? 0 : 1);

function estilo(linea: string): { fg: string; bg: string; Icono: typeof I.Codigo } {
  if (linea.startsWith("Desarrollo")) return { fg: "#7656d7", bg: "#f0ecff", Icono: I.Codigo };
  if (linea.startsWith("Gestión de Req")) return { fg: "#159b8e", bg: "#e8f8f5", Icono: I.BaseDatos };
  if (linea.startsWith("Ingeniería de Soft")) return { fg: "#f36f4b", bg: "#fff0eb", Icono: I.Capas };
  if (linea.startsWith("Evaluación")) return { fg: "#b7791f", bg: "#fdf3e1", Icono: I.Maletin };
  return { fg: "#52716d", bg: "#eef2ed", Icono: I.Libro };
}

const TIPO: Record<string, string> = { clase: "Clase", laboratorio: "Laboratorio", prueba: "Prueba", practica: "Práctica", equipo: "Trabajo en equipo" };

export function RutaCliente({ ramos, carrera, fuente, consultada }: {
  ramos: RamoRuta[]; carrera: string; fuente: string; consultada: string;
}) {
  const [modo, setModo] = useState<Modo | null>(null); // null = bienvenida abierta
  const [semestre, setSemestre] = useState(3);
  const delSemestre = useMemo(
    () => ramos.filter((r) => r.semestre === semestre)
      .sort((a, b) => b.experiencias.length - a.experiencias.length || rango(a) - rango(b)),
    [ramos, semestre],
  );
  const [ramoId, setRamoId] = useState<string | null>(null);
  const ramo = delSemestre.find((r) => r.id === ramoId) ?? delSemestre[0];
  const [pestana, setPestana] = useState<"general" | "experiencias">("general");
  const [menu, setMenu] = useState(false);
  const carga = delSemestre.reduce((s, r) => s + r.horas, 0);
  const sct = delSemestre.reduce((s, r) => s + r.sct, 0);
  const conEscena = ramos.find((r) => r.experiencias.length > 0);

  const elegirSemestre = (n: number) => { setSemestre(n); setRamoId(null); setPestana("general"); };
  const irARamo = (r: RamoRuta) => { setSemestre(r.semestre); setRamoId(r.id); setPestana("experiencias"); };
  const m: Modo = modo ?? "estudiante";

  return (
    <div style={FUENTE} className="-m-6 min-h-screen bg-[#f6f7f3] text-[#152f2d]">
      {modo === null && <Bienvenida alElegir={setModo} />}

      <header className="sticky top-0 z-30 border-b border-[#dce3dc] bg-[#f6f7f3]/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] items-center justify-between px-5">
          <button className="flex items-center gap-3" aria-label="Ir al inicio" onClick={() => setModo(null)}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#173f3a] text-white"><I.Brujula /></span>
            <span className="text-left">
              <span className="block text-[18px] font-extrabold leading-none tracking-[-0.03em]">RUTA</span>
              <span className="mt-1 block text-[9px] font-bold tracking-[0.2em] text-[#52716d]">SIMULADOR ACADÉMICO</span>
            </span>
          </button>
          <div className="hidden items-center gap-2 sm:flex">
            <Pildora activa={m === "estudiante"} onClick={() => setModo("estudiante")}><I.Persona width={14} height={14} />Mi ruta</Pildora>
            <Pildora activa={m === "explorar"} onClick={() => setModo("explorar")}><I.Brujula width={14} height={14} />Explorar</Pildora>
            <Link href="/estudiante" className="ml-2 rounded-full bg-[#173f3a] px-4 py-2 text-xs font-bold text-white">Jugar simulación</Link>
          </div>
          <button className="p-2 sm:hidden" aria-label={menu ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenu(!menu)}>
            {menu ? <I.Cerrar /> : <I.Menu />}
          </button>
        </div>
        {menu && (
          <div className="border-t border-[#dce3dc] px-5 py-4 sm:hidden">
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#687b77]">Elige cómo mirar</p>
            <div className="grid grid-cols-2 gap-2">
              {(["estudiante", "explorar"] as const).map((x) => (
                <button key={x} onClick={() => { setModo(x); setMenu(false); }}
                  className={`rounded-xl border px-4 py-3 text-sm font-bold ${m === x ? "border-[#173f3a] bg-[#173f3a] text-white" : "border-[#d7dfd8] bg-white text-[#173f3a]"}`}>
                  {x === "estudiante" ? "Mi ruta" : "Explorar"}
                </button>
              ))}
            </div>
            <Link href="/estudiante" className="mt-2 block rounded-xl bg-[#f7a386] px-4 py-3 text-center text-sm font-extrabold text-[#173f3a]">Jugar simulación</Link>
          </div>
        )}
      </header>

      <main className="mx-auto px-5 pb-12 pt-8">
        <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-[#d15a3b]">
              <span className="h-px w-7 bg-[#d15a3b]" />Ingeniería en Informática · Duoc UC
            </div>
            <h1 className="max-w-3xl text-[34px] font-extrabold leading-[1.05] tracking-[-0.045em] text-[#163b37] sm:text-[44px]">
              {m === "estudiante" ? "Tu ruta, a tu manera." : "Explora lo que viene."}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667975] sm:text-base">
              {m === "estudiante"
                ? "Mira cómo son los semestres que vienen en la mención Desarrollo de Software, contados por quienes ya los cursaron."
                : "Conoce los ramos de cada semestre con los datos de la malla oficial y, donde existan, experiencias de tutores."}
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[#dfe5df] bg-white p-3 pr-5 shadow-[0_8px_30px_rgba(27,56,51,0.05)]">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e7f1e8] font-extrabold text-[#26554e]">
              {m === "estudiante" ? "TF" : <I.Destello />}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#85938f]">{m === "estudiante" ? "Tutor asignado" : "Modo exploración"}</p>
              <p className="mt-0.5 text-sm font-extrabold text-[#254742]">{m === "estudiante" ? "Tutor ficticio (demo)" : "Malla oficial + experiencias de muestra"}</p>
            </div>
          </div>
        </section>

        <nav aria-label="Semestres" className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <button key={n} onClick={() => elegirSemestre(n)} aria-pressed={semestre === n}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-extrabold transition ${semestre === n ? "bg-[#173f3a] text-white" : "border border-[#d7dfd8] bg-white text-[#52716d] hover:border-[#173f3a]"}`}>
              {n}° sem{n >= 2 && n <= 4 ? " ·" : ""}{n >= 2 && n <= 4 && <span className={semestre === n ? "text-[#f7a386]" : "text-[#d15a3b]"}> lo que viene</span>}
            </button>
          ))}
        </nav>

        <section className="grid gap-6 md:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="h-fit rounded-[24px] border border-[#dfe5df] bg-white p-5 shadow-[0_15px_40px_rgba(25,58,52,0.04)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#82918e]">{semestre}° semestre</p>
                <p className="mt-1 text-lg font-extrabold tracking-[-0.02em]">{delSemestre.length} asignaturas</p>
              </div>
              <span className="rounded-full bg-[#eef2ed] px-3 py-1.5 text-[11px] font-bold text-[#58706c]">{sct} SCT</span>
            </div>
            <div className="space-y-2">
              {delSemestre.map((r) => {
                const activo = r.id === ramo?.id;
                const e = estilo(r.linea);
                return (
                  <button key={r.id} onClick={() => { setRamoId(r.id); setPestana("general"); }}
                    className={`group w-full rounded-2xl border p-4 text-left transition-all ${activo ? "border-[#173f3a] bg-[#173f3a] text-white shadow-[0_10px_25px_rgba(23,63,58,0.15)]" : "border-transparent bg-[#f6f7f3] hover:border-[#cad6ce]"}`}>
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                        style={activo ? { backgroundColor: "rgba(255,255,255,0.12)", color: "white" } : { backgroundColor: e.bg, color: e.fg }}>
                        <e.Icono />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[10px] font-bold uppercase tracking-wider ${activo ? "text-[#b8d0ca]" : "text-[#87938f]"}`}>{r.codigo}</span>
                        <span className="mt-1 block text-sm font-extrabold leading-[1.25]">{r.nombre}</span>
                        {r.experiencias.length > 0 && (
                          <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${activo ? "bg-white/15 text-[#f7a386]" : "bg-[#fff0eb] text-[#d15a3b]"}`}>
                            <I.Jugar width={10} height={10} />Escena disponible
                          </span>
                        )}
                      </span>
                      <span className={`mt-2 transition-transform group-hover:translate-x-0.5 ${activo ? "text-white" : "text-[#9aa7a3]"}`}><I.Chevron /></span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-5 rounded-2xl border border-dashed border-[#cad6ce] bg-[#fbfcf9] p-4">
              <div className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e7f1e8] text-[#2b6259]"><I.Reloj /></span>
                <div>
                  <p className="text-xs font-extrabold">Carga del semestre: {carga} horas pedagógicas</p>
                  <p className="mt-1 text-[11px] leading-4 text-[#70817e]">
                    Suma de los ramos con código según la malla oficial; no incluye optativos ni estudio personal. Útil si trabajas mientras estudias.
                  </p>
                </div>
              </div>
            </div>
            {m === "estudiante" && (
              <Link href="/estudiante" className="mt-3 block rounded-2xl border border-[#dfe5df] p-4 hover:border-[#173f3a]">
                <div className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#fff0eb] text-[#d15a3b]"><I.Mensaje /></span>
                  <div>
                    <p className="text-xs font-extrabold">Conversar con tu tutor</p>
                    <p className="mt-1 text-[11px] leading-4 text-[#70817e]">Solo si tú decides compartir tu resumen después de jugar. Si no, nadie más lo ve.</p>
                  </div>
                </div>
              </Link>
            )}
          </aside>

          {ramo && (
            <article className="overflow-hidden rounded-[24px] border border-[#dfe5df] bg-white shadow-[0_15px_40px_rgba(25,58,52,0.05)]">
              <div className="relative overflow-hidden px-6 pb-7 pt-6 sm:px-8 sm:pt-8">
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-40" style={GRILLA} />
                <div className="relative">
                  <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full px-3 py-1.5 text-[11px] font-extrabold"
                      style={{ color: estilo(ramo.linea).fg, backgroundColor: estilo(ramo.linea).bg }}>{ramo.linea}</span>
                    <div className="flex gap-2 text-[11px] font-bold text-[#667975]">
                      <span className="flex items-center gap-1.5 rounded-full bg-[#f3f5f1] px-3 py-1.5"><I.Reloj width={12} height={12} />{ramo.semestre}° semestre</span>
                      <span className="flex items-center gap-1.5 rounded-full bg-[#f3f5f1] px-3 py-1.5"><I.Libro width={12} height={12} />{ramo.horas} horas</span>
                    </div>
                  </div>
                  <p className="text-xs font-extrabold tracking-[0.12em] text-[#8a9895]">{ramo.codigo}</p>
                  <h2 className="mt-2 max-w-3xl text-[28px] font-extrabold leading-[1.1] tracking-[-0.04em] text-[#173f3a] sm:text-[36px]">{ramo.nombre}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-[#667975]">
                    {ramo.experiencias.length > 0
                      ? `${ramo.experiencias.length === 1 ? "Hay una experiencia de un tutor" : `Hay ${ramo.experiencias.length} experiencias de tutores`} sobre este ramo. Cada una es la experiencia de una persona, no de toda la carrera.`
                      : "La malla oficial no describe los contenidos de cada ramo y aún no hay experiencias de tutores para este. Aquí ves solo lo que dice la malla."}
                  </p>
                </div>
              </div>

              <div className="border-y border-[#e5e9e4] px-6 sm:px-8">
                <div className="flex gap-7">
                  <Pestana activa={pestana === "general"} onClick={() => setPestana("general")}>Vista general</Pestana>
                  <Pestana activa={pestana === "experiencias"} onClick={() => setPestana("experiencias")}>
                    Experiencias ({ramo.experiencias.length})
                  </Pestana>
                </div>
              </div>

              <div className="grid gap-8 p-6 sm:p-8">
                {pestana === "general" ? (
                  <div>
                    <p className={etiqueta}>Lo que dice la malla</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <Dato n="01" titulo={`${ramo.horas} horas pedagógicas`} detalle={`${ramo.sct} créditos SCT`} />
                      <Dato n="02" titulo={ramo.formato} detalle={ramo.categoria} />
                      <Dato n="03" titulo={ramo.certificacion ?? "Sin certificación asociada"} detalle={ramo.certificacion ? "Certificación intermedia" : "Según la malla"} />
                    </div>
                    <p className={`${etiqueta} mt-8`}>Tu camino en la malla</p>
                    <p className="mt-1 text-xs text-[#7c8b88]">De dónde vienes y qué te abre este ramo.</p>
                    <div className="mt-4 space-y-2">
                      {ramo.prerrequisitos.map((p) => <FilaRuta key={p.codigo} rotulo="Vienes de" ramo={p} />)}
                      {ramo.habilita.map((p) => <FilaRuta key={p.codigo} rotulo="Te abre" ramo={p} />)}
                      {!ramo.prerrequisitos.length && !ramo.habilita.length && (
                        <p className="rounded-xl bg-[#f6f7f3] p-3 text-xs font-bold text-[#38544f]">Este ramo no tiene prerrequisitos ni habilita otros según la malla.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className={etiqueta}>Experiencias de tutores</p>
                    {ramo.experiencias.length === 0 && (
                      <p className="rounded-xl bg-[#f6f7f3] p-4 text-sm text-[#38544f]">Aún no hay experiencias aprobadas para este ramo.</p>
                    )}
                    {ramo.experiencias.map((x) => (
                      <div key={x.escenaId} className="rounded-2xl border border-[#e1e7e1] p-5">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#d15a3b]">{x.momento} · {TIPO[x.tipo] ?? x.tipo}</p>
                        <p className="mt-2 text-sm font-extrabold leading-6 text-[#274843]">{x.situacion}</p>
                        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-xl bg-[#fff0eb] p-3">
                            <dt className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#d15a3b]">Lo que suele sorprender</dt>
                            <dd className="mt-1 text-xs leading-5 text-[#38544f]">{x.sorprende}</dd>
                          </div>
                          <div className="rounded-xl bg-[#e8f8f5] p-3">
                            <dt className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#159b8e]">Qué hace a quien le va bien</dt>
                            <dd className="mt-1 text-xs leading-5 text-[#38544f]">{x.leVaBien}</dd>
                          </div>
                        </dl>
                        <p className="mt-3 text-[11px] text-[#82918e]">Experiencia de {x.rolAutor}. Es la experiencia de una persona, no de toda la carrera.</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="rounded-[20px] bg-[#173f3a] p-6 text-white">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#f6a58b]"><I.Destello /></span>
                  <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#a9c3bd]">Vista previa</p>
                  {ramo.experiencias.length > 0 ? (
                    <>
                      <p className="mt-3 text-lg font-extrabold leading-6">Así se siente estudiar {ramo.nombre}.</p>
                      <p className="mt-3 text-xs leading-5 text-[#bad0cb]">Juega una situación real del ramo: eliges qué harías y ves lo que suele pasar. Sin puntaje y sin respuestas correctas.</p>
                      <Link href="/estudiante" className="mt-6 flex w-full items-center justify-between rounded-xl bg-[#f7a386] px-4 py-3 text-xs font-extrabold text-[#173f3a] transition hover:bg-[#ffb49b]">
                        Jugar la simulación<I.Flecha width={16} height={16} />
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="mt-3 text-lg font-extrabold leading-6">Este ramo aún no tiene escena.</p>
                      <p className="mt-3 text-xs leading-5 text-[#bad0cb]">Las escenas nacen de la experiencia de un tutor y se publican solo después de que esa persona las revisa.</p>
                      {conEscena && (
                        <button onClick={() => irARamo(conEscena)} className="mt-6 flex w-full items-center justify-between rounded-xl bg-[#f7a386] px-4 py-3 text-xs font-extrabold text-[#173f3a] transition hover:bg-[#ffb49b]">
                          Ver un ramo con escena<I.Flecha width={16} height={16} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </article>
          )}
        </section>

        <p className="mt-8 text-[11px] leading-5 text-[#82918e]">
          {carrera}. Fuente: <a className="underline" href={fuente} target="_blank" rel="noreferrer">malla pública de Duoc UC</a>, consultada el {consultada.split("-").reverse().join("/")}.
          Las experiencias y el tutor son ficticios (demo). Esta herramienta no evalúa ni decide por ti: seguir, cambiar o pausar son decisiones válidas.
        </p>
      </main>
    </div>
  );
}

function Bienvenida({ alElegir }: { alElegir: (m: Modo) => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#173f3a]/60 p-4" role="dialog" aria-modal="true" aria-labelledby="bienvenida-titulo">
      <div className="relative w-full max-w-md rounded-[28px] bg-[#f6f7f3] p-7 shadow-2xl">
        <button onClick={() => alElegir("estudiante")} aria-label="Cerrar" className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white text-[#52716d] shadow">
          <I.Cerrar width={16} height={16} />
        </button>
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#173f3a] text-white"><I.Brujula /></span>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-[#d15a3b]">Bienvenido a RUTA</p>
        <h2 id="bienvenida-titulo" className="mt-2 text-[30px] font-extrabold leading-[1.1] tracking-[-0.04em] text-[#163b37]">Una experiencia hecha para tu próximo paso.</h2>
        <p className="mt-3 text-sm leading-6 text-[#667975]">Cuéntanos desde dónde quieres mirar. Puedes cambiarlo en cualquier momento.</p>
        <button onClick={() => alElegir("estudiante")} className="mt-6 w-full rounded-[20px] bg-[#173f3a] p-5 text-left text-white">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10"><I.Persona /></span>
          <span className="mt-5 block text-lg font-extrabold">Mi ruta</span>
          <span className="mt-1 block text-xs leading-5 text-[#bad0cb]">Mira los semestres que vienen con experiencias de tutores y juega la simulación.</span>
          <span className="mt-4 flex items-center gap-2 text-xs font-extrabold text-[#f7a386]">Entrar a mi ruta <I.Flecha width={14} height={14} /></span>
        </button>
        <button onClick={() => alElegir("explorar")} className="mt-3 w-full rounded-[20px] border border-[#dfe5df] bg-white p-5 text-left">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e7f1e8] text-[#26554e]"><I.Brujula /></span>
          <span className="mt-5 block text-lg font-extrabold text-[#173f3a]">Explorar la malla</span>
          <span className="mt-1 block text-xs leading-5 text-[#667975]">Conoce cómo es la carrera por dentro, semestre a semestre.</span>
          <span className="mt-4 flex items-center gap-2 text-xs font-extrabold text-[#d15a3b]">Explorar la carrera <I.Flecha width={14} height={14} /></span>
        </button>
      </div>
    </div>
  );
}

function Pildora({ activa, onClick, children }: { activa: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={activa}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${activa ? "bg-[#dce9df] text-[#173f3a]" : "border border-[#d7dfd8] bg-white text-[#173f3a]"}`}>
      {children}
    </button>
  );
}

function Pestana({ activa, onClick, children }: { activa: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={activa} className={`relative py-4 text-xs font-extrabold ${activa ? "text-[#173f3a]" : "text-[#82918e]"}`}>
      {children}
      {activa && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#f36f4b]" />}
    </button>
  );
}

function Dato({ n, titulo, detalle }: { n: string; titulo: string; detalle: string }) {
  return (
    <div className="rounded-2xl border border-[#e1e7e1] p-4">
      <span className="mb-5 grid h-8 w-8 place-items-center rounded-full bg-[#fff0eb] text-xs font-extrabold text-[#f36f4b]">{n}</span>
      <p className="text-sm font-extrabold leading-5 text-[#274843]">{titulo}</p>
      <p className="mt-1 text-[11px] text-[#7c8b88]">{detalle}</p>
    </div>
  );
}

function FilaRuta({ rotulo, ramo }: { rotulo: string; ramo: { codigo: string; nombre: string } }) {
  return (
    <div className="flex w-full items-center gap-3 rounded-xl bg-[#f6f7f3] p-3">
      <span className="rounded-full border border-[#ccd6cf] bg-white px-2 py-1 text-[10px] font-bold text-[#52716d]">{rotulo}</span>
      <span className="flex-1 text-xs font-extrabold text-[#38544f]">{ramo.nombre}</span>
      <span className="text-[10px] font-bold text-[#94a19d]">{ramo.codigo}</span>
    </div>
  );
}
