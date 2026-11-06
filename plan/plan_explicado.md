# Puente: qué queremos hacer y cómo lo haríamos

Plan explicado para conversar con el equipo · 6 de noviembre de 2026

## La idea, sin lenguaje técnico

Imagina que estás estudiando y trabajando. Te cambian el turno y ahora sales
cuando tus clases ya terminaron. Quieres seguir estudiando, pero no sabes cuánto
te afectará faltar, qué alternativas permite tu institución ni a quién pedirle
ayuda. Buscar un reglamento no necesariamente te resuelve esa duda: primero
tienes que saber qué buscar y después entender si lo que encontraste aplica a ti.

**Puente sería una aplicación que te ayuda a ordenar ese problema y llevarlo a
una conversación útil con tu tutor o coordinación de carrera.** Te explica qué
pasaría con tu asistencia si el conflicto continúa, busca opciones respaldadas
en el reglamento y te ayuda a preparar el siguiente paso. Tú decides qué contar
y qué compartir; una persona revisa contigo las alternativas.

No queremos hacer una pantalla que simplemente diga «este estudiante está en
riesgo». Queremos que la persona salga diciendo: «entiendo qué me está pasando,
sé qué puedo consultar y tengo claro quién me acompañará y cuándo».

## Qué mostraríamos en la hackatón

Un recorrido corto y completo: una estudiante cuenta su cambio de turno; la
aplicación muestra un problema de asistencia que todavía puede conversar; le
explica opciones con sus fuentes; ella autoriza un resumen; el tutor lo revisa
y acuerdan una acción. Después se ve cómo se comprobaría si recibió ayuda.

**Eso es lo que proponemos construir. Todavía no está construido.** Para mostrarlo
usaremos una estudiante, horarios y registros ficticios, junto con normas reales
que ya revisamos. No necesitamos conectarnos a los sistemas académicos para
demostrar la idea.

En las páginas siguientes explicamos el caso, las pantallas, el papel de la IA,
el trabajo del equipo, la demostración y las decisiones que aún debemos tomar.
La intención es que puedas juzgar si la idea te convence, no que tengas que
descifrar una especificación de software.

# 1. Qué problema estamos intentando resolver

## No todo se arregla con estudiar más

Cuando hablamos de deserción es fácil pensar primero en malas notas o falta de
motivación. Pero una persona también puede querer continuar y encontrarse con
una dificultad muy concreta: sus obligaciones de trabajo ya no caben junto a
su horario de clases. Una tutoría de contenidos no arregla necesariamente ese
choque, y un mensaje automático de «mejora tu asistencia» puede hacerla sentir
culpable sin ofrecerle una salida.

Nuestro foco sería **el momento en que cambian las condiciones para estudiar**.
No pretendemos abarcar todas las causas de abandono. Para la primera versión
elegimos una: cambio de turno laboral durante el primer año.

## Por qué vale la pena explorar este caso

La investigación previa encontró relatos chilenos de dificultades para conciliar
trabajo y estudio y de gestiones que quedaron sin respuesta. Uno cuenta que
pidió cambiarse a vespertino al empezar a trabajar, esperó un correo y terminó
fuera. Ese testimonio es de segundo año: sirve para entender una falla posible,
no para afirmar que ya validamos el problema en primero. [1]

También sabemos que UC y Duoc ya tienen experiencias de alertas y acompañamiento.
Por eso nuestra propuesta no es «inventar las alertas». La mejora que buscamos
es conectar cuatro cosas que, juntas, podrían facilitar una gestión: **entender
el contexto, explicar la consecuencia, encontrar una alternativa pertinente y
comprobar qué ocurrió después**.

## Cómo llegaría una persona a Puente

Proponemos que el tutor invite a todo primer año a un chequeo breve por un canal
institucional que ya se use: «¿Cambió algo que te dificulte asistir? ¿Quieres
revisar opciones con alguien?». La aplicación no enviará esos mensajes durante
la demo: mostraremos el enlace como si la estudiante lo hubiera recibido.

