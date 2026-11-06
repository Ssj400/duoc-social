# RAG y guía de prueba de la IA

Para quien implementa y prueba la IA del MVP. Complementa [ia.md](ia.md) (llamadas, prompts,
esquemas, respaldos) y [diseno.md](diseno.md) (pantallas y tipos). Estado al 6/11/2026 ~12:40 (main `f141ca3`):
**nada de este documento está implementado todavía**; `web/src/lib/buscar.ts` sigue simulado.

## 1. Para qué sirve la IA: las tres preguntas del estudiante

El estudiante de primer año llega con tres preguntas. Regla: **la IA ayuda a responder la
primera, prepara la segunda y la tercera la responde una persona.**

| Pregunta | Quién responde | IA | RAG |
| --- | --- | --- | --- |
| **¿Qué me espera?** | Malla oficial + experiencia del tutor | Llamada 1: plantilla → escena con citas; el tutor aprueba | Entrega el ramo, sus prerrequisitos, lo que habilita y plantillas del mismo semestre |
| **¿Podré con ello?** | El estudiante, con lo que hace quien ya pasó por ahí | Llamada 2 extendida: cada brecha trae `queAyuda`, tomado solo de `leVaBien` (§5.1) | No hace falta búsqueda nueva: usa los fragmentos ya citados por la escena |
| | | Llamada 3: recomendados para explorar según lo que marcó (p. ej. «me preocupa la carga de tiempo») | Filtra el catálogo por etiquetas y entrega candidatos |
| **¿Sigo la carrera?** | El estudiante, y su tutor si decide compartir | **Ninguna.** Resumen «Tu recorrido» con tres salidas del mismo peso: seguir explorando, conversar con mi tutor, ver información de cambio de carrera | — |

«¿Podré con ello?» se responde como **«¿qué necesitaría para poder?»**. Nunca con sí/no,
puntaje ni comparación: eso sería predecir y perfilar.

**Lo económico, sin IA:** la carga del semestre sale de la malla (horas pedagógicas),
rotulada como dato oficial. Sirve a quien trabaja y estudia. Becas/FUAS: solo enlace estático
oficial (P2 de [planificacion.md](planificacion.md)).

Frase de pitch: *«La IA no te dice si esta carrera es para ti. Te muestra cómo es, qué hace
la gente a la que le va bien, y te deja llegar a esa conversación con información.»*

## 2. Qué es (y qué no es) el RAG aquí

- **No se entrena ningún modelo.** El RAG recupera fragmentos verificables (malla pública de
  Duoc + plantillas de tutores + catálogo) y la IA redacta solo con ellos y los cita.
- Corpus pequeño (34 ramos + N plantillas + catálogo) con vocabulario controlado →
  **BM25 propio en TypeScript, sin dependencias**: determinista, instantáneo y testeable.
- Sin embeddings en el MVP: `multilingual-e5-small` exige descargar ~120 MB con la red del
  evento. Queda como P1 (§8).
- Ideas tomadas de un RAG previo del equipo (Spring AI, otro proyecto): el fragmento lleva su
  contexto dentro del texto; se piden más candidatos y se reordenan por metadata; el
  fragmento clave se fuerza aunque no salga en el top-k; recall medido con un set fijo de
  consultas antes de ajustar bonos.

## 3. Corpus

### 3.1 Fuentes

| Fuente | Archivo | Nota |
| --- | --- | --- |
| Malla (lo que usa la app) | `web/src/data/malla.json` | 34 ramos; trae `prerrequisitos`, no trae horas ni «habilita» |
| Malla detallada | [material_preparacion/malla-050-detalle.json](material_preparacion/malla-050-detalle.json) | Extraída de los atributos `data-*` de la página oficial el 6/11: horas, SCT, formato, `habilita`, certificación |
| Plantillas y escenas | `web/src/data/contenido.json` | Ficticias, rotuladas |
| Catálogo de la llamada 3 | `web/src/data/catalogo.json` | Ficticio: etiquetas del onboarding + ítems (escena, ramo, persona, recurso) con `etiquetas` |

