# Reglas de trabajo del repositorio

## Edición y revisión

- Solo la sesión principal designada como builder edita el repositorio.
- Los subagentes apoyan mediante análisis, investigación, revisión y ejecución
  de pruebas de solo lectura. No modifican archivos, generan artefactos dentro
  del repositorio, hacen commits ni ejecutan herramientas que reescriban archivos.
- La sesión crítica externa aporta observaciones, no edita este repositorio.
- La sesión principal integra las observaciones pertinentes y conserva los
  cambios ajenos o preexistentes.

## Documentación

- Mantener `AGENTS.md` dedicado al contexto del evento y del proyecto, no a esta
  metodología de trabajo.
- Registrar decisiones relevantes, razones, supuestos, límites y pendientes en
  la documentación correspondiente. Evitar duplicación innecesaria e historiales
  privados de conversaciones.
- Actualizar instrucciones de ejecución, configuración y pruebas cuando cambien.
- Distinguir investigación publicada, hipótesis, funcionalidad implementada y
  resultados observados. No documentar metas como si fueran resultados.
- Mantener la fuente editable y regenerar el PDF cuando se modifique su contenido.
- No registrar credenciales, datos sensibles reales o información privada que
  no sea necesaria para el proyecto.

## Pruebas y verificación

- Cada cambio debe tener una verificación proporcionada a su alcance.
- Al implementar comportamiento, añadir o actualizar pruebas automatizadas;
  ante un defecto reproducible, incluir una prueba de regresión cuando sea viable.
- Cubrir especialmente reglas, autorización, consentimiento, estados, errores e
  incertidumbre. Un recorrido feliz no basta.
- Para documentación, comprobar coherencia, referencias locales y formato.
  Para PDFs, revisar compilación, contenido, paginación, enlaces y presentación.
- Usar revisión independiente de subagentes cuando aporte valor, sin delegarles
  permisos de escritura ni control del repositorio.
- Informar qué verificaciones se ejecutaron, sus resultados y qué quedó sin
  probar. Si una prueba no puede ejecutarse, explicar el bloqueo y el riesgo.
- No confundir pruebas del generador documental con pruebas de un MVP todavía
  no implementado, ni pruebas sintéticas con validación de impacto social.

## Alcance

Estas reglas no autorizan nuevas funcionalidades, cambios destructivos,
publicaciones de datos ni ampliaciones de alcance. Los encargos concretos y
las restricciones del evento siguen determinando qué se implementa.
