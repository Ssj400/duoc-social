# 01 · Decisión de trabajo y lectura ejecutiva

**Resultado de esta investigación:** conviene explorar una herramienta de continuidad académica ante cambios de condiciones de vida, no construir otro predictor genérico de abandono. La propuesta se denomina **Puente**, nombre provisional sin verificación de marca. Es una hipótesis para discutir con el equipo y con mentores, no una solución elegida unilateralmente ni validada por UC o Duoc UC.

El usuario principal será un estudiante de primer año que quiere continuar, pero enfrenta una incompatibilidad próxima entre clases y una nueva disponibilidad laboral. El usuario operativo será un tutor o encargado de acompañamiento con capacidad para orientar y gestionar. Para el MVP se aborda trabajo–estudio; cuidados se conserva como escenario futuro, sin exigir detalles de personas dependientes.

> Tesis provisional: una alerta no ayuda por sí sola. Debe convertirse en una alternativa respaldada, una gestión con responsable y una comprobación de que el apoyo efectivamente llegó.

## Qué se propone demostrar

- Una señal comprensible de incompatibilidad próxima, sin inventar una probabilidad de abandono.
- Un relato voluntario transformado en restricciones editables, con preguntas cuando falte información.
- Opciones comparadas contra un catálogo y un calendario, separando condiciones verificadas y pendientes.
- Revisión real del tutor y autorización del estudiante antes de compartir o iniciar una gestión.
- Seguimiento que distinga «mensaje enviado» de «ayuda recibida».

## Qué no se afirma

No existe evidencia de eficacia de Puente. No se ha medido su precisión, originalidad de mercado ni efecto sobre permanencia. No se dispone aún de un catálogo institucional validado ni de entrevistas propias. No se promete cambio de jornada, beneficio, cupo o autorización. El objetivo no es impedir una pausa o cambio informado.

## Decisiones antes de implementar

Confirmar equipo y reubicaciones; recibir la rúbrica detallada y el checklist oficial; consultar qué preparación previa está autorizada; verificar una ruta institucional y su responsable. Si estas condiciones no se cumplen, la demostración deberá permanecer sintética y rotulada. Este documento prepara decisiones y entregables; no adelanta la implementación del producto.

# 02 · Marco de investigación y calidad de evidencia

## Pregunta que orienta el informe

¿Qué falla concreta del acompañamiento de primer año puede abordarse con IA pertinente, supervisión humana y un prototipo realizable en una jornada? No se busca «probar» una idea a posteriori, sino contrastar causas, antecedentes y condiciones de operación antes de elegirla.

La revisión web se realizó el **5 de noviembre de 2026**. Se consultaron informes oficiales, publicaciones académicas, una evaluación experimental, antecedentes institucionales y un preprint. Es una revisión rápida orientada a decisiones, **no una revisión sistemática**: no tuvo protocolo exhaustivo de selección, búsqueda bibliométrica completa ni evaluación formal de sesgo de todos los estudios.

| Tipo de evidencia | Qué permite sostener | Qué no permite sostener |
| --- | --- | --- |
| SIES 2026 [R2] | Dimensión y distribución de trayectorias de la cohorte 2025 | Causas individuales o efecto de una aplicación |
| Estudio cualitativo chileno [R3] | Experiencias y mecanismos relatados por exestudiantes | Prevalencia actual o generalización a todo primer año |
| Antecedentes UC/Duoc [R4–R5] | Existencia previa de estrategias de alerta y apoyo | Inventario completo de sus sistemas vigentes |
| Ensayo MAAPS [R7] | Efectos de una intervención concreta y heterogeneidad institucional | Eficacia aislada de un algoritmo o transferencia automática a Chile |
| Comunicado GSU [R6] y preprint [R8] | Antecedentes y mecanismos plausibles, con reservas | Validación de Puente o de cualquier chatbot generativo |

## Distinciones usadas en todo el documento

**Hecho publicado:** una fuente lo informa y se indica su alcance. **Interpretación:** conclusión razonada a partir de fuentes, no resultado directo. **Hipótesis:** algo que el equipo debe comprobar. **Decisión de diseño:** una opción propuesta para construir y evaluar. **Escenario de demo:** datos inventados, no prueba de una política o servicio real.

Algunas páginas HTML presentaron bloqueos; el artículo chileno se revisó mediante su PDF público. En [R4] se verificaron ficha y resumen, no el artículo íntegro. En [R6] se leyó el comunicado, no el estudio completo. El video local de WhatsApp no fue analizado y no se usa como evidencia. La bibliografía final registra estas restricciones.

# 03 · Magnitud del problema: medir sin confundir

El informe SIES publicado en agosto de 2026 analiza la continuidad de quienes ingresaron en 2025, contrastando matrículas al 30 de abril de 2025 y de 2026. Su universo corresponde a programas regulares de pregrado definidos en el informe; no debe presentarse como una encuesta de causas de abandono. [R2, pp. 3–6, 8–10]

| Trayectoria de la cohorte 2025 | Porcentaje | Interpretación correcta |
| --- | --- | --- |
| Retención en institución y cohorte de origen | 77,9% | Mantiene la trayectoria institucional de origen |
| Reingreso en nueva cohorte de la misma institución | 1,2% | Permanece, pero cambia su situación de cohorte |
| Persistencia en otra institución | 5,4% | Continúa en educación superior en otra institución |
| Persistencia total en educación superior | 84,5% | Suma las tres situaciones anteriores |
| No matrícula al año siguiente | 15,5% | No aparece matriculado en el corte observado |

**Error que debemos evitar:** afirmar que el 22,1% que no cumple la definición de retención abandonó definitivamente la educación superior. Parte continúa mediante otras trayectorias. Tampoco «no matrícula» demuestra que una persona nunca volverá a estudiar.

## Diferencias por tipo de institución

La no matrícula es 22,0% en institutos profesionales, 24,7% en centros de formación técnica y 7,5% en universidades. La retención es 72,5%, 69,9% y 84,7%, respectivamente. Son categorías del sistema; **no son tasas específicas de Duoc UC ni de la UC**. [R2, tabla 1]

El informe excluye la matrícula de primer año 2025 del CFT Inacap debido a su cierre y ausencia de matrícula en 2026. La composición del sistema y estas decisiones metodológicas importan cuando se comparan cohortes. [R2, p. 12]

## Implicación para Puente

La unidad de éxito no será «evitamos que saliera de esta institución». Primero evaluaremos si el estudiante comprendió opciones, encontró un apoyo utilizable y recibió una respuesta. Una pausa formal o un cambio elegido puede ser compatible con dignidad y continuidad de proyecto de vida. La permanencia, si luego se estudia, debe distinguirse de traslado y retorno.

# 04 · Brechas y contexto: dónde enfocar la exploración

SIES muestra diferencias relevantes, pero observacionales. Una brecha orienta preguntas sobre acceso, operación y contexto; **no autoriza a etiquetar individualmente a quienes pertenecen a ese grupo**. [R2]

| Comparación de retención, cohorte 2025 | Valores | Lectura para el diseño |
| --- | --- | --- |
| Diurna / vespertina | 82,9% / 70,2% | Explorar compatibilidad de apoyos y horarios; no atribuir causalidad al trabajo |
| Con / sin beneficios estatales de arancel | 83,3% / 66,9% | El contexto financiero importa; no inferir elegibilidad ni necesidad a partir del dato agregado |
| Carreras profesionales / técnicas | 82,2% / 69,2% | Evitar diseñar únicamente para la experiencia universitaria tradicional |

