# Revisión de propuesta v0.2 · 6 de noviembre de 2026

Estado: borrador para crítica externa; pendiente de revisión de Claude y después
del participante. No autoriza implementación ni acredita validación institucional.
Esta revisión sustituye provisionalmente las decisiones de producto y alcance
de v0.1; su investigación y bibliografía se conservan como antecedentes, no como
evidencia de eficacia. El PDF v0.1 permanece como versión histórica.

## Decisiones de producto

Contraste directo de bases, p. 5: la pregunta pide acompañamiento «académico y
socioemocional»; el alcance admite «recomendaciones de apoyo o derivación a
servicios». No se reduce esa pregunta a solo horarios. También exige «uso
responsable de IA generativa en el aprendizaje»: el MVP no genera tareas ni
evalúa estudiantes; explica que la orientación no reemplaza el estudio ni al
docente, conserva alternativa sin IA y fuentes revisables. La propuesta no
demuestra mejoras de aprendizaje ni pretende cubrir por completo ese ámbito;
se explicita como límite a contrastar con la rúbrica detallada.

1. **Entrada proactiva:** proponer al tutor un chequeo voluntario de 30 segundos
   para todo primer año por el canal institucional existente: «¿Cambió algo en
   tus horarios o responsabilidades que dificulte asistir? ¿Quieres conversar
   sobre opciones?». En demo se abre un enlace simulado: no se implementa envío,
   integración ni acceso a canales reales. No responder no genera etiqueta ni caso.
2. **Detección explicable:** con autorización y datos confirmados, reglas detectan
   incompatibilidades futuras entre disponibilidad y actividades. Se muestra
   día, período, datos de origen y qué falta conocer. Es una señal de necesidad
   de acompañamiento, no una predicción validada de deserción. La cobertura
   depende de participación y calidad del dato; no detecta todas las situaciones.
3. **IA con tarea sustantiva:** interpretar el contexto y recuperar alternativas
   de un pequeño corpus normativo curado; explicar el trámite pertinente con
   fragmento y artículo/página, distinguir requisitos y pendientes, y redactar
   una solicitud revisable. Solo puede citar IDs y fragmentos cargados. Una cita
   existente no basta: hay que probar que respalda la afirmación. Sin respaldo,
   abstenerse. Comparar con buscador/formulario y las mismas reglas, no afirmar
   que estas tareas sean imposibles sin IA.
4. **Resultado tangible:** tutor y estudiante dejan una consulta lista para
   presentar por el canal verificado, con destinatario, responsable y fecha;
   no se simula envío real ni aprobación. Un horario alternativo sintético puede
   demostrar compatibilidad, claramente separado de normativa real y de cupos.
   Rotular cada horario, responsable y fecha sintéticos donde aparecen, no solo
   mediante un aviso general. La norma no respalda esa disponibilidad ficticia.
5. **Integración humana:** el tutor incorpora el chequeo a su acompañamiento,
   revisa contexto, fuente y borrador, acuerda acción y registra seguimiento.
   Es una integración de proceso propuesta, no una integración técnica existente
   ni una descripción verificada de las capacidades actuales de Duoc.
6. **Socioemocional:** preguntar si desea conversar con una persona y permitir
   solicitar orientación humana sin revelar motivos sensibles. Mostrar un canal
   oficial solo cuando esté verificado. No inferir salud mental, diagnosticar ni
   convertir redacción amable en sustituto de apoyo profesional.

## Alcance realizable

Tres vistas mínimas: estudiante usable en teléfono, revisión del tutor y ficha
de seguimiento. Tres estados visibles: **preparación**, **gestión acordada** y
**seguimiento/cierre**, con resultado explícito. Se conservan por separado los
permisos para IA externa y para compartir resumen; un único interruptor no sirve
para ambos. Retiro bloquea usos futuros y descarta respuestas tardías del modelo.
Sin datos reales, autenticación ficticia identificada, sin acciones externas.

Una situación principal, dos alternativas como máximo y una negativa breve.
No se incorpora vigilancia de asistencia al MVP: requiere datos autorizados,
contexto de ausencias y evaluación adicional. Un chequeo universal no demuestra
ausencia de sesgos: pueden quedar fuera quienes no acceden al canal o no quieren
responder. Mantener alternativa humana y formulario sin IA.

## Demo de 90 segundos y pitch

