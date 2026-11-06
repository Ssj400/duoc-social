import {start,BASE} from "./lib.mjs";
for(let attempt=1;attempt<=30;attempt++){
await new Promise(r=>setTimeout(r,attempt==1?0:4000));
await fetch(BASE+"/api/demo/reiniciar",{method:"POST"});
const R=await start("c1",{w:1440,h:900}); const {page}=R;
await page.goto(BASE+"/tutor/plantilla"); await R.pause(1500);
await R.scroll(300,25); await R.pause(900); await R.scroll(-300,25); await R.pause(800);
await R.click(page.getByRole("button",{name:/Generar escena con IA/}),300);
const ok=await page.waitForFunction(()=>/Aprobar y publicar/.test(document.body.innerText)?"ok":/no respondió a tiempo/.test(document.body.innerText)?"fb":false,null,{timeout:30000}).then(h=>h.jsonValue()).catch(()=>"to");
console.log("attempt",attempt,ok);
if(ok!=="ok"){await R.finish("tmp_fail.mp4");continue;}
await R.pause(1800);
await R.scroll(120,10); await R.pause(500);
for(const t of [/malla:/,/plantilla:\d/]){const l=page.getByText(t).last(); const bb=await l.boundingBox(); await page.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2,{steps:25}); await R.pause(1100);}
await R.click(page.getByRole("button",{name:"Aprobar y publicar"}),2200);
console.log((await page.innerText("main")).split("Generar escena con IA").pop().slice(0,400));
await R.pause(1200);
await R.finish("escritorio_tutor.mp4"); console.log("DONE"); break;}
