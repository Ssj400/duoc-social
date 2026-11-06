// Utilidades de cliente (sin server-only). Respuestas con requestId obsoleto se ignoran.
export const rotuloEscena = (rol: string) =>
  `Generada con IA a partir de la experiencia de ${rol} y revisada por esa persona. Es la experiencia de una persona, no de toda la carrera.`;
export const TXT_FALLBACK = "La IA no respondió a tiempo. Puedes escribir la escena a mano.";
export const TXT_NO_DIAGNOSTICO = "Esto lo declaró el estudiante. No es un diagnóstico.";

export async function api<T>(url: string, metodo = "GET", cuerpo?: unknown): Promise<{ ok: boolean; status: number; data: T }> {
  const r = await fetch(url, {
    method: metodo,
    headers: cuerpo ? { "Content-Type": "application/json" } : undefined,
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    cache: "no-store",
  });
  const data = (await r.json().catch(() => ({}))) as T;
  return { ok: r.ok, status: r.status, data };
}

export const nuevoRequestId = () => Math.random().toString(36).slice(2);

export function narrar(texto: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "es-CL";
  window.speechSynthesis.speak(u);
}
export const detenerNarracion = () => typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.cancel();

export const ICONOS: Record<string, string> = { clase: "📚", laboratorio: "🧪", prueba: "📝", practica: "🛠️", equipo: "👥" };
export const TIPOS = ["clase", "laboratorio", "prueba", "practica", "equipo"] as const;

import type { Caso } from "./tipos";
export const ESTADOS: Record<Caso["estado"], string> = {
  nuevo: "Nuevo",
  gestion_iniciada: "Gestión iniciada",
  ayuda_recibida: "Ayuda recibida",
  no_aceptado: "El estudiante no aceptó",
};

