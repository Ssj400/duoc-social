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