**La malla oficial no describe contenidos** (`descripcion: null` en todos los ramos). Los
fragmentos de malla solo respaldan hechos estructurales; lo que pasa en clase sale **solo** de
la plantilla del tutor.

Acción: copiar `horas`, `sct`, `formato` y `habilita` del archivo detallado a
`web/src/data/malla.json` (mismos `id`) y agregarlos a `Ramo` en `tipos.ts` como opcionales.

### 3.2 Forma de cada fragmento

Un ramo = un fragmento; una plantilla = un fragmento; un ítem de catálogo = un fragmento.
No se trocea.

```text
malla:DSY1103 · tipo malla
  "Desarrollo Full Stack I (DSY1103). 3° semestre. Línea Desarrollo de Soluciones de Software.
   126 horas pedagógicas, 5 SCT, presencial. Requiere DSY1102 Desarrollo Orientado a Objetos.
   Aporta a la certificación Desarrollador Full Stack."
  fuente: "Malla Duoc 050, consultada 06/11/2026"

plantilla:1 · tipo plantilla
  "Desarrollo Full Stack I, 3er sem · S6, trabajo en equipo. Situación: … Sorprende: …
   Le va bien a quien: …"
  fuente: "Experiencia de Tutor ficticio (demo)"
```

- Nombres en formato título (la malla los trae en MAYÚSCULAS).
- Metadata fuera del texto (no va al prompt): `ramoId`, `semestre`, `tipo`, `etiquetas` (catálogo).
- `Fragmento.tipo` hoy admite `"malla" | "plantilla"`; agregar `"catalogo"` solo si la llamada 3 pasa por el RAG (§5).

## 4. Búsqueda

### 4.1 Contrato

```ts
type Filtros = { ramoId?: string; semestre?: number; tipo?: Fragmento["tipo"]; etiquetas?: string[] };
buscar(consulta: string, k: number, filtros?: Filtros): Promise<Fragmento[]>
```

El tercer parámetro es opcional: las llamadas actuales siguen funcionando sin cambios.

### 4.2 Normalización (`web/src/lib/rag/normalizar.ts`)

1. Minúsculas y sin tildes: `s.normalize("NFD").replace(/\p{Diacritic}/gu, "")`.
2. Tokenizar con `/[^a-z0-9ñ]+/`. **No usar `\W`**: el simulado actual corta «programación»
   en `programaci` + `n` (verificado con Node).
3. Stopwords mínimas en español (de, la, el, en, y, a, que, los, las, un, una, por, con, para, se, es, del).
4. Sinónimos aplicados a la consulta: `bd → base datos`, `fullstack → full stack`,
   `tercer|tercero → 3`, `cuarto → 4`, `segundo → 2`, `mate → matematica`.
5. Los códigos (`dsy1103`) se mantienen como token.

### 4.3 Índice y puntaje (`web/src/lib/rag/bm25.ts`, `buscar.ts`)

- BM25 con `k1 = 1.2`, `b = 0.75`, índice en memoria construido al primer uso.
- Reconstruir el índice cuando el tutor aprueba una escena o se edita el catálogo (o
  simplemente recalcular: con menos de 100 fragmentos toma milisegundos).
- Pedir `k * 4` candidatos y reordenar:

```text
puntaje = bm25
        + 10  si fragmento.ramoId === filtros.ramoId
        +  3  si fragmento.semestre === filtros.semestre
        +  2  si es plantilla del mismo ramo
        +  4  por cada etiqueta en común (catálogo, llamada 3)
```

- **Forzado:** si viene `filtros.ramoId`, el fragmento `malla:<ramoId>` va siempre en el
  resultado, aunque BM25 no lo encuentre.
- `filtros.tipo` filtra; los demás filtros solo suman puntos (nunca descartan).
- Consulta sin coincidencias → `[]` (más el forzado, si aplica). Nunca lanza error.
- Los bonos son iniciales: ajustarlos solo midiendo con las pruebas del §6.1.

### 4.4 Validación de citas (`web/src/lib/rag/citas.ts`)

`validarCitas(citas: string[], recuperados: string[]): boolean`: todas las citas deben estar
entre los fragmentos entregados. Ya existe una versión dentro de `ia/validar.ts`; extraerla
para reutilizarla en las tres llamadas.

