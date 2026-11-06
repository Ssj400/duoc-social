# Contexto del proyecto

## Hackathon

- Hackathon de Inteligencia Artificial Aplicada, Congreso Social UC 2026,
  organizada por la Pontificia Universidad Católica de Chile y Duoc UC.
- Fecha del evento: viernes 6 de noviembre de 2026, de 08:30 a 18:45.
- Lugar: Duoc UC, sede San Joaquín, Av. Vicuña Mackenna 4917, Santiago.
- Tema general: IA al servicio de la dignidad humana. La tecnología debe asistir,
  no sustituir el criterio ni el vínculo humano.
- Equipos previstos: cinco integrantes interdisciplinarios UC/Duoc, asignados por
  la organización. Al preparar este contexto, los compañeros asignados al
  participante no habían confirmado contacto; podría existir una reubicación.
- Desafío asignado al participante: **2, prevención de la deserción en educación
  superior**, con foco en primer año.

## Requisitos y evaluación

El desafío pide una alerta temprana explicable, una acción de acompañamiento
académico o socioemocional y una propuesta de integración al trabajo de un tutor
o jefe de carrera. Debe evitar estigmatización y contemplar transparencia,
derecho a no ser perfilado, revisión de sesgos y decisión humana explícita.

Ponderaciones oficiales:

| Criterio | Peso |
| --- | ---: |
| Comprensión del problema y del usuario | 10% |
| Uso pertinente de IA | 15% |
| Factibilidad técnica y calidad del prototipo | 15% |
| Ética, privacidad y mitigación de sesgos | 25% |
| Impacto y escalabilidad | 25% |
| Calidad del pitch | 10% |

- Entregables: MVP funcional con aporte real de IA, pitch con demo, declaración
  de modelos y herramientas utilizados y checklist ético oficial.
- El checklist completo y validado en **dos checkpoints antes de las 14:45** es
  condición de admisibilidad. El informe del proyecto no lo sustituye.
- Se prevén al menos dos mentorías por equipo; no confundirlas con checkpoints.
- Freeze técnico: **14:45**. Los cambios posteriores no son considerados.
- Pitch: **5 minutos incluyendo demo y 3 minutos de preguntas**, presentado por
  uno o dos integrantes. Habrá al menos una pregunta sobre riesgos éticos.
- Desarrollo, integración y ajustes tienen 135 minutos asignados: 11:45–12:45,
  13:30–14:15 y 14:15–14:45. Almuerzo: 12:45–13:30.
- La rúbrica detallada, el checklist y las aclaraciones oficiales pueden precisar
  estas bases. No se ha confirmado cuánto desarrollo previo permite el evento.

## Propuesta vigente para revisión: Puente v0.3

Nombre de trabajo sin verificación de marca. **Todavía no es un producto
implementado ni una solución validada o aprobada por las instituciones.**

La propuesta vigente está en `plan/revision_propuesta_v0.3.md` y el brief v0.3;
v0.1 y v0.2 son antecedentes históricos, no el alcance actual de implementación.
Pendiente de aprobación del participante y acuerdo con el equipo.
`plan/plan_explicado.md` y `plan/Puente_plan_explicado.pdf` presentan esa misma
propuesta en lenguaje cercano, con caso, recorrido, alcance y ejecución para
lectura del participante/equipo. Su revisión de claridad no amplía funcionalidades.
`plan/tecnico/plan_tecnico.md`, `plan/Plan_tecnico_Puente.pdf` y
`plan/tecnico/diagramas.html` detallan paneles, servidor, dos llamadas de IA,
datos, permisos, API, pruebas y despliegue propuestos. Son documentación
separada para revisión, no implementación ni endpoints operativos.
Tras revisión técnica A, el P0 propuesto usa un único proceso Node y un caso
en memoria, sin SQLite ni API REST pública: pueden perderse datos al reiniciar.
Cuatro handlers internos con peticiones independientes permiten retirar permiso
mientras espera IA; no se usa una cola de Server Actions para ese trayecto.
`plan/tecnico/diseno_piloto.md` conserva el diseño ampliado, no exigible en 135
minutos. La barrera de permisos, copia autorizada y descarte IA tardío se mantiene;
la comprobación/escritura síncrona solo se justifica dentro de ese proceso único.
`plan/preparacion/` contiene plan corto de desarrollo, brief de pitch,
presentación provisional editable/PDF, guion de respaldo, hoja de preguntas
difíciles del jurado y plantilla de transparencia. Son borradores revisados
localmente el 6/11, sin nueva lectura de Claude: el deck identifica una maqueta y
no acredita MVP, resultados de impacto ni checklist oficial validado.

