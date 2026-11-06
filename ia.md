# IA del MVP: qué hace, literalmente

Para quien implementa la integración. Complementa [diseno.md](diseno.md) (pantallas,
tipos, rutas). **Proveedor: Claude (Anthropic) con la clave que entregó la
organización**; donde `diseno.md` dice Groq/Gemini, vale esto.

## Resumen

La IA hace **dos cosas**. Todo lo demás (clicks, estados, consentimiento, vista del
tutor) es programación normal y debe funcionar aunque la IA falle.

| # | Entrada | Salida | Quién revisa |
| --- | --- | --- | --- |
| 1 | Plantilla del tutor (4 campos) + ramo de la malla | Escena jugable: narración + 3 opciones + «lo que suele pasar» | El tutor aprueba antes de publicar |
| 2 | Escenas marcadas 😮/🙁 por el estudiante + comentario opcional | 1–3 brechas en palabras | El estudiante confirma, edita o borra |

La brecha confirmada **es la alerta temprana explicable**; llega al tutor solo si el
estudiante decide compartirla.

**La IA NO:** decide si la carrera es para alguien; infiere el motivo (lo elige el
estudiante con botones); da puntajes, probabilidades o diagnósticos; inventa ramos,
notas, profesores o reglas; habla con el tutor por el estudiante.

## Llamada 1 · Plantilla → escena (`POST /api/escenas/generar`)

**Entrada (lo que escribe el tutor):**

```json
{
  "plantilla": {
    "id": "plantilla:1", "ramoId": "malla:DSY1103", "momento": "3er sem · S6", "tipo": "equipo",
    "situacion": "Proyecto en grupo con fecha de entrega; hay que aprender una herramienta nueva casi solo, leyendo documentación.",
    "sorprende": "Que no te enseñan todo en clase; buscas y pruebas por tu cuenta.",
    "leVaBien": "Pregunta temprano y se organiza con el grupo.",
    "rolAutor": "Tutor ficticio (demo)"
  },
  "fragmentos": [
    { "id": "malla:DSY1103", "texto": "DESARROLLO FULL STACK I (DSY1103), semestre 3" },
    { "id": "plantilla:1", "texto": "<situacion + sorprende + leVaBien>" }
  ]
}
```

**Salida esperada (JSON):**

```json
{
  "titulo": "3er semestre · Semana 6 · Desarrollo Full Stack I",
  "narracion": "Tu grupo entrega el viernes y nadie sabe usar la herramienta que pidió el profe. ¿Qué haces?",
  "opciones": [
    { "texto": "Leo la documentación y pruebo", "loQueSuelePasar": "Avanzas lento al principio, pero es lo que más se usa en este ramo." },
    { "texto": "Pregunto al profe o a un ayudante", "loQueSuelePasar": "Te orientan, aunque igual tendrás que practicar por tu cuenta." },
    { "texto": "Espero a que otro del grupo lo resuelva", "loQueSuelePasar": "El grupo avanza, pero llegas a la evaluación sin haberlo practicado." }
  ],
  "citas": ["malla:DSY1103", "plantilla:1"]
}
```

El servidor agrega `id`, `plantillaId`, `ramoId`, `momento`, `tipo`, ids de opciones y
`estado: "borrador"`. Ninguna escena llega al estudiante sin «Aprobar» del tutor.

**Prompt de sistema:**

```
Conviertes la experiencia de un tutor en UNA escena breve de un juego de decisiones
para estudiantes de primer año de Ingeniería en Informática (Duoc UC).
Reglas:
- Usa SOLO la información de la PLANTILLA y los FRAGMENTOS entregados. No inventes
  ramos, notas, porcentajes, profesores, herramientas ni reglas que no aparezcan.
- Español de Chile, segunda persona, tono cercano y neutro. Sin estereotipos de
  género, origen ni nivel socioeconómico.
- titulo: semestre, semana y nombre del ramo.
- narracion: máximo 3 oraciones; termina con una pregunta del tipo «¿Qué haces?».
- Exactamente 3 opciones realistas y distintas. Ninguna es correcta ni incorrecta.
- loQueSuelePasar: 1–2 oraciones por opción, basadas en la plantilla, sin juzgar.
- No evalúes al estudiante ni digas si la carrera es para él o ella.
- citas: ids de los fragmentos que usaste, tomados de la lista entregada.
Responde solo con JSON que cumpla el esquema.
```

**Esquema (zod):**

```ts
const EscenaIA = z.object({
  titulo: z.string().min(1).max(90),
  narracion: z.string().min(1).max(500),
  opciones: z.array(z.object({
    texto: z.string().min(1).max(120),
    loQueSuelePasar: z.string().min(1).max(300),
  })).length(3),
  citas: z.array(z.string()).min(1),
});
```

