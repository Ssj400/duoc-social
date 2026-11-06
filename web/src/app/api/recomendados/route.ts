import { catalogo, recomendar } from "@/lib/ia/recomendar";
import type { Reaccion, RecomendadoUI } from "@/lib/tipos";

// Solo ids de etiquetas y reacciones por escena. Nada se guarda.
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const etiquetas: string[] = Array.isArray(b.etiquetas) ? b.etiquetas.filter((x: unknown) => typeof x === "string").slice(0, 20) : [];
  const reacciones: { escenaId: string; reaccion: Reaccion }[] = Array.isArray(b.reacciones)
    ? b.reacciones.slice(0, 20).map((r: { escenaId: string; reaccion: Reaccion }) => ({ escenaId: String(r.escenaId), reaccion: r.reaccion }))
    : [];
  const r = await recomendar(etiquetas, reacciones);
  const recomendados: RecomendadoUI[] = r.recomendados.flatMap((x) => {
    const it = catalogo.items.find((i) => i.id === x.itemId);
    return it ? [{ ...x, titulo: it.titulo, tipo: it.tipo }] : [];
  });
  return Response.json({ recomendados, ...(r.fallback ? { fallback: true, motivo: r.motivo } : {}), requestId: b.requestId });
}
