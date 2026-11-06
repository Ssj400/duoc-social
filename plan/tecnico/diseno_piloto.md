# Puente · Diseño ampliado de piloto, no alcance de la demo

Referencia histórica de arquitectura · 6 de noviembre de 2026

**Este diseño NO es el P0 de 135 minutos.** Tras revisión de factibilidad, el
alcance vigente de demo está en `plan_tecnico.md`. Persistencia SQLite, REST,
concurrencia de clientes, sustitución automática de copias y transiciones
extendidas se conservan aquí como estudio para un piloto, sujeto a validación.
Los diagramas históricos corresponden al commit `f194b72`; este archivo no es
la fuente del PDF técnico vigente ni debe compilarse con diagramas P0 actuales.

## Decisión de arquitectura

**Una aplicación web responsive, un proyecto Next.js/TypeScript y un servidor
Node.** Dos paneles —estudiante y tutor— y una ficha de seguimiento. La IA se
integra en el servidor en dos momentos explícitos, no como un chat abierto ni
un agente que ejecuta trámites.

El navegador presenta, captura y permite revisar. El servidor valida permisos,
calcula asistencia, llama al modelo cuando corresponde y filtra las respuestas.
SQLite guarda casos sintéticos en disco persistente. Una selección local de
textos oficiales revisados sirve como base de las explicaciones.

## Qué contiene este plan

- Mapa de navegación y ubicación de cada bloque en los paneles.
- Arquitectura y secuencia de datos, con seis diagramas vectoriales.
- Responsabilidades de IA, reglas y personas; estados y autorizaciones.
- Modelo de datos, contratos de API y organización del proyecto.
- Pruebas, despliegue y secuencia de construcción en 135 minutos.

**Es una propuesta técnica, no una aplicación ya implementada.** El plan
explicado conserva la historia y la intención del producto. Aquí detallamos
cómo construirlo, sin agregar integraciones o nuevas funciones.

Los diagramas también están en `plan/tecnico/diagramas.html`: un archivo que se
abre directamente en el navegador, sin servidor ni librerías externas. Sus
botones resaltan conexiones del diseño; no ejecutan el producto. El PDF muestra
la misma estructura de forma estática y usa marcadores para navegar.

## Límites desde el inicio

Una situación laboral, una asignatura de referencia y un destinatario ficticio.
No habrá conexión con sistemas académicos, correo, WhatsApp o agendamiento.
Los datos personales son sintéticos. Cambiar de rol en demo no autentica ni
autoriza un uso real: no desplegar esta versión con información de personas.

# 1. Mapa de navegación

@diagrama mapa

## Rutas de pantalla

| Ruta | Contenido | Acceso de demo |
| --- | --- | --- |
| `/` | Inicio, explicación breve y selección de caso/rol | Solo navegación de demo, con aviso visible |
| `/estudiante/casos/[id]` | Un panel con cuatro pasos internos | Estudiante ficticio; relato privado, permisos y resultados |
| `/tutor` | Bandeja de resúmenes autorizados | Destinatario ficticio seleccionado |
| `/tutor/casos/[id]` | Detalle de la copia compartida y revisión | No devuelve el registro privado del estudiante |
| `/casos/[id]` | Ficha de seguimiento | Información diferenciada según rol y autorización |

No son cinco productos ni cinco módulos independientes. Las rutas del tutor
pueden usar la misma página de lista/detalle; el panel estudiante cambia de paso
sin navegar a una ruta nueva. En teléfono, la lista del tutor se oculta mientras
se lee un caso; en escritorio pueden verse ambas columnas.

# 2. Panel de estudiante: composición

@diagrama estudiante

La ilustración ubica todas las secciones; la interfaz no exige completar todas
a la vez. Un paso activo guía el recorrido y los anteriores se pueden revisar.
En móvil, el lateral de ayuda pasa a un bloque accesible sin tapar los botones.

No mostrar semáforo de «riesgo personal», ranking ni porcentaje de abandono.
La cifra destacada describe asistencia bajo un escenario confirmado. La cuenta,
sus supuestos y la posibilidad de corregir están a un clic.

# 3. Panel de estudiante: acciones y estados

| Paso | Bloques y acción principal | Validación / salida |
| --- | --- | --- |
| 1. Mi cambio | Aviso de demo, alternativa formulario/IA, permiso externo y relato. Botón Interpretar | No llamar por escribir ni por abrir la página. Sin permiso o en vía de menores: formulario/orientación humana |
| 2. Confirmar | Días, horas, fecha inicial, vigencia del turno; calendario, registro y requisito precargados como demo | Desconocido no equivale a cero. Estudiante confirma la versión; botón Calcular |
| 3. Opciones | Aviso calculado, ver cuenta, ahora/próximo período/apoyo opcional, fuentes | IA 2 solo mediante acción explícita. Si falta información, pedirla; nunca inventar una salida |
| 4. Compartir | Resumen editable, bloques a compartir, destinatario y vista previa exacta | No compartir es opción válida. Autorizar crea una copia concreta; no abre todo el expediente |

## Datos que ve

El relato original, propuesta de extracción, datos confirmados, cálculo y
borradores son privados. Puede revisar artículos públicos sin compartir su caso.
Los registros académicos no se importan: se cargan como datos sintéticos de demo.
Si no hay IA, los mismos campos se completan manualmente y usan las mismas reglas.

