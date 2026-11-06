# Plan técnico de Puente

- `plan_tecnico.md`: fuente editable, separada del plan explicado para participante.
- `../Plan_tecnico_Puente.pdf`: plan completo con paneles y diagramas vectoriales.
- `diagramas.html`: visualizador autónomo; abrir en navegador sin instalar ni servir.
- `diagramas.json`: fuente compartida para los seis diagramas de HTML y PDF.
- `test_documentos.py`: verificaciones del documento, no tests de una aplicación.

## Regenerar

Desde la raíz, con las dependencias y fuentes indicadas en el README principal:

```bash
.venv/bin/python plan/compilar_plan_tecnico.py
.venv/bin/python plan/tecnico/test_documentos.py
```

El test de PDF utiliza PyMuPDF si está instalado; el de controles HTML usa Node
si está disponible. Si no, esos tests se omiten explícitamente. El resto requiere
ReportLab, igual que el generador. No se agregan dependencias ni servicios web
al HTML generado.

Los botones del visualizador resaltan conexiones; no crean casos, hacen llamadas
de IA ni prueban el producto. La vista estática se conserva con JavaScript apagado.
La validación con DOM simulado no equivale a probar Chrome, Firefox y Safari.

Estado: diseño técnico para revisión externa antes de entrega al participante.
Ningún archivo en esta carpeta implementa el MVP o sus endpoints.
