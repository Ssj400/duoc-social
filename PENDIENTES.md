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

Las solicitudes D–G se enviaron sobre `b413c74`; no ha llegado su devolución.
Registrar para cada pieza la versión realmente leída, correcciones y veredicto.
Una aprobación general no sustituye las revisiones individuales solicitadas.

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
