import { malla, ramoPorId } from "@/lib/contenido";
import { BrechasIA, EscenaIA, RecomendadosIA } from "./esquemas";

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
): Resultado<{ brechas: { escenaId: string; texto: string; citas: string[] }[] }> {
  // Algunos modelos devuelven la lista suelta en vez de { brechas: [...] }.
  const p = BrechasIA.safeParse(Array.isArray(raw) ? { brechas: raw } : raw);
  if (!p.success) return { ok: false, motivo: "esquema inválido" };
  // Las fuentes de una brecha son siempre las de su escena: las pone el servidor,
  // no el modelo (con el modelo real citaba el id de la escena en vez de sus fuentes).
  const brechas: { escenaId: string; texto: string; citas: string[] }[] = [];
  for (const [i, b] of p.data.brechas.entries()) {
    // escenaId; si falta, la escena cuyas fuentes cita; si no, el mismo orden de entrada.
    const e =
      escenasMarcadas.find((x) => x.id === b.escenaId) ??
      (b.escenaId ? undefined : escenasMarcadas.find((x) => !!b.citas?.length && b.citas.every((c) => x.citas.includes(c))) ?? escenasMarcadas[i]);
    if (!e) return { ok: false, motivo: "escena no marcada" };
    brechas.push({ escenaId: e.id, texto: b.texto, citas: e.citas });
  }
  const t = textoProhibido(brechas.map((b) => b.texto));
  return t ? { ok: false, motivo: t } : { ok: true, data: { brechas } };
}

const PROHIBIDAS_RECOMENDAR = ["no es para ti", "ideal", "mejor opción", "deberías", "%", "probabilidad", "ranking", "puntaje"];

export function validarRecomendados(
  raw: unknown,
  catalogoIds: string[],
  etiquetasMarcadas: string[],
): Resultado<RecomendadosIA> {
  const p = RecomendadosIA.safeParse(raw);
  if (!p.success) return { ok: false, motivo: "esquema inválido" };
  for (const r of p.data.recomendados) {
    if (!catalogoIds.includes(r.itemId)) return { ok: false, motivo: "ítem ajeno al catálogo" };
    if (r.basadoEn.some((e) => !etiquetasMarcadas.includes(e))) return { ok: false, motivo: "etiqueta no marcada" };
  }
  const junto = p.data.recomendados.map((r) => r.porQue).join(" \n ").toLowerCase();
  const f = PROHIBIDAS_RECOMENDAR.find((x) => junto.includes(x)) ?? (/\beres\b/.test(junto) ? "eres" : null);
  return f ? { ok: false, motivo: `frase prohibida: ${f}` } : { ok: true, data: p.data };
}
