import CasoCliente from "./caso-cliente";

export const instant = false; // página dinámica: lee params en cada petición
export default async function Caso({ params }: PageProps<"/tutor/caso/[id]">) {
  const { id } = await params;
  return <CasoCliente id={id} />;
}
