import { malla, ramoPorId } from "@/lib/contenido";
import { BrechasIA, EscenaIA } from "./esquemas";

export type Resultado<T> = { ok: true; data: T } | { ok: false; motivo: string };

const PROHIBIDAS = ["no es para ti", "deberías dejar", "deberías cambiar", "probabilidad", "%", "riesgo de desertar"];

function textoProhibido(textos: string[]): string | null {
  const junto = textos.join(" \n ").toLowerCase();
  const f = PROHIBIDAS.find((p) => junto.includes(p));
  if (f) return `frase prohibida: ${f}`;
  const codigos = textos.join(" ").match(/[A-Z]{3}\d{4}/g) ?? [];
  const mal = codigos.find((c) => !malla.malla.some((r) => r.codigo === c));
  return mal ? `código de ramo inexistente: ${mal}` : null;
}

export function validarEscena(raw: unknown, ramoId: string, idsFragmentos: string[]): Resultado<EscenaIA> {
  if (!ramoPorId(ramoId)) return { ok: false, motivo: "ramo inexistente" };
  const p = EscenaIA.safeParse(raw);
  if (!p.success) return { ok: false, motivo: "esquema inválido" };
  const d = p.data;
  if (d.citas.some((c) => !idsFragmentos.includes(c))) return { ok: false, motivo: "cita ajena a los fragmentos" };
  const t = textoProhibido([d.titulo, d.narracion, ...d.opciones.flatMap((o) => [o.texto, o.loQueSuelePasar])]);
  return t ? { ok: false, motivo: t } : { ok: true, data: d };
}

export function validarBrechas(
  raw: unknown,
  escenasMarcadas: { id: string; citas: string[] }[],
): Resultado<BrechasIA> {
  const p = BrechasIA.safeParse(raw);
  if (!p.success) return { ok: false, motivo: "esquema inválido" };
  for (const b of p.data.brechas) {
    const e = escenasMarcadas.find((x) => x.id === b.escenaId);
    if (!e) return { ok: false, motivo: "escena no marcada" };
    if (b.citas.some((c) => !e.citas.includes(c))) return { ok: false, motivo: "cita ajena a la escena" };
  }
  const t = textoProhibido(p.data.brechas.map((b) => b.texto));
  return t ? { ok: false, motivo: t } : { ok: true, data: p.data };
}