## 5. Cómo usa cada llamada al RAG

| Llamada | Punto de integración | Uso |
| --- | --- | --- |
| 1 · Escena | `web/src/lib/ia/generarEscena.ts` | `buscar(situacion + " " + sorprende, 5, { ramoId, semestre })`. Hoy arma a mano los fragmentos «propios» y además llama a `buscar`; con el forzado del §4.3, los propios se pueden quitar |
| 2 · Brechas | `web/src/lib/ia/proponerBrechas.ts` | Sin búsqueda: usa las `citas` de cada escena marcada |
| 3 · Recomendados | `web/src/lib/ia/recomendar.ts` (ya existe) | Hoy envía el catálogo completo al prompt y valida `itemId` contra el catálogo: con el catálogo actual (pequeño) basta. Si crece: `buscar(etiquetas.join(" "), 6, { tipo: "catalogo", etiquetas })` y validar `itemId` contra los candidatos. **Opcional, no bloquea la demo** |

### 5.1 Extensión de la llamada 2: `queAyuda`

Hoy `leVaBien` se escribe en la plantilla pero **nunca llega al estudiante**.

- Esquema: `brechas[].queAyuda: z.string().min(1).max(200)`.
- Prompt (agregar a `PROMPT_BRECHAS`): «queAyuda: una oración con lo que suele servir a
  quienes les va bien, tomada SOLO del campo leVaBien de esa escena. No digas si el
  estudiante podrá o no.»
- La entrada de la llamada 2 debe incluir `leVaBien` por escena (hoy solo va `sorprende`).
- Frases prohibidas nuevas en `validar.ts`: «vas a poder», «no vas a poder», «eres capaz»,
  «no eres capaz», «te va a ir».
- Respaldo: `queAyuda = "A quienes les va bien suele servirles: " + leVaBien`.
- `Brecha` en `tipos.ts`: agregar `queAyuda?: string`. En la vista del tutor, sirve de punto
  de partida para el paso acordado.

### 5.2 Correcciones detectadas en el código actual

1. **Con solo la clave de Claude, la app queda en mock sin avisar:** `ia.md` usa
   `ANTHROPIC_API_KEY`, pero `llm.ts` decide el mock con `!process.env.LLM_API_KEY`. Al
   migrar a `@anthropic-ai/sdk` (ver `ia.md`), basar `modoLLM()` en `ANTHROPIC_API_KEY` y
   actualizar `.env.example`. `/api/salud` ya muestra el modo: revisarlo antes de la demo.
2. **Título fijo en el mock:** `proveedor.ts` escribe «3er semestre» aunque `momento` sea
   otro. Derivarlo de `momento` o del `semestre` del ramo.
3. **Plantilla de 4° semestre:** las tres son de 3°; la línea de tiempo Sem 2 → 3 → 4 pide al
   menos una de 4° (DSY1104 Full Stack II o BDY1103 Taller de BD).
4. **Herramientas inventadas:** el validador detecta códigos de ramo falsos, pero no
   nombres de tecnologías («React»). Lo cubren el prompt y la aprobación del tutor; en el pitch
   decirlo así, sin prometer más.

## 6. Pruebas

No hay runner de tests en `web/`. Propuesta: `npm i -D vitest` y en `package.json`
`"test": "vitest run"`. Archivos junto al código (`*.test.ts`), sin llamar a la IA real.

### 6.1 RAG (`web/src/lib/rag/buscar.test.ts`)

| # | Consulta / caso | Esperado |
| --- | --- | --- |
| R1 | «modelar datos laboratorio base de datos tercer semestre» | `malla:BDY1102` en top 3 |
| R2 | «full stack», `{ semestre: 4 }` | `malla:DSY1104` antes que `malla:DSY1103` |
| R3 | «programacion» (sin tilde) | `malla:FPY1101` en top 3 |
| R4 | «Programación» (con tilde y mayúscula) | mismo resultado que R3 |
| R5 | «xyzzy» | `[]` |
| R6 | «xyzzy», `{ ramoId: "malla:RQY1102" }` | contiene `malla:RQY1102` (forzado) |
| R7 | cualquier consulta | ningún resultado tiene id repetido; `length ≤ k` |
| R8 | `{ tipo: "plantilla" }` | todos los resultados son plantillas |
| R9 | «conversar con cliente requisitos» | `plantilla:3` en top 3 |
| R10 | `validarCitas(["malla:XXX0000"], ids)` | `false` |

