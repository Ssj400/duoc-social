// Íconos de trazo (24×24) usados por /ruta. Inline para no sumar dependencias.
import type { ReactNode, SVGProps } from "react";

const base = (hijos: ReactNode) =>
  function Icono(props: SVGProps<SVGSVGElement>) {
    return (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
        {hijos}
      </svg>
    );
  };

export const Brujula = base(<><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-1.8 5.41a2 2 0 0 1-1.27 1.27L7.76 16.24l1.8-5.41a2 2 0 0 1 1.27-1.27z" /></>);
export const Persona = base(<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>);
export const Flecha = base(<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>);
export const Chevron = base(<path d="m9 18 6-6-6-6" />);
export const Cerrar = base(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>);
export const Reloj = base(<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>);
export const Libro = base(<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />);
export const Codigo = base(<><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></>);
export const BaseDatos = base(<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></>);
export const Capas = base(<><path d="m12 2 10 5-10 5L2 7z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></>);
export const Maletin = base(<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>);
export const Destello = base(<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z" />);
export const Jugar = base(<path d="M6 3l14 9-14 9z" />);
export const Mensaje = base(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />);
export const Menu = base(<><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>);