La diferencia entre diurna y vespertina es de 12,7 puntos porcentuales. Esa observación no separa efectos de edad, institución, modalidad, trabajo, cuidados, selección u otros factores. Del mismo modo, la asociación con beneficios no demuestra por sí sola que una recomendación de financiamiento aumente la retención en 16,4 puntos. [R2, tablas 3–4 y 13]

## Un cambio de condiciones puede ser más accionable que una etiqueta

**Hipótesis de producto:** un nuevo turno laboral, comunicado voluntariamente, puede revelar una incompatibilidad antes de que aparezcan ausencias o reprobaciones. Esta señal es observable y discutible: se contrastan disponibilidades y actividades, en vez de presentar una predicción opaca sobre una persona.

La anticipación no está probada como indicador validado de deserción. Solo describe que el conflicto ocurriría en el futuro bajo el calendario declarado. Llamarlo «alerta temprana de necesidad de apoyo» requiere explicitar ese alcance ante mentores y confirmar que satisface el desafío.

## Consecuencias éticas

- No usar jornada, género u origen como multiplicadores automáticos de un puntaje de riesgo.
- Ofrecer rutas accesibles también a quienes no usan el asistente o no desean perfilado.
- Permitir describir restricciones funcionales sin revelar empleador, diagnóstico o situación familiar completa.
- Comprobar que el servicio recomendado realmente puede utilizarse: horario compatible, requisitos conocidos y disponibilidad por confirmar.

# 05 · Experiencias de abandono en educación técnico-profesional

Fonseca Grandón y colaboradores publicaron en 2024 una investigación cualitativa con **78 exestudiantes en 18 grupos focales**, correspondientes a seis áreas formativas. Treinta participantes habían abandonado en primer año, 28 en segundo y 20 en tercero o más. El artículo organiza la experiencia en ingreso y expectativas, experiencia institucional, abandono y expectativas posteriores. [R3, pp. 1, 6–7]

## Mecanismos que aparecen en los relatos

La relación entre familia, trabajo y estudio forma un equilibrio expuesto a cambios. Se describen dificultades de cuidados, horarios, recursos tecnológicos, salud mental, vocación y comunicación administrativa. Varias se agudizaron durante el estallido social y la pandemia; por eso no corresponde trasladar sus frecuencias ni su configuración directamente a 2026.

En la página 10, una persona relata que pidió cambiar a vespertino al comenzar a trabajar, quedó esperando un correo y terminó fuera. Otra expresa que sintió que la institución la había abandonado. Los códigos de estos testimonios son **S2 y TG3**, respectivamente: corresponden a segundo año y tercero o más, no a primer año.

> El estudio aporta una posibilidad concreta: una necesidad comunicada puede no transformarse en una gestión resuelta. No demuestra que ese sea el principal motivo de abandono actual ni que ocurra igual en primer año.

## Qué cambia respecto de nuestras primeras ideas

Un diagnóstico de ejercicios puede abordar dificultades académicas, pero no resuelve un turno laboral incompatible o una gestión sin respuesta. Un predictor puede detectar deterioro de asistencia sin saber si corresponde ofrecer tutoría, revisar horarios o conversar sobre otra trayectoria. El contexto expresado por la persona es relevante para elegir una acción; no debe inferirse su historia completa desde una nota.

## Límites y responsabilidad al citar

El estudio es exploratorio, de una institución y con participantes que aceptaron contribuir; no es una muestra representativa nacional. Fue financiado por la Dirección de Estudios y Progresión Estudiantil de Duoc UC y declara el potencial conflicto de interés. Esto no invalida los relatos, pero debe acompañar su interpretación. [R3, pp. 13–14, 17]

La investigación también cuestiona tratar todo abandono como fracaso: algunas decisiones permiten reorientar un proyecto. Puente deberá mostrar alternativas sin presionar a permanecer ni presentar una pausa como falla moral.

# 06 · Qué existe ya: antecedentes locales y chatbot educativo

## UC: alertar, acordar apoyos y hacer seguimiento

Una noticia UC de noviembre de 2021 describe un programa implementado en 2019 que reemplazó antiguas causales de eliminación por alertas y acompañamiento. Incluye identificación de dificultades, apoyos de aprendizaje, personales y socioeconómicos, compromisos y revisión de cumplimiento. Una estudiante relata que inicialmente interpretó la alerta como amenaza de expulsión. [R5]

El antecedente importa tanto por la operación como por el lenguaje: una comunicación técnicamente correcta puede producir alarma. La noticia describe detección al término del semestre, pero **no verificamos que ese siga siendo el único mecanismo o calendario en 2026**. Tampoco sus resultados descriptivos son un experimento causal.

## Duoc: modelos y flujos de acompañamiento

Parra y Vallejo presentan una estrategia técnico-profesional con caracterización, indicadores y modelos predictivos de riesgo de retención y aprobación, más un flujo de actores y programas de apoyo. El trabajo pertenece a CLABES 2023 y su ficha editorial registra publicación en enero de 2024. Se revisaron ficha y resumen: no se auditaron métricas ni resultados del artículo completo. [R4]

**Conclusión de diferenciación:** alerta + recomendación + aprobación + seguimiento ya es una arquitectura conocida. No podemos afirmar que UC o Duoc carezcan de coordinación, ni vender como nueva una categoría que sus profesionales ya describen.

## Pounce: evidencia favorable, pero no de cualquier chatbot

GSU informó en marzo de 2022 un ensayo con 500 estudiantes de un curso de ciencias políticas online de otoño de 2021. La mitad recibió mensajes dirigidos sobre actividades, contenidos y apoyos, con posibilidad de preguntar al profesor. El comunicado reporta mejoras académicas y beneficios para ciertos grupos. [R6]

No se evaluó Puente, ni basta este antecedente para afirmar que un LLM reduce deserción. Tampoco debe confundirse rendimiento en un curso con retención institucional. Se consultó el comunicado de la universidad, no el estudio íntegro. La lección de diseño es acotar una intervención y medirla; no asumir que conversar produce impacto por sí mismo.

# 07 · Evidencia experimental: lo que MAAPS enseña y no enseña

## Resultado global frente a resultado institucional

La evaluación MAAPS estudió asesoría intensiva, proactiva y apoyada por tecnología en **11 universidades públicas de Estados Unidos**, con una muestra analítica final de **10.037 estudiantes** de bajos ingresos y/o primera generación. A seis años, no hubo un efecto estadísticamente significativo en graduación o persistencia para el conjunto. [R7, tablas 3–4]

En Georgia State, el informe final analizó 964 estudiantes y encontró una mejora ajustada de **7 puntos porcentuales en graduación a seis años**. La persistencia del conjunto de esa institución no mostró un efecto estadísticamente significativo. No corresponde transformar ese resultado en «7 puntos de retención de primer año» ni transferirlo automáticamente a Chile. [R7, tablas 9–13]

La intervención combinaba planificación de trayectoria, alertas y acciones humanas. La mayoría de los asesores comenzó con 150 estudiantes o menos. La evaluación documenta diferencias de implementación; Georgia State mantuvo el programa más tiempo que las otras instituciones. El ensayo no aísla el aporte del software frente al personal, su capacidad u otros componentes.

## Criterio humano: más que aprobar una salida de IA

Un preprint analiza mecanismos de asesoría en Georgia State utilizando 1.037 estudiantes, 5.269 reuniones y 1.888 comentarios. Encuentra indicios de que tutores incorporan contexto personal, financiero y de metas no disponible en el algoritmo. Su criterio estadístico es necesario, pero insuficiente para demostrar intervención experta. Es un análisis de mecanismos, no una aleatorización de cada recomendación. [R8]

Los 1.037 casos del preprint no son el mismo denominador que los 964 de la evaluación final. Además, la ficha de arXiv fecha la versión 3 el 14 de octubre de 2025, mientras su HTML contiene una fecha de 2026: este informe cita el historial oficial de 2025 y declara la discrepancia.

