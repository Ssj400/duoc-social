"use client";
import { useState } from "react";
import { Button } from "@/components/ui";

export function BotonReiniciar() {
  const [ok, setOk] = useState(false);
  async function reiniciar() {
    await fetch("/api/demo/reiniciar", { method: "POST" });
    setOk(true);
  }
  return (
    <div className="text-center">
      <Button variant="ghost" onClick={reiniciar} className="text-sm">Reiniciar demo</Button>
      {ok && <span role="status" className="ml-2 text-sm">Demo reiniciada.</span>}
    </div>
  );
}
