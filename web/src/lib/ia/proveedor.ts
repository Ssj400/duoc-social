// TODO equipo IA: reemplazar pedirJSON por @anthropic-ai/sdk (ver ia.md)
import "server-only";
import { pedirJSON } from "@/lib/llm";
import { ramoPorId } from "@/lib/contenido";
import type { Fragmento, Plantilla, Reaccion } from "@/lib/tipos";
import { fraseSorprende } from "./respaldos";
import { PROMPT_BRECHAS, PROMPT_ESCENA } from "./prompts";

export type EntradaEscena = { plantilla: Plantilla; fragmentos: Pick<Fragmento, "id" | "texto">[] };
export type EscenaParaBrecha = {
  id: string;
  titulo: string;
  narracion: string;
  citas: string[];
  sorprende: string;
  reaccion?: Reaccion;
};
export type EntradaBrechas = {
  escenas: EscenaParaBrecha[];
  respuestas: { escenaId: string; opcionId: string; reaccion: Reaccion }[];
  comentario?: string;
};

const MENORES = ["de", "del", "la", "en", "y", "a", "e"];
const nombreRamo = (id: string) =>
  (ramoPorId(id)?.nombre ?? "")
    .split(" ")
    .map((w, i) => (/^[IVX]+$/.test(w) ? w : MENORES.includes(w.toLowerCase()) && i > 0 ? w.toLowerCase() : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(" ");

const semana = (momento: string) => {
  const m = momento.match(/S(\d+)/);
  return m ? `Semana ${m[1]}` : "Semana 6";
};

export function generarEscenaIA(input: EntradaEscena): Promise<unknown> {
  const p = input.plantilla;
  const ramo = nombreRamo(p.ramoId);
  return pedirJSON(
    [
      { role: "system", content: PROMPT_ESCENA },
      { role: "user", content: JSON.stringify(input) },
    ],
    () => ({
      titulo: `3er semestre · ${semana(p.momento)} · ${ramo}`.slice(0, 90),
      narracion: `${p.situacion} ¿Qué haces?`.slice(0, 500),
      opciones: [
        { texto: "Lo intento por mi cuenta y pruebo", loQueSuelePasar: "Avanzas lento al principio, pero es lo que más se usa en este ramo." },
        { texto: "Pregunto al profe o a un ayudante", loQueSuelePasar: "Te orientan, aunque igual tendrás que practicar por tu cuenta." },
        { texto: "Espero a que otro del grupo lo resuelva", loQueSuelePasar: "El grupo avanza, pero llegas a la evaluación sin haberlo practicado." },
      ],
      citas: [p.ramoId, p.id],
    }),
  );
}

export function proponerBrechasIA(input: EntradaBrechas): Promise<unknown> {
  return pedirJSON(
    [
      { role: "system", content: PROMPT_BRECHAS },
      { role: "user", content: JSON.stringify(input) },
    ],
    () => ({
      brechas: input.escenas.slice(0, 3).map((e) => ({
        escenaId: e.id,
        texto: input.comentario?.trim()
          ? `Esperabas: «${input.comentario.trim().slice(0, 120)}». En 3er semestre, ${fraseSorprende(e.sorprende)}`.slice(0, 280)
          : `Te sorprendió que ${fraseSorprende(e.sorprende)}`.slice(0, 280),
        citas: e.citas,
      })),
    }),
  );
}
