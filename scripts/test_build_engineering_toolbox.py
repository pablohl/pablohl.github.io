"""Regression checks for rebuilding the published engineering guide."""
from html.parser import HTMLParser
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch

import build_engineering_toolbox as builder


ROOT = Path(__file__).resolve().parents[1]
GUIDE = Path('toolbox/engineering/hiring-forecast/index.html')


class Elements(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.elements = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))


class EngineeringRebuildTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        (self.root / 'data').mkdir()
        (self.root / 'toolbox/engineering').mkdir(parents=True)
        shutil.copy(ROOT / 'data/engineering-tools.json', self.root / 'data')
        shutil.copy(ROOT / 'sitemap.xml', self.root)
        self.root_patch = patch.object(builder, 'ROOT', self.root)
        self.root_patch.start()
        self.addCleanup(self.root_patch.stop)
        builder.build()
        self.source = (self.root / GUIDE).read_text()

    def test_rebuild_preserves_published_guide(self):
        self.assertEqual(self.source, (ROOT / GUIDE).read_text())
        for phrase in (
            'What the interviewer supplied matters.',
            'The role changes the forecast.',
            'Account for the prompt.',
            'For a junior role with design reviews',
        ):
            self.assertIn(phrase, self.source)

    def test_every_tab_has_a_static_panel_and_matching_application(self):
        elements = Elements(self.source).elements
        tabs = [attrs for _, attrs in elements if 'data-example-tab' in attrs]
        summaries = [attrs for _, attrs in elements if 'data-example-summary' in attrs]
        self.assertEqual(len(tabs), 2)
        self.assertEqual(len(summaries), len(tabs))
        for tab in tabs:
            example_id = tab['data-example-tab']
            panels = [attrs for tag, attrs in elements
                      if tag == 'article' and attrs.get('id') == example_id]
            matching = [attrs for attrs in summaries
                        if attrs['data-example-summary'] == example_id]
            self.assertEqual(len(panels), 1)
            self.assertEqual(len(matching), 1)
            # Without JavaScript both the example and its application stay readable.
            self.assertNotIn('hidden', panels[0])
            self.assertNotIn('hidden', matching[0])

    def test_repeated_build_is_stable(self):
        first = {p.relative_to(self.root): p.read_bytes()
                 for p in self.root.rglob('*') if p.is_file()}
        builder.build()
        second = {p.relative_to(self.root): p.read_bytes()
                  for p in self.root.rglob('*') if p.is_file()}
        self.assertEqual(first, second)


if __name__ == '__main__':
    unittest.main()