Responder sería voluntario. No contestar no generaría una etiqueta ni una
conclusión sobre la persona. Tampoco suponemos que así llegaremos a todos:
quienes no ven el mensaje, no confían en el sistema o prefieren conversar
seguirían necesitando una vía humana.

# 2. El caso que recorreríamos en la demo

## Conozcamos a Camila

Camila es un personaje ficticio. Está en primer año y trabaja. En nuestro ejemplo
tiene una asignatura teórica los martes y jueves de 18:30 a 21:00. Le anuncian
un nuevo turno que esos mismos días termina a las 21:30: no es llegar un poco
tarde, es no poder asistir a esas clases.
El turno comienza antes de la clase del 10 de noviembre y se mantiene durante
las ocho sesiones restantes; ese es un supuesto explícito del ejemplo.

Situamos el caso al inicio del **10 de noviembre de 2026**, antes de la clase
de ese día. En el horario ficticio de esa asignatura hay 33 sesiones de igual
peso: 25 ya ocurrieron y quedan ocho hasta el 3 de diciembre. Camila asistió a
22 de las 25 realizadas. Hoy aparece con 88% de asistencia.

## Qué descubre la aplicación

Si pierde las ocho clases restantes, terminaría con **22 asistencias de 33:
66,7%**. El reglamento establece 70% para actividades teóricas cuando el programa
no fija un porcentaje específico. En ese ejemplo se necesitan 24 asistencias,
porque 23 de 33 todavía queda bajo 70%. [2]

Ese es el aviso útil: aunque su porcentaje actual se ve bien, el nuevo turno
puede cambiar el resultado. La aplicación podría decirle:

> «Con este horario no podrías asistir a las ocho clases que quedan. Si eso
> ocurre, tu asistencia terminaría bajo el mínimo que estamos usando en este
> ejemplo. Revisemos los datos y qué puedes conversar con tu coordinación».

Con dos asistencias adicionales superaría ese mínimo bajo los supuestos del
caso. Eso abre una pregunta concreta: ¿es posible negociar dos cambios de turno?
No afirmamos que dependa solo de Camila ni que su empleador vaya a aceptarlo.

## Qué no estamos afirmando con las cifras

Son datos inventados para explicar el funcionamiento. El 5 de diciembre figura
en el calendario como hito de estado de reprobación por inasistencia, pero no
demuestra por sí solo cuándo termina de contar la asistencia de cada asignatura.
En una situación real hay que confirmar el horario completo, si cuentan otras
actividades y cuál es el requisito del curso. [3]

Puente no declararía que Camila reprobó. Mostraría una consecuencia posible para
conversarla antes, con datos que ella y coordinación puedan corregir.

# 3. Qué vería la estudiante, paso a paso

## Primero: poder contar el problema

Camila abre el enlace desde su teléfono. Antes de escribir, ve para qué se usará
su información y puede elegir entre contar la situación con ayuda de IA o llenar
un formulario sencillo. No se le exige explicar su vida personal para consultar
por un conflicto de horario.

Si elige la IA, podría escribir: «Me cambiaron el turno de la pega. Los martes
y jueves saldré a las nueve y media y tengo clases hasta las nueve. No quiero
perder el semestre». Ese texto solo se procesa externamente si ella lo autoriza.

La aplicación le devuelve algo que puede revisar: días afectados, nuevo horario,
fecha de inicio y preguntas pendientes. Si no dijo desde cuándo cambia el turno,
se lo pregunta. No rellena ese dato por intuición. Los registros de asistencia
y el calendario del curso también deben estar disponibles y confirmados;
en la demo los cargaremos de antemano como datos ficticios.

## Después: entender el efecto y comparar caminos

Ve la explicación de asistencia del caso anterior y puede corregirla. Luego
aparecen opciones con palabras simples: explorar ajustes puntuales de turno;
consultar qué alternativas académicas aplican ahora; o planificar un cambio
de jornada para el próximo período. Cada opción explica qué se sabe y qué falta.