## Implicación para el prototipo

La supervisión humana tiene que modificar decisiones: corregir información, rechazar alternativas, reconocer falta de capacidad y acordar una acción. No basta un botón «aprobar». La capacidad del tutor será una restricción del sistema, no un recurso ilimitado. No se prometerá eficacia causal: primero se demostrará funcionamiento seguro y utilidad operativa.

# 08 · Síntesis crítica y elección provisional

## Comparación de direcciones exploradas

| Dirección | Fortaleza | Razón para no priorizarla sola |
| --- | --- | --- |
| Predictor + dashboard + mensajes | Encaje visible con alerta temprana | Antecedentes existentes; necesita datos y validación para probabilidades fiables |
| Diagnóstico de bloqueos de aprendizaje | Aporte semántico de IA y demo clara | Se aproxima a tutor adaptativo; relación indirecta con barreras laborales y administrativas |
| Seguimiento de solicitudes perdidas | Falla plausible respaldada por relatos | Puede reducirse a tickets; no basta para explicar qué alternativa es adecuada |
| Continuidad ante un cambio de condiciones | Une una señal anticipable con contexto y acción | Depende de procedimientos y capacidad reales todavía no verificados |

La elección provisional es la última, incorporando seguimiento de gestión como parte del recorrido, no como producto independiente. No se afirma que sea inédita en el mercado o en los sistemas institucionales. La diferenciación por demostrar será **comparar alternativas contra restricciones explícitas, conservar sus fundamentos y cerrar el circuito con el estudiante**.

## Cadena de hipótesis que debemos comprobar

- H1: un cambio de disponibilidad puede identificarse antes de una desvinculación de primer año.
- H2: parte de la fricción está en entender opciones, requisitos y responsables, no solo en falta de recursos.
- H3: existe al menos una gestión institucional utilizable y un responsable con capacidad de respuesta.
- H4: interpretar lenguaje cotidiano ahorra trabajo frente a un formulario sin aumentar errores.
- H5: el estudiante comprende y acepta qué se compartirá y qué ocurrirá después.

Los estudios consultados respaldan explorar estas preguntas, **no confirman las cinco hipótesis**. En particular, los relatos más ilustrativos de gestiones no resueltas no son de primer año. Las entrevistas de mañana deberán cubrir esa brecha y verificar qué está ya resuelto por los sistemas actuales.

## Puerta de decisión

Si no se confirma una ruta real, se construirá una demo de interacción con catálogo ficticio explícito y se declarará la falta de validación. Si el formulario con reglas resulta igual de útil y más seguro, se reducirá o retirará el LLM. Si mentores consideran que esta alerta de incompatibilidad no cumple el alcance, se ajustará antes del desarrollo, sin inventar un predictor para aparentar cumplimiento.

# 09 · Propuesta: Puente y su resultado concreto

**Propuesta de valor:** ayudar a estudiantes de primer año a convertir una incompatibilidad próxima entre trabajo y estudios en una consulta de continuidad respaldada, revisada por un tutor y con seguimiento. Puente no modifica condiciones institucionales; ayuda a entender qué se puede consultar, qué falta confirmar y quién asume el siguiente paso.

## Usuario, momento y problema acotados

- **Estudiante:** quiere continuar; un cambio de turno hace que su disponibilidad futura no coincida con actividades académicas.
- **Tutor:** necesita conocer el conflicto sin interpretar una historia extensa ni recibir datos sensibles innecesarios.
- **Encargado de ruta:** persona o unidad que puede responder una consulta concreta, no un destinatario inventado por la IA.
- **Momento:** al conocer el cambio, incluso antes de las primeras ausencias. También puede entrar tras una invitación de acompañamiento basada en señales explícitas, sin obligar a perfilarse.

## Resultado que debe dejar cada recorrido

Una ficha revisada con: restricciones confirmadas por el estudiante; evidencia del conflicto; alternativas verificadas o sus límites; responsable; fecha acordada; autorización de lo compartido; y estado del seguimiento. Una opción puede quedar «requiere consulta» o «no se ha encontrado una ruta confirmada». Eso es preferible a inventar una solución.

## Frase de producto y diferencia práctica

> «No te decimos que vas a abandonar. Te ayudamos a entender qué cambió, qué puedes consultar y quién te acompañará a resolverlo».

No es solo un chatbot si produce una comparación trazable y una gestión revisable. No es solo un gestor de tickets si comprende restricciones, descarta una ruta incompatible y muestra por qué. Estas son condiciones de diseño: si el prototipo no las demuestra, no habrá una diferenciación sustantiva.

## Relación con el desafío

La alerta es una **regla explicable de incompatibilidad futura**, no una probabilidad de deserción. La IA aporta interpretación y vinculación con evidencia; el componente de acción es una consulta de apoyo revisada y seguida por personas. Debe confirmarse esta lectura con mentores. No se presenta como un modelo predictivo validado de abandono.

# 10 · Alcance del MVP: qué entra y qué queda fuera

El MVP debe completar un recorrido con tres vistas sencillas, una institución de referencia, un tipo de cambio y un catálogo pequeño. La prioridad es una decisión demostrable, no una plataforma completa. Todo caso personal será sintético durante la competencia.

| Vista o componente | Incluido en el MVP | Límite explícito |
| --- | --- | --- |
| Estudiante | Consentimiento, relato, restricciones editables, comparación y autorización de resumen | No diagnóstico ni perfil oculto |
| Tutor | Evidencia, revisión, corrección, rechazo o validación y asignación de próximo paso | No decisión académica automatizada |
| Seguimiento | Responsable, fecha, estado, respuesta del estudiante y cierre | Registrar un mensaje no equivale a resolver |
| Catálogo | 3–5 fichas curadas y versiones; horarios y condiciones estructuradas | Cupo y autorización pueden quedar pendientes |
| Datos | 10–15 casos sintéticos para mostrar variedad; batería inicial de 12 pruebas | No entrenar ni evaluar un predictor con datos inventados |
| IA | Una llamada acotada con salida validada y recuperación de error | Sin agentes autónomos de gestión |

## Fuera de alcance

Integración con Banner, Canvas, Moodle, correo o WhatsApp; ingestión libre de todo el sitio institucional; entrenamiento de modelos; login institucional; despliegue multiinstitución; pagos; solicitudes reales automáticas; notificaciones externas; diagnósticos de salud mental; predicciones individuales de abandono.

Las vistas «estudiante» y «tutor» pueden ser modos de demostración. **Un selector de rol no implementa control de acceso.** Si se usa, el prototipo funcionará privado, con datos sintéticos y aviso visible. Un piloto requiere autenticación y autorización reales antes de incorporar personas.

## Prioridades de construcción

**P0:** consentimiento y edición, comparación determinista, revisión humana, seguimiento mínimo y un caso completo. **P1:** segunda ruta, prueba adversarial y vista de evidencia más pulida. **P2:** indicadores agregados, voz, filtros y estética adicional. Se corta P2 primero; no se recorta autorización, trazabilidad o reconocimiento de límites para ganar tiempo.

# 11 · Recorrido, decisiones humanas y estados

## Flujo funcional

1. El estudiante conoce propósito, uso de IA y alternativa sin IA. Autoriza por separado el procesamiento externo antes de llamar al modelo. Si no autoriza IA puede continuar por formulario; si no desea participar, no se registra un relato.

2. Declara el cambio en lenguaje libre o formulario. La IA propone una estructura; el estudiante corrige días, horas y plazo. Si faltan datos, se pregunta; no se completan por intuición.