## Estados de interfaz

`idle`, `loading`, `needs_information`, `ready` y `error` describen cada bloque,
no nuevos estados administrativos. Desactivar el botón durante una solicitud;
mostrar confirmación solo tras respuesta del servidor. Si falla, conservar los
campos ya confirmados y explicar qué no se guardó. No simular una respuesta IA.

## Acceso a apoyo

«Necesito apoyo ahora» permanece disponible antes del relato y durante errores.
Al elegirlo, pausar llamadas automáticas y mostrar recursos publicados/contacto
humano. No depende de clasificación emocional del modelo, no diagnostica y no
constituye un protocolo clínico aprobado. La agenda externa es solo un enlace:
sin parámetros personales, prellenado ni transferencia del caso.

# 4. Panel de tutor: composición

@diagrama tutor

La bandeja contiene un caso sintético para el recorrido principal. No mostrar
conteos de personas que no respondieron al chequeo, casos no compartidos ni
información que permita inferir relatos privados. P0 no necesita buscador,
gráficos, filtros complejos ni notificaciones.

# 5. Tutor y seguimiento: qué puede hacer cada persona

## Revisión del tutor

El detalle se obtiene de la copia autorizada, no del objeto privado del caso.
La ruta visual del tutor resuelve la copia activa para ese caso/destinatario en
servidor y usa el recurso `shares`; no llama al GET privado de la estudiante.
Muestra resumen, destinatario, versión y fecha de autorización. Cálculo y
entradas solo aparecen si la estudiante autorizó ese bloque. Si no, indicar
«no compartido» sin recuperarlo por otra llamada interna.

El tutor propone correcciones y marca condiciones pendientes; no sobrescribe la
declaración de la estudiante. Una corrección del horario se confirma por ella y
requiere recálculo. Una observación sobre una ruta puede registrarse sin cambiar
las cuentas. El tutor no aprueba cambios que corresponden a Dirección de Carrera.

## Ficha de seguimiento

| Bloque | Estudiante | Tutor destinatario |
| --- | --- | --- |
| Propuesta de próximo paso | Aceptar, pedir ajuste o rechazar | Proponer acción, rol responsable y fecha |
| Gestión | Leer avance y aportar respuesta | Registrar consulta preparada/iniciada y respuesta recibida |
| Resultado | Confirmar recibí ayuda o sigo esperando; pausar | No confirmar ayuda en nombre de la estudiante |
| Autorización | Revisar y retirar nuevos accesos | Acceder solo mientras la copia siga autorizada |

La estudiante conserva su información propia tras retirar el permiso. El tutor
deja de recibir el contenido; las acciones pendientes se bloquean hasta una
nueva autorización explícita. No prometer deshacer lecturas previas.

Cada avance registra quién lo reporta y cuándo. «Consulta enviada» no produce
automáticamente «ayuda recibida». No respuesta, rechazo, pausa o alternativa
no disponible son resultados distintos, no éxitos de retención.

## Presentación

En escritorio: siguiente paso y resumen arriba, avances debajo. En teléfono:
paso y fecha primero, botones de respuesta cerca, fuentes en secciones expandibles.
Usar títulos claros, navegación por teclado y errores asociados al campo; no
depender solo del color para señalar pendientes.

# 6. Arquitectura y límites de responsabilidad

@diagrama arquitectura

Todo lo rotulado como servidor pertenece al mismo proyecto y proceso Node, no
a microservicios. El servicio de casos coordina las operaciones y es el único
que ordena escrituras. Reglas devuelven resultados; catálogo devuelve textos y
metadatos. Las conexiones hacia almacenamiento representan persistencia
coordinada por ese servicio, no llamadas autónomas desde el motor o el catálogo.

La API responde con una vista filtrada. Ni ocultar un componente React ni elegir
una pestaña constituye control de acceso. En demo se prueban reglas de negocio
sobre personas ficticias; antes de piloto se necesita identidad real y permisos
por caso. Las claves del proveedor solo existen en servidor.

# 7. Dónde va integrada la IA

@diagrama flujo-ia

Dos llamadas habituales por recorrido, iniciadas por botones. No hay chat
ilimitado, navegación autónoma ni herramientas para enviar solicitudes. Una
petición repetida solo ocurre por decisión explícita, no por un reintento oculto.
Los resultados IA son propuestas: nunca autorizan compartir ni cambian matrícula.

# 8. Contrato de las dos llamadas al modelo

## Llamada 1: interpretar el relato

Servidor recibe el texto solo después del permiso externo. Pide una estructura
pequeña: días, intervalo, inicio de vigencia, permanencia declarada, preguntas y
fragmentos del texto que sustentan cada dato. Campos omitidos son `null`.

Ejemplo: «Desde el 10 de noviembre de 2026 trabajo de forma permanente martes y
jueves de 16:00 a 21:30». Puede proponer esos datos; no puede inventar empleador,
diagnóstico ni asistencia académica. El estudiante corrige y confirma antes de
calcular. Las referencias al relato son temporales, no se adjuntan al tutor.

## Llamada 2: explicar opciones y proponer consulta

Entrada: datos mínimos confirmados, resultado calculado y fragmentos oficiales
permitidos. No necesita volver a enviar el relato original. Salida: IDs de rutas
y fuentes, explicación de pertinencia, pendientes y borrador de consulta/resumen.
La UI obtiene cifras del motor y fechas/condiciones del catálogo, no del texto IA.

