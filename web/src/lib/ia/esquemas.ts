import { z } from "zod";

export const EscenaIA = z.object({
  titulo: z.string().min(1).max(90),
  narracion: z.string().min(1).max(500),
  opciones: z
    .array(z.object({ texto: z.string().min(1).max(120), loQueSuelePasar: z.string().min(1).max(300) }))
    .length(3),
  citas: z.array(z.string()).min(1),
});
export type EscenaIA = z.infer<typeof EscenaIA>;

export const BrechasIA = z.object({
  brechas: z
    .array(z.object({ escenaId: z.string(), texto: z.string().min(1).max(280), citas: z.array(z.string()).min(1) }))
    .max(3),
});
export type BrechasIA = z.infer<typeof BrechasIA>;
