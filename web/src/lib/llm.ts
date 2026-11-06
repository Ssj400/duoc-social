// Adaptador LLM compatible con OpenAI (Groq principal, Gemini respaldo).
// Solo servidor: nunca importar desde componentes cliente.
// Variables: LLM_BASE_URL, LLM_MODEL, LLM_API_KEY. LLM_MOCK=true usa el proveedor simulado.
import "server-only";

export type MensajeLLM = { role: "system" | "user" | "assistant"; content: string };

export class ErrorLLM extends Error {
  constructor(public motivo: "timeout" | "invalido" | "error", mensaje: string) {
    super(mensaje);
  }
}

const TIMEOUT_MS = Number(process.env.LLM_TIMEOUT_MS ?? 10_000);

export function modoLLM() {
  const mock = process.env.LLM_MOCK === "true" || !process.env.LLM_API_KEY;
  return { mock, modelo: mock ? "mock" : process.env.LLM_MODEL ?? "(sin modelo)" };
}

/** Pide una respuesta JSON. Lanza ErrorLLM si hay timeout, error HTTP o JSON inválido. */
export async function pedirJSON(
  mensajes: MensajeLLM[],
  mockRespuesta: () => unknown,
): Promise<unknown> {
  if (modoLLM().mock) return mockRespuesta();

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const r = await fetch(`${process.env.LLM_BASE_URL!.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        Authorization: `Bearer ${process.env.LLM_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "simulacion-carrera-demo/0.1", // sin esto Cloudflare puede responder 403
      },
      body: JSON.stringify({
        model: process.env.LLM_MODEL,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: mensajes,
      }),
    });
    if (!r.ok) throw new ErrorLLM("error", `HTTP ${r.status}`);
    const data = await r.json();
    const texto: string = data?.choices?.[0]?.message?.content ?? "";
    try {
      return JSON.parse(texto);
    } catch {
      throw new ErrorLLM("invalido", "La respuesta no es JSON");
    }
  } catch (e) {
    if (e instanceof ErrorLLM) throw e;
    if ((e as Error).name === "AbortError") throw new ErrorLLM("timeout", "Sin respuesta a tiempo");
    throw new ErrorLLM("error", (e as Error).message);
  } finally {
    clearTimeout(t);
  }
}
