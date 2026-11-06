# Verificaciones del plan técnico

6 de noviembre de 2026 · diseño documental, no producto implementado.

## Revisión interna

Tres subagentes analizaron por separado paneles, backend/contratos y pruebas/
despliegue. Un revisor adicional leyó el plan integrado y señaló cuatro vacíos:
atomicidad frente a revocación, sustitución de copias autorizadas, ID necesario
para navegar desde bandeja y contrato de transiciones de seguimiento.

Los cuatro se precisaron en el documento antes de enviarlo a revisión externa.
No se amplió a integraciones, datos reales ni decisiones administrativas.

## Verificaciones ejecutadas

```bash
PYTHONPATH=/tmp/opencode/duoc-pdf-deps python plan/compilar_plan_tecnico.py
PYTHONPATH=/tmp/opencode/duoc-pdf-deps python plan/tecnico/test_documentos.py
```

Nueve tests documentales aprobados, sin omisiones:

1. Los seis diagramas referenciados existen y no se duplican.
2. Flechas nombradas y dentro de sus límites.
3. Sintaxis del generador Python.
4. Controles HTML siguiente/anterior/restablecer con DOM simulado en Node.
5. HTML sin recursos externos, SVG válido, IDs únicos y reducción de movimiento.
6. Dos ejemplos JSON válidos.
7. Texto de nodos dentro de sus cajas.
8. PDF: páginas/capítulos/marcadores, contenido, Unicode y márgenes.
9. Aritmética del caso y cronograma 60+75.

El plan ocupa 24 páginas: incluye seis diagramas vectoriales y un anexo de
seguimiento. Se revisó visualmente un mosaico completo de la primera compilación;
se corrigieron textos ajustados de nodos y se añadieron precisiones de contrato.
`git diff --check` se usa antes de publicar.

No hay Chromium, Firefox, Safari ni LibreOffice disponibles en este entorno.
El test de controles no sustituye navegación real ni valida render en todos
los navegadores. El documento estático sigue visible sin JavaScript.

## Pendientes de revisión

Claude debe revisar por separado el plan técnico y los diagramas. Los contratos,
tests funcionales propuestos y estado del MVP no se presentan como implementados.
