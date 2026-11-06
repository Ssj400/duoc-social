// TODO: ver diseno.md §5.5. Comprobar autorización activa en el servidor.
export const instant = false; // página dinámica: lee params en cada petición
export default async function Caso({ params }: PageProps<"/tutor/caso/[id]">) {
  const { id } = await params;
  return <h1 className="text-2xl font-bold">Tutor · caso {id} (pendiente)</h1>;
}