Anotar el resultado real de R1–R9 (cuántas pasan) antes de ajustar bonos.

### 6.2 IA con proveedor simulado (`LLM_MOCK=true`)

Las 6 pruebas de `ia.md` (§Pruebas mínimas), más:

| # | Caso | Esperado |
| --- | --- | --- |
| A1 | Brecha con `queAyuda` que dice «vas a poder» | descarte → respaldo |
| A2 | Llamada 2 falla | cada brecha trae `queAyuda` del respaldo (`leVaBien`) |
| A3 | Llamada 3 con `itemId` fuera del catálogo | descarte → respaldo por regla |
| A4 | Llamada 3 con `basadoEn` que el estudiante no marcó | descarte |
| A5 | Ninguna entrada a las llamadas 2 y 3 contiene `motivos`, nombre ni alias | revisar el JSON enviado (log en desarrollo) |

### 6.3 Recorrido completo a mano

```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```

1. `http://localhost:3000/api/salud` → confirma `mock: true` o el modelo real.
2. `/tutor/plantilla` → generar escena → ver citas → aprobar.
3. `/estudiante` → jugar 3 escenas, marcar 😮 en una y 🙁 en otra → brechas con `queAyuda`.
4. Confirmar una, editar otra; compartir **solo brechas** (motivo desmarcado).
5. `/tutor` → el caso aparece; pausar desde el estudiante → desaparece para el tutor.
6. Con la clave real: `http://localhost:3000/api/salud?probar=1` (una sola llamada) y luego
   generar **una** escena en vivo. Cuidar la cuota.
7. Timeout: con clave real y `LLM_TIMEOUT_MS=1` en `.env.local` → formulario manual y
   brechas por regla. (Con mock no se puede probar: el mock responde antes del timeout.)
8. Sesgo: mismas respuestas con comentario firmado «Camila» y «Matías» → brechas y
   recomendados equivalentes. Guardar capturas como evidencia para el checklist ético.

### 6.4 Listo cuando

- [ ] R1–R10 ejecutadas y resultado anotado aquí.
- [ ] `buscar` real reemplaza al simulado sin cambiar las llamadas existentes.
- [ ] `queAyuda` visible para el estudiante, con respaldo.
- [ ] `modoLLM()` coherente con `ANTHROPIC_API_KEY`.
- [ ] Recorrido 6.3 completo con mock; pasos 6 y 7 con clave real.
- [ ] Prueba de sesgo ejecutada y evidencia guardada (o declarada como no ejecutada).

## 7. Reparto sugerido en los bloques

| Bloque | RAG | IA |
| --- | --- | --- |
| hasta 12:45 | `normalizar`, `bm25`, `buscar` + R1–R10 | `queAyuda` en esquema, prompt, validador y respaldo |
| 13:30–14:15 | Forzado del ramo; catálogo en el RAG solo si sobra tiempo | Migrar a `@anthropic-ai/sdk`, corregir `modoLLM`, recorrido 6.3 con clave real |
| 14:15–14:45 | Solo correcciones | Prueba de sesgo, declaración de modelos |

Freeze 14:45. Si a las 13:30 el RAG no pasa R1–R6, se deja el simulado corregido (normalización
de tildes) y se sigue: la demo no depende del RAG, depende de las escenas aprobadas.

## 8. Fuera del MVP (escalabilidad en el pitch)

- Embeddings `multilingual-e5-small` (prefijos `query:`/`passage:`), vectores precalculados con
  huella SHA-256 del corpus; puntaje híbrido con BM25.
- Otras carreras: la página de malla de Duoc expone los mismos atributos `data-*`
  (comprobado en una sola carrera; verificar en una segunda antes de afirmarlo).
- Voces de quienes se cambiaron de carrera, para contrarrestar el sesgo de supervivencia
  (los tutores son quienes se quedaron).