Validar JSON y campos con esquemas estrictos —por ejemplo Zod—, rechazar
propiedades inesperadas e IDs desconocidos y limitar longitudes. Verificar que
los fragmentos citados existan; su pertinencia exige revisión adicional. Tener
una cita real no convierte una interpretación en correcta ni concede un cupo.

## Manejo de fallos

Timeout propuesto: 20 segundos por llamada, configurable tras probar proveedor.
Un error conserva datos confirmados y ofrece formulario/catálogo estático, con
el modo identificado. No guardar una respuesta inválida como recomendación.
El relato y documentos se tratan como datos, no como instrucciones ejecutables.
Sin HTML generado, ejecución de código ni herramientas externas para el modelo.

## Privacidad durante una llamada

Capturar versión del caso y permiso antes de enviar. Al volver, comprobar ambos
de nuevo **en la misma transacción corta que acepta y guarda el resultado**,
o mediante escritura condicional equivalente. Si fueron revocados o cambiaron,
descartar contenido y no aplicarlo. No separar esa última comprobación del guardado.
Intentar cancelar la llamada no garantiza retirar lo ya enviado al proveedor.
No mantener una transacción SQLite abierta mientras responde la red.

# 9. Corpus oficial: qué consulta y qué muestra

Un archivo JSON local con nueve fichas revisadas es suficiente. No se necesita
una base vectorial, embeddings ni un buscador web. Las fichas son pequeñas,
versionadas y precargadas de acuerdo con lo que permitan las reglas del evento.

| Ficha | Evidencia incluida | Límite que debe mostrarse |
| --- | --- | --- |
| Asistencia | Arts. 29–31, especialmente art. 30 | Porcentaje propio o supletorio confirmado; categorías separadas; exclusiones |
| Justificación | Arts. 33–34 | Evaluaciones, causas extraordinarias, plazo; no todo el semestre |
| Retiro | Art. 47 | Calendario y excepciones evaluadas; no retiro automático |
| Nota pendiente | Arts. 48–49 | Aprobación/validación; no dispensa asistencia |
| Jornada | Arts. 81–82 | Oferta, cupos, aprobación e instructivo |
| Calendario presencial | Filas de plazos y estado de RI | No trasladar a Online; hito no fija denominador |
| Procedimiento jornada | Centro de Ayuda | Inicio publicado 28/12/2026, próximo período |
| Apoyo psicológico | Programa y recursos publicados | Condiciones de acceso, terceros, sin hora garantizada |
| Punto Estudiantil | Orientación institucional | No protocolo clínico ni elegibilidad especializada para menores |

Cada ficha: `id`, documento, artículo/página o sección, fragmento literal, URL,
fecha de consulta, versión y condiciones estructuradas. La fecha del caso y
modalidad se aplican a esos metadatos, no se dejan al criterio del modelo.

Las citas se abren en un panel lateral o sección desplegable: título, fragmento,
artículo/página y enlace oficial. La relación de una fuente pública con el caso
sigue siendo información privada: no abrirla al tutor sin autorización.

El catálogo público permanece disponible sin IA. Validación institucional de
aplicabilidad, mantenimiento y responsables son pendientes de un piloto; no
se atribuyen a la herramienta por tener un PDF oficial.

# 10. Motor de reglas y contrato del cálculo

## Entradas por categoría

Para teoría o práctica: sesiones realizadas `H`, asistidas `A`, futuras `F`,
asistencias futuras asumidas `B`, umbral `p` y confirmación del calendario completo.
`B` no se deduce automáticamente de ausencia de choques: es parte explícita del
escenario. Mantener las ausencias futuras separadas del registro real.

Con sesiones iguales: total `N = H + F`; actual `A/H`; proyectado `(A+B)/N`;
mínimo `ceil(N × p/100)`. Comparar con razones exactas; redondear solo para mostrar.
Si el porcentaje admite decimales, normalizar a una unidad entera acordada,
sin depender de redondeos binarios de coma flotante.

## Caso de referencia

Al inicio del 10/11/2026: martes/jueves 18:30–21:00; turno 16:00–21:30 desde
ese día y durante las ocho sesiones restantes. Calendario sintético de 33
sesiones iguales, del 11/8 al 3/12, sin la tarde del 17/9.

`H=25`, `A=22`, `F=8`, `B=0`, `N=33`, `p=70`. Actual: 88%; proyección: 66,7%;
mínimo: 24; dos asistencias adicionales respecto del escenario. Una adicional
da 23/33, todavía bajo 70%. Alcanzar asistencia mínima no garantiza aprobar.

El 5/12 es el hito publicado de estado de RI. No usarlo para recortar el total
sin confirmación; el período y los exámenes pueden incluir actividades posteriores.

## Validación y abstención

No negativos, `A ≤ H`, `0 ≤ B ≤ F`, total positivo, sesiones únicas y calendario
confirmado. Teoría/práctica nunca se compensan. Excluidas, pesos distintos o
requisito desconocido producen `needs_information`, no un 70% aplicado a ciegas.
Categoría no evaluada queda «no evaluada», no «cumple».

