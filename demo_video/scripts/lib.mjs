import { chromium } from "playwright-core";
import fs from "fs";
export const BASE="http://localhost:3344";
export const OUT="/home/js/Programming/hackatons/duoc-social/demo_video";
const overlay = (mobile)=>`(()=>{
const mk=()=>{ if(document.getElementById('__cur')) return;
const s=document.createElement('style');s.textContent=\`
#__cur{position:fixed;z-index:2147483647;pointer-events:none;left:0;top:0;width:${mobile?44:22}px;height:${mobile?44:22}px;margin:-${mobile?22:11}px 0 0 -${mobile?22:11}px;border-radius:50%;
background:${mobile?'rgba(124,58,237,.35)':'rgba(20,16,35,.88)'};border:2px solid ${mobile?'rgba(255,255,255,.8)':'#fff'};box-shadow:0 2px 8px rgba(0,0,0,.4);opacity:${mobile?0:1};transition:opacity .25s,transform .12s}
.__rip{position:fixed;z-index:2147483646;pointer-events:none;border-radius:50%;border:3px solid rgba(124,58,237,.8);width:20px;height:20px;margin:-10px 0 0 -10px;animation:__r .6s ease-out forwards}
@keyframes __r{to{transform:scale(${mobile?4:3.5});opacity:0}}\`;
document.head.appendChild(s);const c=document.createElement('div');c.id='__cur';document.body.appendChild(c);
const mv=(x,y)=>{c.style.left=x+'px';c.style.top=y+'px'};
const rip=(x,y)=>{const r=document.createElement('div');r.className='__rip';r.style.left=x+'px';r.style.top=y+'px';document.body.appendChild(r);setTimeout(()=>r.remove(),700)};
${mobile?`addEventListener('pointerdown',e=>{mv(e.clientX,e.clientY);c.style.opacity=1;c.style.transform='scale(.85)';rip(e.clientX,e.clientY)},true);
addEventListener('pointerup',e=>{c.style.transform='scale(1)';setTimeout(()=>c.style.opacity=0,350)},true);`
:`addEventListener('mousemove',e=>mv(e.clientX,e.clientY),true);addEventListener('mousedown',e=>{c.style.transform='scale(.8)';rip(e.clientX,e.clientY)},true);addEventListener('mouseup',()=>c.style.transform='scale(1)',true);`}
};
if(document.body)mk();else addEventListener('DOMContentLoaded',mk);
new MutationObserver(()=>{if(document.body&&!document.getElementById('__cur'))mk()}).observe(document.documentElement,{childList:true,subtree:true});
})()`;
export async function start(name,{w,h,mobile=false}){
  const dir=`${OUT}/_raw_${name}`; fs.rmSync(dir,{recursive:true,force:true});
  const browser=await chromium.launch({executablePath:"/usr/bin/chromium"});
  const ctx=await browser.newContext({viewport:{width:w,height:h},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile,recordVideo:{dir,size:{width:w,height:h}}});
  const page=await ctx.newPage(); await page.addInitScript(overlay(mobile));
  const t0=Date.now();
  const R={browser,ctx,page,dir,t0,mobile};
  R.pause=(ms=1000)=>page.waitForTimeout(ms);
  R.move=async(loc)=>{await loc.scrollIntoViewIfNeeded();const bb=await loc.boundingBox();const x=bb.x+bb.width/2,y=bb.y+bb.height/2;
     if(!mobile)await page.mouse.move(x,y,{steps:25});return [x,y]};
  R.click=async(loc,after=1100)=>{await loc.scrollIntoViewIfNeeded();
     await loc.evaluate(el=>{const r=el.getBoundingClientRect();const lim=innerHeight-(matchMedia('(max-width:700px)').matches?110:20);if(r.bottom>lim||r.top<80){el.scrollIntoView({block:'center',behavior:'smooth'});return 1}return 0}).then(async m=>{await page.waitForTimeout(m?650:50)});
     const bb=await loc.boundingBox();const x=bb.x+bb.width/2,y=bb.y+bb.height/2;
     if(mobile){await page.waitForTimeout(150);await page.touchscreen.tap(x,y)} else {await page.mouse.move(x,y,{steps:25});await page.waitForTimeout(250);await page.mouse.click(x,y)}
     await page.waitForTimeout(after)};
  R.scroll=async(dy,steps=20,gap=30)=>{for(let i=0;i<steps;i++){await page.mouse.wheel(0,dy/steps);await page.waitForTimeout(gap)}};
  R.finish=async(out,{trimStart=0.6}={})=>{await page.waitForTimeout(500);const dur=(Date.now()-t0)/1000;const vp=await page.video().path();await ctx.close();await browser.close();
     const {execSync}=await import("child_process");
     execSync(`ffmpeg -y -loglevel error -ss ${trimStart} -i "${vp}" -c:v libx264 -pix_fmt yuv420p -crf 18 -preset medium -r 30 -movflags +faststart "${OUT}/${out}"`);
     return vp};
  return R;
}
