import Link from "next/link";
import { malla } from "@/lib/contenido";
import { BotonReiniciar } from "./boton-reiniciar";
import { DexCard, Eyebrow, LinkButton } from "@/components/ui";

const MINI = [
  { icono: "💻", t: "Laboratorio de programación", m: "3er semestre", g: "from-violet-300 via-violet-200 to-fuchsia-100", rot: "rotate-[-6deg] -translate-x-6", z: "z-10" },
  { icono: "🤝", t: "Trabajo en equipo", m: "3er semestre", g: "from-fuchsia-200 via-pink-100 to-violet-100", rot: "rotate-[3deg] translate-x-4 translate-y-[6rem]", z: "z-20" },
  { icono: "📝", t: "Una prueba que se acerca", m: "3er semestre", g: "from-amber-200 via-amber-100 to-orange-100", rot: "rotate-[-3deg] -translate-x-2 translate-y-[12rem]", z: "z-30" },
];

function Destacada({ href, icono, titulo, texto, fondo }: { href: string; icono: string; titulo: string; texto: string; fondo: string }) {
  return (
    <Link href={href} className="group block rounded-3xl bg-white border border-slate-100 p-5 shadow-md shadow-violet-100/50 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
      <span className={`grid h-14 w-14 place-items-center rounded-2xl text-3xl ${fondo}`} aria-hidden>{icono}</span>
      <span className="mt-4 flex items-center gap-2 font-extrabold tracking-tight text-slate-900 text-lg">{titulo}<span className="text-violet-600 transition group-hover:translate-x-1" aria-hidden>→</span></span>
      <span className="mt-1 block text-sm text-slate-600">{texto}</span>
    </Link>
  );
}

export default function Inicio() {
  return (
    <div className="space-y-8">
      <section className="anim-entrar relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-800 via-violet-700 to-fuchsia-600 p-6 lg:p-12 text-white shadow-xl shadow-violet-300/50 grid lg:grid-cols-2 gap-8 items-center">
        <span aria-hidden className="patron absolute inset-0 opacity-10" />
        <span aria-hidden className="anim-brillo absolute -left-20 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-400/40 blur-3xl" />
        <div className="relative space-y-4">
          <Eyebrow className="text-violet-200">Decide con experiencia, no con presión</Eyebrow>
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">Vive tus próximos semestres antes de llegar a ellos.</h1>
          <p className="text-violet-100 text-lg">Descubre cómo son los ramos y desafíos de tu carrera con simulaciones creadas por quienes ya la viven.</p>
          <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">🎓 Ingeniería en Informática · mención Desarrollo de Software · Duoc UC</p>
          <div><LinkButton href="/estudiante" variant="white" className="w-full lg:w-auto">Comenzar mi simulación →</LinkButton></div>
        </div>
        <div aria-hidden className="relative hidden lg:block h-80">
          {MINI.map((m) => (
            <div key={m.t} className={`absolute left-1/4 top-0 w-64 overflow-hidden rounded-3xl bg-white text-slate-800 shadow-2xl shadow-indigo-950/30 ${m.rot} ${m.z}`}>
              <div className={`bg-gradient-to-br px-4 py-3 text-4xl ${m.g}`}>{m.icono}</div>
              <div className="px-4 py-2"><p className="text-[10px] font-bold uppercase tracking-widest text-violet-600">{m.m}</p><p className="font-extrabold text-sm text-slate-900">{m.t}</p></div>
            </div>
          ))}
        </div>
      </section>
      <div className="grid gap-4 lg:grid-cols-3">
        <Destacada href="/estudiante" icono="🎮" titulo="Simular" texto="Vive escenas reales de un semestre y marca cómo te hicieron sentir." fondo="bg-violet-100" />
        <Destacada href="/ruta" icono="🗺️" titulo="Explorar la malla" texto="Conoce los ramos de la carrera, semestre a semestre." fondo="bg-sky-100" />
        <Destacada href="/tutor" icono="🧑‍🏫" titulo="Soy tutor o jefe de carrera" texto="Crea escenas y acompaña los casos que te compartan." fondo="bg-slate-100" />
      </div>
      <DexCard eyebrow="Guía con inteligencia artificial" title="Hola, soy Dex">
        Te acompaño en la simulación y te ayudo a poner en palabras lo que te sorprendió. Tú decides qué compartir.
      </DexCard>
      <p className="text-center text-xs text-slate-500">{malla.carrera.nombre} · {malla.carrera.institucion} (malla pública; experiencias ficticias)</p>
      <BotonReiniciar />
    </div>
  );
}
