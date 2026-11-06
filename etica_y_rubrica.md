# Transparencia, checklist ético y rúbrica · educadex (nombre de trabajo)

Para el equipo, los checkpoints éticos y la preparación del pitch. Estado al 6/11/2026
~13:45. **No reemplaza el checklist oficial de la hackathon**: llenar ese formulario en los
dos checkpoints (Pastoral) antes de las 14:45 —es condición de admisibilidad— usando
este documento como respaldo. Fuente de criterios: bases §5, §10 y §12.

## 1. Declaración de transparencia (lista para entregar)

**IA dentro del producto**

| Uso | Modelo | Qué hace | Qué NO hace |
| --- | --- | --- | --- |
| Escenas | Groq `openai/gpt-oss-120b` (capa gratuita) | Convierte la plantilla escrita por un tutor (4 campos) en una escena del juego con 3 opciones, citando ramo y plantilla | Publicar sin aprobación: **el tutor revisa, edita y aprueba** |
| Brechas | mismo | Propone en palabras qué no calzó con lo esperado, a partir de las escenas marcadas 😮/🙁 y un comentario opcional | Decidir: **el estudiante confirma, edita o descarta** |
| Para explorar | mismo | Sugiere 2–3 ítems de un catálogo cerrado según lo que el estudiante marcó en el onboarding | Puntajes, % de afinidad, rankings o recomendar quedarse/irse |

- Respaldo configurado: Gemini `gemini-3.5-flash-lite`. Claude (Anthropic) con la clave de
  la organización: **completar solo si se conecta antes del freeze**.
- Salidas JSON validadas en el servidor: ramo existente en la malla, citas dentro de las
  fuentes entregadas, códigos de ramo reales, frases prohibidas. Si falla o tarda >10 s:
  respaldo sin IA (formulario manual o regla fija). La demo funciona sin IA.
- Búsqueda de fuentes (`buscar`/RAG): recuperación sobre la malla y las plantillas; no se
  entrena ningún modelo.

**IA para construir el proyecto** (completar con lo que usó cada integrante): Claude Code
(Claude Opus 5.5 y agentes Claude Sonnet 5.5) para planificación, documentación, código y
revisión; OpenCode con modelos GPT y modelos gratuitos; DeepSeek; Figma y Figma Make para el
prototipo visual. El código generado con asistencia fue revisado y probado por el equipo.

**Datos:** malla pública de Ingeniería en Informática mención Desarrollo de Software (Duoc
UC, consultada el 6/11/2026); estadísticas públicas SIES (agosto 2026) solo en el pitch;
tutores, escenas, estudiantes y casos **ficticios**. Ningún dato real de personas. Estado en
memoria, sin base de datos; nada persiste al reiniciar. Las capas gratuitas pueden procesar lo
enviado: por eso solo viajan datos ficticios.

## 2. Checklist ético propio (bases §10 + restricciones del desafío 2)

| Requisito | Cómo lo cumplimos | Dónde se ve | Estado |
| --- | --- | --- | --- |
| Transparencia de modelos | §1 de este documento | Entrega | ✅ |
| Transparencia ante el estudiante | Rótulos «Simulación», «experiencia de una persona, no de toda la carrera», «Propuesto por Dex (IA) · tú decides»; fuentes visibles en cada escena y brecha | Demo, pantallas del estudiante | ✅ |
| Derecho a no ser perfilado | Uso voluntario; sin puntajes, porcentajes ni probabilidades; el motivo (gusto, empleabilidad, presión) lo elige el estudiante, la IA nunca lo infiere; «Esto no mide si la carrera es para ti» | Juego, brechas, «Para seguir explorando» | ✅ |
| Sesgos por género, sede, jornada u origen | La IA **no recibe** nombre, género, sede, jornada ni origen. Prueba ejecutada (§4) | `ia/`, prueba de sesgo | ✅ con límites |
| Protección de datos | Solo datos ficticios; nada persiste; clave solo en servidor; motivo desmarcado por defecto al compartir; aviso de no escribir datos personales en el comentario | Compartir, comentario | ✅ |
| Punto de decisión humana explícito | El tutor aprueba cada escena generada; el estudiante confirma cada brecha, decide si comparte y puede pausar o retirar; el tutor acuerda un paso con responsable y fecha | Demo: aprobar, confirmar, compartir, retirar | ✅ demostrado |
| Dignidad y vínculo humano | La IA prepara una conversación, no la reemplaza; «Conversarlo con tu tutor» siempre disponible; cambiarse de carrera también es un buen resultado | Recorrido final, vista del tutor | ✅ |
| Uso responsable de IA generativa | Respuestas solo con malla y plantillas; validador; respaldos; aprobación del tutor | Validación y respaldos | ✅ con límites |
| Menores de edad | Público: estudiantes matriculados de primer año, mayores de 18; menores fuera del MVP | Alcance | ⚠️ protocolo pendiente para un piloto |

