import "server-only";
import { ErrorLLM } from "@/lib/llm";
import { ramoPorId } from "@/lib/contenido";
import { buscar } from "@/lib/buscar";
import type { Escena, Fallback, Plantilla } from "@/lib/tipos";
import { generarEscenaIA } from "./proveedor";
import { validarEscena } from "./validar";

export type SalidaEscena = { fallback?: false; escena: Omit<Escena, "id" | "estado" | "opciones"> & { opciones: Omit<Escena["opciones"][number], "id">[] } } | Fallback;

export async function generarEscena(plantilla: Plantilla): Promise<SalidaEscena> {
  if (!ramoPorId(plantilla.ramoId)) return { fallback: true, motivo: "invalido" };
  try {
    const ramo = ramoPorId(plantilla.ramoId)!;
    const frags = await buscar(`${ramo.nombre} ${plantilla.situacion}`, 4);
    const propios: { id: string; texto: string }[] = [
      { id: ramo.id, texto: `${ramo.nombre} (${ramo.codigo}), semestre ${ramo.semestre}` },
      { id: plantilla.id, texto: `${plantilla.situacion} ${plantilla.sorprende} ${plantilla.leVaBien}` },
    ];
    const fragmentos = [...propios, ...frags.filter((f) => !propios.some((p) => p.id === f.id))];
    const raw = await generarEscenaIA({ plantilla, fragmentos });
    const v = validarEscena(raw, plantilla.ramoId, fragmentos.map((f) => f.id));
    if (!v.ok) return { fallback: true, motivo: "invalido" };
    return {
      escena: {
        plantillaId: plantilla.id,
        ramoId: plantilla.ramoId,
        momento: plantilla.momento,
        tipo: plantilla.tipo,
        titulo: v.data.titulo,
        narracion: v.data.narracion,
        opciones: v.data.opciones,
        citas: v.data.citas,
      },
    };
  } catch (e) {
    return { fallback: true, motivo: e instanceof ErrorLLM ? e.motivo : "error" };
  }
}
