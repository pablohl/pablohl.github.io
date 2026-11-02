# Toolbox navigation

Current reference for collection roles and destinations. See [reading comfort and shared navigation](reading-comfort-navigation.md) for visual framing, global current-state behavior, skip links, and the mobile menu. Prior implementation notes and verification are [historical](history/toolbox-navigation-2026-10-27.md).

## Routes and roles

| Location | Purpose and destination |
| --- | --- |
| Homepage Explore a decision path | Opens `/#explore-decision`, where one shared list offers engineering guides, an experiment, and a Toolbox question; [Homepage design](homepage-design.md) owns the presentation |
| Homepage Engineering guides invitation | “Browse engineering guides” opens `/toolbox/engineering/`, allowing readers to choose a situation rather than prioritizing one example |
| Homepage Borrow a question path and browse-all tool link | Open `/toolbox/#decision-tools`, directly at the situation-based tool entries |
| Homepage featured Toolbox question | Opens `/toolbox/preserve-the-option/`; its canonical question makes the destination explicit |
| Primary navigation: Toolbox | Opens `/toolbox/`, the shared entry point for both collections |
| Toolbox entry | Leads with “Find a useful question for the decision you’re facing” and situation recommendations; compact links retain access to the full catalogue and Engineering guides |
| Decision tools | Reusable questions for decisions at work or elsewhere, with situation-based starting points, filters, and the complete published catalogue |
| Engineering guides | Worked engineering situations at `/toolbox/engineering/`; guides connect to relevant underlying decision tools |

Both collections belong to Toolbox. Their distinction is the reading task and format; it is not a claim that engineering decisions are separate from other decisions. Current content includes 21 published decision tools and three engineering guides; derive counts from the source data when they change.

## Situation-led entry design

The opening prioritizes recognizable decisions over collection explanations. It uses a short Toolbox label, one headline, a brief orientation, and inline links to all questions and Engineering guides. The two large introductory cards and repeated Decision tools introduction are removed. Existing `#decision-tools`, `#starting-points`, and `#all-tools` fragments remain stable.

The first four situations appear immediately in source order. Each has a serif situation heading, a recommended tool link, and one short explanation. A native **Another angle** disclosure holds the alternative tool and its explanation; its accessible name includes the situation. **More situations** reveals the remaining entries, with a count derived from the data. Native disclosures work without JavaScript and can be opened and closed with the keyboard. The full catalogue follows, with its presentation described below.

This responds to owner-supplied review items 1 and 2: reach the practical entry sooner and reduce repeated explanatory formatting. Keep the palette, fonts, canonical questions, and recommendation relationships unchanged. Shared typography provides continuity; fewer visible layers and optional alternative detail improve scanning without shrinking body text. Avoid adding a card, badge, or repeated label to every recommendation. The current six situations and their primary/alternative descriptions are owned by `data/toolbox-starting-points.json`; the builder controls the initial four and disclosure structure.

## Catalogue and collection relationship

The opening explains Decision tools as **A question to use** and Engineering guides as **Reasoning in practice**. Short descriptions distinguish portable questions from worked situations; these are typographic links, not large panels. Situations remain the primary entry, and Engineering guides still opens its collection rather than a preferred example.

Each catalogue card retains its canonical question as the largest text. A short **Use when** line comes from `catalogue_context` in the tool data (falling back to its existing situation). Tool names, tags, and source names remain secondary. The entire card is one link with a visible hover/keyboard focus treatment; avoid adding nested controls or increasing its size with long descriptions.

Categories remain the primary filter. A native **More filters** disclosure contains source type; valid `?source=` links open it on arrival. A collapsed disclosure still names any active source filter. **Clear filters** appears only when a category or source is active, and resets both. The random picker is labeled **Show me a random question**, with **Show another question** inside the reveal, to distinguish it from submitting a tool idea. Existing query parameters, result counts, empty state, and tool destinations are preserved.

These implement the remaining owner-supplied review items 3–5. Keep filter state observable when hiding secondary controls; retain the card’s question hierarchy and concise context rather than treating tags or source lineage as the primary invitation.

## Local movement

The Toolbox entry and Engineering guides index share **Toolbox / Decision tools / Engineering guides** navigation. On the Toolbox page, the `#decision-tools` hash marks Decision tools as the current local destination; without that hash, Toolbox is current.

Individual decision tools use **Toolbox / Decision tools / current title** breadcrumbs. Individual engineering guides use **Toolbox / Engineering guides / current title** breadcrumbs, with a collection return link at the end. The current title is text rather than another link to the same page. Existing tool routes and `#decision-tools` remain stable.

## Sources

The homepage is maintained in [index.html](../index.html). Collection and detail markup is generated by [build_toolbox.py](../scripts/build_toolbox.py), [build_engineering_toolbox.py](../scripts/build_engineering_toolbox.py), and [build_system_selection.py](../scripts/build_system_selection.py). [editorial-nav.js](../js/editorial-nav.js) updates current local navigation on hash changes. Use the [source map and commands](README.md#source-files-and-commands) when rebuilding.

Link existence verifies a destination, not whether a reader can predict it. Apply the [full reader journey](reader-journey.md) to the invitation, arrival, direct-link context, and return path. Inspect both ends of changed links and identify untested wayfinding assumptions explicitly. This document owns the current destinations; the journey guideline owns the criteria for assessing those transitions.
