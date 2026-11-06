const {chromium}=require("/tmp/claude-1000/-home-js-Programming-hackatons-duoc-social/a4b7b8d6-44b8-4553-80f3-984b62afc73d/scratchpad/pw/node_modules/playwright-core");
(async()=>{const b=await chromium.launch({executablePath:"/usr/bin/chromium"});const p=await b.newPage({viewport:{width:1376,height:768}});
for(let i=1;i<=8;i++){await p.goto("file://"+__dirname+`/s${i}.html`);await p.waitForTimeout(400);await p.screenshot({path:`${__dirname}/slide${i}.png`});}
await b.close()})()
