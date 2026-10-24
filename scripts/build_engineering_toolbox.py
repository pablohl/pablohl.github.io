#!/usr/bin/env python3
"""Build example-led engineering guides using the existing site shell."""
import json
import re
from build_toolbox import ROOT, SITE_URL, esc, site_head, site_header, site_footer


def page(title, summary, route, body, interactive=False, decisions=False):
    head = site_head(title, summary, SITE_URL + route).replace('</head>', '<link rel="stylesheet" href="/css/engineering-toolbox.css?v=20261024a">\n</head>')
    script = '<script src="/js/engineering-examples.js?v=20261023" defer></script>' if interactive else ''
    if decisions:
        script += '<script src="/js/engineering-decisions.js?v=20261024" defer></script>'
    return f'<!DOCTYPE html>\n<html lang="en-us">{head}<body id="page">{site_header()}<main class="site-main section-inner engineering-page">{body}</main>{site_footer()}{script}</body></html>\n'


def render_decision(interaction, example_id, narrative=False):
    if not interaction:
        return ''
    controls = ''.join(f'<label><input type="radio" name="{esc(example_id)}-condition" value="{esc(option["id"])}" aria-controls="{esc(example_id)}-{esc(option["id"])}"{" checked" if i == 0 else ""}><span>{esc(option["label"])}</span></label>' for i, option in enumerate(interaction['options']))
    outcomes = ''.join(f'''<section class="decision-outcome" id="{esc(example_id)}-{esc(option['id'])}" data-decision-outcome="{esc(option['id'])}"><h4>{esc(option['title'])}</h4><p><strong>Evidence:</strong> {esc(option['evidence'])}</p><p class="decision-recommendation"><strong>Recommendation:</strong> {esc(option['recommendation'])}</p><p><strong>Why:</strong> {esc(option['reason'])}</p></section>''' for option in interaction['options'])
    if narrative:
        outcomes = ''.join(f'''<section class="decision-outcome" id="{esc(example_id)}-{esc(option['id'])}" data-decision-outcome="{esc(option['id'])}"><h4>{esc(option['title'])}</h4><p>{esc(option['evidence'])}</p><p class="decision-recommendation"><strong>{esc(option['recommendation'])}</strong></p><p>{esc(option['reason'])}</p></section>''' for option in interaction['options'])
    return f'''<div class="decision-explorer" data-decision-explorer><fieldset data-decision-controls hidden><legend>{esc(interaction['question'])}</legend>{controls}</fieldset><div class="decision-outcomes" aria-live="polite" aria-atomic="true">{outcomes}</div></div>'''


def render_checklist(groups):
    if not groups:
        return ''
    sections = []
    for group in groups:
        items = ''.join(f'<li><label><input type="checkbox"><span>{esc(item["rule"])}' + (f'<small>{esc(item["why"])}</small>' if item.get('why') else '') + '</span></label></li>' for item in group['items'])
        sections.append(f'<section><h3>{esc(group["title"])}</h3><ul class="report-checklist">{items}</ul></section>')
    count = sum(len(group['items']) for group in groups)
    return f'<section class="engineering-section" id="report-checklist"><details class="case-discussion report-review"><summary>Check your own report · {count} checks</summary><p>Use this before submitting a report or analysis. Check an item only after verifying it in the document. Your checks are not saved.</p>' + ''.join(sections) + '</details></section>'


