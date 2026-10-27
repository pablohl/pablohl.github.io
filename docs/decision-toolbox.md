# Decision Toolbox content standard

Current editorial guideline for general-audience decision tools. [Toolbox navigation](toolbox-navigation.md) owns destinations; [reading comfort](reading-comfort-navigation.md) owns shared presentation; the [documentation index](README.md) maps the other references.


## Purpose and audience

The Decision Toolbox offers reusable questions for unclear decisions. Readers should be able to recognize a situation and understand the reasoning without an engineering, machine-learning, or research background.

A tool's origin and its example serve different purposes. Sources preserve where the idea came from; examples demonstrate where it can help. A tool learned through technical work can use an everyday example. Engineering-specific scenarios belong primarily in the Engineering guides collection (see [engineering-toolbox.md](engineering-toolbox.md)).

Apply the [full reader journey](reader-journey.md) from the situation-based entry, collection card, related link, or direct URL. The invitation should help readers recognize when the canonical question is relevant; the opening and worked example should fulfill that promise. Reading and comparing reasoning are meaningful steps for a static tool. Do not add a required input, worksheet, or interaction merely to make the journey look actionable. Related tools and collection returns should provide predictable destinations.

## Complete entry

Each published tool should have:

- One stable ID and one canonical question, reused consistently across views.
- A short situation that helps readers recognize when the tool is relevant.
- An `expected_outcome` stating what the reader will be able to recognize, question, or do; together with `situation`, it renders the opening “Use this when / You’ll be able to” orientation.
- An observation explaining why the question can help.
- One worked example that demonstrates a change in reasoning or next action.
- Three to five concrete use cases where practical, without padding to meet a quota.
- A meaningful caveat explaining when the lens can mislead.
- Relevant problem and source IDs and a primary essay; supporting essays only where justified.
- Deliberately reviewed related-tool links, usually two or three where useful.
- Explicit status, featured, and random_enabled values.

Completeness means sufficient reasoning, not equal word counts. Lineage is optional. Multiple sources, supporting essays, and related links are not quotas. Do not invent them to make entries look uniform.

This is the editorial target for new and revised entries. Existing published entries may need backfilling; do not hide them or claim automated enforcement merely because they lack a worked example.

## Accessible worked examples

Start with a recognizable decision, such as choosing a commute, planning a trip, coordinating a meeting, giving feedback, or making a shared purchase. Ordinary work situations are welcome when they require no specialist knowledge.

Use these principles:

- The reader's effort should go into the decision, not understanding the setting.
- Avoid unexplained acronyms, implementation mechanisms, and technical vocabulary.
- A technical setting is acceptable only when the relevant choice is understandable without domain knowledge.
- Include enough concrete detail to reveal the distinction. Do not simplify until the answer becomes trivially obvious.
- Show what changes: the choice, the next investigation, the scope of a claim, or understanding of a trade-off.
- Keep conclusions conditional on the evidence. A lens need not produce a final answer.
- Label invented scenarios and numbers as illustrative. Do not imply an actual event or measured result.
- Use numbers only when they clarify the reasoning; check arithmetic and make assumptions explicit.
- Vary settings across the collection: everyday life, work, relationships, learning, and collaboration. Do not force every tool into the same domain or require every example to transfer outside its natural setting.

Aim for roughly 100–180 words when that is sufficient. Clarity and completeness take priority over this range.

## Existing data structure

Edit `data/toolbox.json`, not generated tool pages. See the [source map and commands](README.md#source-files-and-commands) for regeneration. The builder in `scripts/build_toolbox.py` already supports this object:

```json
"worked_example": {
  "title": "A short, concrete title",
  "situation": "The choice, relevant context, and uncertainty.",
  "tempting_conclusion": "A plausible initial interpretation or action.",
  "evidence": "The observation, comparison, or changed perspective that matters.",
  "conclusion": "What this supports, what remains uncertain, and a proportionate next step."
}
```

The rendered labels are Situation, The tempting conclusion, What changes the view, and What this supports. All five fields must be nonempty strings when a worked example is supplied. That structural check does not establish editorial quality.

Legacy `example` strings may remain until revised. When replacing one with `worked_example`, clear the legacy example to avoid competing or duplicate examples. Keep essays as the home for extended argument and additional cases.

## Reference example: What Did the Metric Throw Away?

**Situation:** You are choosing a commute that must get you to a childcare pickup by six. Two routes each average 30 minutes. One usually takes 25–35 minutes; the other takes 15 minutes on many days but occasionally takes an hour.

**The tempting conclusion:** The average travel time is the same, so either route is equally suitable.

**What changes the view:** The average hides variability. Arriving late has a consequence that arriving equally early does not cancel out. Check how often each route would miss the pickup for your departure time.

**What this supports:** Favor the route with fewer late arrivals if timely pickup is the priority. On a day with no fixed arrival time, the same variability may matter less. The useful extra information is the distribution around the deadline, not every possible travel statistic.

This scenario is illustrative. Its purpose is to demonstrate how a correct average can omit a distinction that changes the decision.

## Relationships and scope

Choose related tools because their questions help readers distinguish or combine lenses. Complements and contrasts should normally appear in both directions; extends is directional. Use contrasts only for a meaningful tension, not merely because tools address different stages.

Add a new tool only when its question can guide a distinct decision or investigation. Otherwise add the essay as supporting material to an existing tool. Do not expand categories or create tools simply to balance counts.

## Reasoning completeness and stopping criteria

Before drafting or revising an entry, identify the intended effect: what should a reader be able to recognize, understand, question, or do differently after using this lens?

Evaluate completeness against that effect, not the number of populated fields or the length of the entry.

- **Essential reasoning:** The example must make the connection between the initial interpretation, the relevant observation, and the resulting change understandable. Do not require the reader to infer the central step.
- **Meaningful omissions:** Omit details that do not affect the intended reasoning. Make assumptions, constraints, or uncertainties visible when their absence could change the conclusion.
- **Distinct contribution:** The worked example should demonstrate what this tool reveals that a neighboring tool would not reveal as clearly.
- **Proportionate conclusion:** Show what the evidence supports without requiring certainty or forcing a final decision.
- **Stopping rule:** An entry is editorially ready when its intended reasoning effect is clear, its essential connections are present, and no consequential omission or unnecessary addition undermines that effect.

Additional detail is justified when it addresses a specific gap, not simply because the entry could be longer or more comprehensive.

Editorial review establishes a reasoned publication judgment, not proof of reader understanding. Use reader testing when the distinction is particularly subtle or when accessibility remains uncertain.

## Review before publishing or revising

1. Can a reader without technical training understand the choice?
2. Does the example demonstrate this tool specifically, rather than a neighboring tool?
3. Is the initial conclusion plausible rather than a straw man?
4. Does the new evidence or perspective actually change the reasoning?
5. Does the conclusion stay within what the example establishes?
6. Does the caveat identify a real limit without undermining the whole tool?
7. Are question wording, IDs, post relationships, and related-tool links consistent?
8. Is the worked example complete, with no duplicate legacy example?

For a broader review, use [multi-perspective-review.md](multi-perspective-review.md). State whether accessibility was assessed editorially or tested with readers. Rebuild and inspect affected pages when content changes; documentation-only edits do not require regenerating the site.
