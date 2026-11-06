"""Pruebas del documento y sus diagramas; no del producto aún inexistente.

PYTHONPATH=/tmp/opencode/duoc-pdf-deps python plan/tecnico/test_documentos.py
"""

import ast
from fractions import Fraction
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import unittest
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT.parent))
from compilar_plan_tecnico import load_diagrams  # noqa: E402
from reportlab.pdfbase.pdfmetrics import stringWidth  # noqa: E402


class HtmlInventory(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.remote_assets = [], []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for name in ("src", "href"):
            if attrs.get(name, "").startswith(("http:", "https:", "//")):
                self.remote_assets.append((tag, name, attrs[name]))


class DocumentTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.diagrams = load_diagrams()
        cls.md = (ROOT / "plan_tecnico.md").read_text(encoding="utf-8")
        cls.html = (ROOT / "diagramas.html").read_text(encoding="utf-8")

    def test_all_diagrams_embedded_once(self):
        refs = re.findall(r"^@diagrama (\S+)$", self.md, re.M)
        self.assertEqual(set(refs), set(self.diagrams))
        self.assertEqual(len(refs), len(set(refs)))

    def test_node_text_fits(self):
        for diagram in self.diagrams.values():
            for node in diagram["nodes"]:
                self.assertLessEqual(len(node["lines"]) * 17, node["h"] - 8)
                for i, line in enumerate(node["lines"]):
                    width = stringWidth(line, "DejaVu-Bold" if i == 0 else "DejaVu", 12.5)
                    self.assertLessEqual(width, node["w"] - 10, (diagram["id"], node["id"], line))

    def test_edges_are_named_and_inside_diagram(self):
        for diagram in self.diagrams.values():
            for edge in diagram["edges"]:
                self.assertTrue(edge["label"].strip())
                for x, y in edge["points"]:
                    self.assertTrue(0 <= x <= diagram["width"] and 0 <= y <= diagram["height"])

    def test_html_is_self_contained_and_svg_valid(self):
        inventory = HtmlInventory()
        inventory.feed(self.html)
        self.assertEqual(inventory.remote_assets, [])
        self.assertEqual(len(inventory.ids), len(set(inventory.ids)))
        svgs = re.findall(r"<svg\b.*?</svg>", self.html, re.S)
        self.assertEqual(len(svgs), len(self.diagrams))
        for svg in svgs:
            ET.fromstring(svg)
        self.assertIn("prefers-reduced-motion", self.html)
        self.assertIn('aria-live="polite"', self.html)

    def test_json_examples(self):
        examples = re.findall(r"```json\n(.*?)\n```", self.md, re.S)
        self.assertEqual(len(examples), 2)
        for example in examples:
            self.assertIsInstance(json.loads(example), dict)

    def test_synthetic_arithmetic_and_schedule(self):
        self.assertEqual(Fraction(22, 25), Fraction(88, 100))
        self.assertLess(Fraction(22, 33), Fraction(7, 10))
        self.assertLess(Fraction(23, 33), Fraction(7, 10))
        self.assertGreaterEqual(Fraction(24, 33), Fraction(7, 10))
        self.assertEqual(sum([20, 25, 15]), 60)
        self.assertEqual(sum([10, 25, 25, 15]), 75)
        self.assertIn("T22 Plazos", self.md)

    def test_generator_syntax(self):
        ast.parse((ROOT.parent / "compilar_plan_tecnico.py").read_text())

    def test_pdf_structure(self):
        try:
            import pymupdf
        except ImportError:
            self.skipTest("PyMuPDF no disponible para inspección PDF")
        pdf = pymupdf.open(ROOT.parent / "Plan_tecnico_Puente.pdf")
        chapters = re.findall(r"^# ", self.md, re.M)
        self.assertEqual(len(pdf), len(chapters))
        self.assertEqual(len(pdf.get_toc()), len(chapters))
        text = " ".join(" ".join(page.get_text().split()) for page in pdf)
        for expected in ("22/33", "minimumAttendances", "T22 Plazos", "Compartir"):
            self.assertIn(expected, text)
        self.assertNotIn("\ufffd", text)
        for page in pdf:
            self.assertGreater(len(page.get_text().split()), 100)
            for block in page.get_text("blocks"):
                if 35 < block[1] < page.rect.height - 38:
                    self.assertGreaterEqual(block[0], 36)
                    self.assertLessEqual(block[2], page.rect.width - 36)
                    self.assertLessEqual(block[3], page.rect.height - 36)

    def test_html_controls_without_browser(self):
        if not shutil.which("node"):
            self.skipTest("Node no disponible para probar controles del documento")
        script = re.findall(r"<script>(.*?)</script>", self.html, re.S)
        self.assertEqual(len(script), 1)
        harness = r"""
const {runInNewContext} = require('node:vm');
const assert = require('node:assert/strict');
const payload = JSON.parse(require('node:fs').readFileSync(0, 'utf8'));
const sections = payload.diagrams.filter(d => d.edges.length).map(d => {
  const paths = d.edges.map(() => {
    const path = {active:false};
    path.classList = {toggle:(name,value) => {path.active = value;}};
    return path;
  });
  const status = {textContent:''};
  const steps = {textContent:JSON.stringify(d.edges.map(e => e.label))};
  const buttons = ['previous','next','all'].map(action => ({
    dataset:{action}, addEventListener:(event, handler) => {
      buttons.find(b => b.dataset.action === action).click = handler;
    }
  }));
  return {paths,status,buttons,
    querySelectorAll:s => s === '.flow' ? paths : buttons,
    querySelector:s => s === '[data-status]' ? status : steps};
});
runInNewContext(payload.script,{document:{querySelectorAll:() => sections},JSON});
for (const section of sections) {
  assert.match(section.status.textContent,/Vista completa/);
  const button = name => section.buttons.find(b => b.dataset.action === name);
  button('next').click();
  assert.equal(section.paths[0].active,true);
  assert.match(section.status.textContent,/Conexión 1/);
  button('previous').click();
  assert.equal(section.paths.at(-1).active,true);
  button('all').click();
  assert.equal(section.paths.some(p => p.active),false);
  assert.match(section.status.textContent,/Vista completa/);
}
console.log('Controles del documento verificados con DOM simulado');
"""
        payload = {"script": script[0], "diagrams": list(self.diagrams.values())}
        result = subprocess.run(["node", "-e", harness], input=json.dumps(payload),
                                text=True, capture_output=True, check=False)
        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main(verbosity=2)
