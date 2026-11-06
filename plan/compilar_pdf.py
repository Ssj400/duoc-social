"""Compila el informe Markdown a PDF con ReportLab, sin servicios externos.

Uso: PYTHONPATH=/tmp/opencode/duoc-pdf-deps python plan/compilar_pdf.py
Requiere: reportlab. Las fuentes DejaVu se leen del sistema.
"""

from pathlib import Path
import re
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageBreak, PageTemplate, Paragraph, Spacer,
    Table, TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "investigacion_y_propuesta.md"
OUTPUT = ROOT / "Investigacion_y_plan_Puente_v0.1.pdf"
NAVY = colors.HexColor("#142C40")
TEAL = colors.HexColor("#087F8C")
GRAY = colors.HexColor("#526474")
LIGHT = colors.HexColor("#EEF5F6")
WIDTH, HEIGHT = A4

for name, filename in (
    ("DejaVu", "DejaVuSans.ttf"),
    ("DejaVu-Bold", "DejaVuSans-Bold.ttf"),
):
    pdfmetrics.registerFont(TTFont(name, "/usr/share/fonts/truetype/dejavu/" + filename))
pdfmetrics.registerFontFamily(
    "DejaVu", normal="DejaVu", bold="DejaVu-Bold",
    italic="DejaVu", boldItalic="DejaVu-Bold",
)

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    "Text", fontName="DejaVu", fontSize=9.6, leading=14.3,
    textColor=NAVY, spaceAfter=8, alignment=TA_LEFT,
))
styles.add(ParagraphStyle(
    "Chapter", parent=styles["Text"], fontName="DejaVu-Bold",
    fontSize=20, leading=25, textColor=NAVY, spaceAfter=18,
    keepWithNext=True,
))
styles.add(ParagraphStyle(
    "Sub", parent=styles["Text"], fontName="DejaVu-Bold",
    fontSize=12, leading=17, textColor=TEAL, spaceBefore=10,
    spaceAfter=7, keepWithNext=True,
))
styles.add(ParagraphStyle(
    "SmallHead", parent=styles["Sub"], fontSize=10, leading=15,
))
styles.add(ParagraphStyle(
    "BulletText", parent=styles["Text"], leftIndent=12,
    firstLineIndent=-9, spaceAfter=5,
))
styles.add(ParagraphStyle(
    "QuoteText", parent=styles["Text"], leftIndent=12, rightIndent=12,
    borderColor=TEAL, borderWidth=0.6, borderPadding=10,
    backColor=LIGHT, spaceBefore=8, spaceAfter=14,
))
styles.add(ParagraphStyle(
    "Cell", parent=styles["Text"], fontSize=8, leading=11.5,
    spaceAfter=0, splitLongWords=True,
))
styles.add(ParagraphStyle(
    "CellHead", parent=styles["Cell"], fontName="DejaVu-Bold",
    textColor=colors.white,
))
styles.add(ParagraphStyle(
    "Contents", parent=styles["Text"], fontSize=8.2, leading=11.8,
    leftIndent=0, firstLineIndent=0, spaceBefore=0, spaceAfter=0,
))
styles.add(ParagraphStyle(
    "CoverTitle", parent=styles["Chapter"], fontSize=37, leading=44,
    spaceAfter=20,
))


def markup(text):
    text = escape(text)
    text = re.sub(
        r"\[([^\]]+)\]\((https?://[^\s)]+)\)",
        r'<link href="\2" color="#087F8C"><u>\1</u></link>', text,
    )
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"`([^`]+)`", r'<font color="#087F8C">\1</font>', text)
    return text


class Report(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename, pagesize=A4, leftMargin=49, rightMargin=49,
            topMargin=54, bottomMargin=48,
            title="Puente — Investigación y plan de prototipo v0.1",
            author="Documento de trabajo preparado con asistencia de IA",
            subject="Hackathon IA Congreso Social UC 2026 · Desafío 2",
        )
        frame = Frame(
            self.leftMargin, self.bottomMargin, self.width, self.height,
            leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
        )
        self.addPageTemplates(PageTemplate(id="report", frames=frame, onPage=self.decorate))
        self.section_counter = 0

    def beforeDocument(self):
        self.section_counter = 0

    def decorate(self, canvas, doc):
        canvas.saveState()
        canvas.setFillColor(TEAL)
        canvas.rect(0, HEIGHT - 8, WIDTH, 8, fill=True, stroke=False)
        if doc.page > 1:
            canvas.setFont("DejaVu", 7)
            canvas.setFillColor(GRAY)
            canvas.drawString(49, HEIGHT - 33, "PUENTE  /  INVESTIGACIÓN Y PROPUESTA")
            canvas.drawRightString(WIDTH - 49, HEIGHT - 33, "DESAFÍO 2 · NOV 2026")
        canvas.setStrokeColor(colors.HexColor("#DCE5E9"))
        canvas.line(49, 34, WIDTH - 49, 34)
        canvas.setFont("DejaVu", 7)
        canvas.setFillColor(GRAY)
        canvas.drawString(49, 22, "v0.1 · Hipótesis de diseño, no solución validada")
        canvas.drawRightString(WIDTH - 49, 22, str(doc.page))
        canvas.restoreState()

    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph) and flowable.style.name == "Chapter":
            self.section_counter += 1
            key = f"chapter-{self.section_counter}"
            text = flowable.getPlainText()
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(text, key, level=0, closed=False)
            self.notify("TOCEntry", (0, text, self.page, key))


