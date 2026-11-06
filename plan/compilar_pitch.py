"""Genera presentación editable, PDF visual y materiales de preparación.

Uso: .venv/bin/python plan/compilar_pitch.py
Requiere plan/requirements-pitch.txt y las fuentes DejaVu del sistema.
"""

from html import escape
import json
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_AUTO_SHAPE_TYPE
from pptx.util import Inches, Pt
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Paragraph

from compilar_plan_tecnico import build_pdf


ROOT = Path(__file__).resolve().parent / "preparacion"
COLORS = {"ink":"142C40", "teal":"087F8C", "amber":"9A6413",
          "pale":"EAF2F4", "paper":"FAFBFC"}
WIDTH, HEIGHT = 13.333333, 7.5


def rgb(name):
    return RGBColor.from_string(COLORS.get(name, name))


def text_ppt(slide, block):
    if block.get("fill"):
        shape = slide.shapes.add_shape(MSO_AUTO_SHAPE_TYPE.ROUNDED_RECTANGLE,
                                       Inches(block["x"]), Inches(block["y"]),
                                       Inches(block["w"]), Inches(block["h"]))
        shape.fill.solid()
        shape.fill.fore_color.rgb = rgb(block["fill"])
        shape.line.fill.background()
    shape = slide.shapes.add_textbox(Inches(block["x"]), Inches(block["y"]),
                                     Inches(block["w"]), Inches(block["h"]))
    frame = shape.text_frame
    frame.word_wrap = True
    frame.margin_left = Inches(.08)
    frame.margin_right = Inches(.08)
    frame.margin_top = Inches(.04)
    frame.margin_bottom = 0
    for i, line in enumerate(block["text"].split("\n")):
        paragraph = frame.paragraphs[0] if i == 0 else frame.add_paragraph()
        paragraph.text = line
        paragraph.font.name = "DejaVu Sans"
        paragraph.font.size = Pt(block["size"])
        paragraph.font.bold = block.get("bold", False)
        paragraph.font.color.rgb = rgb(block.get("color", "ink"))
        paragraph.space_after = Pt(4)


def text_pdf(canvas, block):
    if block.get("fill"):
        canvas.setFillColor(colors.HexColor("#" + COLORS[block["fill"]]))
        canvas.roundRect(block["x"]*72, (HEIGHT-block["y"]-block["h"])*72,
                         block["w"]*72, block["h"]*72, 8, stroke=False, fill=True)
    style = ParagraphStyle("slide", fontName="DejaVu-Bold" if block.get("bold") else "DejaVu",
                           fontSize=block["size"], leading=block["size"]*1.22,
                           textColor=colors.HexColor("#"+COLORS.get(block.get("color","ink"), block.get("color","ink"))))
    text = escape(block["text"]).replace("\n", "<br/>")
    paragraph = Paragraph(text, style)
    width = (block["w"]-.16)*72
    _, height = paragraph.wrap(width, block["h"]*72)
    if height > (block["h"]-.04)*72:
        raise ValueError(f'Texto excede caja PDF: {block["text"][:60]}')
    paragraph.drawOn(canvas, (block["x"]+.08)*72,
                     (HEIGHT-block["y"]-.04)*72-height)


def common_blocks(item, index):
    return [
        {"text":"PUENTE · PRESENTACIÓN PROVISIONAL", "x":.65,"y":.22,
         "w":12,"h":.4,"size":18,"color":"teal"},
        {"text":item["source"],"x":.65,"y":6.75,"w":11.4,"h":.55,"size":18},
        {"text":str(index),"x":12.3,"y":6.75,"w":.4,"h":.5,"size":18},
    ]


def build_slides():
    data = json.loads((ROOT / "diapositivas.json").read_text(encoding="utf-8"))
    if sum(s["seconds"] for s in data["slides"]) != 270:
        raise ValueError("El guion debe durar 4:30")
    prs = Presentation()
    prs.slide_width, prs.slide_height = Inches(WIDTH), Inches(HEIGHT)
    prs.core_properties.title = data["title"]
    prs.core_properties.subject = data["status"]
    pdf = Canvas(str(ROOT / "Pitch_Puente_provisional.pdf"), pagesize=(WIDTH*72,HEIGHT*72))
    pdf.setTitle(data["title"])
    for i, item in enumerate(data["slides"], 1):
        slide = prs.slides.add_slide(prs.slide_layouts[5])
        slide.background.fill.solid()
        slide.background.fill.fore_color.rgb = rgb("paper")
        title = slide.shapes.title
        title.left, title.top = Inches(.65), Inches(.72)
        title.width, title.height = Inches(12.05), Inches(.8)
        title.text = item["title"]
        frame = title.text_frame
        frame.margin_left = Inches(.08)
        frame.margin_top = Inches(.04)
        paragraph = frame.paragraphs[0]
        paragraph.font.name = "DejaVu Sans"
        paragraph.font.size = Pt(34)
        paragraph.font.bold = True
        paragraph.font.color.rgb = rgb("ink")
        slide.notes_slide.notes_text_frame.text = item["notes"]
        pdf.setFillColor(colors.HexColor("#"+COLORS["paper"]))
        pdf.rect(0,0,WIDTH*72,HEIGHT*72,fill=True,stroke=False)
        text_pdf(pdf, {"text":item["title"],"x":.65,"y":.72,
                       "w":12.05,"h":.8,"size":34,"bold":True})
        for block in item["blocks"] + common_blocks(item, i):
            text_ppt(slide, block)
            text_pdf(pdf, block)
        pdf.showPage()
    pdf.save()
    prs.save(ROOT / "Pitch_Puente_provisional.pptx")


def build():
    build_slides()
    specs = [
        ("brief_pitch.md", "Brief_pitch_Puente.pdf", "Puente · Brief provisional de pitch"),
        ("guion_y_contingencias.md", "Guion_y_respaldo_Puente.pdf", "Puente · Guion y contingencias"),
        ("plan_desarrollo.md", "Plan_desarrollo_Puente.pdf", "Puente · Plan de desarrollo"),
    ]
    for source, output, title in specs:
        path = ROOT / source
        if path.exists():
            build_pdf({}, path, ROOT/output, title,
                      "PUENTE · Preparación provisional · 6 noviembre 2026 · Sin resultados de producto")
    print(ROOT / "Pitch_Puente_provisional.pptx")
    print(ROOT / "Pitch_Puente_provisional.pdf")


if __name__ == "__main__":
    build()
