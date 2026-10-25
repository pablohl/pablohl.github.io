#!/usr/bin/env python3
"""Build example-led engineering guides using the existing site shell."""
import json
import re
from build_toolbox import ROOT, SITE_URL, esc, site_head, site_header, site_footer


def page(title, summary, route, body, interactive=False, decisions=False):
    head = site_head(title, summary, SITE_URL + route).replace('</head>', '<link rel="stylesheet" href="/css/engineering-toolbox.css?v=20261024c">\n</head>')
    script = '<script src="/js/engineering-examples.js?v=20261024c" defer></script>' if interactive else ''
    if decisions:
        script += '<script src="/js/engineering-decisions.js?v=20261024" defer></script>'
    return f'<!DOCTYPE html>\n<html lang="en-us">{head}<body id="page">{site_header()}<main class="site-main section-inner engineering-page">{body}</main>{site_footer()}{script}</body></html>\n'


def render_example(example, number):
    rows = ''.join('<tr><th scope="row">' + esc(row['label']) + '</th>' + ''.join(f'<td>{esc(v)}</td>' for v in row['values']) + '</tr>' for row in example['comparison'])
    columns = ''.join(f'<th scope="col">{esc(c)}</th>' for c in example['columns'])
    # Mobile cards use the same content as the semantic desktop comparison table.
    mobile = ''.join(f'<section><h4>{esc(column)}</h4>' + ''.join(f'<p><strong>{esc(row["label"])}</strong>{esc(row["values"][i])}</p>' for row in example['comparison']) + '</section>' for i, column in enumerate(example['columns']))
    conditions = ''.join(f'<p class="case-conditions"><strong>{esc(condition["label"])}</strong> {esc(condition["text"])}</p>\n' for condition in example['conditions'])
    if example.get('discussionCases'):
        discussion = '<div class="discussion-cases">' + ''.join(f'<section><h4>{esc(case["label"])}</h4><blockquote>{esc(case["boundedConclusion"])}</blockquote><p><strong>A useful follow-up:</strong> {esc(case["followup"])}</p></section>' for case in example['discussionCases']) + '</div>'
    else:
        discussion = f'<blockquote>{esc(example["boundedConclusion"])}</blockquote><p><strong>A useful follow-up:</strong> {esc(example["followup"])}</p>'
    return f'''<article class="engineering-case" id="{esc(example['id'])}" aria-labelledby="{esc(example['id'])}-title">
<h3 class="visually-hidden" id="{esc(example['id'])}-title">{esc(example['name'])}</h3>
<p class="case-scenario">{esc(example['scenario'])}</p>
<div class="case-impression"><p><strong>A tempting conclusion:</strong> {esc(example['impression'])}</p><p>{esc(example['tension'])}</p></div>
<table class="case-comparison"><caption class="visually-hidden">{esc(example['comparisonTitle'])}</caption><thead><tr><td></td>{columns}</tr></thead><tbody>{rows}</tbody></table>
<div class="case-comparison-mobile">{mobile}</div>
<p class="case-takeaway">{esc(example['takeaway'])}</p>
<details class="case-discussion"><summary>Example wording for the hiring discussion</summary><p class="discussion-purpose">Use these sample statements to describe each response to the hiring team: what happened, what it suggests about future work, and what remains uncertain.</p>{conditions}{discussion}</details>
</article>'''


def render_decision(interaction, example_id):
    controls = ''.join(f'<label><input type="radio" name="{esc(example_id)}-condition" value="{esc(option["id"])}" aria-controls="{esc(example_id)}-{esc(option["id"])}"{" checked" if i == 0 else ""}><span>{esc(option["label"])}</span></label>' for i, option in enumerate(interaction['options']))
    # Report wording belongs to its evidence branch, so it changes with the outcome.
    outcomes = ''.join(f'''<section class="decision-outcome" id="{esc(example_id)}-{esc(option['id'])}" data-decision-outcome="{esc(option['id'])}"><h4>{esc(option['title'])}</h4><p>{esc(option['evidence'])}</p><p class="decision-recommendation"><strong>{esc(option['recommendation'])}</strong></p><p>{esc(option['reason'])}</p><details class="case-discussion"><summary>How this could sound in the report</summary><blockquote>{esc(option['boundedConclusion'])}</blockquote><p><strong>A useful follow-up:</strong> {esc(option['followup'])}</p></details></section>''' for option in interaction['options'])
    return f'''<div class="decision-explorer" data-decision-explorer><fieldset data-decision-controls hidden><legend>{esc(interaction['question'])}</legend>{controls}</fieldset><div class="decision-outcomes" aria-live="polite" aria-atomic="true">{outcomes}</div></div>'''