def make_table(rows, width):
    n = len(rows[0])
    weights = {
        2: [0.32, 0.68],
        3: [0.25, 0.38, 0.37],
        4: [0.18, 0.29, 0.29, 0.24],
        5: [0.15, 0.22, 0.23, 0.20, 0.20],
    }.get(n, [1 / n] * n)
    cells = [
        [Paragraph(markup(c), styles["CellHead" if i == 0 else "Cell"]) for c in row]
        for i, row in enumerate(rows)
    ]
    table = Table(cells, colWidths=[width * w for w in weights], repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [LIGHT, colors.white]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LINEBELOW", (0, 0), (-1, 0), 0.6, TEAL),
        ("LINEBELOW", (0, 1), (-1, -1), 0.3, colors.HexColor("#DAE5E8")),
    ]))
    return table


def build():
    doc = Report(str(OUTPUT))
    flow = [
        Spacer(1, 55),
        Paragraph("HACKATHON IA · CONGRESO SOCIAL UC 2026", styles["Sub"]),
        Spacer(1, 28),
        Paragraph("Puente", styles["CoverTitle"]),
        Paragraph("Investigar antes de construir.<br/>Acompañar antes de perder el vínculo.", styles["Sub"]),
        Spacer(1, 20),
        Paragraph("Investigación, propuesta de solución y plan de ejecución", styles["Sub"]),
        Paragraph("Desafío 2 · Prevención de la deserción en educación superior", styles["Text"]),
        Spacer(1, 25),
        Paragraph("Versión 0.1 · 5 de noviembre de 2026<br/>Evento: 6 de noviembre de 2026 · Duoc UC San Joaquín", styles["Text"]),
        Spacer(1, 25),
        Paragraph(
            "Documento para discutir y afinar con el equipo. El nombre es provisional. "
            "Distingue evidencia publicada, hipótesis de producto y funciones de demostración. "
            "No acredita validación institucional ni resultados de reducción del abandono.",
            styles["QuoteText"],
        ),
        Paragraph("Preparado con investigación web y revisión de subagentes de arquitectura, evidencia y ética. Responsabilidad de revisión final: equipo participante.", styles["Text"]),
        PageBreak(),
        Paragraph("Cómo leer este documento", styles["Sub"]),
        Paragraph(
            "La investigación precede a la propuesta. Las referencias [R1]–[R8] se desarrollan "
            "en la bibliografía final. Los escenarios ficticios no representan políticas de UC o Duoc. "
            "Los tiempos y metas de implementación son propuestas, no compromisos de la organización.",
            styles["Text"],
        ),
        Paragraph("Índice", styles["Sub"]),
    ]
    toc = TableOfContents()
    toc.levelStyles = [styles["Contents"]]
    toc.dotsMinLevel = 0
    toc.tableStyle = TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ])
    flow += [toc]
    lines = SOURCE.read_text(encoding="utf-8").splitlines()
    i = 0
    paragraph = []

    def flush():
        if paragraph:
            flow.append(Paragraph(markup(" ".join(paragraph)), styles["Text"]))
            paragraph.clear()

    while i < len(lines):
        line = lines[i].strip()
        if not line:
            flush()
        elif line.startswith("# "):
            flush()
            flow.extend([PageBreak(), Paragraph(markup(line[2:]), styles["Chapter"])])
        elif line.startswith("### "):
            flush()
            flow.append(Paragraph(markup(line[4:]), styles["SmallHead"]))
        elif line.startswith("## "):
            flush()
            flow.append(Paragraph(markup(line[3:]), styles["Sub"]))
        elif line.startswith("| "):
            flush()
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                row = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r"[:\-\s]+", c) for c in row):
                    rows.append(row)
                i += 1
            if any(len(r) != len(rows[0]) for r in rows):
                raise ValueError(f"Tabla inconsistente cerca de línea {i}")
            flow.extend([make_table(rows, doc.width), Spacer(1, 10)])
            continue
        elif line.startswith("- "):
            flush()
            flow.append(Paragraph("• " + markup(line[2:]), styles["BulletText"]))
        elif line.startswith("> "):
            flush()
            flow.append(Paragraph(markup(line[2:]), styles["QuoteText"]))
        else:
            paragraph.append(line)
        i += 1
    flush()
    doc.multiBuild(flow)
    print(OUTPUT)


if __name__ == "__main__":
    build()