La aplicación no le dirá que tiene una vacante ni que puede retirar una asignatura
fuera de plazo. También podrá mostrar que una opción no corresponde: por ejemplo,
una justificación para una evaluación por una causa laboral extraordinaria no
cubre automáticamente un cambio de turno permanente.

## Por último: elegir qué compartir

Camila ve el resumen antes de que llegue al tutor. Puede corregirlo, quitar
detalles o decidir no compartirlo. Autorizar que la IA ayude a interpretar un
texto no significa autorizar que otras personas lo lean.

Si acepta, el tutor recibe el resumen elegido, el conflicto y las preguntas que
ella quiere resolver. No necesita recibir todo el relato original. Camila
también puede pedir orientación humana o detener el proceso.

# 4. Qué haría el tutor y cuál sería el resultado

## No es una bandeja llena de alertas sin salida

El tutor abriría una ficha breve: qué cambió, qué clases se ven afectadas, cómo
se calculó el posible problema y qué alternativas quiere consultar Camila.
También vería los artículos que respaldan esas vías, no solo un texto convincente
producido por IA.

Su tarea no sería apretar «aprobar» sin pensar. Podría corregir un dato, señalar
que una vía no aplica o pedir una aclaración. Por ejemplo: «Este turno será
permanente; no tratemos la justificación por causa extraordinaria como una
solución automática. Consultemos las opciones con Dirección de Carrera».

## Qué dejaríamos listo

El resultado concreto sería **una consulta que Camila pueda presentar**, no una
promesa de resolver administrativamente el caso. Un ejemplo de su contenido:

> «Necesito orientación porque mi nuevo turno coincide con mis clases de martes
> y jueves. Revisé mi asistencia y, si el conflicto continúa, podría quedar bajo
> el mínimo. Quisiera confirmar qué alternativas son aplicables, sus plazos y sus
> efectos antes de decidir. Adjunto solo el resumen que autoricé».

Tutor y estudiante acuerdan quién hará el siguiente paso y cuándo volverán a
revisarlo. En la demo, la persona concreta y la fecha de ese compromiso serán
ficticias. Los roles institucionales sí aparecen en las fuentes: coordinación
puede orientar y Dirección de Carrera resuelve los trámites que le corresponden.

Para un cambio de jornada futuro, la orientación publicada indica portal Vivo;
si no aparece la opción, Experiencia Vivo → Solicitudes → Movimiento Interno →
Cambio de jornada. Puente entregaría el texto para que la estudiante lo revise y
copie cuando corresponda; no lo enviaría por ella. [4]

## El seguimiento es parte de la idea

La ficha permite distinguir «consulta preparada», «gestión iniciada» y «recibió
ayuda». El tutor registra el paso acordado y su avance; Camila puede indicar si
recibió la respuesta o el apoyo, o si todavía sigue esperando. No habrá mensajes
externos automáticos: esta comprobación se mostraría dentro de la aplicación.
Si nadie responde o la alternativa no está disponible, eso sigue abierto:
no contamos un mensaje enviado como éxito. Si Camila prefiere pausar, rechazar
una opción o reconsiderar su camino, también debe poder decirlo.

# 5. Qué alternativas reales podemos explicar

## Para este período académico

El reglamento no ofrece una solución única para «me cambiaron el turno». Hay
distintas vías, con requisitos y decisiones humanas. Nuestra aplicación ayudaría
a entender cuáles vale la pena consultar, sin tratarlas como equivalentes.

- **Justificar una inasistencia a una evaluación.** Los artículos 33–34 contemplan
  causas laborales extraordinarias respaldadas por certificado, para un período
  específico. No es permiso para faltar todo el semestre. El plazo indicado es
  hasta tres días hábiles desde el término del período justificado. Un turno
  permanente no queda automáticamente cubierto. [2]