Hipótesis: ante un nuevo turno laboral, proyectar de forma condicional el efecto
de las ausencias futuras sobre el mínimo exigido permite explorar apoyo antes
de que se materialice el incumplimiento. No es una predicción validada de
abandono ni una declaración anticipada de RI.

Recorrido propuesto:

1. Chequeo universal voluntario por canal institucional propuesto; demo simula
   el enlace. No responder no genera etiqueta ni caso; hay alternativa humana.
2. Con permiso previo para IA externa, el modelo propone restricciones; el
   estudiante confirma horario, asistencia registrada, calendario y requisitos.
3. Reglas deterministas proyectan asistencia condicional frente al art. 30:
   porcentaje específico o 70%, teoría/práctica por separado, exclusiones y
   supuestos visibles. El hito de estado de RI no acredita por sí solo la fecha
   de cierre ni el denominador; si faltan datos, preguntar o abstenerse.
4. La IA propone artículos de corpus oficial precargado (Res. 07/2026: arts. 30,
   33–34, 47–48, 81–82), con cita y condiciones; un validador rechaza IDs ajenos.
   Se distinguen consulta actual y próximo período, plazos cerrados y pendientes;
   no se inventan cupos, beneficios ni autorizaciones.
5. El estudiante autoriza qué resumen compartir y con quién. El tutor revisa,
   corrige y acuerda un siguiente paso con responsable y fecha.
6. Se distingue gestión iniciada de ayuda efectivamente recibida, con seguimiento
   y posibilidad de rechazo, pausa, cambio o retiro de autorización.

Alcance de MVP: tres vistas mínimas —estudiante, tutor y seguimiento—, un tipo de
cambio, una unidad de referencia y casos sintéticos. Arquitectura propuesta,
no decidida definitivamente: monolito Next.js/TypeScript, adaptador de LLM,
motor de reglas y persistencia mínima.

No se contemplan en el MVP integraciones reales con sistemas académicos,
WhatsApp, correo, decisiones administrativas automáticas, diagnósticos ni
probabilidades individuales de deserción. Un selector de roles de demo no es
autenticación ni autorización de producción.

Se verificó el reglamento 2026 enlazado desde Duoc (art. 81–82) y el proceso
publicado de cambio de jornada, que inicia el 28/12/2026 para 2027, no como
solución inmediata en noviembre. También una vía oficial de apoyo psicológico
para estudiantes regulares mayores de 18 años. Calendario presencial: retiro
ordinario cerró 12/9; nota pendiente 9/11–21/12. Caso de demo simulado al 10/11,
sin aprobación automática ni equivalencia entre postergar nota y dispensar
asistencia. Para menores: orientación humana/sin IA externa; protocolo específico
pendiente. Fuentes, roles reales y compromisos simulados se distinguen en v0.3.
El caso al inicio del 10/11 usa 33 sesiones teóricas sintéticas:
25 previas, 22 asistidas y 8 futuras con choque total de turno; proyección
22/33. Dos asistencias más superan el umbral supuesto del 70%, sin garantizar
aprobación. El 5/12 es el hito oficial de estado de RI, no prueba del cierre del
denominador; confirmar actividades posteriores/exámenes para todo caso real.
El catálogo operativo, cupos y responsables individuales **siguen sin verificarse**.
Si se usan fichas ficticias, deben identificarse claramente como demo, sin
atribuirlas a UC o Duoc. El aporte del LLM debe compararse con formulario y
reglas; no se justifica por producir textos más largos.