- 0–15 s: invitación universal simulada y decisión voluntaria.
- 15–35 s: contexto, revisión de extracción y conflicto con fragmentos de origen.
- 35–55 s: consulta al corpus, cita pertinente y descarte de alternativa incompatible.
- 55–80 s: estudiante autoriza resumen y destinatario antes de acceso del tutor;
  tutor corrige y estudiante acepta la consulta lista con responsable y fecha.
  El permiso de IA externa se solicita antes de la llamada, en el paso de relato.
  Cupos y resolución administrativa siguen pendientes.
- 80–90 s: seguimiento de prueba rotulado; distinguir gestión de ayuda recibida.

Ensayar pitch de 4:30 con margen hasta los cinco minutos oficiales. Abrir con el
problema y un caso sintético; si se utiliza el testimonio de R3, decir que era de
segundo año y no usarlo para afirmar validación de primer año. Mostrar límites
en una diapositiva y en los lugares de decisión, sin llenar la narración de
salvedades. «La IA asiste, nunca sustituye el vínculo humano».

## Ejecución y verificación

Responsable y suplente del checklist desde la inmersión; obtener sus dos
validaciones en las ventanas oficiales antes de 14:45. No posponerlo al último
bloque ni confundirlo con mentorías. Consultar rúbrica/checklist recibidos,
asignación del desafío y reglas de preparación previa al participante; no se
ha accedido a su correo. El equipo puede rechazar o adaptar esta propuesta.

135 minutos técnicos: 20 esqueleto y fixtures; 25 reglas y revisión estudiante;
25 corpus y adaptador IA; 25 autorización, tutor y borrador; 25 seguimiento y
pruebas; 15 corrección y freeze. Es una estimación condicionada a cuentas y
corpus preparados conforme a las reglas del evento. No se presupone trabajo
durante almuerzo ni desarrollo previo autorizado.

Cinco grupos P0, sin eliminar los controles de v0.1:

1. Horarios: superposición, límites contiguos, datos faltantes y traslado desconocido.
2. Fuentes/IA: cita pertinente, ID inexistente, instrucción maliciosa, omisión,
   condición inventada, timeout y salida inválida. Nunca prometer cupo.
3. Consentimiento: sin permiso no hay llamada/divulgación; retiro bloquea nuevos
   usos y respuesta tardía; corrección invalida opciones anteriores.
4. Decisión humana: no hay gestión acordada sin revisión, aceptación, responsable
   y fecha; no respuesta y envío no se convierten en ayuda recibida.
5. Consistencia/comprensión: expresiones coloquiales y formales equivalentes;
   próximo paso comprensible; comparación exploratoria con formulario/buscador.

Los grupos contienen varios casos, no «cinco pruebas» suficientes para probar
seguridad. Registrar resultados reales; comparación ampliada y entrevistas
adicionales pertenecen al piloto si no caben. Conversaciones con compañeros
aportan exploración, no validación representativa ni confirmación automática
de necesidades de primer año.

## Decisiones ante bloqueos

Sin fuente oficial aplicable: no atribuir reglas a Duoc, mantener demo ficticia y
declarar el bloqueo normativo. Sin credencial operativa: formulario y ejemplo
precargado identificado; no afirmar IA funcional. Sin acción/encargado verificados:
demostrar coordinación sintética, no prometer piloto ni atención institucional.
El encaje con alerta temprana aún requiere aclaración oficial: una regla de
incompatibilidad puede ser explicable sin ser un predictor de abandono.
Consultar esta dependencia en la primera mentoría, antes de cerrar el alcance.
Si no alcanza el tiempo, recortar variantes y acabado antes que permisos y
pruebas bloqueantes; registrar los casos realmente ejecutados y los pendientes.

## Registro de respuesta a crítica #1

Se adopta entrada proactiva, IA sobre corpus cerrado, solicitud tangible,
integración de proceso, componente humano socioemocional, brief y simplificación
visual. Se rechaza inferir que chequeo universal elimina sesgo, que reglamento
acredita cupos, o que reducir estados permite retirar permisos/pruebas. No se
reescribe el commit histórico por su formato. No se instala antivirus ni se
accede al correo: son actuaciones fuera de esta revisión documental. El nombre
Puente queda como etiqueta histórica; no se decide una marca nueva ahora.

## Verificación normativa

