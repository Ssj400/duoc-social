# Planificación del equipo · Desafío 2 (deserción en primer año)

Hoy 6/11/2026. Desarrollo desde las 11:45; freeze técnico 14:45. Lo marcado "(propuesta)" aún no lo ha acordado el equipo.

> **Actualización 11:55:** la simulación pasa a ser un **juego de decisiones por clicks** y el tutor crea escenas con **plantillas** que la IA convierte en escenas para su aprobación. Ver [diseno.md](diseno.md) v2, que reemplaza aquí el §2 (guion), la fila P0 del §3 y el §5 (IA).

## 1. Problema, usuarios y propuesta de valor

**Problema.** En la cohorte 2025, el 22,1% de los estudiantes de primer año no continuó en su institución y el 15,5% no se matriculó en ninguna al año siguiente (SIES, agosto 2026). No retención no es abandono definitivo: puede haber traslado o reingreso. SIES no informa causas.

**Causas (hipótesis del equipo).** Presión familiar por una carrera; problemas económicos; no saber qué se ve realmente en los ramos. El desajuste vocacional tiene apoyo parcial en Chile: un estudio de la U. de Chile (vía repositorio UDD) lo ubica entre las principales causas de primer año junto con la situación económica de los padres y el rendimiento; la prensa de 2017 atribuye más del 40% de unos 588 retiros de primer año en la U. de Concepción a causas vocacionales (prensa, una sola institución). Presión familiar y el resto: hipótesis nuestras, sin validar. Verificar ambas fuentes antes de citarlas en el pitch.

**Usuarios.** Estudiante matriculado de primer año, semanas 2 a 6, 18+, uso voluntario. Tutor o jefe de carrera.

**Propuesta de valor (propuesta).** "Tu estudiante de primer año descubre a tiempo cómo es de verdad su carrera —contada por quienes la viven— y, si algo no calza, lo conversa con su tutor antes de abandonar." "Antes de entrar" queda como extensión futura, solo en el pitch.

## 2. Guion de demo de 90 segundos (propuesta)

El alcance sale de este guion: lo que no aparece en la demo no es P0.

| Seg. | Pantalla | Qué pasa |
| --- | --- | --- |
| 0–10 | Selector de rol (demo, no es autenticación) | Entra "Camila", estudiante ficticia de primer año |
| 10–25 | Malla + tarjeta "experiencia de una persona, no de toda la carrera" | Ve la malla y la simulación escrita por un tutor ficticio |
| 25–50 | Chat de simulación | Escribe cómo reaccionaría; la IA conduce el escenario y cita su fuente (tutor o malla) |
| 50–65 | Reflexión | La IA propone brechas de expectativa; Camila las confirma o edita y elige ella misma su motivo (gusto, empleabilidad, presión, otro) |
| 65–78 | Compartir | Camila elige compartir el resumen con su tutor |
| 78–90 | Vista tutor y seguimiento | El tutor acuerda un paso (responsable, fecha); estado "gestión iniciada" |

## 3. Alcance

| Nivel | Contenido |
| --- | --- |
| **P0** | Una carrera (real con malla pública, o ficticia y rotulada). Malla y una simulación de un tutor ficticio, ambas en JSON precargado. IA que conduce la simulación citando fuente. Reflexión de motivo y brechas, confirmada por el estudiante. El estudiante decide si comparte. Vista tutor con paso acordado (responsable, fecha) y estados de seguimiento. |
| **P1** | Formulario para que tutores escriban su simulación. Retiro o pausa de autorización pulido. Segunda simulación. |
| **P2** | Ayuda FUAS/becas: solo enlace estático a información oficial de Mineduc, sin IA. Una IA que informe mal sobre ayudas económicas causa daño directo y ese público es postulante, a menudo menor de edad. |
| **Fuera** | "Uso futuro" de los datos: en el MVP no se usan para nada más; cualquier reutilización requerirá consentimiento explícito aparte, anonimización y plazo de retención. Datos reales, integraciones, puntajes, probabilidades, "antes de entrar" real. |

## 4. Pantallas

- **Estudiante:** malla, simulación en chat, reflexión editable, botón "compartir / no compartir", pausa y retiro.
- **Tutor:** resúmenes que el estudiante compartió, con aviso de que son autodeclarados; formulario de paso acordado (responsable, fecha). Puede agregar notas, sin modificar lo que declaró el estudiante.
- **Seguimiento:** línea de estados "gestión iniciada" y "ayuda recibida" (distintos), más rechazo, pausa o retiro del estudiante.