3. Las reglas comparan disponibilidad con actividades del calendario. La alerta muestra conflicto, fecha y datos que la sustentan, además de la opción de corregirlos.

4. Se presentan alternativas del catálogo con procedencia, requisitos y pendientes. El estudiante elige cuáles quiere consultar y qué resumen compartir. El relato completo no se adjunta por defecto.

5. El tutor revisa la ficha, puede corregir o rechazar la recomendación y acuerda responsable y fecha. Validar una consulta no significa aprobar un cambio de jornada.

6. El estudiante acepta el próximo paso o solicita otro. Tras el seguimiento, indica si recibió ayuda. El tutor registra resolución, ausencia de respuesta o falta de capacidad sin equipararlas.

## Máquina de estados mínima

| Estado | Condición para entrar | Salida y responsable |
| --- | --- | --- |
| Borrador | Relato o formulario local | Estudiante confirma datos o elimina |
| Preparado | Restricciones revisadas | Estudiante autoriza resumen y destinatario |
| En revisión | Resumen autorizado | Tutor pide aclaración, rechaza o acuerda consulta |
| Acción acordada | Tutor y estudiante aceptan próximo paso | Se registra ejecución o límite de capacidad |
| En seguimiento | Gestión registrada con fecha | Estudiante confirma ayuda o tutor revisa pendiente |
| Cerrado | Motivo de cierre explícito | Ayuda confirmada, pausa elegida, retiro o sin solución |

**Retiro de autorización:** suspende nuevas divulgaciones y llamadas externas y abre cierre/revisión de datos. Una respuesta del modelo que llegue después del retiro no se incorpora al caso. No revierte mágicamente lo ya recibido por otra persona. **No respuesta:** no aumenta un puntaje de riesgo ni equivale a consentimiento. **Reapertura:** exige revisión manual y nuevas autorizaciones; nunca reactiva permisos anteriores automáticamente.

# 12 · Catálogo, datos y ejemplo de demostración

## Catálogo verificable

Cada ficha debe contener identificador, nombre, institución/unidad, destinatarios, restricciones, requisitos, canal, responsable confirmado o pendiente, fuente, fecha de revisión y versión. Una URL oficial no confirma cupos actuales. Si el documento no indica un dato, se conserva «desconocido» y se pide confirmación humana.

**Puerta de publicación:** una persona del equipo revisa cada condición utilizada en la demo contra la fuente. Las afirmaciones institucionales no verificadas no entran como hechos. Hasta contar con ello se usa un catálogo marcado en pantalla **«DEMO FICTICIA: no representa servicios o reglas de UC/Duoc»**.

## Escenario ficticio de punta a punta

Caso DEMO-01: estudiante de primer año, clases los martes y jueves de 18:30 a 21:00; nuevo turno termina a las 19:00 desde una fecha determinada. Para simplificar, el ejemplo no modela traslado y lo declara. El sistema encuentra superposición esos dos días. Si se añade tiempo de traslado, debe ser otro dato declarado, no una inferencia.

| Ficha ficticia | Evaluación del caso | Mensaje permitido |
| --- | --- | --- |
| Tutoría de contenidos de 16:00 a 17:00 | No es compatible con la disponibilidad declarada | «No resuelve este conflicto de horario» |
| Consulta de alternativas de sección | Procedimiento consultable; resultado y vacantes desconocidos | «Puedes solicitar revisión; no se garantiza cambio» |
| Conversación de planificación académica | Requiere confirmar horario de atención y efectos de posibles ajustes | «Hay información pendiente antes de recomendar» |

No se mostrarán estas fichas como políticas reales. Una segunda demo debe mostrar ausencia de rutas confirmadas, no una solución siempre feliz.

## Datos mínimos del caso

ID sintético, año de ingreso simulado, disponibilidad, calendario, fecha del cambio, restricciones revisadas, resumen autorizado, identificadores de opciones, evidencia de regla, estado, responsable y fecha. Evitar nombre real, RUT, empleador, ingresos detallados, diagnósticos o datos de familiares. Un piloto deberá justificar por separado cualquier campo adicional y su conservación.

# 13 · Arquitectura técnica y frontera de la IA

**Decisión propuesta:** aplicación web monolítica en Next.js/TypeScript, por familiaridad del desarrollador, con funciones de servidor y datos semilla locales. Se permite sustituirla por otra herramienta que el equipo domine. No se justifica separar frontend, microservicios y múltiples bases para este alcance.

## Flujo de componentes

Navegador → validación de entrada en servidor → adaptador de modelo → salida JSON validada → revisión del estudiante → motor de reglas y catálogo → revisión del tutor → registro del caso. El proveedor y modelo se eligen al confirmar las cuentas disponibles; no se supone una API particular ni un modelo garantizado por la organización.

| Responsabilidad | LLM | Reglas / personas |
| --- | --- | --- |
| Comprender «salgo a las siete desde la otra semana» | Propone significado y pregunta por fecha/días | Estudiante confirma; fecha exacta no se inventa |
| Comparar horarios y fechas | No calcula el resultado decisivo | Regla de superposición con datos explícitos |
| Vincular relato y fichas | Sugiere IDs del catálogo y explicación | Validador rechaza IDs y condiciones inexistentes |
| Elegibilidad, prioridad y cupo | No decide | Procedimiento institucional y responsable humano |
| Resumen a compartir | Borrador mínimo | Estudiante edita y autoriza; tutor revisa |

## Persistencia y fallos

Si solo se necesita la demo de un caso, usar memoria de servidor con reinicio controlado. Si el entorno ya permite SQLite, usarlo para estados; no agregar infraestructura remota por costumbre. Los JSON semilla serán de solo lectura y nunca contendrán claves. El reinicio debe ser una acción explícita y exclusiva del entorno sintético.

La clave API permanece en servidor y fuera del repositorio. Validar longitud, esquema y tipos de cada entrada. Ante timeout o salida inválida, ofrecer formulario y mantener borrador; no ejecutar acciones parciales. Un ejemplo precargado puede usarse como respaldo **rotulado como tal**, nunca simulado como generación en vivo.

El modelo no tiene herramientas para enviar correos, cambiar matrículas o llamar servicios externos. El catálogo está permitido por ID; cualquier instrucción encontrada en un relato o documento se trata como datos, no como una orden del sistema.

# 14 · Contratos, reglas y trazabilidad

## Contrato mínimo de interpretación

La función `interpretarContexto` recibe relato y referencias temporales explícitas. Devuelve `restriccionesPropuestas`, `camposFaltantes`, `resumenPropuesto` y `fragmentosDeOrigen`. Las fechas relativas sin referencia o los días omitidos permanecen pendientes. No se incluye `probabilidadDesercion`, diagnóstico ni etiqueta emocional inferida.

La función `compararRutas` recibe restricciones ya confirmadas y fichas vigentes del catálogo. Devuelve ID de ruta, estado —compatible, incompatible o pendiente—, IDs de condiciones y una explicación obtenida de esos datos. Una sugerencia de LLM nunca reemplaza la evaluación del motor.

## Regla principal de horario

Existe superposición cuando dos intervalos del mismo día y período de vigencia cumplen: inicio A anterior a fin B e inicio B anterior a fin A. Declarar zona horaria local y comparar intervalos normalizados. El MVP restringe intervalos al mismo día; turnos que cruzan medianoche se normalizan en dos tramos o se derivan a revisión, nunca se comparan silenciosamente de forma errónea.

**Ejemplo:** turno termina 19:00 y clase inicia 18:30: hay superposición. Si termina exactamente a 18:30 y no se conoce traslado, no se declara compatibilidad logística: solo ausencia de superposición horaria. El sistema debe mostrar esa limitación.

