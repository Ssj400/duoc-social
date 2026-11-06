# Pendientes para retomar

Actualizado el 6 de noviembre de 2026, al pausar la preparación porque el
participante debe salir. **Los materiales existen, pero no están todos cerrados
ni revisados por Claude por separado. No hay MVP implementado.**

## 1. Cerrar las revisiones recibidas

- **Plan técnico A:** recorte a P0 integrado en `17b8be6`; falta confirmación de
  cierre sobre esa versión. Un proceso Node, caso en memoria y cuatro handlers;
  mantener permisos, copia mínima y descarte de respuestas tardías.
- **Diagramas B:** Claude aprobó con correcciones sobre `f194b72`. Se inició la
  edición de `plan/tecnico/diagramas.json`, pero **no está terminada ni publicada**.
  Completar ramas sin permiso/menor y fallo/timeout; aclarar permisos en todas
  las etapas, nueva autorización y posición de etiquetas de estados. Revisar
  también copia autorizada, porcentajes y seguimiento ya modificados. Regenerar
  HTML/PDF y ejecutar pruebas antes de marcar B cerrado.
- **Aporte C:** recibido, todavía no integrado por completo. Derivar el P0 del
  guion de demo de 90 segundos, conservando también controles necesarios que no
  aparecen en pantalla. Ajustar hitos, responsables y recortes; no llamar al plan
  «acordado conjuntamente» antes de contrastarlo y revisarlo con el equipo.

### Revisión C recibida después de la pausa

Claude leyó únicamente `plan/preparacion/plan_desarrollo.md` de `b413c74`, no
su PDF ni otras piezas. Veredicto: buena estructura, todavía no consolidable
en esa versión. Parte del recorte ya está en `17b8be6`; no atribuirle revisión
o aprobación de esa versión posterior. Queda contrastar e integrar:

- C1–C4: comprobar que memoria/P0, API temprana, responsables 10:45–11:45 y
  construcción asistida declarada quedaron explícitos, sin garantizar tiempos.
- C5: vincular hitos 12:05, 12:30, 12:45/13:40, 14:05, 14:30 y 14:45 con pruebas
  concretas: navegación/ayuda, reglas, extracción con preguntas, permisos, copia
  mínima, edición que no altera copia, acuerdo/gestión/ayuda y arranque congelado.
- C6: si se difiere el test automatizado de retiro durante IA, **mantener la
  barrera y comprobarla manualmente**. No aceptar resultados tardíos ni trasladar
  garantías de un proceso a multiinstancia. Conservar la extracción; si falta
  tiempo, acotar la segunda llamada a redactar sobre opciones filtradas.
- C7: incorporar la escalera de respaldo completa, sin saltar directamente a
  maqueta ni presentar modo manual como IA funcionando.
- C8: preguntar en apertura si se permite crear proyecto vacío/dependencias
  durante Diseño. Si no, contar la instalación dentro del bloque técnico.

Las estimaciones de viabilidad con o sin asistente son propuestas del revisor,
no garantías. No compartir credenciales por mensajería. Esta revisión queda
registrada para retomar; no reanuda implementación ni cierra C.

## 2. Prioridades del aporte conjunto

1. Cerrar guion: relato coloquial, preguntas sobre datos faltantes, confirmación,
   cuenta, autorización y revisión humana.
2. Consolidar plan corto: API temprano según permisos; fichas/semilla/prompts
   entre 10:45–11:45; transparencia, checklist y modo de construcción.
3. Valorar una hoja de «preguntas difíciles», aprovechando respuestas existentes
   del guion, sin ampliar el producto.
4. Ajustar respaldo: app con IA → misma app manual rotulada → capturas de versión
   real congelada → maqueta explícita. Fijar frase y momento para cambiar, sin
   ocultar fallos ni suplantar el MVP exigido.
5. Mantener deck como propuesta editable del equipo, no presentación definitiva.

## 3. Revisiones separadas aún pendientes

- C: plan corto de desarrollo, después de integrar el aporte.
- D: brief del pitch.
- E: presentación PPTX/PDF y notas.
- F: guion y contingencia.
- G: transparencia y preparación del checklist.

Las solicitudes D–G se enviaron sobre `b413c74`; D y E ya tienen devolución y
correcciones pendientes. F–G siguen esperando devolución.
Registrar para cada pieza la versión realmente leída, correcciones y veredicto.
Una aprobación general no sustituye las revisiones individuales solicitadas.

