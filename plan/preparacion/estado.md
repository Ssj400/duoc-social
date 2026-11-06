# Estado de las piezas y su revisión

Objetivo: dejar decisiones y materiales preparados, sin adelantar una
implementación no encargada ni atribuir resultados todavía inexistentes.

## Cierre local del 6 de noviembre de 2026

Ese día no hubo revisión nueva de Claude: las correcciones pendientes se hicieron
con revisión local (esta sesión y subagentes de solo lectura) y con las pruebas
documentales. **Eso no equivale a una validación externa de la versión corregida**;
tampoco a validación institucional ni a cumplimiento del checklist oficial.

## Entregables y estado

| Pieza | Qué debe resolver | Estado |
| --- | --- | --- |
| Plan explicado | Entender idea, recorrido, alcance y demo sin jerga | Revisado por Claude; correcciones de claridad integradas |
| Plan técnico (A) | Paneles, datos, permisos, IA, reglas y despliegue P0 | Correcciones de A integradas; P0 en memoria con cuatro Route Handlers; cierre local conforme a lo revisado, sin nueva lectura externa |
| Diagramas (B) | Ubicación de componentes, pantallas y flujos | Correcciones B1–B8 integradas y regeneradas; PDF y HTML verificados visualmente y con pruebas |
| Plan de desarrollo corto (C) | Orden, responsables propuestos, pruebas y recortes | Reescrito según C1–C8 y el guion de 90 s; sigue siendo propuesta para el equipo |
| Brief para pitch (D) | Mensaje central y resumen de presentación | D1–D3 integradas; una página verificada |
| Presentación provisional (E) | Diapositivas editables y PDF de respaldo | E1–E6 integradas en fuente JSON, PPTX y PDF; rótulo de maqueta conservado |
| Guion y contingencia de demo (F) | Tiempo, fallos y afirmaciones permitidas | F1–F5 integradas; escalera de cinco peldaños y regla de ocho segundos |
| Preguntas difíciles | Respuestas breves para la ronda del jurado | Nueva pieza breve (dos páginas en PDF), sin resultados inventados |
| Transparencia y preparación ética (G) | Distinguir herramientas, producto y validación oficial | Plantilla provisional revisada localmente; no es checklist oficial |

La aprobación de una pieza no aprueba las otras. Ningún cierre documental
acredita validación institucional, adopción o permiso para usar datos reales.

## Límites de la preparación

- La aplicación sigue sin construirse. La próxima decisión personal es alcance y
  factibilidad, junto con el equipo y las reglas del evento.
- El pitch debe identificar datos sintéticos y usar resultados solo si fueron
  medidos. Una maqueta no es un MVP.
- La presentación de respaldo no debe ocultar una función fallida.
- La preparación no presupone autorización del evento para desarrollo previo.
- El tono cercano del plan explicado se mantiene; no reemplaza la lectura técnica.

## Verificación reproducible

- `PYTHONPATH=/tmp/opencode/duoc-pdf-deps python plan/compilar_plan_tecnico.py`
- `PYTHONPATH=/tmp/opencode/duoc-pdf-deps:/tmp/opencode/duoc-pitch-deps python plan/compilar_pitch.py`
- `python plan/tecnico/test_documentos.py` (9 pruebas)
- `python plan/preparacion/test_materiales.py` (9 pruebas, incluye duración de
  notas habladas y una página de brief)

El render nativo del PPTX en PowerPoint o Google Slides sigue sin hacerse aquí.
