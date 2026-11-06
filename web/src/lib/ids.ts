import type { Opcion } from "./tipos";

export const conIds = (ops: { texto: string; loQueSuelePasar: string; siguiente?: string }[]): Opcion[] =>
  ops.map((o, i) => ({ id: `o${i + 1}`, ...o }));
