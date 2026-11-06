"""Genera PDF técnico y diagramas HTML sin dependencias de navegador.

Uso: .venv/bin/python plan/compilar_plan_tecnico.py
Entradas: plan/tecnico/plan_tecnico.md y diagramas.json.
"""

from html import escape
import json
import math
from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Flowable, PageBreak, Paragraph, Preformatted, SimpleDocTemplate, Table, TableStyle,
)

from compilar_pdf import markup


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "tecnico" / "plan_tecnico.md"
DIAGRAMS = ROOT / "tecnico" / "diagramas.json"
OUTPUT = ROOT / "Plan_tecnico_Puente.pdf"
HTML = ROOT / "tecnico" / "diagramas.html"
INK = "#142C40"
PALETTE = {
    "screen": ("#eef3fa", "#526a92"),
    "server": ("#eef4f5", "#426b73"),
    "neutral": ("#f4f5f6", "#65727c"),
    "external": ("#e7f0ff", "#2467b0"),
    "success": ("#e8f5ee", "#28764b"),
    "warning": ("#fff5d9", "#99751c"),
    "failure": ("#faeaea", "#a33c3c"),
}


def load_diagrams():
    data = json.loads(DIAGRAMS.read_text(encoding="utf-8"))
    diagrams = {d["id"]: d for d in data["diagrams"]}
    if len(diagrams) != len(data["diagrams"]):
        raise ValueError("IDs de diagramas repetidos")
    for d in diagrams.values():
        ids = {n["id"] for n in d["nodes"]}
        if len(ids) != len(d["nodes"]):
            raise ValueError("IDs de componentes repetidos")
        for n in d["nodes"]:
            assert n["kind"] in PALETTE
            assert 0 <= n["x"] < n["x"] + n["w"] <= d["width"]
            assert 0 <= n["y"] < n["y"] + n["h"] <= d["height"]
        for edge in d["edges"]:
            assert edge["from"] in ids and edge["to"] in ids
            assert len(edge["points"]) >= 2
    return diagrams


class VectorDiagram(Flowable):
    """Usa las mismas coordenadas que el SVG; texto y formas siguen vectoriales."""

    def __init__(self, diagram, width):
        super().__init__()
        self.diagram = diagram
        self.width = width
        self.scale = width / diagram["width"]
        self.height = diagram["height"] * self.scale
        self.hAlign = "LEFT"

    def draw(self):
        c, d = self.canv, self.diagram
        c.saveState()
        c.scale(self.scale, self.scale)
        h = d["height"]
        for e in d["edges"]:
            points = e["points"]
            c.setStrokeColor(colors.HexColor("#65727c"))
            c.setLineWidth(1.5)
            path = c.beginPath()
            path.moveTo(points[0][0], h - points[0][1])
            for x, y in points[1:]:
                path.lineTo(x, h - y)
            c.drawPath(path)
            x, y = points[-1]
            px, py = points[-2]
            angle = math.atan2(y - py, x - px)
            for delta in (-.45, .45):
                c.line(x, h - y, x - 8 * math.cos(angle + delta),
                       h - (y - 8 * math.sin(angle + delta)))
        for n in d["nodes"]:
            fill, stroke = PALETTE[n["kind"]]
            c.setFillColor(colors.HexColor(fill))
            c.setStrokeColor(colors.HexColor(stroke))
            c.roundRect(n["x"], h - n["y"] - n["h"], n["w"], n["h"],
                        8, fill=True, stroke=True)
            line_height = 17
            top = n["y"] + (n["h"] - len(n["lines"]) * line_height) / 2 + 13
            for i, line in enumerate(n["lines"]):
                c.setFont("DejaVu-Bold" if i == 0 else "DejaVu", 12.5)
                c.setFillColor(colors.HexColor(INK))
                c.drawCentredString(n["x"] + n["w"] / 2, h - top - i * line_height, line)
        c.setFont("DejaVu", 10.5)
        for e in d["edges"]:
            if e["label"]:
                label_width = pdfmetrics.stringWidth(e["label"], "DejaVu", 10.5)
                c.setFillColor(colors.white)
                c.rect(e["lx"] - 2, h - e["ly"] - 3, label_width + 4, 13,
                       stroke=0, fill=1)
                c.setFillColor(colors.HexColor(INK))
                c.drawString(e["lx"], h - e["ly"], e["label"])
        c.restoreState()


