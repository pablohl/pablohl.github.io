#!/usr/bin/env python3
"""Build example-led engineering guides using the existing site shell."""
import json
import re
from build_toolbox import ROOT, SITE_URL, esc, site_head, site_header, site_footer


def page(title, summary, route, body):
    head = site_head(title, summary, SITE_URL + route).replace('</head>', '<link rel="stylesheet" href="/css/engineering-toolbox.css?v=20261023b">\n</head>')
    return f'<!DOCTYPE html>\n<html lang="en-us">{head}<body id="page">{site_header()}<main class="site-main section-inner engineering-page">{body}</main>{site_footer()}</body></html>\n'


def render_example(example, number):
    rows = ''.join('<tr><th scope="row">' + esc(row['label']) + '</th>' + ''.join(f'<td>{esc(v)}</td>' for v in row['values']) + '</tr>' for row in example['comparison'])
    columns = ''.join(f'<th scope="col">{esc(c)}</th>' for c in example['columns'])
    # Mobile cards use the same content as the semantic desktop comparison table.
    mobile = ''.join(f'<section><h4>{esc(column)}</h4>' + ''.join(f'<p><strong>{esc(row["label"])}</strong>{esc(row["values"][i])}</p>' for row in example['comparison']) + '</section>' for i, column in enumerate(example['columns']))
    return f'''<article class="engineering-case" id="{esc(example['id'])}" aria-labelledby="{esc(example['id'])}-title">
<p class="engineering-eyebrow">Example {number:02} / {esc(example['name'])}</p>
<h2 id="{esc(example['id'])}-title">{esc(example['title'])}</h2>
<p class="case-scenario">{esc(example['scenario'])}</p>
<div class="case-impression"><p class="case-label">The tempting conclusion</p><blockquote>{esc(example['impression'])}</blockquote><p>{esc(example['tension'])}</p></div>
<h3>{esc(example['comparisonTitle'])}</h3>
<table class="case-comparison"><caption class="visually-hidden">{esc(example['comparisonTitle'])}</caption><thead><tr><td></td>{columns}</tr></thead><tbody>{rows}</tbody></table>
<div class="case-comparison-mobile">{mobile}</div>
<aside class="case-takeaway"><h3>{esc(example['takeawayTitle'])}</h3><p>{esc(example['takeaway'])}</p></aside>
<details class="case-discussion"><summary>How this could sound in the hiring discussion</summary><blockquote>{esc(example['boundedConclusion'])}</blockquote><p><strong>A useful follow-up:</strong> {esc(example['followup'])}</p></details>
</article>'''


