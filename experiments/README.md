# Designing Interactive Experiments

Experiments on this site are small interactive models for exploring an idea by changing something and seeing what happens. The default is an **explorable explanation**: let a reader experience a question, make a choice, notice a consequence, and revise their understanding. Some experiments connect to an essay; others can stand on their own.

The aim is not to make every explanation interactive. Use an experiment when the interaction can reveal a relationship or challenge an assumption more effectively than a paragraph or static figure.

## Choose the right format

| Format | Use it when | Design priority |
| --- | --- | --- |
| Interactive illustration | One manipulation clarifies an existing explanation. | Make the relationship immediately visible. |
| Explorable explanation | A sequence of discoveries helps the reader understand an idea. | Guide the reader through a developing question without removing room to explore. |
| Interactive laboratory | The reader needs to investigate a model independently. | Make controls, assumptions, and repeatability explicit. |

An experiment can contain elements of all three. Choose its primary purpose before adding controls. More settings are useful in a laboratory, but can distract from a focused explorable explanation.

## Design the learning path

1. **Name one central discovery.** State what the reader should notice in one sentence. Then identify the assumption they are likely to make before interacting and what might change their mind.
2. **Open with a question and one obvious action.** Put the model in view early. Introduce rules and additional controls when the reader needs them, rather than requiring a tutorial before the first action.
3. **Make cause and effect visible.** Update the result as the reader acts. Use consistent visual identities and show *what changed*, not only the new total. Place a short explanation beside the result it explains.
4. **Change one important assumption at a time.** Carry forward the reader's earlier choice when possible. Holding other conditions fixed makes a surprising result easier to interpret.
5. **Invite a prediction when the discrepancy matters.** Let the reader commit to an expectation, reveal what happened, and compare expected with actual outcomes directly. The point is to understand the discrepancy, not to score the prediction.
6. **End with a transferable question or insight.** Explain what the concrete result suggests beyond the model. Keep this conclusion close to the final result so it is not lost below a long visualization. Link to related writing when it genuinely develops the same idea.

The sequence should feel like one developing problem: *I tried something; I saw a result; now a changed condition challenges what I thought I knew.* It need not be a rigid tutorial. Readers should be able to try alternatives and recover from them.

## Keep the model and interface honest

The central question, interactive model, current task, and immediate result should receive the most visual attention. Explanations come next; settings and methodology are secondary. A direct manipulation can be primary while a slider or other keyboard-operable control provides an accessible alternative.

State the simplified rules and source of an adapted model. Distinguish what the model demonstrates from what it cannot establish about the real world. Visual effects should reflect actual model changes rather than imply a mechanism the model does not contain. Keep the explanation of those limits near the relevant result or in a clearly accessible methods note.

## Sketch the next experiment

Before building, write a short design brief that answers these questions:

- What question brings the reader in, and what is the first action they can take?
- What changes immediately, and how will they see *why* it changed?
- Which assumption will the next step challenge? What stays fixed for that comparison?
- Would a prediction make the reveal more instructive? What will be compared afterward?
- What idea should the reader carry elsewhere, and does an essay genuinely extend it?
- Which model rules, simplifications, and sources must be made clear?

If the brief cannot identify a consequential reader action, a static illustration or essay may be the better form.

## Review checklist

### Concept and story

- [ ] Can I state the central discovery in one sentence?
- [ ] Does the first screen pose a question and offer an obvious action without requiring a tutorial?
- [ ] Does each new step change or deepen the reader's understanding, rather than merely expose another mode?
- [ ] When conditions change, is it clear what stayed fixed and what changed?
- [ ] If the reader makes a prediction, are expectation, outcome, and explanation easy to compare?
- [ ] Does the ending help the reader apply the idea elsewhere? Is a writing link relevant rather than forced?

### Interaction and presentation

- [ ] Does every control serve the learning objective? Are secondary controls visually secondary?
- [ ] Do results update promptly, and can the reader see which parts of the model changed?
- [ ] Is the important result more prominent than the settings used to produce it?
- [ ] Can a reader go back, reset, or try another choice without losing the thread?
- [ ] Can the primary interaction be completed with a keyboard or an equivalent accessible control, and does it work on a narrow screen?

### Model and verification

- [ ] Are the rules, deliberate simplifications, and source or inspiration stated accurately?
- [ ] Do the visual states and written explanations agree with the model's computed results?
- [ ] Have the model's edge cases and the complete reader journey been tested?
- [ ] Have one or more people unfamiliar with the experiment tried it without coaching? Where did they hesitate or misunderstand the result?

## Example: Ice Cream Vendors

[Ice Cream Vendors](ice-cream-vendors/index.html) starts with a placement question. The reader moves their stand and sees customer choices change. A second vendor then moves while the reader's stand stays fixed. Next, the stands remain fixed while customers gather in a different pattern. Finally, the reader chooses for another day, predicts the effect of the other vendors' choices, and compares a stay-put estimate with the actual result.

The transferable idea is that a reasonable choice based on current information can lead to a different outcome when other people make choices too. The experiment then connects that observation to [Which Game Are We Playing?](../posts/which-game-are-we-playing/index.html), which asks what we assume other people are trying to achieve. The model's known, shared objective makes that question a useful boundary between the experiment and the essay.