- **Solicitar el retiro de una asignatura.** El artículo 47 permite consultarlo
  ante Dirección de Carrera. En presencial, el plazo ordinario del segundo
  semestre cerró el 12 de septiembre. Fuera de plazo solo hay una posibilidad
  excepcional bajo condiciones que la institución evalúa. Retirar puede afectar
  la trayectoria; no se recomienda como si no tuviera costo. [2–3]
- **Solicitar que una calificación quede pendiente.** El artículo 48 contempla
  postergar la calificación con motivos justificados, aprobación y validación
  institucional. En presencial, la ventana publicada va del 9 de noviembre al
  21 de diciembre. No arregla por sí sola un problema de asistencia. [2–3]

## Para el próximo período

El cambio de jornada tiene una vía documentada, pero depende de plazos, oferta,
cupos y aprobación. El proceso publicado comienza el 28 de diciembre de 2026:
no se presenta como una solución inmediata para noviembre. [2, 4]

## Si necesita apoyo personal, no solo un trámite

La estudiante puede querer hablar con alguien por cómo está viviendo el problema.
No tiene que recibir un diagnóstico de Puente para pedirlo. La información
publicada describe apoyo psicológico gratuito para estudiantes regulares mayores
de 18 años, accesible desde App Vivo. No garantiza una hora disponible. Para
menores, nuestra propuesta es orientación humana, sin IA externa, y confirmar
el canal apropiado con la institución. Punto Estudiantil ofrece orientación
general; no inventaremos una atención especializada que no verificamos. [5–6]

# 6. Qué aporta la IA y qué no le vamos a encargar

## Pasar del lenguaje de la persona al de los procedimientos

Camila no suele pensar «necesito consultar el artículo de postergación de
calificaciones». Piensa «con mi turno no alcanzo a ir y no quiero echarme el
semestre». Ahí queremos probar la IA: entender lo que cuenta, hacer preguntas
útiles y relacionarlo con opciones que quizá no sabe nombrar.

Para eso no le daremos permiso de recorrer internet buscando respuestas al azar.
Trabajará con una selección pequeña de fragmentos oficiales revisados por el
equipo. Cuando proponga una opción deberá mostrar de dónde sale, qué condiciones
tiene y qué sigue pendiente. Después puede ayudar a escribir una consulta clara,
sin convertir su redacción en una decisión institucional.

## Las cuentas no las hace el modelo de lenguaje

La superposición de horarios y los porcentajes se calculan con reglas de software
que podamos comprobar. Si dos personas confirman los mismos datos, la cuenta
debería dar el mismo resultado aunque una escriba formal y otra use «pega».

Eso también evita mezclar dos cosas: la IA interpreta lo que podría significar
el relato; la persona confirma los datos; recién entonces el programa calcula.
La IA no decide qué es una ausencia, no cambia registros y no inventa el mínimo
de una asignatura.

## Cómo sabremos si realmente vale la pena usarla

La comparación justa es con un formulario y el mismo catálogo de opciones,
usando las mismas reglas. Miraremos si la IA ahorra tiempo para entender el caso,
cuántas correcciones exige y si ayuda a identificar una vía pertinente sin añadir
afirmaciones falsas. Una respuesta más larga no cuenta como mejor resultado.

Todavía no hicimos esa medición. La propuesta tiene que poder perder esa prueba:
si el formulario resuelve mejor la necesidad, no corresponde defender el modelo
solo porque la hackatón trata de IA. Lo que queremos demostrar es ayuda útil,
no la cantidad de tecnología que logramos incluir.

# 7. Qué construiríamos y cómo repartiríamos el trabajo

## Una aplicación pequeña, no una plataforma institucional

Construiríamos tres vistas: la de la estudiante para contar y revisar; la del
tutor para comprender y acordar; y una ficha de seguimiento para ver el siguiente
paso y su resultado. Se pueden resolver dentro de una sola aplicación web que
funcione desde un teléfono y un computador.

