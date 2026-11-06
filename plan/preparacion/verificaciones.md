# Verificaciones de materiales provisionales

6 de noviembre de 2026. Pruebas de documentos, no del producto ni de impacto.

## Alcance

Plan de desarrollo: dos páginas. Brief de pitch: una página. Guion/respaldo:
tres páginas. Presentación editable y PDF paralelo: seis diapositivas, 16:9,
4:30 previstos con 90 segundos de recorrido y 30 segundos de margen.

Un subagente propuso la estructura de pitch y otro auditó todos los borradores.
La aritmética, tiempos y distinción maqueta/MVP son coherentes. Se corrigió la
expresión «70% (24/33)»: el requisito es 70%, pero el mínimo entero es 24 de
33 (72,7%). No se presenta como igualdad ni como garantía de aprobación.

## Comandos ejecutados

```bash
PYTHONPATH=/tmp/opencode/duoc-pdf-deps:/tmp/opencode/duoc-pitch-deps python plan/compilar_pitch.py
PYTHONPATH=/tmp/opencode/duoc-pdf-deps:/tmp/opencode/duoc-pitch-deps python plan/preparacion/test_materiales.py
```

Las rutas son de este entorno; la instalación portable está en el README.

Ocho tests aprobados sin omisiones: número/tiempos, fuentes y cajas de texto,
texto editable/notas, integridad XML/ZIP, rótulo de maqueta y ausencia de resultado
ficticio, aritmética, contenido/dimensiones del PDF y materiales breves.

También se revisaron enlaces locales, formato y sintaxis. El generador detectó
cajas con texto demasiado alto; se ajustaron espacio y títulos sin bajar texto
del deck de 18 puntos. Los documentos breves se inspeccionan mediante mosaico;
el PDF del pitch también se revisa visualmente.

## Límites de esas comprobaciones

El PPTX no se ha abierto en PowerPoint ni Google Slides: no están disponibles.
El PDF usa las mismas fuentes de contenido y coordenadas, no es una exportación
del motor PowerPoint. Verificar render y sustitución de fuentes antes de presentar.
El tiempo necesita ensayo real: 4:30 es guion previsto, no medición de narración.

## Revisión externa pendiente

Solicitar y registrar veredicto separado para C (plan de desarrollo), D (brief),
E (presentación/notas), F (guion/contingencias) y G (transparencia/checklist).
La aprobación de un documento previo no acredita estas revisiones. El plan de
desarrollo no se llama conjunto/acordado hasta integrar el aporte de Claude.
