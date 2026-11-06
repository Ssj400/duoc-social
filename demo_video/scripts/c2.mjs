import {start,BASE} from "./lib.mjs";
import fs from "fs";
const PROBE=process.argv[2]==="probe";
for(let attempt=1;attempt<=15;attempt++){
await fetch(BASE+"/api/demo/reiniciar",{method:"POST"});
const R=await start("c2",{w:390,h:844,mobile:true}); const {page}=R;
await page.goto(BASE+"/"); await R.pause(1800);
await R.click(page.getByRole("link",{name:/Comenzar mi simulación/}),900);
await R.click(page.getByRole("button",{name:"Crear apps o páginas"}).first(),480);
await R.click(page.getByRole("button",{name:"Resolver problemas lógicos"}).nth(1),480);
await R.click(page.getByRole("button",{name:"Matemáticas"}),540);
await R.click(page.getByRole("button",{name:"Empezar simulación"}),1080);
// escena 1
await R.scroll(200,12); await R.pause(600);
await R.click(page.getByRole("button",{name:/^1\s/}),840);
await page.getByText(/Lo que suele pasar/).first().scrollIntoViewIfNeeded(); await R.pause(1500);
await R.click(page.getByRole("button",{name:"😮"}).first(),900);
await R.click(page.getByRole("button",{name:/Siguiente escena/}),900);
await R.scroll(-600,12);await R.pause(800);
await R.click(page.getByRole("button",{name:/^2\s/}),840);
await page.getByText(/Lo que suele pasar/).first().scrollIntoViewIfNeeded(); await R.pause(1500);
await R.click(page.getByRole("button",{name:"🙁"}).first(),900);
await R.click(page.getByRole("button",{name:/Siguiente escena/}),1320);
// recorrido
await R.scroll(-1500,15); await R.pause(500);
await R.scroll(500,20); await R.pause(700);
await R.scroll(500,20); await R.pause(900);
const ver=page.getByRole("button",{name:"Ver qué noté"});
await R.click(page.locator("summary").first(),900);
await R.scroll(150,10);await R.pause(1200);
await R.click(ver,1500);
const ta=page.locator("textarea").first();
await R.click(ta,500);
await page.keyboard.type("Pensé que iba a programar más solo",{delay:35}); await R.pause(900);
await R.click(page.getByRole("button",{name:"Ver qué noté"}),300);
const ok=await page.waitForFunction(()=>/no respondió a tiempo|La IA no/.test(document.body.innerText)?"fb":/Esperabas|Te sorprendió que/.test(document.body.innerText)?"ok":null,null,{timeout:30000}).then(h=>h.jsonValue()).catch(()=>"to");
await R.pause(2500);
console.log("attempt",attempt,ok);
if(ok!=="ok"){await R.finish("tmp_fail2.mp4");continue;}
await R.scroll(120,10);await R.pause(1200);
await R.click(page.getByRole("button",{name:"Confirmar"}).first(),900);
await R.click(page.getByRole("button",{name:"Gusto"}),720);
await R.click(page.getByRole("button",{name:/Continuar/}),1080);
await R.scroll(150,10);await R.pause(1500);
await R.click(page.getByRole("button",{name:"Compartir con mi tutor"}),300);
await R.pause(1800);
console.log((await page.innerText("main")).slice(0,1200));
await R.pause(1800);
await R.finish("movil_estudiante.mp4"); console.log("DONE"); break;
}
