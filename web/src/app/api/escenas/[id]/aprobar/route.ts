import { conIds } from "@/lib/ids";
import { estado } from "@/lib/store";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const esc = estado().escenas.get(id);
  if (!esc) return Response.json({ error: "no existe" }, { status: 404 });
  const b = await req.json().catch(() => ({}));
  if (typeof b.titulo === "string" && b.titulo.trim()) esc.titulo = b.titulo.trim();
  if (typeof b.narracion === "string" && b.narracion.trim()) esc.narracion = b.narracion.trim();
  if (Array.isArray(b.opciones)) {
    const ops = b.opciones.filter((o: { texto?: string; loQueSuelePasar?: string }) => o?.texto?.trim() && o?.loQueSuelePasar?.trim());
    if (ops.length === 3) {
      esc.opciones = conIds(ops.map((o: { texto: string; loQueSuelePasar: string; siguiente?: string }) => ({
        texto: o.texto.trim(), loQueSuelePasar: o.loQueSuelePasar.trim(), ...(o.siguiente ? { siguiente: o.siguiente } : {}),
      })));
    }
  }
  esc.estado = "aprobada";
  return Response.json({ escena: esc });
}
