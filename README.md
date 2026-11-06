# Hackathon IA · Congreso Social UC 2026

Repositorio del equipo para el desafío 2: prevención de la deserción en educación superior, con foco en primer año.

## Estado actual
MVP implementado en [`web/`](web/README.md): **simulación de la carrera para explorar expectativas y desajuste vocacional**.

- **Estudiante** (`/estudiante`): juega escenas de ramos reales de la malla de Duoc, marca lo que le sorprendió, revisa las brechas que propone la IA y decide si comparte su resumen con el tutor; puede pausar o retirar la autorización.
- **Tutor** (`/tutor`): escribe plantillas desde su experiencia, revisa y aprueba las escenas que genera la IA antes de que lleguen a estudiantes, y ve solo los casos compartidos con autorización activa.
- **Ruta** (`/ruta`): malla oficial por semestre con las experiencias de tutores ya aprobadas.

Datos de tutores, estudiantes y casos son ficticios. Verificado con la prueba de punta a punta de `web/` en modo simulado y con el modelo real (Groq `openai/gpt-oss-120b`); no hay validación con usuarios reales. Versión congelada al freeze técnico: etiqueta `entrega`.

- **Demo pública:** https://duoc-social.vercel.app (el estado vive en memoria y puede reiniciarse; para la demo en vivo usar el laptop).
- **Pitch:** [presentación PPTX/PDF, guion y capturas](presentacion/) · [video multidispositivo y cómo reproducirlo en loop](demo_video/README.md).
- **Transparencia, checklist ético y rúbrica:** [etica_y_rubrica.md](etica_y_rubrica.md).

## Contexto y recursos

- [Contexto, requisitos y guardas](AGENTS.md).
- [Antecedentes y límites de evidencia](antecedentes.md).
- [IA: llamadas, prompts y respaldos](ia.md) · [RAG y guía de prueba](rag.md).
- [Bases oficiales](material_preparacion/Bases_Hackathon_IA_Congreso_Social_UC_2026-1.pdf).
- [Reglas de trabajo](CONTRIBUTING.md).

Puente fue descartado. Su documentación se conserva en la etiqueta remota `puente-v0.3` y en el historial de Git.
