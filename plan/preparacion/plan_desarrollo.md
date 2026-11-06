# Puente · plan corto de desarrollo

Borrador para contrastar con Claude y después acordar con el participante/equipo.
No es una asignación ya aceptada ni autorización para empezar a programar.

## Un objetivo, no una lista interminable de funciones

Al cierre técnico debe poder recorrerse un caso sintético: estudiante cuenta y
confirma → cuenta de asistencia → opciones con fuentes → resumen autorizado →
tutor revisa → paso aceptado → seguimiento. Una alternativa descartada y un
fallo de IA controlado completan la demostración. Sin integraciones externas.

Decisión propuesta tras revisión A: web Next.js/TypeScript, un proceso Node y
caso en memoria, sin base de datos ni API REST pública en P0;
dos llamadas IA explícitas, reglas fijas y textos oficiales pequeños. Un caso,
un destinatario, tres vistas. Nada de chat abierto, panel de indicadores o app nativa.

## Orden de construcción y comprobación

| Bloque | Construir | Comprobar antes de seguir |
| --- | --- | --- |
| 11:45–12:05, 20 min | Prueba de humo API del modelo, caso en memoria y esqueleto | Una llamada sintética válida o bloqueo explícito; navegación básica |
| 12:05–12:30, 25 min | Confirmación y reglas de asistencia | 33/25/8; 22/33; mínimo 24; umbral exacto y datos faltantes |
| 12:30–12:45 y 13:30–13:40, 25 min | Integrar permisos, prompts, dos operaciones y fuentes | Sin permiso no hay llamada; error/JSON inválido no publican resultado |
| 13:40–14:05, 25 min | Resumen autorizado y revisión tutor | Solo copia autorizada; edición/retiro no comparten datos nuevos |
| 14:05–14:30, 25 min | Acuerdo, seguimiento y pruebas integradas | Responsable/fecha, aceptación; envío no cuenta como ayuda |
| 14:30–14:45, 15 min | Corrección crítica, transparencia final y freeze | Arranque reproducible, herramientas reales y límites registrados |

Son 60 minutos antes y 75 después del almuerzo; no contamos la pausa como trabajo.
El detalle de contratos y tests está en el plan técnico; este es el mapa para
saber qué hacer primero y qué evidencia revisar.

## Qué debe estar decidido antes del bloque técnico

Equipo y reglas de preparación previa; **API real**, no solo suscripción de chat,
y conectividad comprobadas con una llamada permitida temprano; alcance aceptado
con mentor; catálogo revisado y escenario sintético; responsable/suplente del
checklist y sus dos validaciones oficiales antes de 14:45. No comenzar por
construir una interfaz vistosa mientras estos puntos quedan olvidados.

Entre 10:45–11:45: rol B prepara fichas; D, semilla y cuentas esperadas; A+B,
prompts/esquemas. E registra herramientas desde el inicio. A integra código,
con asistencia autorizada si procede, y debe poder explicar lo construido.

# Hitos, reparto y recortes

## Hitos que permiten decidir, no solo mirar el reloj

- **12:45:** caso navegable, datos confirmables y cuentas correctas. La llamada
  IA está en integración; si no hay credencial, registrar bloqueo y conservar
  formulario. No fingir que un ejemplo prefijado es IA funcional.
- **14:05:** permiso de compartir y revisión del tutor funcionan. Si no, quitar
  estética y variantes; no sumar una función para distraer del problema.
- **14:30:** detener funciones nuevas. Corregir permisos, cifras y fuentes;
  ensayar lo que realmente existe. Lo que falta se declara.
- **14:45:** versión congelada y checklist completo según organización. Preparar
  pitch sobre esa versión, no sobre funciones añadidas después.

## Reparto propuesto para cinco integrantes

| Rol | Trabajo mientras se desarrolla | Salida útil |
| --- | --- | --- |
| Integración técnica | Aplicación, reglas, IA, almacenamiento | Un recorrido completo en vez de piezas aisladas |
| Procedimientos y fuentes | Revisar condiciones, fechas y responsables | Opciones reales con límites claros |
| Problema y ética | Contrastar caso, mentorías, checklist | Necesidad de primer año y correcciones registradas |
| Pruebas y experiencia | Ejecutar casos y observar comprensión | Lista de fallos y prioridades, no solo opinión estética |
| Pitch y operación | Historia, ensayo, respaldo y declaración IA | Presentación ajustada a lo que funciona |

Son funciones, no personas asignadas. Si hay más desarrollo disponible, repartir
componentes dentro del mismo proyecto y acordar integración; no crear varios
productos. Las sesiones IA no reciben permiso para editar el repo por esta tabla.

## Qué cortar y qué no

Primero salen filtros, gráficos, historial visual y más casos/rutas. Mantener
un solo destinatario y una secuencia clara. No recortar permiso para IA externa,
autorización para compartir, revisión humana, cálculo correcto ni abstención.

Demo local en un proceso con memoria: un reinicio puede perder el caso y se
recarga la semilla. SQLite/REST/concurrencia ampliada quedan para piloto, no
se añaden a última hora. Si el modelo falla, modo manual identificado; no equivale
a cumplir la meta de IA real. Si no se llega al MVP, usar la maqueta provisional
con esa etiqueta y asumir la limitación frente a las bases.

Antes de aprobar: ¿el desarrollador/equipo ve viable este recorrido desde cero
en 135 minutos? ¿Qué bloque exige una prueba previa autorizada? La revisión
conjunta debe ajustar estas estimaciones, no convertirlas en promesas.