Fechas académicas: `YYYY-MM-DD`, zona `America/Santiago`. No convertir una fecha
local en medianoche UTC. Eventos técnicos usan instantes. Intervalos semiabiertos:
si trabajo termina al iniciar clase no hay superposición matemática, pero eso
no demuestra traslado viable. Choque parcial no se traduce automáticamente en
ausencia. Los turnos que cruzan medianoche se normalizan en tramos o se derivan
a revisión; P0 puede restringirlos explícitamente.

# 11. Estados, versiones y autorizaciones

@diagrama estados

Los tres estados visibles resumen el trabajo, no sustituyen sus condiciones.
Preparación incluye revisión del tutor antes de acuerdo. Seguimiento/cierre
necesita un resultado distinguible: recibido, pendiente, rechazado, pausado o
sin alternativa. El estado nunca activa una decisión administrativa.

Internamente usar campos separados: `inputStatus`, `phase`, `aiPermission`,
`shareStatus` y `followupStatus`. Evita un único estado con combinaciones como
«compartido-pero-sin-IA-y-pendiente-de-corrección». No hace falta una máquina de
workflow externa: funciones y validaciones explícitas bastan.

# 12. Transiciones y casos que no pueden pasar

| Evento | Condición necesaria | Efecto |
| --- | --- | --- |
| Confirmar datos | Versión vigente, campos y supuestos completos | Calcular y guardar resultado asociado a esa revisión |
| Editar datos | `expectedRevision` coincide | Aumentar revisión; invalidar confirmación, cálculo y propuestas derivados |
| Compartir | Vista previa revisada, campos seleccionados y destinatario explícito | Crear copia inmutable autorizada, sin relato original |
| Tutor propone paso | Copia activa y revisión compatible | Propuesta, responsable y fecha; todavía sin acuerdo estudiantil |
| Estudiante acepta | Paso vigente, autorización y entradas no obsoletas | Fase gestión acordada |
| Iniciar gestión | Acuerdo explícito | Avance, sin declarar ayuda recibida |
| Confirmar ayuda | Respuesta de la estudiante | Resultado recibido; tutor no lo confirma por ella |
| Retirar permiso de compartir | Acción de estudiante | Bloquear nuevas lecturas/acciones del tutor y pausar gestión compartida |
| Retirar IA o editar durante llamada | Cambia versión del permiso/caso | Descartar resultado tardío, sin publicar contenido |

Una edición privada no cambia lo que el tutor vio. La copia anterior solo sigue
visible mientras su autorización permanezca activa, identificada con su versión.
No se incorpora contenido nuevo sin otra autorización. Un acuerdo sobre una
revisión antigua requiere actualizar y reconfirmar antes de seguir.

Mutaciones usan revisión esperada. Una revisión obsoleta devuelve conflicto,
no sobrescribe silenciosamente. En compartir, el servidor construye la copia
permitida desde los bloques revisados; no confía en un cálculo recibido del
navegador. El resumen editado por la persona se guarda como tal y pasa esquema.
La comprobación de permiso, revisión y transición y su escritura son atómicas;
lo mismo rige para acciones del tutor frente a una revocación concurrente.

Al autorizar una nueva copia, una transacción retira la copia activa anterior
para ese destinatario, bloquea sus acciones pendientes y crea la nueva. No
trasladar una aceptación o acuerdo de una revisión a otra automáticamente.
El histórico queda identificado para la estudiante, sin nuevos accesos del
tutor a la copia sustituida. La nueva propuesta requiere su propia aceptación.

Permiso externo y permiso al tutor nunca son una casilla conjunta. La política
de menores del MVP es vía humana sin IA externa hasta acordar tratamiento con
la institución; edad no informada no habilita el modelo. No pedir nacimiento
exacto ni RUT. Los requisitos del programa psicológico son independientes.

# 13. Modelo mínimo de datos

| Entidad | Qué guarda | Qué no debe incluir por defecto |
| --- | --- | --- |
| `cases` | ID público opaco, alias sintético, revisión, fase, datos confirmados, resultado y borrador | RUT, diagnósticos, empleador, relato original completo |
| `ai_permissions` | Caso, estado, versión, proveedor/uso informado, otorgamiento/retiro | Permiso implícito para compartir con tutor |
| `llm_runs` | Operación, versiones de entrada/permiso, inicio/fin, estado y código de error | Prompt, relato o respuesta completa en logs |
| `shares` | ID opaco, caso/revisión, destinatario, campos, copia exacta autorizada, vigencia | Acceso abierto a todos los datos del caso |
| `followups` | Copia asociada, revisión humana, paso, rol, fecha, aceptación y avances | Ayuda confirmada por defecto tras envío |

Relaciones: caso tiene permiso y ejecuciones; caso puede conservar versiones de
compartición; cada copia tiene un seguimiento. Para P0 basta un destinatario y
una copia activa. No construir administración multiinstitución ni tablas de
usuarios reales. Las escrituras se coordinan en transacciones cortas.

El relato vive de forma temporal en el formulario y en la solicitud autorizada.
No se guarda en SQLite por defecto; al confirmar se conservan restricciones, no
la historia completa. Fragmentos de origen sirven para revisión en esa sesión,
no para adjuntar automáticamente al tutor. Recargar puede perder ese texto
temporal: avisarlo, sin guardar información sensible en `localStorage`.

Los artículos se almacenan en `src/data/corpus.json`, con versión fija en cada
resultado. Semilla en `src/data/demo.json`; SQLite fuera de `public/` y del
versionado. El mecanismo de reinicio de demo se ejecuta localmente y no se
publica como endpoint capaz de borrar datos de otros.