## Llamada 2 · Respuestas → brechas (`POST /api/brechas`)

**Entrada:**

```json
{
  "escenas": [ { "id": "esc-2", "titulo": "...", "narracion": "...", "citas": ["malla:DSY1103", "plantilla:1"],
                 "sorprende": "Que no te enseñan todo en clase; buscas y pruebas por tu cuenta." } ],
  "respuestas": [ { "escenaId": "esc-2", "opcionId": "o3", "reaccion": "sorprendio" } ],
  "comentario": "pensé que nos iban a enseñar paso a paso"
}
```

Enviar **solo** las escenas marcadas `sorprendio` o `no_gusto`. Nunca enviar el motivo
del estudiante ni datos personales.

**Salida esperada:**

```json
{
  "brechas": [
    { "escenaId": "esc-2",
      "texto": "Esperabas que te enseñaran paso a paso. En 3er semestre, en Desarrollo Full Stack I, se espera que aprendas buena parte por tu cuenta y en equipo.",
      "citas": ["malla:DSY1103", "plantilla:1"] }
  ]
}
```

**Prompt de sistema:**

```
Ayudas a un estudiante de primer año a poner en palabras qué no calzó con lo que
esperaba de su carrera, después de jugar una simulación.
Reglas:
- Considera solo las escenas entregadas (las que marcó «me sorprendió» o «no me gustó»).
- Por escena, UNA brecha en segunda persona: «Esperabas X. En <semestre y ramo>, Y.»
  X sale del comentario del estudiante si lo hay; si no, usa «Te sorprendió que...».
  Y sale solo del texto de la escena y de «sorprende».
- Máximo 3 brechas, 1–2 oraciones cada una. No inventes datos.
- Prohibido: inferir o mencionar su motivo (gusto, presión, familia, dinero),
  recomendar quedarse o dejar la carrera, dar puntajes, probabilidades o diagnósticos.
- citas: ids de la escena correspondiente.
Responde solo con JSON que cumpla el esquema.
```

**Esquema (zod):**

```ts
const BrechasIA = z.object({
  brechas: z.array(z.object({
    escenaId: z.string(),
    texto: z.string().min(1).max(280),
    citas: z.array(z.string()).min(1),
  })).max(3),
});
```

## Validación en el servidor (después del esquema)

Si cualquier regla falla, **se descarta la respuesta completa** y se usa el respaldo.

- Llamada 1: el `ramoId` de la plantilla existe en `malla.json` (comprobar **antes** de
  llamar); cada cita está entre los fragmentos enviados; todo código de ramo que
  aparezca en el texto (`/[A-Z]{3}\d{4}/`) existe en la malla.
- Llamada 2: cada `escenaId` es una escena marcada 😮/🙁; sus citas son subconjunto de
  las de esa escena.
- Ambas: rechazar textos con «no es para ti», «deberías dejar», «deberías cambiar»,
  «probabilidad», «%», «riesgo de desertar».

## Respaldos (la demo nunca depende de la IA)

| Falla | Qué pasa |
| --- | --- |
| Llamada 1 falla, tarda >10 s, rechaza o no valida | «La IA no respondió a tiempo. Puedes escribir la escena a mano.» → formulario manual |
| Llamada 2 falla | Regla fija: por cada escena 😮/🙁, brecha = «Te sorprendió que» + campo `sorprende` de su plantilla |
| Respuesta tardía | Cada llamada lleva `requestId`; si llega después del timeout, se ignora |
| Demo en vivo | 2 escenas ya aprobadas en `contenido.json`; solo 1 se genera en vivo |

## Implementación con Claude

- SDK oficial `@anthropic-ai/sdk` (no el `fetch` compatible con OpenAI de
  `web/src/lib/llm.ts`; mantener la firma `pedirJSON()` o reemplazarla).
- JSON garantizado con **structured outputs**: `client.messages.parse()` con esquema
  zod, o `output_config: { format: ... }`. No usar `output_format` (obsoleto).
- Modelo por defecto `claude-opus-5-5`; para bajar latencia, `output_config.effort:
  "low"`. Si sigue lento en la demo, probar `claude-haiku-5-5` y decidir midiendo.
  Confirmar qué modelos permite la clave entregada.
- Timeout de **10 s por petición** y `maxRetries: 0` en el cliente (con reintentos, la
  espera puede triplicarse). Revisar `stop_reason`: si es `"refusal"`, usar respaldo.
- Clave en `web/.env.local` como `ANTHROPIC_API_KEY`; nunca en el código, el chat ni el
  navegador. `LLM_MOCK=true` devuelve los ejemplos de arriba sin llamar a la API.
