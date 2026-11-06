// Datos semilla. malla.json: malla pública de Duoc (ver campo carrera.fuente).
// contenido.json: plantillas y escenas FICTICIAS de la demo.
import mallaJson from "@/data/malla.json";
import contenidoJson from "@/data/contenido.json";
import type { Escena, Plantilla, Ramo } from "./tipos";

export const malla = mallaJson as {
  carrera: { nombre: string; institucion: string; fuente: string; consultada: string; nota: string };
  malla: Ramo[];
};

export const contenido = contenidoJson as { plantillas: Plantilla[]; escenas: Escena[] };

export const ramoPorId = (id: string) => malla.malla.find((r) => r.id === id);
