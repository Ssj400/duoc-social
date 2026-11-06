"""Genera el brief de una página. Uso: .venv/bin/python plan/compilar_brief.py."""

from pathlib import Path
import argparse
from xml.sax.saxutils import escape
import re

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph


ROOT = Path(__file__).resolve().parent


def build(version="v0.3"):
    for name, filename in (("Brief", "DejaVuSans.ttf"),
                           ("Brief-Bold", "DejaVuSans-Bold.ttf")):
        pdfmetrics.registerFont(TTFont(
            name, "/usr/share/fonts/truetype/dejavu/" + filename))
    pdfmetrics.registerFontFamily("Brief", normal="Brief", bold="Brief-Bold")
    body = ParagraphStyle("body", fontName="Brief", fontSize=9,
                          leading=12.1, spaceAfter=5,
                          textColor=colors.HexColor("#142C40"))
    heading = ParagraphStyle("heading", parent=body, fontName="Brief-Bold",
                             fontSize=10, leading=13, spaceBefore=5,
                             keepWithNext=True)
    title = ParagraphStyle("title", parent=heading, fontSize=18, leading=22)
    flow = []
    for block in (ROOT / f"brief_{version}.md").read_text(encoding="utf-8").split("\n\n"):
        block = " ".join(block.strip().splitlines())
        if not block:
            continue
        style = body
        if block.startswith("# "):
            block, style = block[2:], title
        elif block.startswith("## "):
            block, style = block[3:], heading
        text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", escape(block))
        flow.append(Paragraph(text, style))
    output = ROOT / f"Brief_Puente_{version}.pdf"
    SimpleDocTemplate(str(output), pagesize=A4, leftMargin=39, rightMargin=39,
                      topMargin=30, bottomMargin=30,
                      title=f"Puente · Brief {version} · Propuesta para revisión").build(flow)
    print(output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--version", choices=["v0.2", "v0.3"], default="v0.3")
    build(parser.parse_args().version)
