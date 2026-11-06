import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/shell";

// Sin fuentes de Google: el build no debe depender de la red del evento.
export const metadata: Metadata = {
  title: "educadex · Simulación de carrera · Demo",
  description: "Demo de hackathon con datos ficticios.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-600 text-base">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
