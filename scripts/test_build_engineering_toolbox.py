"""Regression checks for rebuilding the published engineering guide."""
from html.parser import HTMLParser
from pathlib import Path
import json
import re
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

    def test_every_tab_has_a_readable_static_panel(self):
        elements = Elements(self.source).elements
        tabs = [attrs for _, attrs in elements if 'data-example-tab' in attrs]
        self.assertEqual(len(tabs), 2)
        for tab in tabs:
            example_id = tab['data-example-tab']
            panels = [attrs for tag, attrs in elements
                      if tag == 'article' and attrs.get('id') == example_id]
            self.assertEqual(len(panels), 1)
            # Without JavaScript both complete examples stay readable.
            self.assertNotIn('hidden', panels[0])

    def test_repeated_build_is_stable(self):
        first = {p.relative_to(self.root): p.read_bytes()
                 for p in self.root.rglob('*') if p.is_file()}
        builder.build()
        second = {p.relative_to(self.root): p.read_bytes()
                  for p in self.root.rglob('*') if p.is_file()}
        self.assertEqual(first, second)

    def test_report_wording_follows_each_evidence_branch(self):
        source = (self.root / 'toolbox/engineering/results-to-decisions/index.html').read_text()
        outcomes = dict(re.findall(r'<section class="decision-outcome" id="([^"]+)"[^>]*>(.*?)</section>', source, re.S))
        self.assertEqual(len(outcomes), 4)
        reports = {}
        for branch, content in outcomes.items():
            report = re.search(r'<blockquote>(.*?)</blockquote>', content, re.S)
            self.assertIsNotNone(report, branch)
            reports[branch] = report.group(1)
        self.assertIn('We have not checked which incidents it would miss', reports['on-call-alerts-page-count'])
        self.assertNotIn('Thursday', reports['on-call-alerts-page-count'])
        self.assertIn('miss Thursday', reports['on-call-alerts-outage-replay'])
        self.assertIn('recommend a staged move', reports['migration-scope-staged'])
        self.assertIn('recommend holding the full migration', reports['migration-scope-all-records'])
        self.assertNotIn('recommend a staged move', reports['migration-scope-all-records'])
        self.assertEqual(len(set(reports.values())), 4)

    def test_story_fallback_and_short_ending(self):
        source = (self.root / 'toolbox/engineering/results-to-decisions/index.html').read_text()
        elements = Elements(source).elements
        panels = [attrs for tag, attrs in elements if tag == 'article']
        outcomes = [attrs for _, attrs in elements if 'data-decision-outcome' in attrs]
        self.assertEqual(len(panels), 2)
        self.assertEqual(len(outcomes), 4)
        for attrs in panels + outcomes:
            self.assertNotIn('hidden', attrs)
        self.assertFalse(any(tag == 'input' and attrs.get('type') == 'checkbox' for tag, attrs in elements))
        self.assertLess(source.index('id="examples"'), source.index('class="framework-flow"'))
        ending = source.split('id="discussion"', 1)[1].split('<section class="engineering-section related-lenses"', 1)[0]
        self.assertNotIn('hiring-structure', ending)
        self.assertNotIn('Thursday', ending)
        self.assertEqual(ending.count('<blockquote>'), 1)

    def test_branch_without_report_wording_is_rejected(self):
        path = self.root / 'data/engineering-tools.json'
        data = json.loads(path.read_text())
        story = next(tool for tool in data['tools'] if tool.get('storyFirst'))
        del story['examples'][0]['interaction']['options'][0]['boundedConclusion']
        path.write_text(json.dumps(data))
        with self.assertRaisesRegex(ValueError, 'Each decision branch needs its own report wording'):
            builder.build()


if __name__ == '__main__':
    unittest.main()