La opción técnica propuesta es Next.js con TypeScript, por familiaridad, no
porque sea una exigencia del evento. Un solo proyecto guardaría el caso, haría
las cuentas y pediría al servicio de IA la interpretación o la explicación.
La elección final debe acomodarse al equipo y a las cuentas disponibles.

Durante la demo, los roles y la identidad se simulan y todo dato personal es
ficticio. Un botón para cambiar entre «estudiante» y «tutor» no es seguridad de
producción. Antes de usar información real se necesita identificar usuarios y
controlar quién puede acceder a cada caso.

## Qué dejamos fuera

No integraremos los sistemas académicos, WhatsApp ni correo. No cambiaremos
matrículas ni pediremos horas psicológicas. Tampoco construiremos un predictor
de abandono, un diagnóstico clínico o un sistema que vigile a todos. El primer
alcance es un cambio laboral, una situación demostrable y un conjunto pequeño
de normas.

## Hay trabajo importante aunque no todos programen

Una persona puede concentrarse en desarrollar e integrar. Otra verifica normas,
plazos y el procedimiento de consulta. Otra conversa con estudiantes y mentores
y se ocupa del checklist ético. Otra prueba el recorrido y detecta confusiones.
Otra prepara la historia, el ensayo y la explicación del impacto. Los papeles
se pueden combinar según el equipo real.

No se trata de llegar a imponer una idea cerrada a cuatro personas. Este plan
sirve para proponer una base y decidir juntos qué conservar o cambiar. Conviene
buscar una situación real de primer año y preguntar a quien acompaña estudiantes
qué parte ya está resuelta y dónde encontraría valor en una ayuda como esta.

# 8. Cómo lo sacaríamos adelante en la jornada

## Antes de programar, resolver lo que cambia la solución

En inmersión y diseño acordamos equipo, recursos y alcance permitido. Consultamos
a un mentor si la alerta responde al desafío, contrastamos el caso con alguien
de primer año y verificamos una gestión posible. No inventamos entrevistas.

El checklist oficial tiene responsable y suplente desde el inicio: necesita dos
validaciones y estar completo antes de 14:45. Este documento no lo reemplaza.
Solo recibimos las bases; ajustaremos el plan a la rúbrica y al checklist que
entregue la organización.

## Los 135 minutos técnicos, con prioridades claras

Se reparten entre 11:45–12:45 y 13:30–14:45. El almuerzo interrumpe el trabajo;
el bloque de IA se comienza antes de la pausa y se termina al volver.

| Tiempo | En qué lo usaríamos | Qué debería quedar funcionando |
| --- | --- | --- |
| 20 min: 11:45–12:05 | Armar las tres vistas y el caso de Camila | Poder recorrer la historia sin IA todavía |
| 25 min: 12:05–12:30 | Revisar datos y calcular horarios/asistencia | Una alerta comprensible con cuentas correctas |
| 25 min: 12:30–12:45 y 13:30–13:40 | Textos oficiales, permiso para usar IA externa y conexión al modelo | Una explicación con fuente, o un error controlado |
| 25 min: 13:40–14:05 | Permiso para compartir, revisión del tutor y consulta | El siguiente paso revisado por ambas personas |
| 25 min: 14:05–14:30 | Seguimiento y pruebas importantes | Distinguir pendiente de ayuda recibida |
| 15 min: 14:30–14:45 | Corregir lo crítico y congelar | Una demo reproducible de la versión final |

Es una estimación exigente, no una garantía. Mientras se programa, los demás
pueden verificar contenido, probar pantallas y preparar la presentación.

## Qué cortaríamos si no alcanza

Primero salen los adornos, gráficos, filtros y variantes extra. Después se
reduce a un único recorrido completo. No quitamos ni el permiso previo para IA
externa ni el permiso para compartir, ni ocultamos condiciones para ganar tiempo.

