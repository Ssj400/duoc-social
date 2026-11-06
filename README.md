# Hackathon IA · Congreso Social UC 2026

Preparación del **desafío 2: prevención de la deserción en educación superior**.

Contexto del proyecto: [AGENTS.md](AGENTS.md). Reglas de edición, documentación
y pruebas: [CONTRIBUTING.md](CONTRIBUTING.md).

## Documento de trabajo

- [Brief v0.3 de una página (PDF)](plan/Brief_Puente_v0.3.pdf)
- [Brief editable](plan/brief_v0.3.md) y [revisión de propuesta v0.3](plan/revision_propuesta_v0.3.md):
  incorporan la segunda crítica externa, pendientes de aprobación del participante.
  Las decisiones de producto v0.3 actualizan la propuesta anterior; v0.1 y v0.2
  se conservan como antecedentes históricos.

- [Informe PDF: investigación y plan Puente v0.1](plan/Investigacion_y_plan_Puente_v0.1.pdf)
- [Fuente editable en Markdown](plan/investigacion_y_propuesta.md)
- [Bases oficiales proporcionadas por el participante](material_preparacion/Bases_Hackathon_IA_Congreso_Social_UC_2026-1.pdf)

El informe reúne investigación previa, fuentes y límites de evidencia; propuesta
provisional; alcance, arquitectura, ética, validación, cronograma, pruebas, piloto
y pitch. La bibliografía se encuentra al final. Preparado el 5 de noviembre de
2026 con asistencia de IA y revisión de subagentes.

**Puente es una hipótesis de trabajo, no un producto implementado o validado.**
No afirma reducción demostrada del abandono ni representa servicios o políticas
aprobadas por UC o Duoc UC. El nombre es provisional.

## Regenerar el PDF

Requiere Python 3.12 y las fuentes `DejaVuSans.ttf` y
`DejaVuSans-Bold.ttf` en `/usr/share/fonts/truetype/dejavu/` (Linux; ajustar esa
ruta en el generador para otros sistemas).

```bash
python -m venv .venv
.venv/bin/python -m pip install -r plan/requirements.txt
.venv/bin/python plan/compilar_pdf.py
.venv/bin/python plan/compilar_brief.py
```

El generador del brief produce v0.3 por defecto; `--version v0.2` permite
regenerar la versión histórica.

Se sobrescribe únicamente el PDF generado. Editar primero el Markdown. El
generador incluye índice con enlaces, marcadores, bibliografía enlazada,
tablas y paginación.

## Alcance del repositorio

Se versionan los documentos de planificación, su generador y las bases. El video
complementario y los metadatos `Zone.Identifier` quedan excluidos. No se incluyen
CV, credenciales ni datos reales de estudiantes. Las bases y fuentes externas
conservan la autoría y condiciones de uso de sus respectivos titulares; no se
les aplica una licencia nueva desde este repositorio.
