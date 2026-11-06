import { contenido } from "@/lib/contenido";

export async function GET() {
  return Response.json(contenido.plantillas);
}