Si falla la IA, el formulario puede conservar el recorrido, pero no lo mostraremos
como una ejecución de IA exitosa. Si falta un dato normativo, se muestra pendiente.
A las 14:45 se congela: el pitch no debe presentar funciones añadidas después.

# 9. Cómo cuidamos a la persona y probamos que funciona

## La privacidad tiene que notarse en las pantallas

No pediríamos RUT, empleador, sueldo, diagnósticos ni datos familiares para
entender un choque de horario. La persona debe ver qué saldrá de su dispositivo
si usa IA externa, y autorizar por separado el resumen que recibirá el tutor.
Puede no compartir o detener usos futuros; no prometeremos borrar de la memoria
de otra persona lo que ya leyó.

El enlace a agenda psicológica es solo eso: un enlace. Puente no llenaría sus
formularios ni enviaría el relato a ACHS o IMED. Abrir un servicio externo es
una decisión aparte de la estudiante y tiene sus propias condiciones.

## Si necesita ayuda inmediata

La pantalla de apoyo debe tener siempre acceso a recursos humanos, aunque la IA
esté caída o no reconozca una situación difícil. La fuente consultada publica
la atención en crisis Duoc UC, +56 2 2515 7007, y «No estás solo, no estás sola»,
*4141, descrita como 24/7. [5]

Un acceso «Necesito apoyo ahora» pausaría el trámite automatizado y priorizaría
el contacto humano. No lo presentamos como un protocolo clínico validado ni
como una detección infalible de crisis. Para un uso real hay que acordar con
la institución la respuesta y el procedimiento, especialmente para menores.

## Qué probaríamos antes de mostrarlo

- Que los horarios, el 70% exacto y los porcentajes cercanos se calculen bien,
  sin redondear para cambiar el resultado ni mezclar teoría y práctica.
- Que un dato faltante no se invente y una cita realmente respalde lo que dice.
- Que sin autorización no haya llamada externa ni acceso del tutor al resumen.
- Que el tutor pueda corregir y no se cierre como ayuda una gestión sin respuesta.
- Que otra persona entienda qué ocurre después sin que tengamos que explicárselo
  fuera de la pantalla; y que una frase coloquial no produzca una cuenta distinta.

Estas son pruebas previstas del producto. Hasta ahora solo hemos comprobado
documentos y cuentas del ejemplo, no una aplicación que todavía no existe.

# 10. Qué contaríamos al jurado y qué falta decidir contigo

## La historia del pitch

Abrimos con una idea sencilla: «Camila quiere seguir estudiando. El problema no
es que no le importe: le cambiaron el turno». En una frase conectamos el caso
con la investigación, sin convertir un personaje ficticio en una entrevista real.

Después mostramos 90 segundos de recorrido: Camila cuenta el cambio; entiende
la proyección; ve opciones y condiciones; autoriza un resumen; el tutor corrige
y acuerdan el próximo paso; vemos cómo se seguiría. El resto de los cinco minutos
explica qué aporta la IA, cómo cuidamos a la persona y cómo evaluaríamos la idea.
Ensayamos a 4:30 para dejar margen, no para cambiar el tiempo oficial.

## Qué sería un buen resultado de la hackatón

Demostrar que podemos convertir una situación cotidiana en una gestión clara:
que la cuenta sea correcta, las fuentes pertinentes y el siguiente paso
comprensible y revisable. Si ejecutamos pruebas, contamos sus resultados reales.
Si la comparación contra formulario sigue pendiente, no inventamos una mejora.

Eso no permite afirmar que evitamos abandono. Para saber si ayuda en la práctica
haría falta un piloto con personas voluntarias, un responsable institucional,
tiempo disponible para responder y un procedimiento seguro de datos. Primero
mediríamos si la gente entiende sus opciones, cuánto trabajo exige al tutor y
si efectivamente recibe apoyo.

## Las decisiones que te propongo revisar ahora

