# Engineering collection previews · local review

Reviewed October 31, 2026 on `codex/engineering-guide-previews`, based on `170d05c`. This describes uncommitted local work, not a published release or proof of reader comprehension.

Scope: items 1–4 of the supplied collection review—distinct previews, situation-led invitations, a compact editorial introduction, and format-specific actions. Item 5 (additional relationships or a conceptual sequence) is deferred. Existing guide contents and routes are unchanged.

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