### Revisión D recibida después de la pausa

Claude leyó `brief_pitch.md` y revisó el render del PDF de una página de
`b413c74/e0bfb6a`. Veredicto: correcto y honesto, pero incompleto; tres ajustes
pendientes, sin aprobar las otras piezas:

- D1: añadir evidencia breve del problema, contrastada con el informe: cifras
  SIES y testimonio chileno, distinguiendo observación de causalidad y segundo
  año de primer año. No convertir no matrícula en abandono definitivo.
- D2: explicitar alcance, posibles adoptantes y un piloto propuesto. Una carrera
  vespertina/cuatro semanas es propuesta, no acuerdo institucional. Extender a
  otras asignaturas o cuidadores requiere evaluación: no es cobertura actual
  ni flexibilización automática por Ley 21.790.
- D3: cierre más concreto ligado a Camila; conservar que dos asistencias más
  alcanzan el mínimo solo bajo los supuestos, sin garantizar aprobar y sin
  presentar el personaje ficticio como un caso real resuelto.
- Mejora menor: antes/después de IA con relato completo que sí declare días y
  hora. «Me cambiaron el turno de la pega» por sí solo no permite extraerlos;
  preguntar fecha e inicio ausentes. Las rutas son consultas condicionadas.

Revisar que siga siendo una página legible al integrar estos cambios. No se
ha modificado el brief durante la pausa ni se marca D cerrado.

### Revisión E recibida después de la pausa

Claude leyó `diapositivas.json` e inspeccionó el PDF de seis diapositivas de
`b413c74`. Además reportó render nativo del PPTX mediante LibreOffice Impress,
sin modificar el repo: sin desbordes/cortes, con diferencias cosméticas de
alineación y sombra. **No es prueba en PowerPoint/Google Slides ni render
ejecutado por esta sesión.** Confirmó 270 segundos previstos.

Veredicto: técnicamente limpio, narrativamente no listo. Registrar para retomar:

- E1: incorporar evidencia del problema en diapositiva 2. Cifras SIES con cohorte
  y fuente; son observacionales, no causales. Verificar literalidad del testimonio
  antes de usar comillas o rotular paráfrasis, aclarando que no era de primer año.
- E2: sustituir las cajas de texto de la diapositiva 3 por capturas reales de la
  versión congelada si existe, o diseños de paneles claramente rotulados.
  Conservar «maqueta/diseño, no funcional» cuando corresponda.
- E3: destacar el aporte concreto de IA, sin extraer días/horas de una frase
  que no los contiene. Usar relato completo o preguntas por lo ausente.
  Comparación con formulario pendiente hasta que haya medición; no completar
  ningún resultado de muestra como si se hubiera obtenido.
- E4: explicar alcance, posibles adoptantes y piloto como propuestas. Extensión
  a cuidadores/otras asignaturas requiere evaluación; no es cobertura implementada
  ni habilitación automática de derechos. Dos asistencias cumplen el mínimo
  del caso bajo sus supuestos, no garantizan aprobar.
- E5: reducir pies repetidos sin esconder rótulo de maqueta, carácter sintético
  ni límites esenciales. No presentar adopción o validación inexistentes.
- E6: separar notas en «DECIR» y «CUIDADO». Limitar lo hablado a unas 2,5 palabras
  por segundo de su tramo; ensayar de verdad antes de afirmar duración real.

No se modifica el deck durante la pausa ni se marca E cerrado. Queda actualizar
fuente JSON, regenerar ambos formatos y repetir revisión/pruebas tras corregir.

## 4. Antes de entregar al participante

- Comprobar coherencia entre plan explicado, P0 técnico, plan corto y pitch.
- Regenerar documentos afectados; repetir pruebas y revisión visual.
- Comprobar PPTX en PowerPoint/Google Slides y HTML en navegador cuando estén
  disponibles; esas pruebas nativas no están hechas aquí.
- Publicar cambios revisados y distinguir borradores de entregables cerrados.
- Entregar después de integrar correcciones, sin inventar resultados, validación
  institucional ni cumplimiento del checklist.

Mapa de archivos y estados: `plan/preparacion/estado.md`. Plan técnico vigente:
`plan/tecnico/plan_tecnico.md`. El diseño en `plan/tecnico/diseno_piloto.md` no
es alcance de la jornada. No iniciar implementación por esta lista.