- **El foco:** ¿te convence abordar un cambio laboral concreto, en lugar de
  intentar predecir todas las causas de abandono?
- **El valor:** ¿ves útil juntar explicación de asistencia, normas y siguiente
  paso, o crees que la experiencia sigue demasiado centrada en trámites?
- **La demo:** ¿te convence la historia de Camila y mostrar al tutor tomando
  una decisión real de revisión, sin prometer un cupo?
- **El alcance:** ¿estás de acuerdo con tres vistas y un recorrido pequeño,
  dejando integraciones para después?

Mi recomendación es mantener ese foco y no agregar más funciones hasta que
estas cuatro decisiones estén claras. Con tu revisión y la del equipo, recién
cerramos qué vamos a construir. Este documento explica la propuesta; no supone
que ya decidiste implementarla.

# Fuentes para revisar sin interrumpir la lectura

Las páginas anteriores sintetizan el plan. Aquí puedes comprobar de dónde salen
las normas y las afirmaciones importantes. La investigación más extensa y sus
ocho referencias siguen en el informe original v0.1; no hace falta leerlo entero
para entender la propuesta actual.

**[1] Estudio chileno de experiencias de abandono.** Fonseca Grandón y
colaboradores (2024), *Abandono en carreras de la Educación Superior
Técnico-Profesional*. 78 exestudiantes, 18 grupos focales; testimonio citado en
p. 10. Contexto marcado por pandemia, sin prueba de eficacia de Puente ni de
prevalencia actual en primer año.
[Artículo completo](https://www.scielo.cl/pdf/pel/v61n1/0719-0409-pel-61-01-00104.pdf).

**[2] Reglamento Académico Duoc UC, Resolución 07/2026.** Asistencia: arts. 29–31,
pp. 11–12. Justificaciones: 33–34, pp. 12–13. Retiro: 47, p. 16. Postergación:
48, p. 17. Cambio de jornada: 81–82, pp. 27–28. Texto enlazado en la
[página oficial](https://www.duoc.cl/reglamento-academico/):
[PDF de 2026](https://www.duoc.cl/wp-content/uploads/2026/08/NUEVO-REGLAMENTO-ACADEMICO_20260525.pdf).

**[3] Calendario presencial Duoc UC 2026, versión 8.** Plazos e hito de RI:
tablas de pp. 1–2. No trasladar estas fechas a Duoc Online.
[Página por modalidad](https://www.duoc.cl/calendario-academico/) y
[PDF presencial](https://www.duoc.cl/wp-content/uploads/2026/05/Calendario_Acade%CC%81mico_Base_2026_v8.pdf).

**[4] Centro de Ayuda: cambio de jornada o sede.** Fechas, requisitos de oferta
y cupos, canales y orientación.
[Procedimiento publicado](https://centroayuda.duoc.cl/hc/es-419/articles/30308211391629--C%C3%B3mo-realizar-una-solicitud-de-cambio-de-jornada-o-sede).

**[5] Centro de Ayuda: apoyo psicológico.** Acceso, agendamiento y recursos de
crisis tal como se publican; no certifica elegibilidad individual ni disponibilidad.
[Información del programa](https://centroayuda.duoc.cl/hc/es-419/articles/34877114417165-Apoyo-psicol%C3%B3gico).

**[6] Bienvenida Duoc UC.** Describe Punto Estudiantil como espacio de orientación,
incluida la psicoemocional. No es un protocolo especializado para menores.
[Página institucional](https://www.duoc.cl/bienvenidos/).

**Bases del evento.** Desafío 2, p. 5; ética, p. 8; evaluación y checklist,
pp. 9–10. Archivo incluido en `material_preparacion/`.

Fuentes consultadas el 6 de noviembre de 2026. Las páginas del Centro de Ayuda
fueron leídas de forma automatizada; el participante reportó además haberlas
confirmado en navegador. Las lecturas acreditan el contenido publicado, no
aprobaciones ni compromisos de atención para nuestro proyecto.