- Archivos sugeridos: `web/src/lib/ia/{prompts,esquemas,validar,respaldos}.ts`,
  `generarEscena.ts`, `proponerBrechas.ts`; los endpoints solo los llaman.

## Pruebas mínimas (anotar resultado real; no declarar las no ejecutadas)

1. Plantilla válida → escena con 3 opciones y citas válidas.
2. Plantilla con `ramoId` inexistente → rechazo antes de llamar.
3. Respuesta con cita o código de ramo inventado → descarte y respaldo.
4. Timeout simulado → formulario manual; respuesta tardía ignorada.
5. Texto con «no es para ti» → descarte.
6. **Sesgo:** misma plantilla y mismas respuestas con comentario firmado como
   «Camila» / «Matías» → brechas equivalentes, sin estereotipos. Guardar la evidencia.

## Para la declaración de transparencia

«Claude (Anthropic), con cuenta entregada por la organización; solo datos ficticios.
La IA redacta escenas a partir de la experiencia de un tutor y propone brechas a partir
de las reacciones del estudiante; tutor y estudiante revisan y deciden.»

## Llamada 3 · Onboarding → recomendados para explorar (acordado 6/11 ~12:15)

Reemplaza la idea de un «porcentaje de afinidad». **No existe ningún puntaje,
porcentaje, ranking ni etiqueta de afinidad en la app.**

**Onboarding (solo clicks, antes del juego):**
1. ¿Qué te imaginas haciendo? — crear apps o páginas · resolver problemas lógicos ·
   trabajar con datos · conversar con clientes o personas · trabajar en equipo ·
   aún no lo sé.
2. ¿Qué te entusiasma? (mismas etiquetas).
3. ¿Qué te preocupa? — matemáticas · programar desde cero · trabajos en grupo ·
   la carga de tiempo · prefiero no decir.

Las respuestas son del estudiante, no se comparten con el tutor salvo que lo elija.

**Qué se recomienda:** solo cosas para **explorar**, tomadas de un catálogo precargado:
escenas para jugar, ramos para mirar en la malla, personas con quién conversar
(estudiante de 3er año, tutor, orientación vocacional) y recursos. Otras carreras
solo si su contenido existe en el catálogo (hoy no: fuera del MVP).

**Entrada:** etiquetas elegidas en el onboarding + reacciones del juego + catálogo.
**Salida (JSON):** 2–3 ítems `{ itemId, porQue, basadoEn: [etiquetas] }`.

**Reglas contra la estigmatización (obligatorias):**
- Base única: lo que el estudiante marcó o reaccionó. **Nunca** nombre, género, edad,
  origen, colegio, ingresos, familia ni motivo (gusto/presión).
- Lenguaje de invitación: «Podrías explorar…», «Te puede servir…». Prohibido: «eres»,
  «ideal para ti», «no es para ti», «mejor opción», «deberías», porcentajes, notas o
  comparaciones con otros estudiantes.
- Cada recomendado dice **por qué**, citando la respuesta del propio estudiante
  («Porque marcaste que te entusiasma crear apps»).
- Siempre se ofrece también «Conversarlo con tu tutor» y «Seguir explorando». Nunca se
  recomienda abandonar ni quedarse.
- El estudiante puede ocultar cualquier recomendado. No se guardan ni se comparten por
  defecto.

**Validación:** `itemId` existe en el catálogo; `basadoEn` ⊂ etiquetas que marcó el
estudiante; mismas frases prohibidas que arriba más «eres», «ideal», «mejor opción»,
«deberías», «%». Si falla → respaldo.

**Respaldo:** regla fija etiqueta → ítems del catálogo, con el texto «Porque marcaste…».

**Prueba de sesgo:** mismas respuestas con nombres distintos (p. ej. «Camila» /
«Matías») → mismos recomendados. Como la llamada no recibe el nombre, sirve además para
demostrar al jurado que el dato no entra.

**Prompt de sistema:**

```
Sugieres 2 o 3 cosas para EXPLORAR a un estudiante de primer año, elegidas SOLO del
CATÁLOGO entregado, a partir de las etiquetas que él mismo marcó y de sus reacciones
en la simulación.
Reglas:
- No evalúes a la persona ni su afinidad con la carrera. Sin porcentajes, puntajes,
  rankings ni comparaciones con otros.
- Usa lenguaje de invitación («Podrías explorar…»). Prohibido «eres», «ideal para ti»,
  «no es para ti», «mejor opción», «deberías».
- porQue: una oración que cite lo que el estudiante marcó.
- basadoEn: ids de las etiquetas que usaste, solo entre las que marcó.
- Nunca recomiendes dejar ni quedarse en la carrera.
Responde solo con JSON que cumpla el esquema.
```
