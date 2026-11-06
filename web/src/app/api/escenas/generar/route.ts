import { contenido } from "@/lib/contenido";
import { generarEscena } from "@/lib/ia/generarEscena";
import { conIds } from "@/lib/ids";
import { estado, nuevoIdEscena } from "@/lib/store";

// La plantilla se toma del servidor por id (el cliente puede enviar campos editados).
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const requestId = body.requestId;
  const enviada = body.plantilla;
  const base = contenido.plantillas.find((p) => p.id === enviada?.id);
  if (!enviada || !base) return Response.json({ error: "plantilla desconocida", requestId }, { status: 400 });
  const plantilla = {
    ...base,
    ramoId: String(enviada.ramoId ?? base.ramoId),
    momento: String(enviada.momento ?? base.momento),
    tipo: enviada.tipo ?? base.tipo,
    situacion: String(enviada.situacion ?? base.situacion),
    sorprende: String(enviada.sorprende ?? base.sorprende),
    leVaBien: String(enviada.leVaBien ?? base.leVaBien),
    rolAutor: String(enviada.rolAutor ?? base.rolAutor),
  };
  const r = await generarEscena(plantilla);
  if ("fallback" in r && r.fallback) return Response.json({ ...r, requestId });
  const e = (r as Exclude<typeof r, { fallback: true }>).escena;
  const escena = { ...e, id: nuevoIdEscena(), opciones: conIds(e.opciones), estado: "borrador" as const };
  estado().escenas.set(escena.id, escena);
  return Response.json({ escena, requestId });
}
