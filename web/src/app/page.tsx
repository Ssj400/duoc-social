import Link from "next/link";
import { malla } from "@/lib/contenido";
import { BotonReiniciar } from "./boton-reiniciar";

export default function Inicio() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Simulación de carrera</h1>
      <p>{malla.carrera.nombre} · {malla.carrera.institucion} (malla pública; experiencias ficticias)</p>
      <div className="flex gap-4">
        <Link href="/estudiante" className="rounded-lg bg-teal-700 text-white px-6 py-3">Entrar como estudiante</Link>
        <Link href="/tutor" className="rounded-lg border border-teal-700 text-teal-800 px-6 py-3">Entrar como tutor</Link>
        <Link href="/ruta" className="rounded-lg border border-teal-700 text-teal-800 px-6 py-3">Explorar la malla (RUTA)</Link>
      </div>
      <BotonReiniciar />
    </div>
  );
}