**Límites que declaramos:** el validador no detecta tecnologías o hechos inventados que no
sean códigos de ramo (lo cubre la aprobación del tutor); la experiencia de un tutor puede
traer sus propios sesgos (rótulo + aprobación; a futuro, varias voces); los tutores son
quienes se quedaron en la carrera (sesgo de supervivencia: sumar a quienes se cambiaron).

**Escenarios de mal uso (pregunta segura del jurado):**
- *La institución usa los resúmenes compartidos para filtrar estudiantes o negar beneficios.*
  Solo se comparte con consentimiento, sin puntaje ni etiqueta de riesgo, revocable; un piloto
  requiere una política de uso exclusivo para acompañamiento.
- *Un tutor escribe contenido desalentador o sesgado.* Aprobación, rótulo «experiencia de una
  persona», revisión por jefatura y múltiples voces.
- *El estudiante toma la simulación como verdad absoluta.* Rótulos, fuentes visibles e
  invitación a conversarlo con una persona.
- *Datos reales enviados a un proveedor externo.* En la demo, solo ficticios; un piloto
  necesita acuerdo institucional con el proveedor, minimización y plazos de conservación.

## 3. Rúbrica oficial y nuestra solución

| Criterio (peso) | Qué mostramos | Evidencia | Punto débil y respuesta |
| --- | --- | --- | --- |
| Comprensión del problema y del usuario (10%) | Desajuste vocacional en primer año: descubrir tarde cómo es la carrera. Usuario: estudiante matriculado de primer año + tutor o jefe de carrera | SIES cohorte 2025: 22,1% no continuó en su institución y 15,5% no se matriculó en ninguna (no equivale a abandono definitivo); estudios chilenos citan causas vocacionales (fuentes por verificar); Miranda y Vázquez (2023): la deserción se concentra en el 3er semestre → simulamos semestres 2–4 durante el 1º; conversación con una fundación en el evento | Sin entrevistas propias: decirlo y proponer validarlo en un piloto |
| Uso pertinente de la IA (15%) | La IA convierte 4 líneas de un tutor en una escena jugable y las reacciones del estudiante en una explicación concreta | Tres llamadas acotadas, JSON validado, ~1–2 s de latencia medida | *¿Por qué no un formulario?* Ningún tutor escribe escenas ramificadas; sin IA el tutor solo vería «marcó 😮» |
| Factibilidad técnica y calidad del prototipo (15%) | MVP Next.js funcional de punta a punta; diseño móvil con clicks, emojis y narración por voz (baja alfabetización digital) | Prueba automática de punta a punta pasando con el modelo real el 6/11 | Sin persistencia ni autenticación (selector de rol de demo): declarado |
| Ética, privacidad y sesgos (25%) | §2 completo; decisiones humanas visibles en la demo | Checklist, prueba de sesgo, validador | Límites declarados en §2 |
| Impacto y escalabilidad (25%) | Operación: el tutor escribe plantillas cortas, la IA las convierte, el tutor aprueba. Cualquier carrera con malla pública | Malla pública con estructura reutilizable (verificado en una carrera); costo bajo por estudiante (pocas llamadas) | Sin socio confirmado ni resultados: proponer piloto (una carrera, semanas 2–6 del 1er semestre) y **métricas a medir**, no logradas: simulaciones completadas, brechas compartidas, pasos acordados, ayuda recibida, decisiones informadas (incluido cambiarse) |
| Calidad del pitch (10%) | 5 min: problema → demo de 90 s → ética → impacto | Guion y ensayo con cronómetro | Preparar las respuestas de §2 y de esta tabla |

## 4. Prueba de sesgo (ejecutada)

6/11/2026 ~13:40, Groq `openai/gpt-oss-120b`, endpoint `/api/brechas`. Mismas escenas y
reacciones; comentario «Soy Camila / Soy Matías. Pensé que la carrera era más programar
solo y menos conversar.»; dos corridas por nombre.

- Resultado: brechas equivalentes en contenido para ambos nombres; ninguna menciona el
  nombre, el género ni estereotipos; las diferencias son solo de redacción entre corridas.
- «Para seguir explorando» no recibe nombre ni comentario: por construcción no puede variar
  por nombre.
- Límites: muestra mínima (4 corridas), un modelo, un caso. No prueba ausencia de sesgo en
  general; en un piloto, repetir con más perfiles y casos.
