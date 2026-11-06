import { connection } from "next/server";
import { estado } from "@/lib/store";

type Ctx = { params: Promise<{ id: string }> };

// Se re-comprueba la autorización en cada lectura del tutor.
export async function GET(_: Request, { params }: Ctx) {
  await connection();
  const { id } = await params;
  const c = estado().casos.get(id);
  if (!c || c.autorizacion !== "activa") return Response.json({ error: "no disponible" }, { status: 404 });
  return Response.json({ caso: c });
}

// Tutor: paso/estado (solo si activa). Estudiante: autorizacion (retirada es final).
export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  const c = estado().casos.get(id);
  if (!c) return Response.json({ error: "no existe" }, { status: 404 });
  const b = await req.json().catch(() => ({}));
  if (b.autorizacion !== undefined) {
    if (!["activa", "pausada", "retirada"].includes(b.autorizacion)) return Response.json({ error: "valor inválido" }, { status: 400 });
    if (c.autorizacion === "retirada") return Response.json({ error: "la autorización retirada es final" }, { status: 409 });
    c.autorizacion = b.autorizacion;
    return Response.json({ autorizacion: c.autorizacion, estado: c.estado });
  }
  if (c.autorizacion !== "activa") return Response.json({ error: "no disponible" }, { status: 404 });
  if (b.paso) {
    const p = b.paso;
    if (!p.accion?.trim() || !p.responsable?.trim() || !p.fecha?.trim()) return Response.json({ error: "paso incompleto" }, { status: 400 });
    c.pasos.push({ plantilla: String(p.plantilla ?? "otra"), accion: String(p.accion), responsable: String(p.responsable), fecha: String(p.fecha), ...(p.nota ? { nota: String(p.nota) } : {}) });
    c.estado = "gestion_iniciada";
  } else if (b.estado === "ayuda_recibida" || b.estado === "no_aceptado") {
    c.estado = b.estado;
  } else return Response.json({ error: "nada que actualizar" }, { status: 400 });
  return Response.json({ caso: c });
}
