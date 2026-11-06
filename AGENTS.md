# Contexto del proyecto
## Evento y equipo
- Hackathon de IA Aplicada, Congreso Social UC 2026, UC/Duoc UC: viernes 6/11/2026, 08:30–18:45.
- Duoc UC San Joaquín, Av. Vicuña Mackenna 4917, Santiago. IA al servicio de la dignidad humana.
- Desafío 2: prevención de la deserción en educación superior, foco en primer año. Equipo fusionado; partirá con una idea propia.
- Idea del equipo (literal, reportada): «Una simulación de la carrera para que el estudiante tenga claro qué va a estudiar de verdad. Ataca la deserción por disgusto con la carrera, es decir, por desajuste vocacional». Puente descartado, archivado en `puente-v0.3`; no construirlo.
- Propuesta de Claude, NO acordada: primer año ya matriculado, semanas 2–6, mayores de 18, voluntario; no orientación para postulantes escolares. Una carrera, tres escenarios, dos llamadas IA (escenario y extracción de brechas confirmadas), tutor y proveedor simulado; viabilidad en 135 min pendiente.
- Propuesta de Claude, NO acordada: corpus precargado de malla/descripciones/perfil de egreso, citas y validación de ramos; escenarios de semestres 2–4 rotulados como simulación, no ejercicios reales certificados. Sin fuente oficial, carrera ficticia identificada.
- Propuesta de Claude, NO acordada: alerta verbal de expectativas frente al contenido, confirmada por estudiante; sin puntajes, afinidad ni consejo de quedarse/irse. Seguir, cambiar o pausar son válidos. Compartir brechas solo si autoriza; tutor acuerda paso, responsable y fecha.
- Propuesta de Claude, NO acordada: probar perfiles sintéticos variando solo nombre/género para revisar estereotipos; prueba prevista, no ejecutada. Esta actualización de contexto no autoriza implementar la app.
## Requisitos y evaluación
Alerta temprana explicable, acompañamiento académico o socioemocional e integración al trabajo de tutor/jefe de carrera; transparencia, revisión de sesgos y no estigmatización.
| Criterio | Peso |
| --- | ---: |
| Comprensión del problema y del usuario | 10% |
| Uso pertinente de IA | 15% |
| Factibilidad técnica y calidad del prototipo | 15% |
| Ética, privacidad y mitigación de sesgos | 25% |
| Impacto y escalabilidad | 25% |
| Calidad del pitch | 10% |
- Entregables: MVP funcional con aporte real de IA, pitch con demo, declaración de modelos/herramientas y checklist ético oficial.
- Freeze: **14:45**; cambios posteriores no cuentan. Checklist completo y validado en **dos checkpoints antes de 14:45** es condición de admisión; mentorías no los sustituyen.
- Desarrollo: 11:45–12:45, 13:30–14:15 y 14:15–14:45 (135 min). Pitch: 5 min incluyendo demo + 3 min de preguntas; 1–2 presentadores, pregunta ética prevista.
- Confirmar preparación previa permitida y adaptar a rúbrica/checklist/aclaraciones oficiales; hasta ahora solo se reportaron las bases.
## Guardas éticas
- Sin probabilidades individuales con datos no elegidos por el estudiante (colegio, padres, género, origen); derecho a no ser perfilado y decisión humana explícita.
- Solo datos sintéticos en demo; no inventar entrevistas, resultados, validación ni adopción. La tecnología asiste, no sustituye criterio ni vínculo humano.
- Minimizar datos, separar permiso de IA externa y de compartir; validar en servidor, permitir retiro y descartar respuestas tardías. No leer, modificar, versionar ni transmitir `.env.local` o claves.
## IA prevista para la app (no implementada)
- Principal: Groq `openai/gpt-oss-120b`, base `https://api.groq.com/openai/v1`; respaldo: Gemini `gemini-3.5-flash-lite`, base `https://generativelanguage.googleapis.com/v1beta/openai`.
- Configurar solo por `LLM_BASE_URL`, `LLM_MODEL`, `LLM_API_KEY` en servidor. User-Agent explícito, timeout ~10 s, JSON y esquema validados; la IA propone, las reglas validan y una persona confirma.
- Pruebas/proveedores reportados por Claude, no verificados aquí. No afirmar políticas de datos sin comprobarlas; no usar alias `-latest` ni reintentos ocultos.
## Trabajo y ahorro de recursos
- Un solo builder, sin subagentes; contexto breve sin omitir instrucciones obligatorias. Una sesión nueva por bloque de desarrollo, conservando decisiones esenciales.
- Probar con proveedor simulado; llamadas reales solo para integración/ensayo, preservando cuota para demo. Claude: 2–3 consultas cortas concretas (prompts antes de 12:30, demo antes de 14:45).
- Sin nuevas rondas documentales ni regeneración de PDF/HTML; B–G en pausa. Solo ajustes manuales mínimos del deck por el equipo. No construir una app hasta definir y autorizar la idea.
- Recursos reportados: OpenAI/WSL agotado; OpenCode/GPT en otra cuenta, modelos gratuitos y DeepSeek; Antigravity solo si se acaba OpenCode. Cuenta Claude laboral: uso permitido, gasto no autorizado.
## Recursos
- Bases en `material_preparacion/`; evidencia y límites en `antecedentes.md`; reglas en `CONTRIBUTING.md`.
- [Drive de la organización](https://drive.google.com/drive/folders/1ct76gYr3SsiRXQq7io_TXeZph4tDHzQO): bases, plantilla Lean Canvas y artículo Miranda/Vázquez. Preguntar si Lean Canvas es obligatorio.