## Reglas invariantes

- Ninguna divulgación sin autorización vigente para resumen y destinatario concretos.
- Ninguna ruta, fuente o requisito ajeno al catálogo aprobado se presenta como verificado.
- Ninguna consulta pasa a «acción acordada» sin responsable, fecha y aceptación humana.
- «Sin información», «sin capacidad» e «incompatible» son resultados diferentes.
- Ningún caso se cierra como ayuda recibida solo porque se generó un texto o se registró envío.

## Registro de decisiones

Guardar cambio de estado, rol, fecha, versión del caso y del catálogo, regla aplicada, IDs de evidencia y corrección humana. Cambiar un horario confirmado invalida comparaciones previas. Rechazar una aprobación sobre una versión antigua y comprobar de nuevo el consentimiento al guardar, no solo al abrir la pantalla. El contenido personal no se duplica en logs técnicos. Las respuestas del modelo se validan antes de persistir. En producción o piloto se necesitan controles de acceso, conservación y auditoría todavía no implementados; el historial de demo no equivale a una auditoría institucional certificada.

# 15 · Ética operativa y consentimiento

Las medidas siguientes son compromisos de diseño del prototipo, no garantías absolutas ni asesoría jurídica. El checklist oficial de la competencia debe completarse y validarse en sus dos checkpoints antes del cierre técnico; este informe no lo sustituye. [R1, pp. 8–10]

## Tres decisiones separadas

**Usar IA:** explicar qué hace, quién provee el servicio y qué contenido recibiría. **Compartir un caso:** el estudiante elige campos y destinatario tras revisar el resumen. **Participar en evaluación:** autorización independiente del acceso a apoyos. No hay casillas premarcadas ni penalización por elegir formulario o conversación humana.

Para la demo se usan solo relatos sintéticos. Antes de un piloto, la institución debe definir proveedor, base de tratamiento aplicable, permisos, contratos, ubicación y conservación de datos. No se enviarán relatos reales a un proveedor por el solo hecho de que existe una clave API.

## Minimización visible

Pedir «no puedo asistir martes por la tarde», no nombre del empleador, sueldo, diagnóstico o datos de hijos. Avisar antes del relato que no incluya datos sensibles o de terceros. La IA puede omitir información en el resumen, pero no garantiza detectar todos los datos sensibles; por ello el relato libre requiere cuidado adicional y una alternativa estructurada.

El estudiante debe poder editar, no compartir, retirar autorizaciones para nuevos usos y solicitar cierre o revisión de eliminación conforme al procedimiento definido. Explicar que retirar autorización **no borra automáticamente las copias ya compartidas**. El piloto debe especificar qué se conserva y por qué, sin prometer borrado universal.

## Decisión humana demostrable

El tutor debe rechazar al menos una sugerencia incorrecta o incompleta durante las pruebas y registrar su corrección. El estudiante puede no aceptar la ruta, proponer otra o elegir pausa/cambio. No respuesta no significa consentimiento ni desinterés. No se usarán razones económicas, jornada, origen o estilo de escritura para reducir acceso a apoyo.

## Límite socioemocional

Puente no diagnostica ni sustituye profesionales. Si una persona comparte una situación que excede la coordinación académica, se ofrece el canal institucional verificado pertinente y revisión humana. No se inventan teléfonos, protocolos de urgencia ni evaluaciones clínicas para hacer parecer completa la demo.

# 16 · Registro de riesgos y mitigaciones observables

| Riesgo | Mitigación en el prototipo | Riesgo residual / prueba |
| --- | --- | --- |
| Datos sensibles innecesarios | Campos mínimos, aviso previo y resumen editable | El relato libre puede incluirlos; comprobar que no se comparte íntegro |
| Consentimiento bajo presión | Participación opcional y alternativa sin IA | Puede persistir temor institucional; preguntar comprensión y voluntariedad |
| Beneficio o cupo inventado | Catálogo cerrado, procedencia y estados pendientes | Una fuente real puede estar desactualizada; revisión manual |
| Sesgo por jornada o redacción | Regla observable, no puntuación demográfica; relatos equivalentes | La oferta institucional puede ser desigual; registrar brechas sin culpar al estudiante |
| Aprobación humana automática | Evidencia y corrección obligatoriamente disponibles | El tutor puede aprobar sin leer; medir errores detectados |
| Divulgación indebida | Selección de campos y destinatario; bloquear autorización ausente | Copias externas no controladas; no prometer revocación retroactiva |
| Apoyo sin capacidad | Mostrar cupo pendiente o falta de capacidad y responsable | Una lista de espera no resuelve el problema; limitar incorporaciones |
| Retener a cualquier costo | Permitir rechazo, pausa o cambio informado | Incentivos institucionales pueden presionar; evaluar autonomía |
| Inyección de instrucciones | Texto tratado como datos, esquema validado, sin herramientas de acción | El modelo puede obedecer parcialmente; filtrar y no ejecutar salida |
| Modelo o red indisponibles | Formulario funcional y ejemplo de respaldo identificado | La prueba en vivo puede no mostrar IA; declararlo al jurado |

## Condiciones de parada

Un envío sin autorización, una condición administrativa inventada presentada como cierta o una filtración entre vistas impide incorporar casos reales. Se corrige antes de continuar. Si el modelo añade datos no declarados, se rechaza la salida y se solicita revisión; no se reduce el problema a «la IA puede equivocarse».

## Responsabilidad

Asignar responsable y suplente de ética, conservar observaciones de mentoría y evidenciar las correcciones realizadas. Ni un checklist completo ni un botón humano demuestran ausencia de sesgo. Se mostrará al jurado una limitación conocida y cómo se contiene; ocultarla debilitaría tanto ética como factibilidad.

# 17 · Validación temprana y puertas de decisión

## Entrevistas breves antes de cerrar el alcance

Durante la inmersión, intentar 3–5 conversaciones de 5–8 minutos: dos estudiantes de primer año, un tutor y alguien que gestione apoyos; si hay oportunidad, una coordinación académica. La disponibilidad no está garantizada. No grabar ni recoger detalles sensibles innecesarios. Anotar rol, situación, paso donde hubo fricción y permiso para utilizar una cita anónima.

Preguntas propuestas: «Cuéntame la última vez que un cambio externo complicó estudiar»; «¿Qué hiciste y qué ocurrió después?»; «¿Dónde buscaste orientación?»; «¿Qué quedó pendiente?»; «¿Qué no querrías compartir?». Al tutor: «¿Cómo se sabe quién asume el caso y cuándo terminó?»; «¿Qué parte ya resuelve su sistema actual?». No preguntar «¿te serviría nuestra app?» como validación principal.

## Puertas de avance

| Puerta | Evidencia mínima buscada | Si no se cumple |
| --- | --- | --- |
| Problema de primer año | Episodio concreto y brecha reconocible en el recorrido | Mantener hipótesis y no afirmar validación |
| Ruta posible | Documento, condiciones y responsable revisados | Demo ficticia explícita; no recomendaciones institucionales reales |
| Encaje con desafío | Mentor acepta la alerta explicable y el flujo de acción | Reformular antes de desarrollar, no fabricar probabilidades |
| Capacidad operativa | Responsable y plazo factibles | No iniciar piloto; mostrar límite de capacidad |
| Aporte de IA | Ventaja frente a formulario con mismas reglas | Simplificar o retirar LLM si no aporta |

## Prueba rápida de comprensión

Con el prototipo, pedir a 3 personas que expliquen qué información se compartirá, quién responderá, qué está confirmado y qué sigue pendiente. Registrar errores y cambios de redacción. Tres pruebas no demuestran usabilidad general, pero sí pueden revelar confusiones críticas para corregir antes del pitch.

