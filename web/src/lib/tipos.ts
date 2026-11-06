// Tipos del MVP (ver ../../diseno.md §6). Todo dato de la demo es ficticio.

export type Fragmento = { id: string; tipo: "malla" | "plantilla"; texto: string; fuente: string };

export type TipoEscena = "clase" | "laboratorio" | "prueba" | "practica" | "equipo";

export type Ramo = {
  id: string; // "malla:<CODIGO>"
  codigo: string;
  nombre: string;
  semestre: number | null;
  categoria?: string;
  linea?: string | null;
  prerrequisitos: string[];
  descripcion: string | null; // pendiente: completar desde el detalle oficial
};

export type Plantilla = {
  id: string; // "plantilla:<n>"
  ramoId: string;
  momento: string; // p. ej. "3er sem · S6"
  tipo: TipoEscena;
  situacion: string;
  sorprende: string;
  leVaBien: string;
  rolAutor: string; // sin nombre real; en la demo, ficticio
};

export type Opcion = { id: string; texto: string; loQueSuelePasar: string; siguiente?: string };

export type Escena = {
  id: string;
  plantillaId: string;
  ramoId: string;
  momento: string;
  tipo: TipoEscena;
  titulo: string;
  narracion: string;
  opciones: Opcion[];
  citas: string[]; // ids de Fragmento
  estado: "borrador" | "aprobada";
};

export type Reaccion = "imaginaba" | "sorprendio" | "no_gusto";
export type Respuesta = { escenaId: string; opcionId: string; reaccion: Reaccion };

export type Brecha = {
  id: string;
  texto: string;
  escenaId: string;
  citas: string[];
  estado: "propuesta" | "confirmada" | "editada" | "descartada";
};

export type Motivo = "gusto" | "empleabilidad" | "presion" | "otro";

export type Paso = { plantilla: string; accion: string; responsable: string; fecha: string; nota?: string };

export type Caso = {
  id: string;
  alias: string;
  carrera: string;
  brechas: Brecha[]; // solo confirmadas/editadas
  motivos?: Motivo[]; // solo si el estudiante lo incluyó
  motivoOtro?: string;
  autorizacion: "activa" | "pausada" | "retirada";
  estado: "nuevo" | "gestion_iniciada" | "ayuda_recibida" | "no_aceptado";
  pasos: Paso[];
};

// Respuesta estándar cuando la IA falla, tarda o devuelve algo inválido.
export type Fallback = { fallback: true; motivo: "timeout" | "invalido" | "error" };

// Catálogo de exploración (ver ia.md, Llamada 3). Demo ficticia.
export type Etiqueta = { id: string; label: string; preguntas: number[] };
export type ItemCatalogo = { id: string; tipo: "escena" | "ramo" | "persona" | "recurso"; titulo: string; etiquetas: string[] };
export type Recomendado = { itemId: string; porQue: string; basadoEn: string[] };
export type RecomendadoUI = Recomendado & { titulo: string; tipo: ItemCatalogo["tipo"] };
