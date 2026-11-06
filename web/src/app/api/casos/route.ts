import { connection } from "next/server";
import { malla } from "@/lib/contenido";
import { casosVisiblesTutor, estado, nuevoIdCaso } from "@/lib/store";
import type { Brecha, Caso, Motivo } from "@/lib/tipos";

const MOTIVOS: Motivo[] = ["gusto", "empleabilidad", "presion", "otro"];

// Tutor: solo casos con autorización activa.
export async function GET() {
  await connection();
  return Response.json(casosVisiblesTutor());
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const brechas: Brecha[] = (Array.isArray(b.brechas) ? b.brechas : [])
    .filter((x: Brecha) => x && (x.estado === "confirmada" || x.estado === "editada") && x.texto?.trim())
    .map((x: Brecha) => ({ id: x.id, texto: String(x.texto).slice(0, 400), escenaId: x.escenaId, citas: x.citas ?? [], estado: x.estado }));
  if (!brechas.length) return Response.json({ error: "sin brechas confirmadas" }, { status: 400 });
  const caso: Caso = {
    id: nuevoIdCaso(),
    alias: "Estudiante A (ficticio)",
    carrera: malla.carrera.nombre,
    brechas,
    autorizacion: "activa",
    estado: "nuevo",
    pasos: [],
  };
  if (b.incluirMotivo === true) {
    caso.motivos = (Array.isArray(b.motivos) ? b.motivos : []).filter((m: Motivo) => MOTIVOS.includes(m));
    if (b.motivoOtro) caso.motivoOtro = String(b.motivoOtro).slice(0, 200);
  }
  estado().casos.set(caso.id, caso);
  return Response.json({ caso });
}