## Preguntas para los mentores

¿Existe hoy una gestión similar? ¿Qué alternativas son realmente posibles ante cambio de turno? ¿Quién tiene autoridad para responder y en qué plazo? ¿Qué efectos administrativos requieren asesoría adicional? ¿Qué datos no debemos pedir? Obtener permiso para documentar respuesta y distinguir orientación informal de aprobación institucional.

# 18 · Plan de jornada y reparto del equipo

La agenda oficial deja **135 minutos** explícitos para desarrollo, integración y ajustes; el resto del trabajo de definición, evidencia, pruebas y pitch también requiere responsables. A las 14:45 se congela el prototipo y el checklist debe estar completo. Las mentorías y checkpoints se acomodan a las horas que indique la organización. [R1]

| Horario oficial | Actividad del equipo | Entregable / criterio de cierre |
| --- | --- | --- |
| 08:30–09:30 | Acreditación, equipo/reubicación, red, cuentas y seguridad del dispositivo | Roles confirmados; dudas de preparación previa consultadas |
| 09:30–10:00 | Escuchar reglas y rúbrica detallada | Diferencias con estas bases registradas |
| 10:00–10:45 | Entrevistas, situación de primer año y revisión de alternativas existentes | Problema acotado, evidencia y primera mentoría según disponibilidad |
| 10:45–11:15 | Decidir señal, ruta y límites | Una historia de demo; puertas críticas revisadas |
| 11:15–11:45 | Diseñar contratos, catálogo, flujo y pruebas | Datos semilla, boceto de tres vistas y guion aceptados |
| 11:45–12:45 | Construcción del recorrido P0 | Caso completo navegable; sin depender todavía de servicios externos |
| 12:45–13:30 | Almuerzo / pausa de competencia | No depender de trabajar durante la pausa |
| 13:30–14:15 | Integrar IA, reglas, revisión y seguimiento; probar | Recorrido integrado, límites visibles y segunda mentoría según disponibilidad |
| 14:15–14:45 | Corregir críticos, validar checklist, congelar | Demo reproducible, declaración IA y respaldo de la versión |
| 14:45–16:15 | Preparar y ensayar pitch sobre versión congelada | Cinco minutos medidos, capturas y respuestas a preguntas |

## Roles, no silos

**A · Técnica e integración:** una persona responsable del recorrido completo. **B · Catálogo y operación:** verifica fuentes, requisitos y quién actuaría. **C · Investigación y ética:** entrevistas, consentimientos y checkpoints, con suplente. **D · Pruebas y experiencia:** casos adversariales, comprensión y registro de errores. **E · Narrativa e impacto:** pitch, métricas, piloto y respaldo de demo.

Los roles pueden combinarse y no presuponen cinco programadores. Ante reubicación se transfieren problema, límites y entregables, no una implementación impuesta. Si solo hay un desarrollador, los demás roles siguen siendo trabajo sustantivo y deben avanzar en paralelo.

# 19 · Sprint técnico de 135 minutos y contingencias

## Construcción sin dependencias frágiles

| Bloque | Objetivo | Prueba de salida |
| --- | --- | --- |
| 11:45–12:00 · 15 min | Esqueleto de vistas, semilla y estado del caso | Caso DEMO-01 visible sin modelo |
| 12:00–12:20 · 20 min | Formulario/revisión y motor de incompatibilidad | Conflicto correcto; campo faltante no se inventa |
| 12:20–12:45 · 25 min | Comparación de rutas, autorización y revisión tutor | Una ruta descartada y una consulta pendiente revisable |
| 13:30–13:50 · 20 min | Adaptador IA, esquema, validación y error controlado | Relato se estructura o ofrece fallback honesto |
| 13:50–14:15 · 25 min | Acción acordada, seguimiento y pruebas integradas | Estado y responsable sobreviven al recorrido previsto |
| 14:15–14:30 · 15 min | Corregir fallos críticos y revisar evidencias | Sin inventar condiciones ni compartir sin permiso |
| 14:30–14:45 · 15 min | Congelar, comprobar checklist y respaldo | Arranque conocido, datos sintéticos y demo ensayada |

Esta distribución es una estimación. Catálogo, guion, pruebas y ética se preparan en paralelo desde las etapas oficiales de inmersión y diseño; no se construyen seis módulos independientes para unirlos al final.

## Reglas de recorte

- Si no hay catálogo real a las 11:15: usar fichas ficticias visibles y declarar la limitación.
- Si no hay credencial/API operativa al inicio de integración: conservar formulario y caso de IA precargado rotulado; informar que la integración generativa no está demostrada. Es una contingencia, no equivalente al objetivo de IA funcional.
- Si el seguimiento no cabe: una tarjeta con responsable, fecha y confirmación manual; no construir mensajería.
- Si el tiempo se agota: un caso y un contraste negativo; quitar filtros, gráficos y voz.
- Si falta equipo: renegociar alcance y roles con organización; no presuponer participación individual permitida.

## Congelamiento y respaldo

Definir un punto de congelamiento: copia identificada o commit con hora, instrucciones de arranque y datos de demo. Confirmar el mecanismo oficial que soliciten. Capturas o grabación de respaldo deben corresponder a esa versión y no sustituir silenciosamente una función que no existe. No modificar el prototipo después de 14:45 para que la demo aparente más de lo evaluable.

# 20 · Pruebas y criterios de aceptación

## Batería mínima para el cierre técnico

| ID | Escenario | Resultado esperado |
| --- | --- | --- |
| T01 | Turno nuevo se superpone con clase | Alerta con día, intervalo y datos de origen |
| T02 | No se superponen, traslado desconocido | No inventar compatibilidad logística |
| T03 | Relato omite días o fecha | Pregunta/aclaración; no completar por intuición |
| T04 | Tutoría coincide con trabajo | Ruta incompatible, aunque parezca apoyo pertinente |
| T05 | Ninguna alternativa confirmada | Abstención y consulta humana, no ruta inventada |
| T06 | Catálogo no especifica cupo | «Pendiente», nunca «vacante garantizada» |
| T07 | El estudiante no autoriza resumen | Tutor no recibe contenido ni inicia gestión |
| T08 | Retiro antes de una nueva divulgación | Bloqueo de nuevos usos y cierre/revisión según política |
| T09 | Texto pide ignorar reglas o inventar un beneficio | No cambia catálogo ni ejecuta instrucciones |
| T10 | Timeout o JSON inválido del modelo | Conserva borrador y ofrece formulario |
| T11 | Relatos equivalentes con distinta redacción | Mismas restricciones confirmadas y misma evaluación de reglas |
| T12 | Se registra envío pero no respuesta | Sigue pendiente; no «ayuda recibida» |

## Criterios P0

Completar DEMO-01 desde consentimiento hasta próximo paso y seguimiento. Todas las rutas emitidas pertenecen al catálogo y muestran fundamento. El tutor puede corregir; el estudiante puede no compartir o no aceptar. No hay acciones administrativas automáticas ni datos personales reales. El caso negativo funciona. La demo arranca de un estado conocido y no depende de una integración oculta.

Estos son criterios de aceptación propuestos: solo se marcarán cumplidos tras ejecutar las pruebas. No se incluirán resultados ficticios en la presentación. Pruebas unitarias prioritarias: superposición, normalización de intervalos, rechazo de IDs desconocidos y barrera de autorización. Las pruebas de interfaz pueden ser manuales en la jornada si no hay tiempo de automatización.

# 21 · Evaluación del aporte de IA e impacto medible

## Comparación contra una alternativa sin IA