def render_story_example(example):
    rows = ''.join('<tr><th scope="row">' + esc(row['label']) + '</th>' + ''.join(f'<td>{esc(v)}</td>' for v in row['values']) + '</tr>' for row in example['comparison'])
    columns = ''.join(f'<th scope="col">{esc(c)}</th>' for c in example['columns'])
    mobile = ''.join(f'<section><h4>{esc(column)}</h4>' + ''.join(f'<p><strong>{esc(row["label"])}</strong>{esc(row["values"][i])}</p>' for row in example['comparison']) + '</section>' for i, column in enumerate(example['columns']))
    scenario = ''.join(f'<p class="case-scenario">{esc(p)}</p>' for p in example['scenario'])
    return f'''<article class="engineering-case story-case" id="{esc(example['id'])}" aria-labelledby="{esc(example['id'])}-title">
<h3 class="case-title" id="{esc(example['id'])}-title">{esc(example['title'])}</h3>{scenario}
<div class="case-impression"><p class="case-label">The proposal</p><blockquote>{esc(example['impression'])}</blockquote></div><p class="story-question">{esc(example['tension'])}</p>
{render_decision(example['interaction'], example['id'])}
<aside class="case-takeaway"><h3>{esc(example['takeawayTitle'])}</h3><p>{esc(example['takeaway'])}</p></aside>
<details class="case-discussion"><summary>{esc(example['comparisonTitle'])}</summary><table class="case-comparison"><caption class="visually-hidden">{esc(example['comparisonTitle'])}</caption><thead><tr><td></td>{columns}</tr></thead><tbody>{rows}</tbody></table><div class="case-comparison-mobile">{mobile}</div></details>
</article>'''


def render_story_guide(tool):
    navigation = ''.join(f'<button type="button" id="tab-{esc(e["id"])}" data-example-tab="{esc(e["id"])}">{esc(e["name"])}</button>' for e in tool['examples'])
    introduction = ''.join(f'<p>{esc(p)}</p>' for p in tool['introduction'])
    examples = ''.join(render_story_example(e) for e in tool['examples'])
    flow = ' <span aria-hidden="true">→</span><span class="visually-hidden">then</span> '.join(esc(label) for label in tool['frameworkLabels'])
    related = ''.join(f'<li><a href="/toolbox/{esc(r["id"])}/">{esc(r["title"])}</a> — {esc(r["reason"])}</li>' for r in tool['related'])
    return f'''<nav class="engineering-breadcrumb" aria-label="Breadcrumb"><a href="/toolbox/">Toolbox</a> / <a href="/toolbox/engineering/">Engineering</a> / {esc(tool['sectionLabel'])}</nav>
<header class="engineering-intro"><p class="engineering-eyebrow">Engineering Toolbox / {esc(tool['sectionLabel'])}</p><h1>{esc(tool['title'])}</h1><p class="engineering-lead">{esc(tool['summary'])}</p></header>
<section class="story-opening" aria-labelledby="problem-title"><h2 id="problem-title">{esc(tool['problemTitle'])}</h2>{introduction}</section>
<section class="engineering-section example-explorer" id="examples" aria-labelledby="examples-title"><p class="engineering-eyebrow">01 / Follow a decision</p><h2 id="examples-title">{esc(tool['examplesTitle'])}</h2><div class="example-controls"><div class="case-selector" data-example-tabs data-examples-label="{esc(tool['examplesLabel'])}" hidden>{navigation}</div><p class="example-disclaimer">{esc(tool['examplesDisclaimer'])}</p></div><noscript><p>Both stories and their outcomes are shown below. With JavaScript enabled, select a story and change its condition.</p></noscript>{examples}<a class="discussion-link" href="#discussion">What connects these decisions? ↓</a></section>
<section class="engineering-section story-ending" id="discussion"><p class="engineering-eyebrow">02 / Take the idea with you</p><h2>{esc(tool['endingTitle'])}</h2><p>{esc(tool['ending'])}</p><p class="framework-flow">{flow}</p><div class="hiring-template"><h3>Wording to take with you</h3><blockquote>{esc(tool['discussionTemplate'])}</blockquote></div></section>
<section class="engineering-section related-lenses"><h2>Explore the reasoning behind this</h2><ul>{related}</ul><a href="/toolbox/engineering/">← Engineering Toolbox</a></section>'''


