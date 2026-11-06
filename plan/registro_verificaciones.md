# Verificaciones documentales · plan explicado

Fecha: 6 de noviembre de 2026. Alcance: nueva redacción para lectura del
participante; no implementación ni pruebas de una aplicación.

## Redacción y coherencia

- Subagente de lectura revisó el texto como participante ajeno a la coordinación:
  se entiende problema, caso, pantallas, IA, reparto, demo y decisiones pendientes.
- Se integraron sus cuatro observaciones: quién registra seguimiento; pausa real
  de almuerzo; permiso antes de IA distinto del permiso para compartir; inicio y
  duración del turno sintético que provoca las ocho ausencias.
- Se conserva 33/25/8, 22/33, condición del umbral, teoría/práctica separadas y
  diferencia entre hito de RI y cierre del denominador individual.
- No se incorporaron funciones nuevas: el documento explica la propuesta vigente.

## Compilación y controles

Comando ejecutado:

```bash
PYTHONPATH=/tmp/opencode/duoc-pdf-deps python plan/compilar_plan_explicado.py
```

La ruta de dependencias es local a este entorno. La instrucción portable con
entorno virtual está en `README.md`.

- PDF: doce páginas, doce marcadores, diez enlaces HTTPS y referencias [1]–[6].
- Texto: Unicode sin caracteres de reemplazo, presencia de caso, cifras y alcance.
- Formato: ningún bloque de contenido sale de márgenes; no hay páginas residuales.
- Revisión visual: mosaico completo y página inicial; tras añadir horarios,
  revisión ampliada de la página del cronograma.
- Se detectó una decimotercera página de veinte palabras al ampliar el cronograma.
  Se corrigió reduciendo repetición, no bajando tamaño de letra ni quitando permisos.
- Sintaxis de generadores, referencias locales del README/contexto y formato
  comprobados; `git diff --check` sin errores.
- Cronograma: 60 minutos antes de almuerzo y 75 después; 135 en total. El bloque
  de 25 minutos de IA ocupa 15 antes y 10 después de la pausa.

## Revisión externa de claridad y correcciones integradas

Claude leyó el texto completo y revisó el PDF de `40eed42` conforme al encargo
del participante: tono cercano, explicación completa, sin lenguaje interno para
agentes. Confirmó una mejora sustancial y pidió tres correcciones antes de entrega:

- Explicar la consecuencia de incumplir asistencia: RI aunque haya buenas notas,
  sujeta al requisito aplicable y a los supuestos confirmados del caso.
- Mostrar desde la primera página el contraste entre 88% actual y 66,7% proyectado.
- Quitar lenguaje de documento del mensaje de la aplicación y acortar salvedades.

Se integraron las tres. También se añadió conexión con la rúbrica, ejemplo
concreto de IA sin inferir datos ausentes, voz consistente, pregunta de
factibilidad, descripción del turno que cubre toda la clase y guía de lectura
breve. Nunca se afirma que dos asistencias garanticen aprobar.

Un revisor independiente volvió a leer el archivo corregido: sin bloqueos
documentales. PDF recompilado: conserva doce páginas y se revisó la primera
con el nuevo resumen. Queda la revisión personal del participante; no se
atribuyen pruebas funcionales del MVP ni resultados de impacto.
