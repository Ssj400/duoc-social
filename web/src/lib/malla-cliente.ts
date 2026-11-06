// Versión cliente de la malla (solo datos públicos). No usar server-only aquí.
import mallaJson from "@/data/malla.json";
import type { Ramo } from "./tipos";
export const malla = (mallaJson as { malla: Ramo[] }).malla;
