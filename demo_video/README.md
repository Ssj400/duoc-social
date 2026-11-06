# Video de demo · educadex

Video multidispositivo (laptop + celular) del MVP, grabado el 6/11/2026 desde la app real
con la IA real (Groq `openai/gpt-oss-120b`). Todos los datos son ficticios; el video lleva
la etiqueta «Demo · datos ficticios» de principio a fin.

## Archivos

| Archivo | Qué es |
| --- | --- |
| `educadex_showcase_rapido.mp4` | **Recomendado para el pitch.** 1920×1080, 30 fps, 71 s (al 110 %). Calza con el bloque de demo del guion (1:35–2:50) |
| `educadex_showcase.mp4` | Misma pieza a velocidad normal, 78,5 s |
| `escritorio_tutor.mp4` | Clip: el tutor llena la plantilla y la IA genera la escena con fuentes |
| `movil_estudiante.mp4` | Clip (web móvil): onboarding, juego, reacciones, insignias, brechas con IA y compartir |
| `escritorio_caso.mp4` | Clip: el tutor ve el caso compartido y registra un paso acordado |
| `loop.html` | Reproductor en loop para el navegador |
| `stage.html`, `scripts/` | Fuentes para regenerar los clips y el video |

En el repo **solo se versiona `educadex_showcase_rapido.mp4`** (el de ~1 min para loop). Los demás videos quedan en el laptop donde se generaron; se pueden regenerar con los pasos de abajo. Los clips sueltos sirven también para herramientas como Previewed o Jitter.

## Reproducir en loop

- **Laptop (pantalla completa, infinito):**
  `mpv --loop-file=inf --fs demo_video/educadex_showcase_rapido.mp4` · salir con `q` o `Esc`.
- **Navegador:** abrir `loop.html` (doble clic). Se reproduce en loop y en silencio; un clic
  lo pone en pantalla completa.
- **PowerPoint:** insertar el video en la diapositiva 5 → pestaña **Reproducción** →
  «Repetir la reproducción hasta su interrupción» + «Iniciar automáticamente».
- **Google Slides / TV / cualquier reproductor sin loop:** generar una versión repetida
  10 veces (~12 min, ~125 MB; no se versiona porque supera el límite de 100 MB de GitHub):

  ```bash
  cd demo_video
  ffmpeg -stream_loop 9 -i educadex_showcase_rapido.mp4 -c copy -movflags +faststart educadex_showcase_loop.mp4
  ```

## Cómo se hizo (para regenerarlo)

1. Levantar la app: `cd web && npm run build && PORT=3344 npm start` (con `web/.env.local`
   configurado y `LLM_MOCK=false` para usar la IA real).
2. Instalar Playwright para los scripts: `cd demo_video/scripts && npm i playwright-core`.
   Usan Chromium del sistema (`/usr/bin/chromium`); ajustar `executablePath` y las rutas
   `BASE`/`OUT` de `lib.mjs` si cambia el equipo.
3. Grabar los clips (cada script reinicia la demo y reintenta si la IA cae al respaldo):
   `node c1.mjs` (tutor) · `node c2.mjs` (móvil) · `node c3.mjs` (caso; correr justo después de
   `c2.mjs`, sin reiniciar el servidor, porque necesita el caso compartido en memoria).
4. Renderizar el video: `node render.mjs` abre `stage.html` (laptop y celular genéricos, sin
   marcas, con movimientos de cámara en CSS 3D y subtítulos), fija el tiempo cuadro a cuadro y
   guarda PNG en `frames/`. Luego:

   ```bash
   ffmpeg -framerate 30 -i frames/%05d.png -c:v libx264 -pix_fmt yuv420p -crf 18 -preset fast -movflags +faststart educadex_showcase.mp4
   ffmpeg -i educadex_showcase.mp4 -filter:v "setpts=PTS/1.1" -r 30 -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart educadex_showcase_rapido.mp4
   rm -rf frames
   ```

## Cuidados

- No mostrar el video como resultado con usuarios reales: es una demo con datos ficticios.
- Los subtítulos no afirman impacto, cifras, validaciones ni alianzas.
- Si se regraba, revisar que la escena del tutor y las brechas muestren la respuesta de la IA
  y no el respaldo manual.