Construir una base con formulario + reglas + el mismo catálogo. Compararla con lenguaje libre + LLM + las mismas reglas. Así no se atribuye al modelo el valor que corresponde a ordenar servicios o calcular horarios. Una salida más extensa no cuenta como mejor resultado.

Usar un conjunto de hasta 20 casos sintéticos etiquetados por una persona, si el tiempo lo permite. Para la jornada bastan las 12 pruebas mínimas y una comparación exploratoria pequeña, reportando el número real. Separar campos omitidos, campos inventados y correcciones. Si hay participantes, alternar orden y evitar que aprendan el mismo caso antes de la segunda condición.

| Métrica | Denominador / cálculo | Meta propuesta, no resultado |
| --- | --- | --- |
| Extracción correcta | Campos correctos / campos etiquetados | ≥90%; no ocultar campos añadidos |
| Respaldo de recomendaciones | Opciones con evidencia / opciones emitidas | 100%; cero condiciones inventadas |
| Divulgación no autorizada | Casos con fuga / escenarios de permisos probados | 0; cualquier incidente bloquea uso real |
| Comprensión del próximo paso | Personas que explican paso y responsable / personas probadas | ≥80%, informando conteos y muestra pequeña |
| Tiempo total de gestión | Lectura, corrección y revisión por caso | Explorar reducción mediana ≥20% sin empeorar seguridad |

No alcanzar una meta no se resuelve cambiándola después de ver los resultados. Se reporta lo observado y se decide si simplificar. Veinte casos sintéticos no estiman eficacia real, sesgo poblacional o reducción causal de abandono.

## Indicadores para un piloto posterior

Casos revisados dentro del plazo entre casos cuyo plazo venció; estudiantes que confirman ayuda entre derivaciones con seguimiento vencido; pendientes sin responsable; correcciones del tutor; minutos por caso; retiro voluntario y no respuesta separados. Antes de fijar mejoras se mide la línea base del proceso actual.

La retención se estudiaría más adelante, con seguimiento suficiente, definiciones SIES claras y un diseño ético apropiado. No se fabricarán porcentajes de «deserción evitada» a partir de simulaciones, satisfacción o aceptación de una recomendación.

# 22 · Piloto, adopción, recursos y continuidad

## Piloto propuesto de 2–4 semanas

**Preparación:** socio institucional, responsable y suplente, catálogo vigente, acceso por roles, tratamiento de datos autorizado, consentimiento comprensible y procedimiento de incidencias. Sin estas condiciones no se reciben casos reales. Una demo sintética puede mostrar viabilidad técnica, no sustituir esta preparación.

**Semana 1:** revisión en paralelo al flujo actual, sin envíos ni decisiones automáticas. Medir tiempo real y errores. **Semanas 2–3:** incorporar voluntarios de una carrera y un tipo de necesidad, solo si el responsable aprueba las condiciones. **Semana 4:** revisar utilidad, carga, autonomía, errores y decisión de continuar, rediseñar o detener. El calendario se ajustará a disponibilidad real.

## Capacidad antes que promesas

El máximo de incorporaciones se calcula a partir de minutos disponibles del tutor divididos por minutos observados por caso, descontando seguimiento y margen de contingencia. No se fija un volumen ficticio de estudiantes atendidos. Al saturarse, detener incorporaciones y ofrecer el canal existente, sin ocultar espera o convertirla en una promesa de resolución.

## Recursos y costos

Registrar horas de tutoría, verificación de catálogo, soporte, desarrollo, evaluación, alojamiento y consumo del modelo. El costo de API se estima con tokens efectivamente medidos y tarifas verificadas del proveedor elegido. No hay presupuesto monetario defendible mientras no se conozcan modelo, frecuencia de uso y capacidad humana.

Reportar costo por caso revisado y por ayuda confirmada, separando puesta en marcha y operación. Mantener el catálogo tiene costo y responsable: una fuente desactualizada puede dañar aunque el modelo funcione correctamente.

## Criterio de adopción

Continuar si mejora comprensión o coordinación sin elevar riesgos ni carga total de forma injustificada. No escalar de institución antes de demostrar que alguien mantiene contenidos, responde y evalúa. La transferencia a otra sede requiere revisar sus procedimientos, horarios y capacidad; no basta duplicar una interfaz. La innovación abierta exige documentar aprendizajes y límites, no publicar datos de estudiantes. [R1]

# 23 · Pitch, demo y defensa ante el jurado

El formato oficial es 5 minutos de pitch con demostración y 3 minutos de preguntas, por 1 o 2 representantes. El jurado hará al menos una pregunta ética. La presentación debe mostrar la versión congelada a las 14:45. [R1, pp. 9–10]

| Tiempo | Mensaje | Evidencia visible |
| --- | --- | --- |
| 0:00–0:35 | Una persona quiere continuar y cambió su turno | Caso ficticio identificado; sin dramatización atribuida a usuario real |
| 0:35–1:05 | No basta detectar; hay barreras de conciliación y gestión | SIES y estudio cualitativo, sin confundir causas o primer año |
| 1:05–1:30 | Puente convierte contexto en una consulta acompañada | Aporte delimitado de IA, reglas y personas |
| 1:30–3:00 | Demo de 90 segundos | Revisión, descarte de ruta, evidencia y siguiente paso |
| 3:00–3:45 | Autonomía, privacidad y límites | No compartir sin permiso; tutor corrige; cupo pendiente |
| 3:45–4:25 | Qué probamos y qué falta | Resultados reales de pruebas, comparación sin IA o plan pendiente |
| 4:25–5:00 | Cómo se probaría en operación | Piloto acotado, responsable por confirmar y condiciones de parada |

## Secuencia de demo

20 segundos para declarar el cambio y editar restricciones; 20 para mostrar el conflicto; 20 para descartar una tutoría incompatible y abrir una consulta respaldada; 20 para revisión del tutor y aceptación; 10 para mostrar seguimiento y límites. No simular que el futuro seguimiento ocurrió realmente: se cambia a un estado de prueba identificado.

## Preguntas difíciles

**«¿Por qué no un formulario?»** Porque el valor del LLM está por comprobar en interpretar relatos; si no mejora tiempo y exactitud, conservaremos formulario y reglas. **«¿Ya reduce abandono?»** No: demostramos un flujo sintético; aún no hay evaluación de impacto. **«¿Qué aporta frente a lo existente?»** Una mejora hipotética de comparación y cierre, pendiente de contrastar con los sistemas actuales. **«¿Y si no hay cupos?»** Lo mostramos y derivamos a consulta, sin inventarlos. **«¿Quién decide?»** Estudiante y responsables institucionales; la IA no aprueba cambios.

# 24 · Rúbrica, pendientes y próxima iteración

## Evidencias para cada criterio oficial

| Criterio | Peso | Qué debe quedar demostrado |
| --- | --- | --- |
| Problema y usuario | 10% | Fuentes bien interpretadas, situación de primer año y entrevistas si se logran |
| Uso pertinente de IA | 15% | Interpretación útil y límites; diferencia frente a formulario |
| Factibilidad y prototipo | 15% | Recorrido completo, reglas correctas, fallback y alcance honesto |
| Ética y privacidad | 25% | Consentimiento real, minimización, corrección y decisión humana visible |
| Impacto y escalabilidad | 25% | Acción concreta, capacidad de respuesta, métricas y piloto sin promesas causales |
| Pitch | 10% | Una historia comprensible, demo breve y defensa honesta |

**Requisito de admisibilidad separado:** checklist oficial completo y validado en dos checkpoints antes de las 14:45. Ninguna suma de funcionalidades compensa no presentarlo. La rúbrica detallada del webinar puede añadir precisiones y debe prevalecer sobre interpretaciones de este informe. [R1]

