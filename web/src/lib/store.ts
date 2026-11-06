// Estado en memoria de un solo proceso Node (se pierde al reiniciar; no es persistencia).
import "server-only";
import type { Caso, Escena } from "./tipos";
import { contenido } from "./contenido";

type Estado = { escenas: Map<string, Escena>; casos: Map<string, Caso> };

const g = globalThis as unknown as { __estadoDemo?: Estado };

function inicial(): Estado {
  return {
    escenas: new Map(contenido.escenas.map((e) => [e.id, e])),
    casos: new Map(),
  };
}

export const estado = (): Estado => (g.__estadoDemo ??= inicial());

export function reiniciarDemo() {
  g.__estadoDemo = inicial();
}

/** El tutor solo ve casos con autorización activa: comprobar en CADA lectura. */
export const casosVisiblesTutor = () =>
  [...estado().casos.values()].filter((c) => c.autorizacion === "activa");
