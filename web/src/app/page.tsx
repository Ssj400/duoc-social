import Link from "next/link";
import { malla } from "@/lib/contenido";
import { BotonReiniciar } from "./boton-reiniciar";
import { Card, DexCard, Eyebrow, LinkButton } from "@/components/ui";

export default function Inicio() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-700 to-violet-600 p-6 text-white shadow-sm space-y-4">
        <Eyebrow className="text-violet-200">Decide con experiencia, no con presión</Eyebrow>
        <h1 className="text-3xl font-extrabold tracking-tight leading-tight">Vive tus próximos semestres antes de llegar a ellos.</h1>
        <p className="text-violet-100 text-lg">Descubre cómo son los ramos y desafíos de tu carrera con simulaciones creadas por quienes ya la viven.</p>
        <LinkButton href="/estudiante" variant="white" className="w-full">Comenzar mi simulación →</LinkButton>
      </section>
      <DexCard eyebrow="Guía con inteligencia artificial" title="Hola, soy Dex">
        Te acompaño en la simulación y te ayudo a poner en palabras lo que te sorprendió. Tú decides qué compartir.
      </DexCard>
      <Link href="/ruta" className="block">
        <Card className="flex items-center gap-4 hover:border-violet-200">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-2xl" aria-hidden>🗺️</span>
          <span className="flex-1 font-extrabold tracking-tight text-slate-900 text-lg">Explorar la malla</span>
          <span className="text-violet-600" aria-hidden>→</span>
        </Card>
      </Link>
      <Link href="/tutor" className="block">
        <Card className="flex items-center gap-4 hover:border-violet-200">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-2xl" aria-hidden>🧑‍🏫</span>
          <span className="flex-1 font-extrabold tracking-tight text-slate-900 text-lg">Soy tutor o jefe de carrera</span>
          <span className="text-violet-600" aria-hidden>→</span>
        </Card>
      </Link>
      <p className="text-center text-xs text-slate-500">{malla.carrera.nombre} · {malla.carrera.institucion} (malla pública; experiencias ficticias)</p>
      <BotonReiniciar />
    </div>
  );
}
