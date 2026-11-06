"use client";
import { useState } from "react";

export function BotonReiniciar() {
  const [ok, setOk] = useState(false);
  async function reiniciar() {
    await fetch("/api/demo/reiniciar", { method: "POST" });
    setOk(true);
  }
  return (
    <div>
      <button onClick={reiniciar} className="rounded border border-neutral-400 px-4 py-2 text-base">Reiniciar demo</button>
      {ok && <span role="status" className="ml-3 text-base">Demo reiniciada.</span>}
    </div>
  );
}
