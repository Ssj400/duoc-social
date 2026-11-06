# App · Simulación de carrera (demo)

Diseño: [../diseno.md](../diseno.md) · Planificación: [../planificacion.md](../planificacion.md)

```bash
cd web
npm install
cp .env.example .env.local   # pegar LLM_API_KEY; LLM_MOCK=true para desarrollar sin gastar cuota
npm run dev                  # http://localhost:3000
```

- Probar proveedor: `http://localhost:3000/api/salud?probar=1` (una llamada; no muestra la clave).
  Para la demo con IA real: `LLM_API_KEY` con la clave y `LLM_MOCK=false`; reiniciar `npm run dev`
  y comprobar que `/api/salud` responda `"mock": false` y el modelo configurado.
- Prueba de punta a punta: con la app corriendo, `python3 scripts/prueba_e2e.py` (o con la URL
  como argumento). Recorre estudiante, tutor y consentimiento (compartir, pausar, retirar) y
  reinicia el estado de la demo al empezar y al terminar.
- `src/lib/llm.ts` adaptador IA (solo servidor) · `src/lib/buscar.ts` contrato del RAG (simulado)
  · `src/lib/store.ts` estado en memoria · `src/lib/tipos.ts` tipos · `src/data/` malla y contenido.
- Datos: malla pública de Duoc (ver `src/data/malla.json`, campo `fuente`); plantillas y
  escenas ficticias. Un proceso Node; el estado se pierde al reiniciar.