Retención y eliminación de datos reales siguen pendientes del piloto. No
convertir esta estructura sintética en una política institucional de privacidad.

# 14. API: recursos y forma de respuesta

Prefijo propuesto `/api/v1`. Todo contrato es diseño; no hay endpoints operativos.
Se usan IDs públicos opacos, no claves internas de SQLite. Versión esperada en
mutaciones, validación en servidor y respuestas sensibles con `Cache-Control:
no-store`. No enviar trazas de error o claves del proveedor al navegador.

| Recurso | Métodos | Función |
| --- | --- | --- |
| `/cases` | POST, GET | Crear caso; listar copias autorizadas al destinatario de demo |
| `/cases/:id` | GET, PATCH | Leer vista propia y editar datos privados con revisión esperada |
| `/cases/:id/ai-permission` | PUT | Otorgar/retirar permiso externo separado |
| `/cases/:id/ai-runs` | POST | Una operación explícita: `extract` o `explain` |
| `/cases/:id/assessment` | POST | Confirmar revisión y ejecutar reglas |
| `/cases/:id/shares` | POST | Autorizar copia de bloques para un destinatario |
| `/shares/:shareId` | GET, DELETE | Leer copia autorizada o retirar nuevos accesos |
| `/shares/:shareId/followup` | GET, PATCH | Leer seguimiento y aplicar acción de revisión/acuerdo/avance |

## Respuestas

Éxito: `{ "data": ... }`; creación `201`, lectura/actualización `200`, retiro
`204` sin cuerpo. Error: `{ "error": { "code", "message", "details" } }`.
JSON inválido `400`; permiso faltante `403`; recurso no accesible `404`;
conflicto de revisión/estado `409`; campos inválidos `422`; proveedor falla
`502` o timeout `504`. Límite de llamadas `429` si se aplica.

Falta legítima de información devuelve `200` con `status: needs_information`
y preguntas: no es error técnico ni resultado calculado. Listas de demo son
pequeñas y sin paginación; antes de ampliar el volumen se define ese contrato.

El «actor» de demo se resuelve entre personas ficticias predefinidas, no desde
un ID de estudiante arbitrario en el cuerpo. Sigue siendo simulación manipulable:
ni cookie ni selector ficticios equivalen a autenticación real. Las pruebas de
filtrado demuestran lógica del recorrido, no protección frente a un atacante.

# 15. API: ejemplo por operación

Los cuerpos siguientes son abreviados; los esquemas completos se implementan
antes de construir las llamadas de pantalla. Todos los ejemplos son sintéticos.
En el plan no se presenta ninguna ruta como lista para consumo real.

| Operación | Entrada de ejemplo | Salida esperada |
| --- | --- | --- |
| POST cases | `{"seedId":"camila"}` | `201`, `data:{caseId,revision:1,phase:"preparation"}` |
| GET cases | `?scope=shared` para tutor ficticio | `200`, `data:[{caseId,shareId,alias,phase,nextStep}]`; solo copias activas |
| GET case | ID propio accesible | `200`, `data:{caseId,revision,inputs,inputStatus,assessment}`; vista privada solo al rol estudiante |
| PATCH case | `{expectedRevision:3, inputs:{...}}` | `200`, revisión 4, `inputStatus:"unconfirmed"`, resultado derivado inválido |
| PUT ai-permission | `{expectedVersion:1,state:"granted",noticeVersion:"demo-1"}` | `200`, `data:{state:"granted",version:2}`; también admite `revoked` |
| POST ai-runs | `{expectedRevision:3,operation:"extract",text:"..."}` | `200`, restricciones propuestas y preguntas; sin confirmarlas |
| POST ai-runs | `{expectedRevision:3,operation:"explain"}` | `200`, opciones y borrador sobre cálculo confirmado, con referencias permitidas |
| POST assessment | `{expectedRevision:3,confirmed:true}` | `200`, cálculo versionado o `needs_information` |
| POST shares | `{expectedRevision:3,recipientId:"tutor-demo",blocks:["summary","assessment"],editedSummary:"..."}` | `201`, `data:{shareId,sourceRevision:3,status:"active",snapshot:{...}}` |
| GET share | ID y destinatario con permiso activo | `200`, solo `snapshot`, vigencia y seguimiento permitido |
| DELETE share | Propietaria del caso ficticio | `204`; nuevas lecturas y acciones quedan bloqueadas |
| GET followup | Copia activa o propietaria | `200`, `data:{revision,status,proposal,events}` filtrado |
| PATCH followup | `{expectedRevision:1,action:"propose",step:"Consultar",ownerRole:"coordinacion",dueDate:"2026-11-12"}` | `200`, propuesta pendiente de aceptación estudiantil |

Acciones adicionales del mismo PATCH: `request_clarification`, `accept`,
`initiate`, `record_response`, `report_waiting`, `confirm_help`, `pause`,
`decline` o `mark_unavailable`. Cada acción
valida rol, estado y campos; no es permiso para ejecutar transiciones arbitrarias.
La tabla del anexo A define la transición y sus requisitos. El `caseId` público
de la bandeja construye el enlace visual; el servidor vuelve a resolver la copia
activa del destinatario, sin convertir ese ID en acceso al caso privado.