def svg(d):
    out = [f'<svg viewBox="0 0 {d["width"]} {d["height"]}" role="img" '
           f'aria-labelledby="title-{d["id"]}">',
           f'<title id="title-{d["id"]}">{escape(d["title"])}</title>',
           f'<defs><marker id="arrow-{d["id"]}" viewBox="0 0 10 10" refX="9" '
           'refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
           '<path d="M 0 0 L 10 5 L 0 10 z" fill="#65727c"/></marker></defs>']
    for i, e in enumerate(d["edges"]):
        points = " ".join(f"{x},{y}" for x, y in e["points"])
        out.append(f'<polyline class="flow" data-step="{i}" points="{points}" '
                   f'marker-end="url(#arrow-{d["id"]})"/>')
    for n in d["nodes"]:
        fill, stroke = PALETTE[n["kind"]]
        out.append(f'<g class="node"><rect x="{n["x"]}" y="{n["y"]}" '
                   f'width="{n["w"]}" height="{n["h"]}" rx="8" '
                   f'fill="{fill}" stroke="{stroke}"/>')
        top = n["y"] + (n["h"] - len(n["lines"]) * 17) / 2 + 13
        for i, line in enumerate(n["lines"]):
            weight = 700 if i == 0 else 400
            out.append(f'<text x="{n["x"]+n["w"]/2}" y="{top+i*17}" '
                       f'text-anchor="middle" font-weight="{weight}">{escape(line)}</text>')
        out.append('</g>')
    for e in d["edges"]:
        out.append(f'<text class="flow-label" x="{e["lx"]}" y="{e["ly"]}">'
                   f'{escape(e["label"])}</text>')
    return "".join(out) + '</svg>'


JS = """
document.querySelectorAll('[data-diagram]').forEach(section => {
  const paths = [...section.querySelectorAll('.flow')];
  const status = section.querySelector('[data-status]');
  const steps = JSON.parse(section.querySelector('[data-steps]').textContent);
  let current = -1;
  function update() {
    paths.forEach((path, i) => path.classList.toggle('active', i === current));
    status.textContent = current < 0 ? 'Vista completa: todos los componentes visibles.'
      : `Conexión ${current + 1}/${paths.length}: ${steps[current]}`;
  }
  section.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'all') current = -1;
      else if (action === 'next') current = (current + 1) % paths.length;
      else current = current <= 0 ? paths.length - 1 : current - 1;
      update();
    });
  });
  update();
});
"""


def build_html(diagrams):
    css = """
*{box-sizing:border-box}body{margin:0;background:#f4f6f8;color:#142c40;font:17px/1.5 system-ui,sans-serif}
main{max-width:1280px;margin:auto;padding:32px}h1{line-height:1.15}h2{font-size:24px}
section{margin:32px 0;padding:24px;background:white;border:1px solid #cad4df;border-radius:12px}
nav{display:flex;gap:12px;flex-wrap:wrap}a{color:#195d9a}button{font:inherit;cursor:pointer;padding:9px 14px;background:#fff;border:1px solid #607086;border-radius:6px}
button:focus-visible,a:focus-visible{outline:3px solid #2467b0;outline-offset:3px}.controls{display:flex;gap:10px;flex-wrap:wrap}
.drawing{overflow:auto}svg{display:block;width:100%;min-width:720px;max-width:1100px;margin:auto}text{font-family:system-ui,sans-serif;font-size:12.5px;fill:#142c40}
.flow-label{font-size:10.5px;paint-order:stroke;stroke:white;stroke-width:4px;stroke-linejoin:round}.flow{fill:none;stroke:#65727c;stroke-width:1.5}
.flow.active{stroke:#28764b;stroke-width:3;stroke-dasharray:9 5;animation:move 1s linear infinite}.node rect{stroke-width:1.5}.note{color:#495d70;font-size:15px}
@keyframes move{to{stroke-dashoffset:-28}}@media(prefers-reduced-motion:reduce){.flow.active{animation:none}}
@media(max-width:760px){main{padding:14px}section{padding:12px}}
"""
    parts = ['<!doctype html><html lang="es"><meta charset="utf-8">'
             '<meta name="viewport" content="width=device-width,initial-scale=1">'
             '<title>Puente · Diagramas técnicos</title>',
             f'<style>{css}</style><main><h1>Puente: dónde vive cada cosa</h1>',
             '<p>Documento de diseño, no aplicación implementada. Datos de demo sintéticos.</p>',
             '<p class="note">Todos los diagramas son visibles sin JavaScript. Los botones '
             'resaltan conexiones del diseño, no ejecutan llamadas, permisos ni funciones del producto.</p>',
             '<nav aria-label="Diagramas">']
    for d in diagrams.values():
        parts.append(f'<a href="#{d["id"]}">{escape(d["title"].split(":")[0])}</a>')
    parts.append('</nav>')
    for d in diagrams.values():
        interactive = bool(d["edges"])
        attr = ' data-diagram' if interactive else ''
        parts.append(f'<section id="{d["id"]}"{attr}><h2>{escape(d["title"])}</h2>')
        if interactive:
            steps = [e["label"] or f'{e["from"]} → {e["to"]}' for e in d["edges"]]
            parts.append('<div class="controls"><button data-action="previous">Anterior</button>'
                         '<button data-action="next">Siguiente conexión</button>'
                         '<button data-action="all">Ver todo</button></div>'
                         '<p data-status aria-live="polite"></p>')
            encoded = json.dumps(steps, ensure_ascii=False).replace('<', '\\u003c')
            parts.append(f'<script type="application/json" data-steps>{encoded}</script>')
        parts.append(f'<div class="drawing">{svg(d)}</div></section>')
    parts.append(f'</main><script>{JS}</script></html>')
    HTML.write_text("\n".join(parts), encoding="utf-8")


