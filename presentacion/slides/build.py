C="../capturas/"
CSS="""*{box-sizing:border-box;margin:0}body{width:1376px;height:768px;overflow:hidden;font-family:'Inter','Noto Sans','DejaVu Sans',Arial,sans-serif;color:#fff;background:radial-gradient(900px 500px at 85% 10%,rgba(34,211,238,.22),transparent),radial-gradient(700px 500px at 0% 100%,rgba(20,184,166,.18),transparent),linear-gradient(135deg,#06142b,#0b2a4a);position:relative}
h1{font-size:50px;font-weight:800;line-height:1.1}.c{color:#22d3ee}
.foot{position:absolute;right:28px;bottom:16px;font-size:16px;color:#7fb2c9}
.glass{background:rgba(255,255,255,.06);border:1px solid rgba(34,211,238,.5);border-radius:22px;box-shadow:0 0 30px rgba(34,211,238,.12)}
.wrap{position:absolute;left:60px;right:60px;top:44px}
.phone{position:absolute;border:7px solid #0f1f3a;outline:2px solid rgba(34,211,238,.55);border-radius:34px;overflow:hidden;box-shadow:0 0 50px rgba(34,211,238,.35);background:#fff}
.phone img{width:100%;height:100%;object-fit:cover;object-position:top;display:block}
.lap{position:absolute;border:8px solid #0f1f3a;outline:2px solid rgba(34,211,238,.55);border-radius:16px 16px 4px 4px;overflow:hidden;box-shadow:0 0 50px rgba(34,211,238,.35)}
.lap img{width:100%;display:block}
.base{position:absolute;height:14px;background:#12294a;border-radius:0 0 18px 18px;box-shadow:0 0 30px rgba(34,211,238,.25)}
.cap{position:absolute;font-size:24px;font-weight:700;color:#22d3ee;text-align:center}
"""
def page(n,body,extra=""):
    open(f"s{n}.html","w").write(f"<!doctype html><meta charset=utf-8><style>{CSS}{extra}</style><body>{body}<div class=foot>educadex · Desafío 2 · Hackathon IA Congreso Social UC 2026</div></body>")
def phone(src,l,t,w,h):return f"<div class=phone style='left:{l}px;top:{t}px;width:{w}px;height:{h}px'><img src='{C}{src}'></div>"
def lap(src,l,t,w):
    h=(w-16)*0.625
    return f"<div class=lap style='left:{l}px;top:{t}px;width:{w}px'><img src='{C}{src}'></div><div class=base style='left:{l-20}px;top:{t+h+16}px;width:{w+40}px'></div>"
# 1
page(1,f"""<div style='position:absolute;left:70px;top:150px;width:600px'>
<div style='font-size:96px;font-weight:800;color:#22d3ee;text-shadow:0 0 40px rgba(34,211,238,.5)'>educadex</div>
<div style='font-size:40px;font-weight:700;line-height:1.2;margin-top:18px'>Vive tus próximos semestres antes de llegar a ellos</div>
<div style='font-size:24px;margin-top:22px;color:#cfe8f3'>Simulación de carrera con IA para acompañar el primer año — sin perfilar a nadie</div>
<div style='font-size:20px;margin-top:34px;color:#7fb2c9'>Desafío 2 · Prevención de la deserción en educación superior</div></div>
{lap("escritorio-1-inicio.png",690,150,640)}{phone("movil-3-escena.png",1100,270,220,420)}""")
# 2
def card(big,txt,l):return f"<div class=glass style='position:absolute;left:{l}px;top:150px;width:390px;height:380px;padding:30px'><div class=c style='font-size:54px;font-weight:800'>{big}</div><div style='font-size:23px;line-height:1.4;margin-top:16px;color:#e3f1f7'>{txt}</div></div>"
page(2,f"<div class=wrap><h1>Cuando se nota, ya es tarde</h1></div>"+
 card("22,1%","de quienes ingresaron en 2025 no continuó en su institución; 15,5% no se matriculó en ninguna (SIES, agosto 2026). No retención no es lo mismo que abandono definitivo.",60)+
 card("Vocacional","Entre las causas frecuentes de deserción en primer año en Chile están las razones vocacionales: descubrir tarde cómo es la carrera.",493)+
 card("3er semestre","En un estudio de una escuela de negocios chilena (Miranda y Vázquez, 2023), la deserción voluntaria se concentra en el 3er semestre.",926)+
 "<div class=glass style='position:absolute;left:60px;right:60px;top:568px;height:100px;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:700;background:rgba(34,211,238,.15)'>Si esperamos las notas del tercer semestre, la decisión ya se tomó.</div>")
# 4
def pil(ic,t,d,top):return f"<div class=glass style='position:absolute;left:60px;top:{top}px;width:680px;height:150px;padding:18px 24px;display:flex;gap:22px;align-items:center'><div style='font-size:56px'>{ic}</div><div><div class=c style='font-size:28px;font-weight:800'>{t}</div><div style='font-size:22px;line-height:1.35;margin-top:4px'>{d}</div></div></div>"
page(4,"<div class=wrap><h1>Explorar antes de decidir</h1></div>"+
 pil("🎮","Simulación sin presión","escenas reales de la malla, contadas por tutores",150)+
 pil("✨","Brechas con IA","lo que esperabas vs. lo que viene, en palabras",330)+
 pil("🤝","Acompañamiento humano","el estudiante decide qué compartir; el tutor acuerda un paso",510)+
 phone("movil-4-consecuencia.png",800,70,230,497+0)+phone("movil-5-reaccion-insignia.png",1060,150,230,497))
