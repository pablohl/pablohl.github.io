# Engineering collection previews · local review

Reviewed October 31, 2026 on `codex/engineering-guide-previews`, based on `170d05c`. This describes uncommitted local work, not a published release or proof of reader comprehension.

Revision note, November 1, 2026: the reviewed design was subsequently committed as `4476803` and proposed in PR #76. The account below preserves the original local-review scope; it does not establish publication status. The feedback mapping was added afterward to explain the design choices, without claiming new browser or reader testing.

Scope: items 1–4 of the supplied collection review—distinct previews, situation-led invitations, a compact editorial introduction, and format-specific actions. Item 5 (additional relationships or a conceptual sequence) is deferred. Existing guide contents and routes are unchanged.

## Design feedback and how it was used

The owner supplied an editorial review of the collection and asked to implement its first four recommendations. The supplied review explicitly said it had inspected structure and content, not a rendered screenshot. Its comments were design hypotheses, not measured visual defects or reader-study findings. It described the collection as an article directory and proposed making its distinct investigations apparent before opening a guide.

| Feedback | Interpretation | Design response | Qualification |
| --- | --- | --- | --- |
| Give each guide a distinctive visual identity using concepts from its actual examples. | Titles and similar cards were doing most of the differentiation. The previews should expose different reasoning, rather than add decorative illustrations. | Three native HTML/CSS compositions: observation/support/unknown; two alert counts and a missing-evidence question; received/saved/next-use dependency. Subdued topic tints distinguish them within a common frame. | Topic colors are identity accents, not ratings. These are illustrative linked previews, not new controls or observed results. |
| Replace repetitive article-style descriptions with a real situation, central question, and specific action. | The collection needs a quick invitation; repeating the full detail-page orientation makes its hierarchy harder to scan. | Lead with a situation-based question, follow with one context paragraph, retain the formal title as a secondary label, and finish with the format and action. | “They spotted the problem. Can they handle it?” became “They spotted the risk. What does that tell you?” to avoid promising a capability verdict. |
| Make the introduction an editorial statement while keeping it compact. | The collection title identifies a section but does not express what connects its contents. | Keep Engineering guides as a small section label; use “What does the evidence actually justify?” as the serif headline, followed by one supporting paragraph. | No large landing-page structure was copied from CTO Explorer. The first guide should remain close to the introduction. |
| Show what readers will do before they open each guide. | A repeated “Explore the examples” action hides meaningful format differences. | Use “Compare interview responses,” “Change one condition,” and “Trace the dependency,” with a separate format description on each card. Keep one whole-card link and a visible underlined invitation. | The architectural guide is static, so it is labeled “Three static contexts to compare.” No simulation or controls were added to satisfy the review's general description of interactive investigations. |

Two further wording corrections preserve the visual claims: “alerts dropped from 18 to 4” became “18 alerts could become 4,” since the proposed rule was applied to the same past activity; “the update succeeds” became “the update is received,” since receipt and completed saving are the distinction under examination. The diagram poses read ordering as a question rather than presenting an unknown sequence as fact.

The owner responded “looks good” to the local preview and asked for a commit, push, and single PR. That establishes acceptance of this design direction for the revision; it is not evidence that unfamiliar readers understood the guides. Later, the owner asked for this design rationale to be decomposed into reusable guidance. Those notes now live in [Collection design intention](../engineering-toolbox.md#collection-design-intention), separate from this record of the specific feedback.

The broader aesthetic references in the supplied review were interpreted as restraint, meaningful composition, and an encounter with something worth examining. No museum or portfolio style was copied as a visual template. Additional collection relationships, new end-of-guide links, filters, search, animation, and decorative artwork were outside the implemented scope.

## Editorial perspectives

These are separate perspectives considered by one reviewer, not independent reviewers or user studies.

| Perspective | Success criterion and assessment |
| --- | --- |
| Senior engineering practitioner | A card should identify a recognizable judgment without promising a hiring verdict or deployment decision. The hiring question stays bounded; alert counts use “could become” because the proposed rule was replayed against the same week's activity. |
| Less experienced technical reader | The situation and action should explain what happens after opening. Formal titles remain secondary for continuity. Selectable scenarios, changeable conditions, and static contexts are named explicitly. Whether unfamiliar readers understand these distinctions is not checked. |
| Subject expert | Preview facts should agree with the guide and preserve uncertainty. “Received” is not shown as equivalent to “saved”; the invoice ordering is posed as a question. Previews are illustrative compositions, not live simulations or new observed results. |
| Information designer | The previews should differ meaningfully while retaining shared typography and restrained colors. Three compositions use observation/support/unknown, counts under two rules, and a dependency question. Whole-card links have descriptive names, format descriptions, and visible keyboard focus. |

Convergence: an invitation should describe the actual reading or interaction. Tension: the supplied review calls the collection interactive, but one guide is static. Resolution: describe each format honestly rather than add controls. Also avoid “alerts dropped,” which could suggest a deployed result. No new controls, animation, filters, or illustrations were added.

## Verification

- **Pass:** nine existing Python checks; rebuild and whitespace checks. Only the collection HTML changes among generated guide pages.
- **Pass:** direct collection arrival, all three card destinations, and breadcrumb return paths inspected in the browser.
- **Pass:** hiring System design selection; alert condition change shows the missed incident and revised next step, and the condition can be reversed. These are scoped destination checks, not a revalidation of every guide branch.
- **Pass:** architectural destination shows three contexts and no main-content inputs/buttons, matching the static invitation.
- **Pass:** collection reflow at 1280px, 375px, and 320px, without horizontal overflow. At phone sizes the preview sits above the invitation; at desktop sizes it sits alongside it. Preview labels were visually inspected and keyboard focus has a visible outline.
- **Not checked:** browser zoom, screen-reader journey, unfamiliar-reader understanding, or every later state of unchanged guides. Narrow viewport inspection is not a browser zoom test.

Source ownership and current behavior are described in [Engineering guides](../engineering-toolbox.md).