Consulta: 6 de noviembre de 2026. Subagente investigó; sesión principal contrastó
directamente página normativa, PDF (pp. 1, 18–19, 27–28), procedimiento de cambio
de jornada y artículo de apoyo psicológico. No se usan como autoridad los
enlaces del servidor de desarrollo enviados por el crítico.

- **N1 · Reglamento:** [página oficial](https://www.duoc.cl/reglamento-academico/)
  enlaza [Resolución N°07/2026, 25 de mayo de 2026](https://www.duoc.cl/wp-content/uploads/2026/08/NUEVO-REGLAMENTO-ACADEMICO_20260525.pdf).
  Art. 81, pp. 27–28: permite solicitar «Cambio de jornada» dentro de períodos
  del calendario; «sujetas a la aprobación o rechazo de la Dirección de Carrera
  de la Sede de destino». Art. 82 remite al Instructivo de Admisión Especial.
  Es el texto actualmente enlazado; no se certifica inexistencia de instrucciones
  complementarias. No establece cupos ni un cambio ordinario de sección por trabajo.
- **N2 · Proceso:** [¿Cómo realizar una solicitud de cambio de jornada o sede?](https://centroayuda.duoc.cl/hc/es-419/articles/30308211391629--C%C3%B3mo-realizar-una-solicitud-de-cambio-de-jornada-o-sede),
  actualizado 4/11/2026. Inicio 28/12/2026, cierre postulación 6/3/2027 y matrícula
  8/3/2027. Dice «sujeta a la disponibilidad de cupos» y a oferta del primer
  semestre 2027. Ofrece orientación en Centro Académico/coordinación y
  movimientosinternos@duoc.cl. **Hoy no se presenta como postulación abierta.**
- **N3 · Suspensión:** N1, arts. 50–52, pp. 18–19. Exige ordinariamente haber
  cursado un período completo y presentar dentro de plazo; en curso, primeros
  diez días hábiles, salvo excepciones evaluadas. No convertir cambio laboral en
  causa grave ni asegurar beneficios. Se excluye de las dos rutas principales;
  sirve como caso de abstención con explicación si se pregunta por ella.
- **N4 · Apoyo humano:** [Apoyo psicológico](https://centroayuda.duoc.cl/hc/es-419/articles/34877114417165-Apoyo-psicol%C3%B3gico),
  actualizado 21/10/2026. Programa gratuito para estudiantes regulares mayores
  de 18 años; App Vivo → Bienestar y Salud Mental → agendar hora Psicólogo.
  Atención virtual/teléfono, evaluación por profesional. No asegura hora inmediata
  ni aplica automáticamente a menores o a quien perdió calidad de regular.

**Dos salidas de la demo:** (1) consulta académica dirigida a coordinación sobre
conflicto inmediato y planificación de cambio futuro; no solicitud formal de
cambio abierta hoy; (2) información de apoyo psicológico opcional, iniciada por
el estudiante y con condiciones de acceso visibles. No es una derivación clínica
ni se comparte relato emocional con tutor/proveedor por defecto. No se afirma
que estas vías resuelvan el conflicto inmediato: esa es la principal limitación
operativa por verificar con coordinación. Responsable individual y fecha de
respuesta de la demo son sintéticos y no comprometen a personal real.

## Verificaciones de esta entrega

- Generador del brief ejecutado: PDF de una página, texto Unicode sin reemplazos,
  contenido dentro de márgenes; revisión visual de la primera compilación.
- Sintaxis de ambos generadores validada sin ejecutar la aplicación inexistente.
- Cinco documentos comprobados, ocho enlaces locales existentes y sin espacios
  finales; `git diff --check` sin errores. Sprint suma 135 minutos.
- Subagente de auditoría leyó brief y revisión: se corrigieron orden del permiso
  antes del acceso del tutor, consulta versus postulación, rotulado de fixtures y
  momento de aclarar encaje. El subagente de contraste de bases no pudo acceder
  a archivos; no se tomó como verificación y la sesión principal leyó el PDF.
- Texto del brief y decisiones enviados al intermediario para Claude, mensaje
  `msg_3e963c4612f34b4da8b259466a8c90d9`. Entrega al intermediario confirmada;
  no equivale a entrega/revisión completada por Claude. Pendiente su devolución.
- No se ejecutaron pruebas de MVP: todavía no existe. No se hizo commit/push
  de esta revisión ni se alteró el PDF histórico v0.1.