## Pendientes que cambian el plan

- Equipo efectivo, perfiles y reubicación: confirmar con organización.
- Permiso para preparación previa, uso de herramientas propias y recursos de IA: consultar, no asumir.
- Documento vigente y responsable de una alternativa real: verificar antes de sustituir el catálogo ficticio.
- Necesidad concreta de primer año: entrevistar; no transferir automáticamente testimonios de cursos superiores.
- Mecanismo actual de acompañamiento: averiguar qué parte ya está resuelta y dónde cabe una mejora.
- Lectura del alcance de alerta temprana: validar con mentor y rúbrica detallada.

## Qué afinar después de leer el documento

Confirmar el caso laboral; elegir una ruta verificable y un contraste incompatible; acordar la decisión humana a demostrar; reducir el recorrido a 90 segundos; escoger tecnología según el equipo y las cuentas disponibles.

**Estado de esta versión:** propuesta revisable, sin producto implementado ni entrevistas, pruebas o pilotos propios. Metas, roles y calendario técnico son estimaciones. El nombre es provisional y el Markdown permite afinar la siguiente versión.

# Bibliografía · Fuentes principales [R1–R4]

**[R1] Pontificia Universidad Católica de Chile y Duoc UC. (2026). Bases oficiales: Hackathon de Inteligencia Artificial Aplicada, Congreso Social UC 2026 (v1).** Documento proporcionado por el participante, 12 páginas. Archivo local: `material_preparacion/Bases_Hackathon_IA_Congreso_Social_UC_2026-1.pdf`.

Lectura completa. Localizadores: desafíos pp. 4–7; agenda p. 7; ética p. 8; evaluación y admisibilidad pp. 9–10; condiciones generales pp. 11–12. Se usa como norma del evento, sujeta a aclaraciones oficiales posteriores. No se ha recibido en esta investigación la rúbrica detallada ni el checklist oficial del webinar.

**[R2] Ministerio de Educación, Subsecretaría de Educación Superior, Servicio de Información de Educación Superior. (2026, agosto). Informe de retención de 1er año de pregrado: cohortes 2021–2025.**

[Portal oficial de informes y anexos](https://www.mifuturo.cl/informes-retencion-de-primer-ano/) · [PDF del informe 2026](https://www.mifuturo.cl/wp-content/uploads/2026/08/Informe-de-Retenci%C3%B3n-de-1er-A%C3%B1o-de-Pregrado-2026.pdf).

PDF leído completo, 33 páginas. Localizadores: definiciones pp. 3–4; resultados pp. 5–6; trayectorias y tabla 1 pp. 8–10; exclusión metodológica p. 12; tipo de carrera y jornada pp. 13–14; beneficios pp. 28–29. Corte de matrícula: 30 de abril de cada año. Datos descriptivos, no estimación causal de intervención. Consulta: 5 de noviembre de 2026.

**[R3] Fonseca Grandón, G., Parra Venegas, A., García de Magalhaes-Calvet, B., y Oñate Vargas, D. (2024). Abandono en carreras de la Educación Superior Técnico-Profesional: un análisis de la experiencia institucional y expectativas de sus estudiantes. Pensamiento Educativo, Revista de Investigación Educacional Latinoamericana, 61(1), 1–17.** DOI: 10.7764/PEL.61.1.2024.4.

[PDF público del artículo](https://www.scielo.cl/pdf/pel/v61n1/0719-0409-pel-61-01-00104.pdf) · [Identificador DOI](https://doi.org/10.7764/PEL.61.1.2024.4).

Lectura completa. Localizadores: diseño y muestra pp. 5–7; testimonios S2/TG3 p. 10; experiencias pp. 11–12; conclusiones pp. 13–14; financiamiento y conflicto de interés p. 17. Estudio cualitativo de 78 exestudiantes/18 grupos focales; contexto marcado por pandemia. No generalizar prevalencias ni atribuir a primer año los testimonios de segundo o tercero. Consulta: 5 de noviembre de 2026.

**[R4] Parra, A., y Vallejo, N. (2024). Estrategia de acompañamiento para la progresión estudiantil: aprendizajes y reflexiones para un proyecto en marcha en educación superior técnico profesional. Congresos CLABES, 1(1).**

[Ficha editorial y resumen](https://portalrevistas.ucb.br/index.php/clabes/article/view/16756).

Número correspondiente a CLABES XII, Temuco, 2023; fecha editorial 1 de enero de 2024. Se verificaron ficha y resumen, no el artículo íntegro. Autoras afiliadas a Duoc UC. Permite documentar antecedentes, no auditar rendimiento de modelos o establecer causalidad de sus resultados. Consulta: 5 de noviembre de 2026.

# Bibliografía · Antecedentes y evaluación [R5–R8]

**[R5] Krebs, A. (2021, 5 de noviembre). Alertas y permanencia para mejorar el desempeño académico. Pontificia Universidad Católica de Chile.**

[Noticia institucional](https://www.uc.cl/noticias/alertas-y-permanencia-para-mejorar-el-desempeno-academico/).

Página leída. Autoría periodística al pie; fecha de publicación confirmada en metadatos y modificación de 10 de noviembre de 2021. Balance histórico de implementación iniciada en 2019. No se interpreta como evaluación causal ni como descripción íntegra de funciones vigentes en 2026. Consulta: 5 de noviembre de 2026.

**[R6] Georgia State University. (2022, 21 de marzo). Classroom Chatbot Improves Student Performance, Study Says. Georgia State News Hub.**

[Comunicado institucional sobre PolsPounce](https://news.gsu.edu/2022/03/21/classroom-chatbot-improves-student-performance-study-says/).

Se leyó el comunicado, no el estudio completo. Informa un ensayo de 500 estudiantes en un curso online de otoño de 2021, con resultados académicos y subgrupos. No describe un ensayo de LLM ni establece una reducción general de abandono institucional. No convertir porcentajes relativos del comunicado en puntos porcentuales. Consulta: 5 de noviembre de 2026.

**[R7] Rossman, D., Kurzweil, M., y Lewis, B. (2023, 16 de mayo). MAAPS Advising Experiment: Evaluation Findings after Six Years. Ithaka S+R.** DOI: 10.18665/sr.318895.

[Informe del evaluador](https://sr.ithaka.org/publications/maaps-advising-experiment-evaluation-6-years/) · [Identificador DOI](https://doi.org/10.18665/sr.318895).

Revisado por el subagente de evidencia en el texto completo. Localizadores: Summary, Overview of the MAAPS Intervention, Implementation Study Findings; tablas 3–4 para muestra global y 9–13 para GSU. Muestra analítica final global 10.037; GSU 964. Resultado global no significativo; resultado favorable de graduación en GSU no es retención de primer año. Consulta: 5 de noviembre de 2026.

**[R8] Schechtman, K., Brandon, B., Stafford, J., Li, H., y Liu, L. T. (2025). Discretion in the Loop: Human Expertise in Algorithm-Assisted College Advising (versión 3) [Preprint]. arXiv.** DOI: 10.48550/arXiv.2505.13325.

[Ficha e historial oficial](https://arxiv.org/abs/2505.13325v3) · [Texto HTML](https://arxiv.org/html/2505.13325v3).

Se revisaron texto y metadatos. Localizadores: secciones 3.1.2 y 4.3; contribuciones y discusión. Historial oficial: primera versión 19 de mayo de 2025; v3, 14 de octubre de 2025. El HTML muestra además una fecha de agosto de 2026 discrepante: se cita el historial del repositorio. Preprint, no publicación revisada por pares verificada. Sus 1.037 casos no se intercambian con los 964 del informe final MAAPS. Consulta: 5 de noviembre de 2026.
