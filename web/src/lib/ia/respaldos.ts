import type { Plantilla } from "@/lib/tipos";

/** «Que no te enseñan...» -> «no te enseñan...» (minúscula inicial, sin «que» duplicado). */
export function fraseSorprende(s: string) {
  const t = s.trim().replace(/^que\s+/i, "");
  return t.charAt(0).toLowerCase() + t.slice(1);
}

/** Brecha por regla fija: «Te sorprendió que » + «sorprende» de la plantilla. */
export function brechaPorRegla(escena: { id: string; citas: string[] }, plantilla: Plantilla) {
  return { escenaId: escena.id, texto: `Te sorprendió que ${fraseSorprende(plantilla.sorprende)}`, citas: escena.citas };
}

type EtiquetaCat = { id: string; label: string };
type ItemCat = { id: string; etiquetas: string[] };
const POR_DEFECTO = ["recurso-malla", "persona-tutor"];

/** Regla fija etiqueta -> ítems. Devuelve 2–3 recomendados; `frase` da el texto del porQue. */
export function recomendadosPorRegla(
  etiquetasMarcadas: string[],
  etiquetas: EtiquetaCat[],
  items: ItemCat[],
  frase: (label: string) => string = (l) => `Porque marcaste que ${l}.`,
) {
  const out: { itemId: string; porQue: string; basadoEn: string[] }[] = [];
  for (const id of etiquetasMarcadas) {
    const label = etiquetas.find((e) => e.id === id)?.label;
    if (!label || id === "no-decir") continue;
    for (const it of items) {
      if (out.length >= 3) break;
      if (it.etiquetas.includes(id) && !out.some((o) => o.itemId === it.id))
        out.push({ itemId: it.id, porQue: frase(label.toLowerCase()), basadoEn: [id] });
    }
    if (out.length >= 3) break;
  }
  for (const d of POR_DEFECTO) {
    if (out.length >= 2) break;
    if (items.some((i) => i.id === d) && !out.some((o) => o.itemId === d))
      out.push({ itemId: d, porQue: "Es un punto de partida general para explorar.", basadoEn: [] });
  }
  return out;
}
