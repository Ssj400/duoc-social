// TODO equipo IA: esta llamada usa pedirJSON(); al conectar Claude, que pase por el mismo proveedor (ver ia.md).
import "server-only";
import catalogoJson from "@/data/catalogo.json";
import { ErrorLLM, pedirJSON } from "@/lib/llm";
import type { Etiqueta, Fallback, ItemCatalogo, Reaccion, Recomendado } from "@/lib/tipos";
import { PROMPT_RECOMENDAR } from "./prompts";
import { recomendadosPorRegla } from "./respaldos";
import { validarRecomendados } from "./validar";

export const catalogo = catalogoJson as { etiquetas: Etiqueta[]; items: ItemCatalogo[] };

type ReaccionResumen = { escenaId: string; reaccion: Reaccion };

/** Solo ids de etiquetas y (escenaId, reaccion). Nunca nombre, motivo ni comentario. */
export async function recomendar(
  etiquetas: string[],
  reacciones: ReaccionResumen[],
): Promise<{ fallback: boolean; motivo?: Fallback["motivo"]; recomendados: Recomendado[] }> {
  const marcadas = etiquetas.filter((e, i, a) => catalogo.etiquetas.some((x) => x.id === e) && a.indexOf(e) === i);
  const regla = () => recomendadosPorRegla(marcadas, catalogo.etiquetas, catalogo.items);
  if (!marcadas.length) return { fallback: false, recomendados: regla() };
  try {
    const raw = await pedirJSON(
      [
        { role: "system", content: PROMPT_RECOMENDAR },
        { role: "user", content: JSON.stringify({ etiquetas: marcadas, reacciones, catalogo: catalogo.items }) },
      ],
      () => ({
        recomendados: recomendadosPorRegla(marcadas, catalogo.etiquetas, catalogo.items, (l) => `Podrías explorar esto porque marcaste que ${l}.`),
      }),
    );
    const v = validarRecomendados(raw, catalogo.items.map((i) => i.id), marcadas);
    if (!v.ok) return { fallback: true, motivo: "invalido", recomendados: regla() };
    return { fallback: false, recomendados: v.data.recomendados };
  } catch (e) {
    return { fallback: true, motivo: e instanceof ErrorLLM ? e.motivo : "error", recomendados: regla() };
  }
}
