import { modoLLM, pedirJSON, ErrorLLM } from "@/lib/llm";

// Prueba de humo del proveedor: GET /api/salud?probar=1 hace UNA llamada sintética.
export async function GET(req: Request) {
  const modo = modoLLM();
  if (!new URL(req.url).searchParams.get("probar")) return Response.json(modo);
  const t0 = Date.now();
  try {
    const r = await pedirJSON(
      [{ role: "user", content: 'Responde solo {"ok": true} en JSON.' }],
      () => ({ ok: true, mock: true }),
    );
    return Response.json({ ...modo, ms: Date.now() - t0, respuesta: r });
  } catch (e) {
    const motivo = e instanceof ErrorLLM ? e.motivo : "error";
    return Response.json({ ...modo, ms: Date.now() - t0, fallo: motivo }, { status: 502 });
  }
}