# 16. Contratos JSON para implementar y probar

## Propuesta de extracción, no confirmación

```json
{
  "schemaVersion": 1,
  "restriction": {
    "days": ["TUE", "THU"],
    "start": "16:00",
    "end": "21:30",
    "validFrom": "2026-11-10",
    "ongoing": true
  },
  "questions": [],
  "evidence": [{"field": "validFrom", "quote": "10 de noviembre de 2026"}]
}
```

## Resultado de reglas; cifras no generadas por el modelo

```json
{
  "data": {
    "revision": 3,
    "status": "calculated",
    "component": "theory",
    "synthetic": true,
    "completed": 25,
    "attended": 22,
    "future": 8,
    "assumedFutureAttendance": 0,
    "total": 33,
    "requiredPercent": 70,
    "minimumAttendances": 24,
    "additionalNeeded": 2,
    "conditional": true
  }
}
```

El porcentaje visual se deriva de los enteros; la API no confunde 66,7 con
una probabilidad individual de abandono. `evidence.quote` es texto del relato
para revisión temporal, distinto de una cita reglamentaria del catálogo.

# 17. Archivos y componentes del proyecto futuro

Este árbol es una propuesta. No crear la aplicación solo por generar el plan.

```text
src/
  app/
    page.tsx                         inicio de demo
    estudiante/casos/[id]/page.tsx    panel por pasos
    tutor/page.tsx                   bandeja
    tutor/casos/[id]/page.tsx         revisión
    casos/[id]/page.tsx               seguimiento
    api/v1/.../route.ts              handlers por recurso
  components/
    demo-banner.tsx                  aviso y rol ficticio
    student-case-panel.tsx           flujo de cuatro pasos
    context-form.tsx                 relato/manual y permiso
    confirmed-inputs.tsx             revisión estructurada
    attendance-explanation.tsx       cuenta desde reglas
    route-options.tsx               rutas y condiciones
    source-card.tsx                  fuente revisable
    share-preview.tsx                copia exacta y destinatario
    tutor-case-detail.tsx            datos compartidos
    followup-card.tsx                acuerdo y resultado
    human-support.tsx                acceso sin dependencia IA
  lib/
    contracts.ts                    tipos y esquemas estrictos
    case-service.ts                 permisos y transiciones
    rules.ts                        funciones puras
    corpus.ts                       fichas permitidas
    llm.ts                          proveedor y dos operaciones
    db.ts                           conexión y repositorio mínimo
  data/
    corpus.json                     fuentes y condiciones
    demo.json                       horarios/personas ficticias
data/puente.sqlite                  local, no versionada
tests/                              reglas, servicio y recorrido
```

No hace falta adoptar una librería de estado global: estado local de formulario
y lecturas del servidor por caso son suficientes. No añadir ORM, event bus o
framework de agentes sin una necesidad real. Elegir un único driver SQLite
compatible con el Node del entorno y comprobarlo antes de prometer persistencia.

# 18. Despliegue y operación de la demo

## Camino principal: Node local y disco persistente

Un proceso Next.js en el computador del equipo y SQLite fuera del directorio
público. El proveedor de IA requiere internet; las reglas y el catálogo no.
Prueba de persistencia: guardar un avance, recargar y reiniciar el proceso; el
caso debe conservarse. Sin disco persistente no se anuncia durabilidad.

Una segunda máquina o teléfono puede abrir la demo en red solo si se prepara
la conexión de forma segura y la organización lo permite. No es requisito para
mostrar el diseño móvil: también puede usarse una ventana estrecha en el equipo.
Mantener datos sintéticos y no exponer esta versión como servicio institucional.

## Si se quiere publicar una URL

Elegir un host Node con volumen persistente y una instancia; o una base remota
compatible si el equipo ya tiene cuenta y configuración conocida. No colocar
un archivo SQLite local en funciones serverless efímeras ni pretender que
varias réplicas compartan automáticamente ese archivo. Cambiar a base remota
es decisión condicionada, no otro módulo obligatorio del sprint.

## Configuración mínima propuesta

`DEMO_MODE=true`, ruta local `DATABASE_PATH`, `LLM_API_KEY`, identificador de modelo
realmente disponible y timeout. Variables secretas solo en servidor, nunca con
prefijos públicos ni dentro de las fuentes JSON. `.env.example` documentaría
nombres sin valores reales. No se conocen aún proveedor, tarifas o cuotas.

## Registro y respaldo

Logs con ID de operación, duración, estado y error controlado; sin texto personal,
claves ni prompts completos. Guardar copia/commit de la versión congelada,
instrucciones de arranque y escenario inicial. Reinicio de casos solo mediante
procedimiento local explícito sobre datos de demo. Capturas de respaldo no
deben hacerse pasar por una integración IA en vivo.

# 19. Construcción: recorrido vertical primero

## Antes del bloque técnico

Confirmar reglas de preparación previa, equipo, cuentas, corpus y alcance con
mentor. Elegir responsable y suplente del checklist desde inmersión; obtener
dos validaciones oficiales antes de 14:45. No esperar al último bloque ni
confundirlas con mentorías. El equipo puede ajustar este diseño.