def build():
    tools = json.loads((ROOT / 'data/engineering-tools.json').read_text())['tools']
    if len({t['id'] for t in tools}) != len(tools):
        raise ValueError('Engineering tool IDs must be unique')
    cards = []
    for tool in tools:
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', tool['id']):
            raise ValueError('Invalid engineering tool ID')
        if not tool['examples'] or len({e['id'] for e in tool['examples']}) != len(tool['examples']):
            raise ValueError('Examples must have unique IDs')
        for example in tool['examples']:
            if len(example['columns']) != 2 or any(len(row['values']) != 2 for row in example['comparison']):
                raise ValueError('Examples must compare two interpretations')
        route = f'/toolbox/engineering/{tool["id"]}/'
        examples = ''.join(render_example(e, i + 1) for i, e in enumerate(tool['examples']))
        navigation = ''.join(f'<a href="#{esc(e["id"])}">{esc(e["name"])} ↓</a>' for e in tool['examples'])
        discussion = ''.join(f'<div class="hiring-structure-row"><dt><span class="engineering-eyebrow">{i + 1:02} / {esc(d["label"])}</span><strong>{esc(d["question"])}</strong><span class="structure-explanation">{esc(d["explanation"])}</span></dt><dd>{esc(d["example"])}</dd></div>' for i, d in enumerate(tool['discussion']))
        related = ''.join(f'<li><a href="/toolbox/{esc(r["id"])}/">{esc(r["title"])}</a> — {esc(r["reason"])}</li>' for r in tool['related'])
        body = f'''<nav class="engineering-breadcrumb" aria-label="Breadcrumb"><a href="/toolbox/">Toolbox</a> / <a href="/toolbox/engineering/">Engineering</a> / Hiring</nav>
<header class="engineering-intro"><p class="engineering-eyebrow">Engineering Toolbox / Hiring</p><h1>{esc(tool['title'])}</h1><p class="engineering-lead">{esc(tool['summary'])}</p><nav class="case-navigation" aria-label="Explore the examples">{navigation}</nav><p class="example-disclaimer">Two illustrative interview scenarios.</p></header>
{examples}
<section class="engineering-section" id="discussion"><p class="engineering-eyebrow">Take it into the discussion</p><h2>Turn the evidence into a hiring expectation</h2><p>Bring these three parts into the debrief. Together, they make an expectation specific enough for another interviewer to question. Here is the ML example in that structure.</p><div class="hiring-structure-heading" aria-hidden="true"><span>The structure</span><span>Applied to the ML example</span></div><dl class="hiring-structure">{discussion}</dl><div class="hiring-template"><h3>A sentence to take with you</h3><blockquote>{esc(tool["discussionTemplate"])}</blockquote><p>You can use this in your existing notes. If a part is missing, name the gap rather than filling it with a broad impression.</p></div><p class="discussion-caution"><strong>Check the standard, too.</strong> If you call a gap “learnable” for one candidate and “disqualifying” for another, explain which requirement of the role justifies the difference.</p></section>
<section class="engineering-section related-lenses"><h2>Explore the reasoning behind this</h2><ul>{related}</ul><a href="/toolbox/engineering/">← Engineering Toolbox</a></section>'''
        destination = ROOT / route.strip('/') / 'index.html'
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(page(tool['title'], tool['summary'], route, body))
        cards.append(f'<a class="engineering-tool-card" href="{route}"><span class="engineering-eyebrow">{esc(tool["category"])}</span><h2>{esc(tool["title"])}</h2><p>Explore two interview scenarios: what an answer supports, what it leaves open, and how that changes the hiring discussion.</p><strong>Explore the examples →</strong></a>')
    body = '''<nav class="engineering-breadcrumb" aria-label="Breadcrumb"><a href="/toolbox/">Toolbox</a> / Engineering</nav><header class="engineering-intro"><p class="engineering-eyebrow">Engineering Toolbox</p><h1>Engineering judgment, made concrete.</h1><p class="engineering-lead">Work through situations where the details change what you would do. Each guide connects an engineering question to examples you can bring into your own decisions.</p></header>''' + ''.join(cards) + '<section class="engineering-section"><h2>Start with a situation</h2><p>The first guide examines hiring: what an interview tells you about someone’s future work, and where an impression goes beyond the evidence.</p><p>For broader questions about evidence, uncertainty, and trade-offs, explore the <a href="/toolbox/#decision-tools">Decision Toolbox</a>.</p></section>'
    (ROOT / 'toolbox/engineering/index.html').write_text(page('Engineering Toolbox', 'Concrete examples for reasoning through engineering decisions.', '/toolbox/engineering/', body))
    sitemap = ROOT / 'sitemap.xml'
    source = re.sub(r'\s*<!-- engineering:start -->.*?<!-- engineering:end -->\s*', '\n', sitemap.read_text(), flags=re.S)
    routes = ['/toolbox/engineering/'] + [f'/toolbox/engineering/{t["id"]}/' for t in tools]
    entries = '\n'.join(f'<url><loc>{SITE_URL}{r}</loc></url>' for r in routes)
    sitemap.write_text(source.replace('</urlset>', f'<!-- engineering:start -->\n{entries}\n<!-- engineering:end -->\n</urlset>'))


if __name__ == '__main__':
    build()
