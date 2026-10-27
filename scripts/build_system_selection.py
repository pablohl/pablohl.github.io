"""Render one local observation interpreted in three dependency contexts."""
from build_toolbox import esc, reader_orientation


def render(tool):
    contexts = tool['contexts']
    if len(contexts) != 3 or len({c['id'] for c in contexts}) != 3:
        raise ValueError('Provide three distinct contexts')
    fields = ('id', 'title', 'known', 'lanes', 'interpretation', 'assumption', 'recommendation')
    if any(not c.get(key) for c in contexts for key in fields):
        raise ValueError('Each context needs evidence, interpretation, assumption, and recommendation')
    panels = []
    for c in contexts:
        lanes = ''.join(f'''<div class="dependency-lane"><h4>{esc(lane['label'])}</h4><ol>{''.join(f'<li><strong>{esc(step)}</strong></li>' for step in lane['steps'])}</ol></div>''' for lane in c['lanes'])
        alternatives = '<ul>' + ''.join(f'<li>{esc(item)}</li>' for item in c['alternatives']) + '</ul>' if c.get('alternatives') else ''
        diagram = f'<figure class="dependency-diagram" aria-label="{esc(c["title"])}: update sequence">{lanes}</figure>' if not c.get('alternatives') else '<p><strong>What is unknown:</strong> Do the other systems read the address before or after the queued change is saved?</p>'
        followup = f'<p><strong>The next question:</strong> {esc(c["followup"])}</p>' if c.get('followup') else ''
        panels.append(f'''<section class="architecture-context" aria-labelledby="{esc(c['id'])}">
<h3 id="{esc(c['id'])}">{esc(c['title'])}</h3>
<p>{esc(c['known'])}</p>
{diagram}
<p>{esc(c['interpretation'])}</p>{alternatives}
<p><strong>This depends on:</strong> {esc(c['assumption'])}</p>
<p class="recommendation-label">A possible recommendation</p>
<blockquote>{esc(c['recommendation'])}</blockquote>{followup}
</section>''')
    return f'''<nav class="engineering-breadcrumb" aria-label="Breadcrumb"><a href="/toolbox/">Toolbox</a> / <a href="/toolbox/engineering/">Engineering guides</a> / Architectural consequences</nav>
<header class="engineering-intro"><p class="engineering-eyebrow">Engineering guides / Architectural consequences</p><h1>{esc(tool['title'])}</h1>{reader_orientation(tool['use_when'], tool['expected_outcome'])}</header>
<section class="engineering-framework story-distinction"><p class="engineering-eyebrow">The distinction</p><h2>A component can work well while changing what the rest of the system must do.</h2><p>The test tells us how the component behaved. What depends on that behavior determines how far we can carry the result.</p><p class="framework-flow">Observed benefit → Dependencies and assumptions → Recommendation</p></section>
<section class="engineering-section" aria-labelledby="setup-title"><p class="engineering-eyebrow">01 / A promising change</p><h2 id="setup-title">“Did the change save, or should I try again?”</h2>
<p>A support agent edits a customer’s account. On busy days, the screen waits, then reports that the request took too long. The agent opens the account again to find out whether the change was saved.</p>
<p>The engineering team tries a different approach: the screen immediately says <strong>“Update received”</strong> and shows the change as pending while it saves in the background.</p>
<p>In a test with many updates arriving together, every update is eventually saved correctly. The screen responds promptly instead of leaving the agent wondering whether the request went through.</p>
<div class="case-impression"><blockquote>“Should we use this approach for account updates?”</blockquote></div>
<p>Before answering, someone asks: <strong>“What are we updating—and what needs that update next?”</strong></p>
</section>
<section class="engineering-section" aria-labelledby="contexts-title"><p class="engineering-eyebrow">02 / Same result, different consequences</p><h2 id="contexts-title">What needs the new value next?</h2>
<p>Keep the proposed change and the test result the same. Consider three contexts: two where the use is known, and one where it is only partly understood.</p>
{''.join(panels)}
</section>
<section class="engineering-section story-ending"><p class="engineering-eyebrow">03 / Take the idea with you</p><h2>What becomes someone else’s job?</h2>
<p>The component passed the same test in all three contexts. What changed was the meaning of its response to the rest of the system. The field’s name is a clue; how people and systems use it determines the consequence.</p>
<p>A local improvement can move work elsewhere: waiting for completion, recognizing failure, correcting an action, or investigating an uncertain outcome. Whether that is worthwhile depends on who takes on that work and what happens if they get it wrong.</p>
<div class="hiring-template"><blockquote>“This works better here. What must be true elsewhere for it to be a better change?”</blockquote></div>
<p class="example-disclaimer">About this example: the story and test results are fictional, written to explore the reasoning behind an architectural choice.</p>
</section>
<section class="engineering-section related-lenses"><h2>Explore the reasoning behind this</h2><ul><li><a href="/toolbox/engineering/results-to-decisions/">What Does This Result Let Us Decide?</a> — Connect evidence and requirements to a recommendation.</li><li><a href="/toolbox/what-did-the-metric-throw-away/">What Did the Metric Throw Away?</a> — Ask which omitted distinction could change the choice.</li></ul><a href="/toolbox/engineering/">← Engineering guides</a></section>'''
