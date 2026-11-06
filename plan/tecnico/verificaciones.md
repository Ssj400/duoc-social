# Verificaciones del plan técnico

6 de noviembre de 2026 · diseño documental, no producto implementado.

## Revisión interna

Tres subagentes analizaron por separado paneles, backend/contratos y pruebas/
despliegue. Un revisor adicional leyó el plan integrado y señaló cuatro vacíos:
atomicidad frente a revocación, sustitución de copias autorizadas, ID necesario
para navegar desde bandeja y contrato de transiciones de seguimiento.

Los cuatro se precisaron en el documento antes de enviarlo a revisión externa.
No se amplió a integraciones, datos reales ni decisiones administrativas.

## Verificaciones ejecutadas

```bash
PYTHONPATH=/tmp/opencode/duoc-pdf-deps python plan/compilar_plan_tecnico.py
PYTHONPATH=/tmp/opencode/duoc-pdf-deps python plan/tecnico/test_documentos.py
```

Nueve tests documentales aprobados, sin omisiones:

1. Los seis diagramas referenciados existen y no se duplican.
2. Flechas nombradas y dentro de sus límites.
3. Sintaxis del generador Python.
4. Controles HTML siguiente/anterior/restablecer con DOM simulado en Node.
5. HTML sin recursos externos, SVG válido, IDs únicos y reducción de movimiento.
6. Dos ejemplos JSON válidos.
7. Texto de nodos dentro de sus cajas.
8. PDF: páginas/capítulos/marcadores, contenido, Unicode y márgenes.
9. Aritmética del caso y cronograma 60+75.

El plan ocupa 24 páginas: incluye seis diagramas vectoriales y un anexo de
seguimiento. Se revisó visualmente un mosaico completo de la primera compilación;
se corrigieron textos ajustados de nodos y se añadieron precisiones de contrato.
`git diff --check` se usa antes de publicar.

No hay Chromium, Firefox, Safari ni LibreOffice disponibles en este entorno.
El test de controles no sustituye navegación real ni valida render en todos
los navegadores. El documento estático sigue visible sin JavaScript.

## Revisión externa A y recorte de alcance

Claude leyó el Markdown técnico de `f194b72`, no su PDF, diagramas o tests.
La separación de reglas/IA y permisos fue considerada sólida, pero señaló cinco
bloqueos de factibilidad: exceso P0, verificación tardía de API, ejemplo de
extracción demasiado completo, declaración/estrategia de código no calendarizada
y contenido sin responsables. No es aprobación de las otras piezas.

Se conserva el diseño anterior en `diseno_piloto.md`. El P0 vigente usa memoria
en un único proceso Node, sin SQLite ni REST público; seis acciones de seguimiento,
un contador y ocho pruebas funcionales propuestas más recorrido manual. Mantiene
permisos, copia profunda y comprobación/escritura síncrona tras la respuesta IA.
Esto no se extrapola a varios procesos o reinicios.

Se añadió prueba de API temprano y al primer bloque, borradores de dos prompts,
salida estructurada, relato con omisiones, filtrado previo de fichas, franja de
edad, responsables de contenido 10:45–11:45 y transparencia con cierre antes del
freeze. El plan corto recoge esas prioridades, pendiente de revisión C conjunta.

La nueva fuente técnica genera 17 páginas con seis diagramas actualizados; el
documento ampliado anterior queda como referencia de piloto, no fuente del PDF
vigente. Se actualizan los tests documentales al nuevo alcance: no se confunden
con las ocho pruebas del producto todavía por implementar.

Los diagramas requieren veredicto B separado. Sigue pendiente confirmación de
cierre A sobre el recorte y revisión de su render; no se atribuyen aprobaciones
de archivos que el crítico no inspeccionó.

Una revisión interna adicional advirtió que el cliente puede encolar Server
Actions y demorar un retiro detrás de una llamada IA larga. Se eligió la otra
alternativa mínima admitida por A: cuatro Route Handlers con `fetch` separados.
Se exige probar retiro/reotorgamiento durante respuesta lenta. Es un requisito
del diseño, no una carrera ya reproducida ni una garantía funcional implementada.
