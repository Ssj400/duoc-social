import { casosVisiblesTutor } from "@/lib/store";

// Tutor: solo casos con autorización activa.
export async function GET() {
  return Response.json(casosVisiblesTutor());
}

// TODO: POST crear caso desde el resumen confirmado y lo que el estudiante eligió incluir.
export async function POST() {
  return Response.json({ error: "pendiente" }, { status: 501 });
}
