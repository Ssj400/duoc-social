"""Genera el plan de lectura: .venv/bin/python plan/compilar_plan_explicado.py."""

from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, PageBreak, Table, TableStyle,
)

from compilar_pdf import markup  # Reutiliza formato y fuentes, sin generar v0.1.


ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "Puente_plan_explicado.pdf"
INK = colors.HexColor("#142C40")
TEAL = colors.HexColor("#087F8C")
BODY = ParagraphStyle("ReadingBody", fontName="DejaVu", fontSize=10.5,
                      leading=15.4, spaceAfter=9, textColor=INK)
CHAPTER = ParagraphStyle("ReadingChapter", parent=BODY, fontName="DejaVu-Bold",
                         fontSize=21, leading=26, spaceAfter=19,
                         keepWithNext=True)
SUBHEAD = ParagraphStyle("ReadingSubhead", parent=BODY, fontName="DejaVu-Bold",
                         fontSize=12, leading=17, spaceBefore=9, spaceAfter=7,
                         textColor=TEAL, keepWithNext=True)
BULLET = ParagraphStyle("ReadingBullet", parent=BODY, leftIndent=12,
                        firstLineIndent=-10, spaceAfter=8)
QUOTE = ParagraphStyle("ReadingQuote", parent=BODY, leftIndent=12,
                       rightIndent=12, borderPadding=8, borderWidth=0.5,
                       borderColor=TEAL, backColor=colors.HexColor("#EEF5F6"),
                       spaceBefore=7, spaceAfter=14)
CELL = ParagraphStyle("ReadingCell", parent=BODY, fontSize=9, leading=13,
                      spaceAfter=0)
HEAD_CELL = ParagraphStyle("ReadingHeadCell", parent=CELL,
                           fontName="DejaVu-Bold", textColor=colors.white)


class ReadingDoc(SimpleDocTemplate):
    def beforeDocument(self):
        self.chapter_count = 0

    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph) and flowable.style.name == CHAPTER.name:
            self.chapter_count += 1
            key = f"reading-{self.chapter_count}"
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(flowable.getPlainText(), key, level=0)


def decorate(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(TEAL)
    canvas.setLineWidth(2)
    canvas.line(46, A4[1] - 27, A4[0] - 46, A4[1] - 27)
    canvas.setFont("DejaVu", 7.5)
    canvas.setFillColor(INK)
    canvas.drawString(46, 25, "PUENTE · Plan explicado · 6 noviembre 2026 · Propuesta")
    canvas.drawRightString(A4[0] - 46, 25, str(doc.page))
    canvas.restoreState()


def build():
    doc = ReadingDoc(str(OUTPUT), pagesize=A4, leftMargin=46, rightMargin=46,
                     topMargin=46, bottomMargin=47,
                     title="Puente: qué queremos hacer y cómo lo haríamos",
                     author="Documento de trabajo del proyecto Puente")
    flow, paragraph = [], []
    kind = "body"

    def flush():
        nonlocal kind
        if paragraph:
            prefix = "• " if kind == "bullet" else ""
            style = {"body": BODY, "bullet": BULLET, "quote": QUOTE}[kind]
            flow.append(Paragraph(prefix + markup(" ".join(paragraph)), style))
            paragraph.clear()
        kind = "body"

    lines = (ROOT / "plan_explicado.md").read_text(encoding="utf-8").splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            flush()
        elif line.startswith("# "):
            flush()
            if flow:
                flow.append(PageBreak())
            flow.append(Paragraph(markup(line[2:]), CHAPTER))
        elif line.startswith("## "):
            flush()
            flow.append(Paragraph(markup(line[3:]), SUBHEAD))
        elif line.startswith("| "):
            flush()
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                row = [v.strip() for v in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r"[:\-\s]+", v) for v in row):
                    rows.append(row)
                i += 1
            if any(len(row) != 3 for row in rows):
                raise ValueError("El cronograma debe tener tres columnas")
            cells = [[Paragraph(markup(v), HEAD_CELL if n == 0 else CELL)
                      for v in row] for n, row in enumerate(rows)]
            table = Table(cells, colWidths=[doc.width * v for v in (.17, .39, .44)],
                          repeatRows=1, hAlign="LEFT")
            table.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1),
                 [colors.HexColor("#EEF5F6"), colors.white]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]))
            flow.append(table)
            continue
        elif line.startswith("- "):
            flush()
            kind = "bullet"
            paragraph.append(line[2:])
        elif line.startswith("> "):
            if kind != "quote":
                flush()
            kind = "quote"
            paragraph.append(line[2:])
        else:
            paragraph.append(line)
        i += 1
    flush()
    doc.build(flow, onFirstPage=decorate, onLaterPages=decorate)
    print(OUTPUT)


if __name__ == "__main__":
    build()