def render_card(tool, route):
    summary = tool.get('cardSummary', 'Explore two interview scenarios: what an answer supports, what it leaves open, and how that changes the hiring discussion.')
    return f'<a class="engineering-tool-card" href="{route}"><span class="engineering-eyebrow">{esc(tool["category"])}</span><h2>{esc(tool["title"])}</h2><p>{esc(summary)}</p><strong>Explore the examples →</strong></a>'


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
        if tool.get('storyFirst'):
            for example in tool['examples']:
                options = example['interaction']['options']
                if not options or len({o['id'] for o in options}) != len(options):
                    raise ValueError('Decision branches must have unique IDs')
                if any(not o.get('boundedConclusion') or not o.get('followup') for o in options):
                    raise ValueError('Each decision branch needs its own report wording and follow-up')
            destination = ROOT / route.strip('/') / 'index.html'
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(page(tool['title'], tool['summary'], route, render_story_guide(tool), interactive=True, decisions=True))
            cards.append(render_card(tool, route))
            continue
        examples = ''.join(render_example(e, i + 1) for i, e in enumerate(tool['examples']))
        navigation = ''.join(f'<button type="button" id="tab-{esc(e["id"])}" data-example-tab="{esc(e["id"])}">{esc(e["name"])}</button>' for e in tool['examples'])
        introduction = ''.join(f'<p>{esc(p)}</p>' for p in tool['introduction'])
        framework = ''.join(f'<div><dt>{esc(d["label"])}</dt><dd>{esc(d["question"])}</dd></div>' for d in tool['discussion'])
        lessons = ''.join(f'<div><h3>{esc(lesson["title"])}</h3> <p>{esc(lesson["text"])}</p></div>' for lesson in tool['lessons'])
        related = ''.join(f'<li><a href="/toolbox/{esc(r["id"])}/">{esc(r["title"])}</a> — {esc(r["reason"])}</li>' for r in tool['related'])
        body = f'''<nav class="engineering-breadcrumb" aria-label="Breadcrumb"><a href="/toolbox/">Toolbox</a> / <a href="/toolbox/engineering/">Engineering</a> / Hiring</nav>
<header class="engineering-intro"><p class="engineering-eyebrow">Engineering Toolbox / Hiring</p><h1>{esc(tool['title'])}</h1><p class="engineering-lead">{esc(tool['summary'])}</p></header>
<section class="engineering-problem" aria-labelledby="problem-title"><div><p class="engineering-eyebrow">01 / The problem</p><h2 id="problem-title">From observation to prediction</h2>{introduction}</div><div class="engineering-framework"><p class="engineering-eyebrow">02 / The distinction</p><p class="framework-flow">Evidence <span aria-hidden="true">→</span><span class="visually-hidden">then</span> Expectation <span aria-hidden="true">→</span><span class="visually-hidden">then</span> Uncertainty</p><dl class="framework-questions">{framework}</dl><p class="framework-boundary">An observation can support an expectation without proving it.</p></div></section>
<section class="engineering-section example-explorer" id="examples" aria-labelledby="examples-title"><p class="engineering-eyebrow">03 / Examples</p><h2 id="examples-title">Compare the evidence</h2><div class="example-controls"><div class="case-selector" data-example-tabs hidden>{navigation}</div><p class="example-disclaimer">Two illustrative scenarios.</p></div><noscript><p>Both examples are shown below. With JavaScript enabled, you can select one at a time.</p></noscript>{examples}<a class="discussion-link" href="#discussion">What this distinction helps us notice ↓</a></section>
<section class="engineering-section" id="discussion"><p class="engineering-eyebrow">04 / Discussion</p><h2>What this distinction helps us notice</h2><div class="discussion-lessons">{lessons}</div>
<div class="hiring-template"><h3>Wording to take with you</h3><blockquote>{esc(tool["discussionTemplate"])}</blockquote><p>If the capability wasn’t tested, name that gap directly:</p><blockquote>{esc(tool["insufficientEvidenceTemplate"])}</blockquote></div><p class="discussion-caution"><strong>Check the standard, too.</strong> If you call a gap “learnable” for one candidate and “disqualifying” for another, explain which requirement of the role justifies the difference.</p></section>
<section class="engineering-section related-lenses"><h2>Explore the reasoning behind this</h2><ul>{related}</ul><a href="/toolbox/engineering/">← Engineering Toolbox</a></section>'''
        destination = ROOT / route.strip('/') / 'index.html'
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(page(tool['title'], tool['summary'], route, body, interactive=True))
        cards.append(render_card(tool, route))
    body = '''<nav class="engineering-breadcrumb" aria-label="Breadcrumb"><a href="/toolbox/">Toolbox</a> / Engineering</nav><header class="engineering-intro"><p class="engineering-eyebrow">Engineering Toolbox</p><h1>Engineering judgment, made concrete.</h1><p class="engineering-lead">Work through situations where the details change what you would do. Each guide connects an engineering question to examples you can bring into your own decisions.</p></header>''' + ''.join(cards) + '<section class="engineering-section"><h2>Start with a situation</h2><p>Explore hiring and technical decisions: what an observation supports, what it leaves open, and how those limits change the next step.</p><p>For broader questions about evidence, uncertainty, and trade-offs, explore the <a href="/toolbox/#decision-tools">Decision Toolbox</a>.</p></section>'
    (ROOT / 'toolbox/engineering/index.html').write_text(page('Engineering Toolbox', 'Concrete examples for reasoning through engineering decisions.', '/toolbox/engineering/', body))
    sitemap = ROOT / 'sitemap.xml'
    source = re.sub(r'\s*<!-- engineering:start -->.*?<!-- engineering:end -->\s*', '\n', sitemap.read_text(), flags=re.S)
    routes = ['/toolbox/engineering/'] + [f'/toolbox/engineering/{t["id"]}/' for t in tools]
    entries = '\n'.join(f'<url><loc>{SITE_URL}{r}</loc></url>' for r in routes)
    sitemap.write_text(source.replace('</urlset>', f'<!-- engineering:start -->\n{entries}\n<!-- engineering:end -->\n</urlset>'))


if __name__ == '__main__':
    build()
