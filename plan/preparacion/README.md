# Materiales provisionales para llegar preparados

Cada pieza se revisa por separado. Ninguna supone que la aplicación ya existe
ni que el equipo haya aprobado el alcance. El estado de revisión está en
`estado.md`.

## Archivos

| Pieza | Editable | Para leer/presentar |
| --- | --- | --- |
| Plan corto de desarrollo | `plan_desarrollo.md` | `Plan_desarrollo_Puente.pdf`, dos páginas |
| Brief del pitch | `brief_pitch.md` | `Brief_pitch_Puente.pdf`, una página |
| Diapositivas | `Pitch_Puente_provisional.pptx`; contenido en `diapositivas.json` | `Pitch_Puente_provisional.pdf`, seis diapositivas |
| Guion y respaldo | `guion_y_contingencias.md` | `Guion_y_respaldo_Puente.pdf` |
| Transparencia y preparación ética | `transparencia_y_checklist.md` | Plantilla de trabajo, no checklist oficial |

El deck tiene notas para quien presenta y duración prevista de 4:30, incluidos
90 segundos para el recorrido. La diapositiva 3 está rotulada como **maqueta**:
hoy no hay MVP. Actualizarla solo si existe una versión funcional congelada y
probada, indicando qué funciona y qué sigue siendo diseño.

## Regenerar y verificar

Desde la raíz del repositorio, con las fuentes DejaVu indicadas en el README:

```bash
.venv/bin/python -m pip install -r plan/requirements-pitch.txt
.venv/bin/python plan/compilar_pitch.py
.venv/bin/python plan/preparacion/test_materiales.py
```

Los PDF se generan desde las mismas fuentes de contenido. El PDF del pitch
**no es una exportación realizada por PowerPoint**: usa el mismo contenido y
coordenadas con ReportLab. Hay que comprobar el PPTX en PowerPoint/Google Slides
antes del evento: aquí se verifica estructura, texto editable, notas y dimensiones,
no el motor de renderizado de esas aplicaciones, que no está disponible.

El test de inspección PDF usa PyMuPDF si está instalado; su ausencia se informa
como prueba omitida. Los tests no prueban una aplicación ni el desempeño real
del pitch, que requiere ensayo con personas y pantalla.

No incluir resultados nuevos escribiéndolos solo en las diapositivas: conservar
evidencia y actualizar notas/brief para que todos los formatos digan lo mismo.