| Horario | Trabajo técnico | Verificación de salida |
| --- | --- | --- |
| 11:45–12:05, 20 min | Vistas, semilla y almacenamiento | Caso navegable; aviso de demo, una revisión guardada |
| 12:05–12:30, 25 min | Datos confirmados y reglas | 33/25/8, razón exacta, abstención y horarios |
| 12:30–12:45, 15 min | Permiso externo, corpus y comienzo IA | No llamadas sin permiso, esquemas definidos |
| 12:45–13:30 | Almuerzo | No cuenta como desarrollo |
| 13:30–13:40, 10 min | Terminar IA y errores | Dos operaciones explícitas o fallo declarado |
| 13:40–14:05, 25 min | Copia autorizada y revisión tutor | Solo bloques autorizados; propuesta aceptable |
| 14:05–14:30, 25 min | Seguimiento y pruebas integradas | No confundir gestión/ayuda; recarga y retiro |
| 14:30–14:45, 15 min | Corregir críticos, ensayo y freeze | Escenario conocido y límites documentados |

Son 60 minutos antes del almuerzo y 75 después. Es una estimación exigente,
no promesa de que todo se resolverá en ese tiempo ni permiso para adelantar
desarrollo. Una persona integra; otras verifican normas, prueban y preparan
demo/checklist. Si hay más desarrolladores, repartir componentes sin crear
proyectos independientes que después no encajan.

P0: recorrido completo, reglas, IA acotada real consentida, permisos separados,
revisión, próximo paso y seguimiento. P1: comparación de horarios de atención,
filtros e historial visual. Si hay bloqueo, quitar P1 y variantes; no quitar
consentimiento, revisión ni abstención. Si IA no funciona, declararlo: el modo
manual mantiene recorrido, pero no cumple por sí solo la meta de IA funcional.

# 20. Pruebas: reglas, IA y datos

Pruebas previstas para implementación, no resultados obtenidos. Usar pruebas
unitarias con el runner ya conocido por el equipo; servicio con SQLite temporal
y proveedor IA simulado; recorrido manual o Playwright si ya está preparado.
No consumir llamadas reales para probar cada regla o cada retiro de permiso.

| Caso | Entrada / situación | Resultado esperado |
| --- | --- | --- |
| T01 Base Camila | 25 realizadas, 22 asistidas, 8 futuras perdidas | 88% actual, 22/33 proyectado, mínimo 24, dos adicionales |
| T02 Igualdad | 7/10, 23/33 y 24/33 | Igual al 70% cumple ese mínimo; 23 no; 24 sí |
| T03 Redondeo | 1399/2000 = 69,95% | No pasa a cumplir por mostrar 70,0% |
| T04 Porcentaje propio | Programa confirmado distinto al 70% | Usa su requisito; desconocido genera aclaración |
| T05 Categorías | Teoría bien y práctica bajo mínimo | No compensar; no evaluada no significa cumple |
| T06 Integridad | Asistidas mayores a realizadas, duplicados, cero total | Error de validación; sin conclusión inventada |
| T07 Fechas/horas | Ocho sesiones, vigencia desde 10/11, límites contiguos | Choque correcto y fechas locales; parcial pide criterio |
| T08 Corte y pesos | Actividades posteriores o unidades sin confirmar | `needs_information`; 5/12 no recorta total automáticamente |
| T09 Lenguaje | Relato coloquial y formal equivalentes | Propuestas revisables; mismos datos confirmados, misma cuenta |
| T10 Fuentes | ID ajeno, condición inventada o cita no pertinente | Rechazo o abstención; nunca autorización/cupo ficticio |
| T11 Errores IA | Timeout, JSON inválido, inyección de instrucciones | Error controlado; sin ejecutar, publicar ni cambiar reglas |

Los tests de IA con respuestas prefijadas prueban validación y recuperación,
no calidad semántica del modelo real. Probar además un caso real de ejecución
sintética consentida, registrar proveedor y modelo utilizados y separar esa
observación de una evaluación de precisión o impacto.

# 21. Pruebas: permisos, seguimiento y experiencia

| Caso | Acción | Resultado esperado |
| --- | --- | --- |
| T12 Sin permiso IA | Clic en interpretar sin autorización; vía menor | Cero llamadas al proveedor; alternativa humana/manual |
| T13 Respuesta tardía | Retirar permiso o editar durante llamada | Contenido descartado al volver; sin publicar resultado obsoleto |
| T14 Compartir mínimo | Autorizar solo resumen al destinatario ficticio | Tutor no ve relato, campos privados ni cálculo omitido |
| T15 Edición y copia | Cambiar datos después de compartir | Nueva versión no actualiza copia previa; nuevo acuerdo exige revisión vigente |
| T16 Retiro | Revocar y abrir detalle/subrutas de seguimiento | Bloquear nuevas lecturas/acciones; no prometer borrado retroactivo |
| T17 Decisión humana | Intentar acuerdo sin aceptación, rol o fecha | Rechazo; tutor no aprueba trámite institucional |
| T18 Ayuda real | Registrar envío o que no hubo respuesta | No cambia a ayuda recibida; confirma estudiante |
| T19 Apoyo/agenda | IA caída y botón de ayuda; enlace externo | Recursos visibles, pausa de flujo; no prellenado ni envío del caso |
| T20 Persistencia | Guardar, recargar y reiniciar servidor | Conservar datos estructurados/autorización sin persistir relato por defecto |
| T21 Comprensión | Persona ajena recorre pantallas | Entiende cálculo, pendientes, datos compartidos y siguiente paso |
| T22 Plazos | Caso 10/11 presencial y otra fecha de consulta | Retiro ordinario cerrado; nota pendiente condicionada; jornada futura |

