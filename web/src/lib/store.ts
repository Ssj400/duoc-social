// Estado en memoria de un solo proceso Node (se pierde al reiniciar; no es persistencia).
import "server-only";
import type { Caso, Escena } from "./tipos";
import { contenido } from "./contenido";

type Estado = { escenas: Map<string, Escena>; casos: Map<string, Caso>; seqEscena: number; seqCaso: number };

const g = globalThis as unknown as { __estadoDemo?: Estado };

function inicial(): Estado {
  return {
    // Copias: aprobar edita la escena en el sitio; sin copiar, «Reiniciar demo» no deshacía esas ediciones.
    escenas: new Map(contenido.escenas.map((e) => [e.id, structuredClone(e)])),
    casos: new Map(),
    seqEscena: contenido.escenas.length,
    seqCaso: 0,
  };
}

export const estado = (): Estado => (g.__estadoDemo ??= inicial());

export function reiniciarDemo() {
  g.__estadoDemo = inicial();
}

/** El tutor solo ve casos con autorización activa: comprobar en CADA lectura. */
export const casosVisiblesTutor = () =>
  [...estado().casos.values()].filter((c) => c.autorizacion === "activa");

export const nuevoIdEscena = () => `esc-${++estado().seqEscena}`;
export const nuevoIdCaso = () => `caso-${++estado().seqCaso}`;
