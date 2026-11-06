"""Pruebas de materiales provisionales; no validan el producto ni el pitch real."""

from fractions import Fraction
import json
from pathlib import Path
import unittest
import zipfile
import xml.etree.ElementTree as ET

from pptx import Presentation


ROOT = Path(__file__).resolve().parent


def normalized(text):
    return " ".join(text.split())


class PitchTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads((ROOT / "diapositivas.json").read_text())
        cls.prs = Presentation(ROOT / "Pitch_Puente_provisional.pptx")

    def test_count_and_timing(self):
        self.assertEqual(len(self.data["slides"]), 6)
        self.assertEqual(len(self.prs.slides), 6)
        self.assertEqual(sum(s["seconds"] for s in self.data["slides"]), 270)
        self.assertEqual(self.data["slides"][2]["seconds"], 90)

    def test_readable_fonts_and_boxes(self):
        for item in self.data["slides"]:
            for block in item["blocks"]:
                self.assertGreaterEqual(block["size"], 18)
                self.assertGreaterEqual(block["x"], 0)
                self.assertGreaterEqual(block["y"], 0)
                self.assertLessEqual(block["x"] + block["w"], 13.334)
                self.assertLessEqual(block["y"] + block["h"], 7.5)
        for slide in self.prs.slides:
            for shape in slide.shapes:
                if not shape.has_text_frame:
                    continue
                for paragraph in shape.text_frame.paragraphs:
                    if paragraph.text and paragraph.font.size is not None:
                        self.assertGreaterEqual(paragraph.font.size.pt, 18)

    def test_editable_text_and_presenter_notes(self):
        for item, slide in zip(self.data["slides"], self.prs.slides):
            text = normalized(" ".join(s.text for s in slide.shapes if s.has_text_frame))
            self.assertIn(item["title"], text)
            for block in item["blocks"]:
                self.assertIn(normalized(block["text"]), text)
            self.assertEqual(slide.notes_slide.notes_text_frame.text, item["notes"])

    def test_pptx_xml_integrity(self):
        with zipfile.ZipFile(ROOT / "Pitch_Puente_provisional.pptx") as package:
            self.assertIsNone(package.testzip())
            for name in package.namelist():
                if name.endswith((".xml", ".rels")):
                    ET.fromstring(package.read(name))

    def test_honest_status_and_no_placeholder_results(self):
        demo = self.data["slides"][2]
        self.assertIn("maqueta", demo["title"])
        self.assertIn("no es una aplicación funcional", demo["source"])
        all_text = normalized(json.dumps(self.data, ensure_ascii=False)).lower()
        self.assertIn("no garantizan aprobar", all_text)
        self.assertIn("pendiente", all_text)
        self.assertNotIn("[resultado]", all_text)
        for item in self.data["slides"]:
            self.assertIn("notes", item)

    def test_case_arithmetic(self):
        self.assertEqual(Fraction(22, 25), Fraction(88, 100))
        self.assertLess(Fraction(22, 33), Fraction(70, 100))
        self.assertLess(Fraction(23, 33), Fraction(70, 100))
        self.assertGreater(Fraction(24, 33), Fraction(70, 100))

    def test_pdf_deck_content(self):
        try:
            import pymupdf
        except ImportError:
            self.skipTest("PyMuPDF no disponible")
        pdf = pymupdf.open(ROOT / "Pitch_Puente_provisional.pdf")
        self.assertEqual(len(pdf), 6)
        for page, item in zip(pdf, self.data["slides"]):
            self.assertAlmostEqual(page.rect.width / page.rect.height, 16/9, places=4)
            text = normalized(page.get_text())
            self.assertIn(item["title"], text)
            for block in item["blocks"]:
                self.assertIn(normalized(block["text"]), text)
            self.assertNotIn("\ufffd", text)
            for block in page.get_text("blocks"):
                self.assertGreaterEqual(block[0], 0)
                self.assertGreaterEqual(block[1], 0)
                self.assertLessEqual(block[2], page.rect.width)
                self.assertLessEqual(block[3], page.rect.height)

    def test_brief_and_support_pdfs(self):
        try:
            import pymupdf
        except ImportError:
            self.skipTest("PyMuPDF no disponible")
        brief = pymupdf.open(ROOT / "Brief_pitch_Puente.pdf")
        self.assertEqual(len(brief), 1)
        for name in ("Brief_pitch_Puente.pdf", "Guion_y_respaldo_Puente.pdf"):
            doc = pymupdf.open(ROOT / name)
            self.assertTrue(all(len(p.get_text().split()) > 40 for p in doc))
            self.assertNotIn("\ufffd", "".join(p.get_text() for p in doc))


if __name__ == "__main__":
    unittest.main(verbosity=2)
