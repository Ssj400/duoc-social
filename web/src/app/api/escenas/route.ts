import { connection } from "next/server";
import { estado } from "@/lib/store";

// Solo escenas aprobadas llegan al estudiante. connection(): leer el estado en cada petición.
export async function GET() {
  await connection();
  return Response.json([...estado().escenas.values()].filter((e) => e.estado === "aprobada"));
}
