# Puente · plan corto de desarrollo

Propuesta para contrastar con el equipo en la apertura del evento. No es una
asignación aceptada ni autorización para empezar a programar. Revisión local del
6/11, sin una nueva lectura de Claude: los tiempos son estimaciones, no promesas.

## El P0 sale del guion de 90 segundos

Al cierre técnico debe poder recorrerse exactamente lo que se muestra en la demo:
la estudiante cuenta el cambio en lenguaje coloquial → la IA pregunta lo que
falta → ella confirma → reglas calculan → opciones con fuente y pendientes →
autoriza una copia mínima → el tutor corrige y acuerdan paso, rol y fecha →
seguimiento distingue gestión de ayuda recibida.

Todo lo que no aparece en esos 90 segundos es P1, salvo los controles éticos que
sí deben existir aunque no se vean: permiso de IA, permiso de compartir, copia
inmutable, abstención y descarte de respuestas tardías.

Decisión propuesta: web Next.js/TypeScript en **un proceso Node, con el caso en
memoria** y semilla local; sin base de datos ni API REST pública en P0. Cuatro
Route Handlers invocados con `fetch` independientes, dos llamadas IA acotadas,
reglas deterministas y catálogo oficial pequeño. Un caso, un destinatario, tres
vistas y seis acciones de seguimiento. Nada de chat abierto, panel de indicadores,
app nativa ni integraciones externas.

## Antes del bloque técnico

- **08:30–09:30 · Acceso real al modelo.** Una llamada de prueba permitida, con
  la credencial principal y una de respaldo ya definida. Si no hay API, se
  declara en ese momento y se elige la credencial de respaldo; no se descubre a
  las 12:30. Nunca compartir claves por mensajería ni dejarlas en el repo.
- **09:30 · Preguntas a la organización.** ¿Se puede crear el proyecto vacío
  (`create-next-app`, dependencias) durante el bloque de Diseño? Si la red tarda,
  esa instalación consume parte de los 20 minutos técnicos y hay que saberlo antes.
- **10:45–11:45 · Contenido listo, con dueño y hora.** Procedimientos y fuentes:
  nueve fichas con fragmento literal, URL y condiciones. Pruebas: `demo.json`
  con 33 sesiones, 25 previas, 22 asistidas y 8 futuras. Integración: borradores
  de los dos prompts y sus esquemas. Ética: responsable y suplente del checklist,
  con sus dos validaciones antes de 14:45. Pitch: declara herramientas desde el
  inicio, incluido el asistente de código si se usa.
- **Equipo y reglas.** Alcance aceptado con mentor, rúbrica y checklist oficial
  recibidos, y una persona que pueda explicar cada bloque construido.

## Modo de construcción

Una línea que debe quedar escrita y dicha: «el código lo escribe [persona /
persona guiando un agente de código]». Si se usa un agente, se declara en
transparencia y **quien presenta revisa cada bloque** para poder explicarlo en
las preguntas. Un agente acelera la escritura; no reemplaza la comprensión ni la
declaración obligatoria de herramientas.

## Orden de construcción y pruebas por hito

| Bloque | Construir | Qué debe estar probado para seguir |
| --- | --- | --- |
| 11:45–12:05 (20) | Adaptador con una llamada fija que devuelva JSON validado; esqueleto y semilla | Navegación de las tres vistas, semilla de Camila, aviso DEMO, «Necesito apoyo ahora» visible y una llamada de humo OK o bloqueo registrado |
| 12:05–12:30 (25) | Confirmación de datos y reglas de asistencia | Pruebas de reglas en verde: 33/25/8 → 22/33; mínimo 24; 70% exacto cumple; 69,95% no cumple; teoría y práctica no se compensan; datos inválidos se rechazan |
| 12:30–12:45 y 13:30–13:40 (25) | Permisos, prompt 1 y fuentes | Llamada 1 sobre el relato coloquial devuelve JSON válido con preguntas por fecha y hora de inicio; sin permiso, cero llamadas; timeout o JSON inválido cae a formulario sin publicar nada |
| 13:40–14:05 (25) | Resumen autorizado y revisión del tutor | El tutor ve solo los bloques autorizados; editar después de compartir no altera la copia; el tutor propone paso con rol y fecha |
| 14:05–14:30 (25) | Acuerdo, seguimiento y recorrido completo | Aceptar paso → iniciar gestión → confirmar ayuda; envío no equivale a ayuda recibida; recorrido de 90 s cronometrado una vez |
| 14:30–14:45 (15) | Corrección crítica, transparencia y freeze | Tag o commit del freeze, comando de arranque, reinicio de semilla y un ensayo de la demo sobre la versión congelada |

Son 60 minutos antes y 75 después del almuerzo; la pausa no cuenta como trabajo.
El detalle de contratos y pruebas está en el plan técnico. Si a las 12:05 no hay
llamada de humo, se congela el modo manual y se avisa temprano, no al final.

## Qué no cabe y qué se recorta, en orden

Fuera del P0 (queda como diseño de piloto): persistencia ante reinicio, prueba
automatizada de retiro durante una llamada IA, sustitución de copias, las otras
acciones de seguimiento, concurrencia con 409, filtros y bandeja con más de un
caso, panel de indicadores.

Orden de recorte si el tiempo aprieta:

1. Estética y variantes visuales; nunca permisos, cálculo ni abstención.

2. Bandeja con más de un caso y cualquier filtro.

3. La segunda llamada IA se reduce a redactar la consulta sobre las opciones que
   ya filtraron las reglas, sin seleccionar artículos.

4. Se conserva la primera llamada: es el momento visible de la IA —entiende
   «pega» y pregunta lo que falta— y sin ella el pitch no tiene demostración.

5. Si aun así no alcanza, se baja un peldaño de la escalera de respaldo, con
   rótulo y sin presentar el respaldo como MVP.

No se recorta: permiso para IA externa, autorización para compartir, revisión
humana, cálculo correcto, abstención ante datos faltantes ni la comprobación
manual de que un retiro bloquea nuevos usos.

## Contingencia: cinco peldaños, sin saltos

(1) app con IA → (2) misma app parcial, con lo que falla dicho en voz alta →
(3) misma app en modo manual rotulado, con las mismas reglas y permisos →
(4) capturas o video de la versión congelada real → (5) maqueta rotulada como no
funcional. El detalle, la frase exacta y la regla de ocho segundos están en
`guion_y_contingencias.md`.

## Lo que debe responder el equipo antes de aprobar

¿Este recorrido cabe desde cero en 135 minutos con el modo de construcción
declarado? ¿Qué bloque exige una prueba previa autorizada? ¿Quién es el suplente
del checklist si la persona designada está en la demo? Las respuestas ajustan el
plan; no lo convierten en una promesa de resultado.