## 5. IA: exactamente dos llamadas

1. **Conducir la simulación.** Entrada: contenido del tutor + malla + mensaje del estudiante. Salida JSON: texto del escenario e ids de fuente citados. Un validador rechaza ids de ramos que no estén en la malla.
2. **Extraer brechas de expectativa** del texto libre. Salida JSON. El estudiante confirma o edita. El motivo lo elige el estudiante con botones; la IA nunca clasifica la motivación ni recomienda quedarse o irse; no hay puntajes ni probabilidades.

**Fallback:** timeout de 10 s, pasa a formulario manual y se descartan respuestas tardías.
**Proveedor:** Groq `openai/gpt-oss-120b`; respaldo Gemini `gemini-3.5-flash-lite`; proveedor mock para desarrollo. Claves solo en el servidor, en `.env.local`.

## 6. Datos

JSON sintético, estado en memoria (se pierde al reiniciar), sin datos reales de estudiantes.

## 7. Alerta (propuesta)

La brecha de expectativa más el motivo autoidentificado, confirmados por el estudiante y compartidos solo si él decide. Se explica en palabras ("dices que esperabas X y la simulación mostró Y"). Sin puntajes.

## 8. Ética y checklist

- No hay perfilamiento ni etiquetas; la decisión humana es explícita (estudiante y tutor).
- Consentimiento para compartir, revocable.
- Simulaciones rotuladas como experiencia de una persona. Solo datos sintéticos. No inventar resultados.
- Prueba de sesgos con perfiles ficticios que difieren solo en género o nombre: **prevista**, hasta que se ejecute.
- **ACCIÓN AHORA:** preguntar a la organización los horarios de los dos checkpoints del checklist ético (antes de las 14:45). Es condición de admisibilidad.

## 9. Cronograma (propuesta)

| Bloque | Hito verificable |
| --- | --- |
| 11:45–12:45 | P0 de punta a punta con mock: JSON cargado, chat, reflexión, compartir, vista tutor. En paralelo, rol ética: horario de checkpoints y **borrador del checklist ya** (es condición de admisibilidad; no esperar a la tarde). |
| 12:45–13:30 | Almuerzo. Solo revisar el guion de demo. |
| 13:30–14:15 | IA real con validador y fallback probados; prueba de sesgos; checklist en checkpoints según horario oficial; ensayo del pitch. |
| 14:15–14:45 | Solo correcciones. Declaración de modelos, checklist validado. Freeze 14:45. |

**Regla de corte (propuesta):** si a las 12:45 el P0 no funciona de punta a punta, se pospone todo lo demás.
**Roles (por definir):** dev IA/backend, frontend, contenido malla/simulación, ética/checklist, pitch.

## 10. Pitch (5 min con demo) y Lean Canvas

**Esquema (propuesta):**
- 0:00–0:40 problema y cifra SIES, con sus límites.
- 0:40–1:00 propuesta de valor.
- 1:00–2:30 demo de 90 s.
- 2:30–4:00 ética: consentimiento, sin perfilar, decisión humana, qué no hacemos.
- 4:00–5:00 impacto, escalabilidad y qué mediríamos.

**Lean Canvas (propuesta):**
- Problema: estudiantes que descubren tarde que la carrera no calza.
- Segmentos: instituciones de educación superior; usuarios, estudiantes y tutores.
- Propuesta de valor: ver la carrera real a tiempo y conversarlo antes de abandonar.
- Solución: simulación guiada por IA con fuente citada, más vista de acompañamiento.
- Canales: tutorías y jefaturas de carrera, enlace institucional.
- Ingresos: por definir (¿licencia a instituciones?).
- Costos: modelos de IA, hosting, tiempo de tutores para escribir simulaciones.
- Métricas clave (a medir, no resultados): estudiantes que completan la simulación, que comparten, pasos acordados con fecha, ayudas recibidas.
- Ventaja: contenido de quienes viven la carrera, con control del estudiante. Sin auditoría de lo que ya ofrecen UC y Duoc.

## 11. Preguntas abiertas

1. ¿Carrera real (malla pública) o ficticia?
2. ¿Quién cumple cada rol?
3. ¿Se aprueba el recorte P0/P1/P2 y la regla de corte?
4. ¿Cuándo son los dos checkpoints del checklist?
5. ¿Quiénes presentan el pitch (uno o dos)?
6. ¿En qué computador y con qué red corre la demo? Las claves de Groq y Gemini se probaron el 6/11 en una laptop; copiar `.env.local` a mano, nunca por chat.
