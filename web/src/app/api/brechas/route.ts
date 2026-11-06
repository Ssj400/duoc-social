import { contenido } from "@/lib/contenido";
import { proponerBrechas } from "@/lib/ia/proponerBrechas";
import { estado } from "@/lib/store";
import type { Brecha, Respuesta } from "@/lib/tipos";

// Solo escenas 😮/🙁 llegan a la IA; nunca el motivo.
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const respuestas: Respuesta[] = Array.isArray(b.respuestas)
    ? b.respuestas.map((r: Respuesta) => ({ escenaId: r.escenaId, opcionId: r.opcionId, reaccion: r.reaccion }))
    : [];
  const comentario = typeof b.comentario === "string" ? b.comentario : undefined;
  const r = await proponerBrechas([...estado().escenas.values()], contenido.plantillas, respuestas, comentario);
  const brechas: Brecha[] = r.brechas.map((x, i) => ({ id: `b${i + 1}`, ...x, estado: "propuesta" }));
  return Response.json({ brechas, ...(r.fallback ? { fallback: true, motivo: r.motivo } : {}), requestId: b.requestId });
}
