import { chromium } from "playwright-core";
import fs from "fs";
const D="/home/js/Programming/hackatons/duoc-social/demo_video";
const only=process.argv[2]?process.argv[2].split(",").map(Number):null;
const b=await chromium.launch({executablePath:"/usr/bin/chromium",args:["--autoplay-policy=no-user-gesture-required"]});
const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on("console",m=>console.log("page:",m.text()));
await p.goto("file://"+D+"/stage.html"); await p.evaluate(()=>window.ready);
const TOTAL=await p.evaluate(()=>window.TOTAL);
fs.mkdirSync(D+"/frames",{recursive:true});
const N=Math.round(TOTAL*30);
const frames=only?only.map(t=>Math.round(t*30)):[...Array(N).keys()];
for(const i of frames){const T=i/30;
 await p.evaluate(async T=>{document.getAnimations().forEach(a=>{a.pause();a.currentTime=T*1000});await window.seekAll(T)},T);
 await p.screenshot({path:`${D}/frames/${only?"s"+String(i).padStart(5,"0"):String(i).padStart(5,"0")}.png`});
 if(i%150==0)console.log("frame",i,"/",N);}
await b.close(); console.log("RENDERED");
