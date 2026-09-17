---
title: "When Is an Experiment Actually Done in Applied Research?"
date: 2026-09-17
draft: true
description: "Why synthesis is part of determining whether an applied research experiment is complete."
tags:
  - applied research
  - decision-making
  - communication
---

# When Is an Experiment Actually Done in Applied Research?

After spending some years doing pure research and, more recently, doing more applied research, I’ve noticed an important difference in how results need to be communicated.

In research, a report can reasonably end with:

> Here is the question, the methodology, the result, and what we learned.

In applied product work, I think there is another step:

\[
\text{question}
\rightarrow
\text{experiment}
\rightarrow
\text{result}
\rightarrow
\text{interpretation}
\rightarrow
\boxed{\text{decision}}
\]

The experiment isn't really finished until it is possible to construct a defensible path from the experimental evidence to a product decision, even if the decision is that we don't know enough yet.

That also means asking a question that becomes especially important in applied research:

**Who needs to make what decision from this work?**

The same experiment may need very different emphasis for a researcher reviewing the methodology, an engineer deciding whether to implement a change, or someone deciding whether the change is ready for production.

The evidence doesn't change. What the reader needs from it does.

## The result is not the decision

Suppose an experiment says:

> Model A achieved 84% accuracy and costs 90% less than Model B.

That is both a useful experimental result and an incomplete product result.

As a research result, there may already be something interesting here. We tested a hypothesis, established a comparison, and perhaps learned that a cheaper model can preserve a surprising amount of performance.

But if I have to decide whether Model A should replace Model B in a product, I immediately have more questions:

- What makes up the remaining 16%?
- Does the cheaper model save compute cost at the expense of something else?
- What assumptions are inside the 84%?
- Are the failures random, or concentrated in cases that matter to the product?

The research result can be valid while the product question remains unanswered.

And this is where the distinction becomes interesting. The missing product answer is not necessarily a communication problem. It may mean the experiment hasn't produced enough evidence to support a decision yet.

## Communication is part of applied R&D

This is why I’ve started thinking differently about technical reports.

I used to think of communication as downstream of the technical work:

\[
\text{experiment}
\rightarrow
\text{analysis}
\rightarrow
\boxed{\text{done}}
\rightarrow
\text{communication}
\]

Under that model, if the report is difficult to write or the conclusion is difficult to explain, that is a communication problem. The technical work is done; it just needs to be presented better.

I don't think that's always true. Trying to synthesize an experiment into a product decision is itself a useful test:

Can we construct a defensible path from the experimental evidence to the decision?

Sometimes it is not possible. And sometimes the problem isn't the writing. Something is missing from the experiment itself: maybe the baseline doesn't support the comparison, an aggregate metric hides the failure mode that matters, an assumption was never tested, or the experiment answered a narrower question than the product needs answered.

In those cases:

\[
\text{difficulty synthesizing}
\rightarrow
\text{missing reasoning or evidence}
\]

The communication problem has exposed an unfinished analysis.

This is also why synthesis matters.

One simple structure I’ve found useful is:

\[
\text{claim}
\rightarrow
\text{evidence}
\rightarrow
\text{consequence}
\]

The claim states what we think the result establishes. The evidence shows why we believe it. The consequence turns that result into analysis: why does this matter, and what changes because of it?

A good report shouldn't make the reader connect seemingly unrelated pieces of information to discover that consequence.

If the baseline is in one section, the metric in another, an important failure mode five pages later, and the recommendation at the end, all the information may technically be there.

But the reader has to reconstruct:

\[
\text{claim}
\rightarrow
\text{evidence}
\rightarrow
\text{implication}
\rightarrow
\text{decision}
\]

That reconstruction shouldn't be their job.

And importantly, making that chain explicit is not just an exercise in presentation. **Constructing the chain is a way of testing the reasoning.**

This doesn't mean removing the details. Quite the opposite: the methodology, assumptions, failure modes and evidence still matter.

The difference is that the report has to make the relationship between them explicit.

For applied R&D, the report is not just a record of the experiment. Synthesis is one of the tests of whether the experiment is actually complete.

If I can connect the evidence to a decision, good. If I can't, we need to know why. The answer may be more analysis, another experiment, a narrower claim, or simply an explicit conclusion that the evidence isn't sufficient yet.

A good report should make five things explicit:

- What did we learn?
- What does the evidence actually support?
- What does it not establish?
- What remains uncertain?
- What should we do differently because of it?

And sometimes the last answer is legitimately:

> Nothing yet. We don't know enough.

That's fine.

Explicit uncertainty is still a useful result.

In fact, a useful applied research report might conclude:

> The experiment demonstrates that Model A can reduce cost substantially. It does not yet establish that Model A is suitable as the production default because we have not characterized the remaining failures.

That is a perfectly good outcome.

What isn't useful is having all the information somewhere in the report while leaving the reader to figure out whether a decision can actually be made.

Research communication helps someone understand the result.

Applied R&D communication has an additional job:

**make the result usable.**