# 5
caps=[("movil-3-escena.png","1 Juega"),("movil-7-brechas-ia.png","2 Descubre"),("movil-8-compartir.png","3 Decide"),("escritorio-9-tutor-casos.png","4 Acompaña")]
b="<div style='position:absolute;left:60px;top:40px'><div style='font-size:86px;font-weight:800' class=c>Demo</div><div style='font-size:24px;color:#cfe8f3;margin-top:4px'>Ingeniería en Informática mención Desarrollo de Software · malla pública · datos ficticios</div></div>"
x=60
for i,(s,c) in enumerate(caps):
    if i<3: b+=phone(s,x,200,200,430)+f"<div class=cap style='left:{x}px;top:645px;width:200px'>{c}</div>";x+=232
    else: b+=lap(s,x+10,250,560)+f"<div class=cap style='left:{x+10}px;top:645px;width:560px'>{c}</div>"
page(5,b)
# 6
def step(t,top,h):return f"<div class=glass style='padding:14px 20px;font-size:23px;line-height:1.35'>{t}</div>"
left=f"""<div style='position:absolute;left:60px;top:150px;width:560px'>
<div class=c style='font-size:24px;font-weight:800;margin-bottom:8px'>Escena (tutor)</div>
<div class=glass style='padding:16px 20px;font-size:23px;line-height:1.4'>Tutor escribe 4 líneas → IA propone la escena con fuentes (malla oficial + experiencia del tutor) → validador → el tutor aprueba</div>
<div class=c style='font-size:24px;font-weight:800;margin:20px 0 8px'>Brechas (estudiante)</div>
<div class=glass style='padding:16px 20px;font-size:23px;line-height:1.4'>Reacciones del estudiante → IA propone brechas → el estudiante confirma o edita</div>
<div style='font-size:20px;line-height:1.4;color:#9cc4d6;margin-top:22px'>Búsqueda sobre la malla y las plantillas (RAG) · validador rechaza ramos y citas inventadas · si la IA falla, la app sigue sin IA · modelo: gpt-oss-120b vía Groq</div></div>"""
page(6,"<div class=wrap><h1>La IA hace lo que una persona no alcanza</h1></div>"+left+lap("escritorio-8-tutor-plantilla-ia.png",680,190,640))
# 7
def lst(title,items,l):
    li="".join(f"<li style='margin:12px 0'>{i}</li>" for i in items)
    return f"<div class=glass style='position:absolute;left:{l}px;top:140px;width:610px;height:540px;padding:26px 30px'><div class=c style='font-size:32px;font-weight:800'>{title}</div><ul style='font-size:25px;line-height:1.35;margin-top:14px;padding-left:26px'>{li}</ul></div>"
page(7,"<div class=wrap><h1>No perfilamos: acompañamos</h1></div>"+
 lst("4 decisiones humanas",["El tutor aprueba cada escena","El estudiante confirma sus brechas","El estudiante decide si comparte (y puede retirar)","El tutor acuerda un paso con fecha"],60)+
 lst("Sin perfiles",["Sin puntajes, porcentajes ni probabilidades","El motivo lo elige el estudiante; la IA no lo adivina","La IA no recibe nombre, género, sede ni jornada","Prueba de sesgo Camila/Matías: resultados equivalentes (muestra pequeña)","Solo datos ficticios · modelos declarados"],706)) 
# 8
def c8(t,d,l,w):return f"<div class=glass style='position:absolute;left:{l}px;top:130px;width:{w}px;height:270px;padding:24px 26px'><div class=c style='font-size:30px;font-weight:800'>{t}</div><div style='font-size:22px;line-height:1.4;margin-top:10px'>{d}</div></div>"
page(8,"<div class=wrap><h1>De un tutor a toda una carrera</h1></div>"+
 c8("Operación","El tutor escribe 4 líneas; la IA arma la escena; el tutor aprueba",60,330)+
 c8("Escala","Cualquier carrera con malla pública; costo bajo por estudiante",410,330)+
 c8("Piloto propuesto","1 carrera, semanas 2–6 del primer semestre; medir simulaciones completadas, brechas compartidas, pasos acordados y decisiones informadas (también cambiarse)",760,556)+
 "<div style='position:absolute;left:60px;right:60px;top:450px;font-size:38px;font-weight:800;line-height:1.3;text-align:center' class=c>La IA no te dice si esta carrera es para ti. Te muestra cómo es, y te deja llegar a esa conversación con información.</div>")
# 3
open("s3.html","w").write("<!doctype html><style>body{margin:0;width:1376px;height:768px}img{width:1376px;height:768px;display:block}</style><body><img src='team-05.png'></body>")
