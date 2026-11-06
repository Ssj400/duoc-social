// Contrato del RAG. La implementación real la hace otro integrante;
// mantener esta firma para que el resto del código no cambie.
import type { Fragmento } from "./tipos";
import { malla, contenido } from "./contenido";

export type Buscar = (consulta: string, k: number) => Promise<Fragmento[]>;

/** Simulado: coincidencia simple de palabras sobre malla y plantillas. Reemplazar por el RAG. */
export const buscar: Buscar = async (consulta, k) => {
  const fragmentos: Fragmento[] = [
    ...malla.malla.map((r) => ({
      id: r.id,
      tipo: "malla" as const,
      texto: `${r.nombre} (${r.codigo}), semestre ${r.semestre ?? "?"}${r.descripcion ? `: ${r.descripcion}` : ""}`,
      fuente: malla.carrera.fuente,
    })),
    ...contenido.plantillas.map((p) => ({
      id: p.id,
      tipo: "plantilla" as const,
      texto: `${p.situacion} Sorprende: ${p.sorprende} Le va bien a quien: ${p.leVaBien}`,
      fuente: `Experiencia de ${p.rolAutor} (ficticia, demo)`,
    })),
  ];
  const palabras = consulta.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  const puntaje = (f: Fragmento) => palabras.filter((w) => f.texto.toLowerCase().includes(w)).length;
  return fragmentos
    .map((f) => ({ f, p: puntaje(f) }))
    .sort((a, b) => b.p - a.p)
    .slice(0, k)
    .map((x) => x.f);
};