## Investigación y límites relevantes

- SIES, informe de agosto de 2026, cohorte 2025: retención 77,9%, persistencia
  total en educación superior 84,5% y no matrícula al año siguiente 15,5%.
  No retención no equivale a abandono definitivo; puede haber traslado o reingreso.
- Retención diurna 82,9% y vespertina 70,2%. Son diferencias observacionales,
  no prueba de causalidad ni fundamento para etiquetar personas por jornada.
- Un estudio chileno de 2024 examinó 78 exestudiantes en 18 grupos focales;
  describe conciliación familia–trabajo–estudio y fricciones administrativas.
  Su contexto estuvo marcado por pandemia. Los testimonios más ilustrativos de
  gestiones sin respuesta son de segundo y tercer año o más, no de primero.
- UC y Duoc ya han documentado alertas, apoyos y seguimiento. Esa combinación
  no basta como novedad; no se ha auditado todo lo que ofrecen actualmente.
- MAAPS no tuvo efectos estadísticamente significativos globales en graduación
  o persistencia a seis años en su muestra de 11 universidades estadounidenses.
  Georgia State tuvo resultados favorables de graduación; no extrapolarlos a
  retención de primer año en Chile ni atribuirlos aisladamente al algoritmo.
- No hay entrevistas, pruebas de producto, piloto ni resultados propios todavía.
  No afirmar originalidad absoluta, precisión o reducción demostrada del abandono.
- El objetivo no es retener a cualquier costo: una pausa o cambio informado
  puede ser un resultado adecuado para la persona.

Las referencias completas, sus localizadores y límites están en el informe.

## Materiales y estado del repositorio

- Bases oficiales: `material_preparacion/Bases_Hackathon_IA_Congreso_Social_UC_2026-1.pdf`.
- Informe de investigación y propuesta v0.1, 28 páginas:
  `plan/Investigacion_y_plan_Puente_v0.1.pdf`.
- Fuente editable: `plan/investigacion_y_propuesta.md`.
- Generador: `plan/compilar_pdf.py`; dependencias: `plan/requirements.txt`.
- Instrucciones para regenerar: `README.md`. El PDF incluye investigación antes
  de la propuesta y bibliografía final con ocho fuentes.
- Repositorio privado: `https://github.com/Ssj400/duoc-social`, rama `main`.
- El video complementario local no se ha analizado ni se usa como evidencia.
  No está versionado; tampoco los metadatos de Windows ni configuraciones locales.
- Estado al redactar: documentación y planificación; no hay aplicación construida.

## Pendientes antes de implementar

Confirmar equipo y reglas de preparación previa; recibir rúbrica/checklist;
contrastar una situación concreta de primer año; verificar un procedimiento y
su responsable; confirmar con mentor que la alerta de incompatibilidad cumple
el desafío; comprobar cuentas de IA y capacidad real de acompañamiento.

Actualización reportada por el participante vía intermediario el 6/11: solo
recibió las bases, sin rúbrica detallada ni checklist aparte; adaptar a las
aclaraciones que entregue la organización. Antivirus resuelto por él.
Centro de Ayuda fue leído con acceso automatizado público el 6/11; el participante
reportó además confirmación humana de ambas páginas en navegador el 6/11 ~00:20
(-03). Tabla de procedencia en revisión v0.3; no equivale a cupo, aprobación de
trámite ni protocolo institucional validado. Propuestas de
acceso permanente a recursos de crisis, pausa de flujo automático y enlace a
agenda sin transmisión de datos se documentan en v0.3; no están implementadas.
