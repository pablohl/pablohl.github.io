---
title: "When Is an Experiment Actually Done?"
date: 2026-09-17
draft: true
description: "Why applied R&D experiments must connect evidence to product decisions."
tags:
  - applied research
  - decision-making
  - communication
---

# When Is an Experiment Actually Done?

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

The experiment **isn't really finished until someone can understand what the result means for the product**.

That also means asking a question that is less common in pure research:

Who needs to make what decision from this work?

The same experiment may need very different emphasis for a researcher reviewing the methodology, an engineer deciding whether to implement a change, or someone deciding whether the change is ready for production.

The evidence doesn't change. What the reader needs from it does.

## The result is not the decision

Suppose an experiment says:

> Model A achieved 84% accuracy and costs 90% less than Model B.

That is both a useful experimental result and an incomplete product result.

As a research result, there may already be something interesting here. We tested a hypothesis, established a comparison, and perhaps learned that a much smaller or cheaper model can preserve a surprising amount of performance.

But if I have to decide whether Model A should replace Model B in a product, I immediately have more questions:

- What makes up the remaining 16%?
- Does the cheaper model save compute cost at the expense of something else?
- What assumptions are inside the 84%?
- Are the failures random, or concentrated in cases that matter to the product?

The research result can be valid while the product question remains unanswered.

## Communication is part of applied R&D

This is why I’ve started thinking differently about technical reports.

I used to think of communication as something downstream of the technical work:

\[
\text{do the work}
\rightarrow
\text{understand the result}
\rightarrow
\text{communicate it}
\]

I think that model is incomplete for applied R&D.

Trying to communicate a result forces another analytical step.

- Can I explain what the evidence actually establishes?

- Can I connect the result to the product question?

- Can I distinguish what I know from what I am assuming?

- Can I explain why the recommendation follows from the evidence?

If I cannot do those things clearly, the problem may not be the writing. **The analysis may not be finished.**

This is also why synthesis matters.

One simple structure I’ve found useful is:

\[
\text{claim}
\rightarrow
\text{evidence}
\rightarrow
\text{consequence}
\]

The claim says what we observed. The evidence shows why we believe it. The consequence is what turns the result into analysis: why does this matter, and what changes because of it?

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

- Maybe the evidence doesn't actually support the claim.

- Maybe the experiment answered a narrower question than the one the product needs answered.

- Maybe there is simply not enough evidence to make the decision yet.

Writing the report can expose all of those things.

This doesn't mean removing the details. Quite the opposite: the methodology, assumptions, failure modes and evidence still matter.

The difference is that the report has to make the relationship between them explicit.

For applied R&D, the report is therefore not just a record of the experiment. **It is part of the analytical process that closes the experiment.**

It should make five things explicit:

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
