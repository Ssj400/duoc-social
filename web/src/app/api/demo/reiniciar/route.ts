import { reiniciarDemo } from "@/lib/store";

export async function POST() {
  reiniciarDemo();
  return Response.json({ ok: true });
}
