import { contenido, ramoPorId } from "@/lib/contenido";
import { conIds } from "@/lib/ids";
import { estado, nuevoIdEscena } from "@/lib/store";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const p = contenido.plantillas.find((x) => x.id === b.plantilla?.id);
  const ops = Array.isArray(b.opciones) ? b.opciones : [];
  const validas = ops.filter((o: { texto?: string; loQueSuelePasar?: string }) => o?.texto?.trim() && o?.loQueSuelePasar?.trim());
  if (!p || !ramoPorId(p.ramoId) || !b.titulo?.trim() || !b.narracion?.trim() || validas.length !== 3)
    return Response.json({ error: "datos incompletos: título, narración y 3 opciones" }, { status: 400 });
  const escena = {
    id: nuevoIdEscena(),
    plantillaId: p.id,
    ramoId: p.ramoId,
    momento: String(b.plantilla.momento ?? p.momento),
    tipo: b.plantilla.tipo ?? p.tipo,
    titulo: String(b.titulo).trim(),
    narracion: String(b.narracion).trim(),
    opciones: conIds(validas.map((o: { texto: string; loQueSuelePasar: string }) => ({ texto: o.texto.trim(), loQueSuelePasar: o.loQueSuelePasar.trim() }))),
    citas: [p.ramoId, p.id],
    estado: "aprobada" as const,
  };
  estado().escenas.set(escena.id, escena);
  return Response.json({ escena });
}