def render_example(example, number, discussion_summary):
    rows = ''.join('<tr><th scope="row">' + esc(row['label']) + '</th>' + ''.join(f'<td>{esc(v)}</td>' for v in row['values']) + '</tr>' for row in example['comparison'])
    columns = ''.join(f'<th scope="col">{esc(c)}</th>' for c in example['columns'])
    # Mobile cards use the same content as the semantic desktop comparison table.
    mobile = ''.join(f'<section><h4>{esc(column)}</h4>' + ''.join(f'<p><strong>{esc(row["label"])}</strong>{esc(row["values"][i])}</p>' for row in example['comparison']) + '</section>' for i, column in enumerate(example['columns']))
    if example.get('story'):
        scenario = ''.join(f'<p class="case-scenario">{esc(p)}</p>' for p in example['scenario'])
        return f'''<article class="engineering-case story-case" id="{esc(example['id'])}" aria-labelledby="{esc(example['id'])}-title">
<h3 class="case-title" id="{esc(example['id'])}-title">{esc(example['title'])}</h3>{scenario}
<div class="case-impression"><p class="case-label">The proposal</p><blockquote>{esc(example['impression'])}</blockquote></div><p class="story-question">{esc(example['tension'])}</p>
{render_decision(example['interaction'], example['id'], narrative=True)}
<aside class="case-takeaway"><h3>{esc(example['takeawayTitle'])}</h3><p>{esc(example['takeaway'])}</p></aside>
<details class="case-discussion"><summary>{esc(example['comparisonTitle'])}</summary><table class="case-comparison"><caption class="visually-hidden">{esc(example['comparisonTitle'])}</caption><thead><tr><td></td>{columns}</tr></thead><tbody>{rows}</tbody></table><div class="case-comparison-mobile">{mobile}</div></details>
<details class="case-discussion"><summary>{esc(discussion_summary)}</summary><blockquote>{esc(example['boundedConclusion'])}</blockquote><p><strong>A useful follow-up:</strong> {esc(example['followup'])}</p></details></article>'''
    return f'''<article class="engineering-case" id="{esc(example['id'])}" aria-labelledby="{esc(example['id'])}-title">
<h3 class="case-title" id="{esc(example['id'])}-title">{esc(example['title'])}</h3>
<p class="case-scenario">{esc(example['scenario'])}</p>
<div class="case-impression"><p class="case-label">The tempting conclusion</p><blockquote>{esc(example['impression'])}</blockquote><p>{esc(example['tension'])}</p></div>
<h3>{esc(example['comparisonTitle'])}</h3>
<table class="case-comparison"><caption class="visually-hidden">{esc(example['comparisonTitle'])}</caption><thead><tr><td></td>{columns}</tr></thead><tbody>{rows}</tbody></table>
<div class="case-comparison-mobile">{mobile}</div>
{render_decision(example.get('interaction'), example['id'])}
<aside class="case-takeaway"><h3>{esc(example['takeawayTitle'])}</h3><p>{esc(example['takeaway'])}</p></aside>
<details class="case-discussion"><summary>{esc(discussion_summary)}</summary><blockquote>{esc(example['boundedConclusion'])}</blockquote><p><strong>A useful follow-up:</strong> {esc(example['followup'])}</p></details>
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
        examples = ''.join(render_example(e, i + 1, tool.get('discussionSummary', 'How this could sound in the hiring discussion')) for i, e in enumerate(tool['examples']))
        navigation = ''.join(f'<button type="button" id="tab-{esc(e["id"])}" data-example-tab="{esc(e["id"])}">{esc(e["name"])}</button>' for e in tool['examples'])
        introduction = ''.join(f'<p>{esc(p)}</p>' for p in tool['introduction'])
        framework = ''.join(f'<div><dt>{esc(d["label"])}</dt><dd>{esc(d["question"])}</dd></div>' for d in tool['discussion'])
        lessons = ''.join(f'<div><h3>{esc(lesson["title"])}</h3> <p>{esc(lesson["text"])}</p></div>' for lesson in tool['lessons'])
        discussion = ''.join(f'<div class="hiring-structure-row"><dt><span class="engineering-eyebrow">{i + 1:02} / {esc(d["label"])}</span><strong>{esc(d["question"])}</strong></dt><dd>{esc(d["example"])}</dd></div>' for i, d in enumerate(tool['discussion']))
        related = ''.join(f'<li><a href="/toolbox/{esc(r["id"])}/">{esc(r["title"])}</a> — {esc(r["reason"])}</li>' for r in tool['related'])
        section_label = esc(tool.get('sectionLabel', 'Hiring'))
        flow = ' <span aria-hidden="true">→</span><span class="visually-hidden">then</span> '.join(esc(label) for label in tool.get('frameworkLabels', ['Evidence', 'Expectation', 'Uncertainty']))
        applied_label = esc(tool.get('appliedLabel', 'Applied to the ML example'))
        body = f'''<nav class="engineering-breadcrumb" aria-label="Breadcrumb"><a href="/toolbox/">Toolbox</a> / <a href="/toolbox/engineering/">Engineering</a> / {section_label}</nav>