def build_pdf(diagrams, source=SOURCE, output=OUTPUT,
              title="Puente · Plan técnico y paneles", footer=None):
    pdfmetrics.registerFont(TTFont("TechMono", "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"))
    body = ParagraphStyle("TechBody", fontName="DejaVu", fontSize=9.8, leading=14.1,
                          spaceAfter=8, textColor=colors.HexColor(INK))
    chapter = ParagraphStyle("TechChapter", parent=body, fontName="DejaVu-Bold",
                             fontSize=20, leading=25, spaceAfter=16, keepWithNext=True)
    sub = ParagraphStyle("TechSub", parent=body, fontName="DejaVu-Bold", fontSize=11.5,
                         leading=16, spaceBefore=8, spaceAfter=7, keepWithNext=True)
    bullet = ParagraphStyle("TechBullet", parent=body, leftIndent=11, firstLineIndent=-9)
    code = ParagraphStyle("TechCode", fontName="TechMono", fontSize=8.1, leading=11,
                          spaceAfter=10, textColor=colors.HexColor(INK))
    cell = ParagraphStyle("TechCell", parent=body, fontSize=8, leading=11, spaceAfter=0)
    head_cell = ParagraphStyle("TechHeadCell", parent=cell, fontName="DejaVu-Bold",
                               textColor=colors.white)

    class TechDoc(SimpleDocTemplate):
        def beforeDocument(self):
            self.count = 0

        def afterFlowable(self, flowable):
            if isinstance(flowable, Paragraph) and flowable.style.name == chapter.name:
                self.count += 1
                key = f"tech-{self.count}"
                self.canv.bookmarkPage(key)
                self.canv.addOutlineEntry(flowable.getPlainText(), key, level=0)

    def decorate(canvas, doc):
        canvas.saveState()
        canvas.setFont("DejaVu", 7)
        canvas.setFillColor(colors.HexColor(INK))
        canvas.drawString(45, 23, footer or "PUENTE · Plan técnico propuesto · 6 noviembre 2026 · No implementado")
        canvas.drawRightString(A4[0] - 45, 23, str(doc.page))
        canvas.restoreState()

    doc = TechDoc(str(output), pagesize=A4, leftMargin=45, rightMargin=45,
                  topMargin=43, bottomMargin=43, title=title)
    flow, paragraph = [], []
    kind = "body"

    def flush():
        nonlocal kind
        if paragraph:
            prefix = "• " if kind == "bullet" else ""
            flow.append(Paragraph(prefix + markup(" ".join(paragraph)),
                                  bullet if kind == "bullet" else body))
            paragraph.clear()
        kind = "body"

    lines = source.read_text(encoding="utf-8").splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            flush()
        elif line.startswith("# "):
            flush()
            if flow:
                flow.append(PageBreak())
            flow.append(Paragraph(markup(line[2:]), chapter))
        elif line.startswith("## "):
            flush()
            flow.append(Paragraph(markup(line[3:]), sub))
        elif line.startswith("@diagrama "):
            flush()
            diagram = diagrams[line.split()[1]]
            flow.append(VectorDiagram(diagram, doc.width))
        elif line.startswith("```"):
            flush()
            i += 1
            block = []
            while i < len(lines) and not lines[i].startswith("```"):
                block.append(lines[i])
                i += 1
            flow.append(Preformatted("\n".join(block), code))
        elif line.startswith("| "):
            flush()
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                row = [x.strip() for x in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r"[:\-\s]+", x) for x in row):
                    rows.append(row)
                i += 1
            n = len(rows[0])
            if any(len(row) != n for row in rows):
                raise ValueError("Tabla inconsistente")
            weights = {2: [.3,.7], 3: [.22,.38,.4], 4: [.17,.25,.3,.28]}.get(n, [1/n]*n)
            data = [[Paragraph(markup(x), head_cell if j == 0 else cell)
                     for x in row] for j, row in enumerate(rows)]
            table = Table(data, colWidths=[doc.width*x for x in weights], repeatRows=1)
            table.setStyle(TableStyle([
                ("BACKGROUND", (0,0), (-1,0), colors.HexColor(INK)),
                ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.HexColor("#eef4f5"), colors.white]),
                ("VALIGN", (0,0), (-1,-1), "TOP"),
                ("TOPPADDING", (0,0), (-1,-1), 7),
                ("BOTTOMPADDING", (0,0), (-1,-1), 7),
            ]))
            flow.append(table)
            continue
        elif line.startswith("- "):
            flush()
            kind = "bullet"
            paragraph.append(line[2:])
        else:
            paragraph.append(line)
        i += 1
    flush()
    doc.build(flow, onFirstPage=decorate, onLaterPages=decorate)


def build():
    diagrams = load_diagrams()
    build_html(diagrams)
    build_pdf(diagrams)
    print(OUTPUT)
    print(HTML)


if __name__ == "__main__":
    build()
