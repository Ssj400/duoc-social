import "server-only";
import { ErrorLLM } from "@/lib/llm";
import type { Escena, Fallback, Plantilla, Reaccion, Respuesta } from "@/lib/tipos";
import { proponerBrechasIA } from "./proveedor";
import { brechaPorRegla } from "./respaldos";
import { validarBrechas } from "./validar";

type Cruda = { escenaId: string; texto: string; citas: string[] };

/** Solo escenas marcadas sorprendio/no_gusto. Nunca recibe el motivo. */
export async function proponerBrechas(
  escenas: Escena[],
  plantillas: Plantilla[],
  respuestas: Respuesta[],
  comentario?: string,
): Promise<{ fallback: boolean; motivo?: Fallback["motivo"]; brechas: Cruda[] }> {
  const marcadas = respuestas.filter((r) => (["sorprendio", "no_gusto"] as Reaccion[]).includes(r.reaccion));
  const esc = marcadas
    .map((r) => escenas.find((e) => e.id === r.escenaId))
    .filter((e, i, a): e is Escena => !!e && a.indexOf(e) === i);
  if (!esc.length) return { fallback: false, brechas: [] };
  const regla = () =>
    esc.flatMap((e) => {
      const p = plantillas.find((x) => x.id === e.plantillaId);
      return p ? [brechaPorRegla(e, p)] : [];
    });
  try {
    const raw = await proponerBrechasIA({
      escenas: esc.map((e) => ({
        id: e.id,
        titulo: e.titulo,
        narracion: e.narracion,
        citas: e.citas,
        sorprende: plantillas.find((p) => p.id === e.plantillaId)?.sorprende ?? "",
      })),
      respuestas: marcadas,
      comentario: comentario?.slice(0, 500),
    });
    const v = validarBrechas(raw, esc);
    if (!v.ok) return { fallback: true, motivo: "invalido", brechas: regla() };
    return { fallback: false, brechas: v.data.brechas };
  } catch (e) {
    return { fallback: true, motivo: e instanceof ErrorLLM ? e.motivo : "error", brechas: regla() };
  }
}
