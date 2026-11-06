// /ruta: vista «RUTA · Simulador académico» portada desde el prototipo de Figma Make.
// Datos: malla pública de Duoc (malla-detalle.json) + escenas APROBADAS de contenido.json.
// Solo llegan al estudiante plantillas cuya escena ya fue aprobada (ver diseno.md §5.1).
import detalle from "@/data/malla-detalle.json";
import { contenido } from "@/lib/contenido";
import { RutaCliente, type RamoRuta } from "./ruta-cliente";

type RamoDetalle = {
  id: string; codigo: string; nombre: string; semestre: number; categoria: string; linea?: string;
  horas: number; sct: number; formato: string; prerrequisitos: string[]; habilita: string[]; certificacion?: string;
};

export default function PaginaRuta() {
  const ramos = detalle.malla as RamoDetalle[];
  const nombre = (codigo: string) => ramos.find((r) => r.codigo === codigo)?.nombre ?? codigo;
  const aprobadas = contenido.escenas.filter((e) => e.estado === "aprobada");

  const datos: RamoRuta[] = ramos.map((r) => ({
    id: r.id,
    codigo: r.codigo,
    nombre: r.nombre,
    semestre: r.semestre,
    categoria: r.categoria,
    linea: r.linea ?? r.categoria,
    horas: r.horas,
    sct: r.sct,
    formato: r.formato,
    certificacion: r.certificacion,
    prerrequisitos: r.prerrequisitos.map((c) => ({ codigo: c, nombre: nombre(c) })),
    habilita: r.habilita.map((c) => ({ codigo: c, nombre: nombre(c) })),
    experiencias: aprobadas
      .filter((e) => e.ramoId === r.id)
      .flatMap((e) => {
        const p = contenido.plantillas.find((x) => x.id === e.plantillaId);
        return p
          ? [{ escenaId: e.id, momento: p.momento, tipo: p.tipo, situacion: p.situacion,
               sorprende: p.sorprende, leVaBien: p.leVaBien, rolAutor: p.rolAutor }]
          : [];
      }),
  }));

  return (
    <RutaCliente
      ramos={datos}
      carrera={detalle.carrera.nombre}
      fuente={detalle.carrera.fuente}
      consultada={detalle.carrera.consultada}
    />
  );
}