<header class="engineering-intro"><p class="engineering-eyebrow">Engineering Toolbox / {section_label}</p><h1>{esc(tool['title'])}</h1><p class="engineering-lead">{esc(tool['summary'])}</p></header>
<section class="engineering-problem" aria-labelledby="problem-title"><div><p class="engineering-eyebrow">01 / The problem</p><h2 id="problem-title">{esc(tool.get("problemTitle", "From observation to prediction"))}</h2>{introduction}</div><div class="engineering-framework"><p class="engineering-eyebrow">02 / The distinction</p><p class="framework-flow">{flow}</p><dl class="framework-questions">{framework}</dl><p class="framework-boundary">{esc(tool.get("frameworkBoundary", "An observation can support an expectation without proving it."))}</p></div></section>
<section class="engineering-section example-explorer" id="examples" aria-labelledby="examples-title"><p class="engineering-eyebrow">03 / Explore an example</p><h2 id="examples-title">{esc(tool.get("examplesTitle", "What does the evidence support?"))}</h2><div class="example-controls"><div class="case-selector" data-example-tabs data-examples-label="{esc(tool.get("examplesLabel", "Interview example"))}" hidden>{navigation}</div><p class="example-disclaimer">{esc(tool.get("examplesDisclaimer", "Two illustrative interview scenarios."))}</p></div><noscript><p>Both examples are shown below. With JavaScript enabled, you can select one at a time.</p></noscript>{examples}<a class="discussion-link" href="#discussion">What this distinction helps us notice ↓</a></section>
<section class="engineering-section" id="discussion"><p class="engineering-eyebrow">04 / Discussion</p><h2>What this distinction helps us notice</h2><div class="discussion-lessons">{lessons}</div><h3 class="synthesis-title">{esc(tool.get("discussionTitle", "Turn the evidence into a hiring expectation"))}</h3><div class="hiring-structure-heading" aria-hidden="true"><span>The structure</span><span>{applied_label}</span></div><dl class="hiring-structure" style="--applied-label: &quot;{applied_label}&quot;">{discussion}</dl><div class="hiring-template"><h3>A sentence to take with you</h3><blockquote>{esc(tool["discussionTemplate"])}</blockquote><p>{esc(tool.get("templateGap", "If a part is missing, name the gap rather than filling it with an impression."))}</p></div><p class="discussion-caution"><strong>{esc(tool.get("cautionTitle", "Check the standard, too."))}</strong> {esc(tool.get("caution", "If you call a gap “learnable” for one candidate and “disqualifying” for another, explain which requirement of the role justifies the difference."))}</p></section>
{render_checklist(tool.get("checklist"))}
<section class="engineering-section related-lenses"><h2>Explore the reasoning behind this</h2><ul>{related}</ul><a href="/toolbox/engineering/">← Engineering Toolbox</a></section>'''
        destination = ROOT / route.strip('/') / 'index.html'
        if tool.get('storyFirst'):
            # Let the examples establish the problem before naming the framework.
            opening = f'<section class="story-opening" aria-labelledby="problem-title"><h2 id="problem-title">{esc(tool["problemTitle"])}</h2>{introduction}</section>'
            body = re.sub(r'<section class="engineering-problem".*?</section>', lambda match: opening, body, count=1, flags=re.S)
            body = body.replace('03 / Explore an example', '01 / Follow a decision').replace('04 / Discussion', '02 / Take the idea with you')
            body = body.replace('<h2>What this distinction helps us notice</h2>', '<h2>What made the recommendations change?</h2>')
            body = body.replace('<div class="discussion-lessons">', f'<p>The alert count and the migration rehearsal each gave a useful answer. Neither answered every question needed for the next step. A clear recommendation makes that connection visible.</p><div class="discussion-lessons">', 1)
            body = body.replace('<h3 class="synthesis-title">', f'<div class="story-framework"><p class="framework-flow">{flow}</p><p>{esc(tool["frameworkBoundary"])}</p></div><h3 class="synthesis-title">', 1)
            body = body.replace('What this distinction helps us notice ↓', 'What connects these decisions? ↓')
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(page(tool['title'], tool['summary'], route, body, interactive=True, decisions=any(e.get("interaction") for e in tool["examples"])))
        cards.append(f'<a class="engineering-tool-card" href="{route}"><span class="engineering-eyebrow">{esc(tool["category"])}</span><h2>{esc(tool["title"])}</h2><p>{esc(tool.get("cardSummary", "Explore two interview scenarios: what an answer supports, what it leaves open, and how that changes the hiring discussion."))}</p><strong>Explore the examples →</strong></a>')
    body = '''<nav class="engineering-breadcrumb" aria-label="Breadcrumb"><a href="/toolbox/">Toolbox</a> / Engineering</nav><header class="engineering-intro"><p class="engineering-eyebrow">Engineering Toolbox</p><h1>Engineering judgment, made concrete.</h1><p class="engineering-lead">Work through situations where the details change what you would do. Each guide connects an engineering question to examples you can bring into your own decisions.</p></header>''' + ''.join(cards) + '<section class="engineering-section"><h2>Start with a situation</h2><p>Explore hiring and technical decisions: what an observation supports, what it leaves open, and how those limits change the next step.</p><p>For broader questions about evidence, uncertainty, and trade-offs, explore the <a href="/toolbox/#decision-tools">Decision Toolbox</a>.</p></section>'
    (ROOT / 'toolbox/engineering/index.html').write_text(page('Engineering Toolbox', 'Concrete examples for reasoning through engineering decisions.', '/toolbox/engineering/', body))
    sitemap = ROOT / 'sitemap.xml'
    source = re.sub(r'\s*<!-- engineering:start -->.*?<!-- engineering:end -->\s*', '\n', sitemap.read_text(), flags=re.S)
    routes = ['/toolbox/engineering/'] + [f'/toolbox/engineering/{t["id"]}/' for t in tools]
    entries = '\n'.join(f'<url><loc>{SITE_URL}{r}</loc></url>' for r in routes)
    sitemap.write_text(source.replace('</urlset>', f'<!-- engineering:start -->\n{entries}\n<!-- engineering:end -->\n</urlset>'))


if __name__ == '__main__':
    build()
