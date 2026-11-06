import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

// Sin fuentes de Google: el build no debe depender de la red del evento.
export const metadata: Metadata = {
  title: "Simulación de carrera · Demo",
  description: "Demo de hackathon con datos ficticios.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900 text-lg">
        <div className="bg-amber-200 text-amber-950 text-sm px-4 py-1 flex justify-between">
          <span>DEMO · datos ficticios · selector de rol sin autenticación</span>
          <Link href="/" className="underline">Cambiar rol</Link>
        </div>
        <main className="flex-1 w-full max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