## Criterio de cierre técnico

Completar un caso de punta a punta, una vía descartada y un fallo de IA controlado.
Ninguna prueba crítica de permisos, cifras o fuentes puede darse por aprobada
sin ejecutarla. Si algo no se implementó, marcarlo como pendiente, no ocultarlo
tras una pantalla que simula éxito.

Las pruebas de rol ficticio no certifican seguridad de producción. Antes de
piloto: identidad/autorización reales, política de datos y proveedor, mantenimiento
del catálogo, responsable con capacidad, protocolo para menores/apoyo inmediato,
revisión institucional y evaluación voluntaria. Nada de eso lo resuelve el
selector de demo ni esta documentación.

# 22. Decisiones pendientes y material de referencia

## Para cerrar antes de implementar

- Aprobación del participante y acuerdo con el equipo sobre el alcance.
- Permiso de preparación previa y recursos de IA confirmados.
- Node/driver, persistencia y lugar de ejecución probados.
- Proveedor/modelo disponible, condiciones y límites de la llamada externa.
- Calendario/corpus revisados para el caso; fuentes y datos ficticios diferenciados.
- Confirmar con mentor el encaje de la proyección como alerta explicable.
- Comprobar que el reparto de trabajo cabe; si no, reducir variantes y acabado.

## Qué no decide este plan

No elige una institución como cliente ni afirma adopción. No autoriza datos
reales, diagnostica, determina elegibilidad o aprueba trámites. No asegura que
una proyección correcta reduzca abandono; la comparación de IA frente al
formulario y el piloto siguen pendientes.

## Fuentes y documentación relacionada

La historia y el valor del producto están en `plan/plan_explicado.md` y su PDF.
Las citas normativas, fechas y tabla de verificación están en
`plan/revision_propuesta_v0.3.md`. La investigación previa permanece en el
informe v0.1, con sus límites. Este documento no sustituye las bases o checklist.

[Reglamento oficial](https://www.duoc.cl/reglamento-academico/) ·
[Calendario por modalidad](https://www.duoc.cl/calendario-academico/) ·
[Cambio de jornada](https://centroayuda.duoc.cl/hc/es-419/articles/30308211391629--C%C3%B3mo-realizar-una-solicitud-de-cambio-de-jornada-o-sede) ·
[Apoyo psicológico](https://centroayuda.duoc.cl/hc/es-419/articles/34877114417165-Apoyo-psicol%C3%B3gico) ·
[Punto Estudiantil/orientación](https://www.duoc.cl/bienvenidos/).

Los seis diagramas se generan desde `plan/tecnico/diagramas.json`, tanto para
el PDF como para HTML. Eso evita mantener una arquitectura distinta en cada
formato. Paneles y flechas describen una propuesta; no hay aplicación creada
ni endpoints disponibles por abrir los diagramas.

# Anexo A · Contrato de seguimiento

Aplicar siempre copia activa, actor permitido y revisión esperada del seguimiento
dentro de la misma transacción que escribe. Antes de proponer, aceptar o iniciar,
comprobar además que la revisión de datos de origen sigue vigente. Una edición
posterior bloquea nuevas acciones de gestión basadas en el acuerdo antiguo;
requiere actualización, nueva autorización y aceptación, no herencia silenciosa.

| Acción | Actor | Estado previo | Resultado |
| --- | --- | --- | --- |
| `propose` | Tutor | Sin propuesta, propuesta o aclaración pendiente | `proposed`; paso, rol y fecha obligatorios; estudiante todavía no aceptó |
| `request_clarification` | Tutor | Propuesta o gestión no cerrada | `needs_clarification`; no cambia datos confirmados |
| `accept` | Estudiante | Propuesta vigente | `agreed`; registra aceptación explícita |
| `initiate` | Tutor | Acordado, revisión vigente | `initiated` o `awaiting_response`; registrar qué gestión se hizo |
| `record_response` | Tutor | Iniciada o esperando | `response_received`; no equivale a ayuda confirmada |
| `report_waiting` | Estudiante | Acordado, iniciada, esperando o respuesta registrada | `awaiting_response`; no incrementa riesgo ni crea éxito |
| `confirm_help` | Estudiante | Gestión iniciada o respuesta registrada | `help_received`; resultado reportado por estudiante |
| `pause` | Estudiante | Cualquier seguimiento activo | `paused`; no iniciar nuevas gestiones hasta nuevo acuerdo |
| `decline` | Estudiante | Propuesta o gestión activa | `declined`; no cuenta como ayuda recibida |
| `mark_unavailable` | Tutor | Propuesta o gestión activa | `unavailable`; conservar motivo sin inventar otra solución |

Una pausa o rechazo no se reabre con `initiate`: hace falta nueva propuesta y
aceptación. Copia retirada/sustituida no admite acciones del tutor; la estudiante
puede seguir consultando su historial. Si ya hubo gestión real antes de una
edición, no se borra el evento, pero no habilita a actuar con datos desactualizados.

`phase` es la etiqueta visible de tres etapas; `followupStatus` detalla el avance.
Estos valores no son todos pantallas o subproductos distintos. El anexo cierra
el contrato del recorrido, no agrega mensajería ni aprobaciones administrativas.
