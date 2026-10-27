"""Check complete, readable architectural contexts and their assumptions."""
import copy
import json
from pathlib import Path
import unittest
from build_system_selection import render
from test_build_engineering_toolbox import Elements

ROOT = Path(__file__).resolve().parents[1]

class SystemOutcomeTests(unittest.TestCase):
    def setUp(self):
        self.tool = next(t for t in json.loads((ROOT / 'data/engineering-tools.json').read_text())['tools'] if t.get('kind') == 'system-selection')

    def test_rejects_contexts_without_assumptions_or_recommendations(self):
        for field in ('assumption', 'recommendation'):
            invalid = copy.deepcopy(self.tool)
            invalid['contexts'][0].pop(field)
            with self.assertRaises(ValueError):
                render(invalid)

    def test_rejects_duplicate_context_ids(self):
        invalid = copy.deepcopy(self.tool)
        invalid['contexts'][1]['id'] = invalid['contexts'][0]['id']
        with self.assertRaises(ValueError):
            render(invalid)

    def test_all_contexts_readable_without_scripts_with_unique_ids(self):
        html = render(self.tool)
        elements = Elements(html).elements
        self.assertEqual(sum(tag == 'figure' for tag, _ in elements), 2)
        self.assertEqual(sum(tag == 'ol' for tag, _ in elements), 3)
        self.assertEqual(sum('architecture-context' in a.get('class', '') for _, a in elements), 3)
        self.assertTrue(all('hidden' not in attrs for _, attrs in elements))
        for context in self.tool['contexts']:
            self.assertIn(context['assumption'], html)
            self.assertIn(context['recommendation'], html)
        ids = [attrs['id'] for _, attrs in elements if 'id' in attrs]
        self.assertEqual(len(ids), len(set(ids)))

if __name__ == '__main__':
    unittest.main()
