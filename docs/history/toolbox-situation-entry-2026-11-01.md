# Situation-led Toolbox entry · local review

November 1, 2026, on `codex/toolbox-situation-entry`, following homepage revision `d9bb4ee`. Implements items 1 and 2 of the owner-supplied Toolbox review. Current presentation is owned by [Toolbox navigation](../toolbox-navigation.md#situation-led-entry-design).

The feedback identified too many introductory layers and repeated recommendation formatting. The opening now leads directly into situations, with compact catalogue and engineering links. Four situations appear initially; native disclosures expose alternatives and the remaining two situations. Catalogue cards, filters, canonical questions, and recommendation relationships are unchanged. Review items 3–5 were outside this scope.

One editorial reviewer considered practitioner, less-experienced-reader, and information-design needs: retain meaningful distinctions between the primary and alternative recommendations, reduce the initial reading burden, and preserve predictable collection access. Hiding alternatives creates an extra step; retaining their full explanation behind a named disclosure balances scanning and context. These are design judgments, not independent reader observations.

Observed checks:

- **Pass:** built all 21 tool pages; shell applicator reported no shell changes. An unrelated generated indentation change in one essay was excluded.
- **Pass:** all 9 existing Python tests and whitespace checks. Structural inspection found all 12 recommendation links, 21 catalogue cards, unique IDs, and preserved local fragments.
- **Pass:** desktop rendering and 320px reflow without horizontal overflow. Four situation rows initially; More situations exposes all six and closes again on narrow screens.
- **Pass:** Enter opens and closes an alternative disclosure; More situations works by pointer and Enter. Native disclosure state is used without additional JavaScript.
- **Pass:** catalogue shortcut reaches `#all-tools`; Decision tools reaches `#decision-tools`; engineering link opens its collection; the first recommendation opens The Shape of the Evidence. Browser Back returns to the revised Toolbox.
- **Not checked:** unfamiliar-reader comprehension, enlarged-text/zoom behavior, a full screen-reader journey, and every unchanged catalogue filter combination.

Changes are local for owner review; no publication is implied.

## Follow-up: review items 3–5

The owner then requested the remaining items. All 21 tools now have concise `catalogue_context` copy for their card invitation, while canonical questions remain unchanged. The whole-card link is preserved; smaller tool names, a short context line, and focus styling clarify its hierarchy. Two small typographic collection descriptions distinguish a portable question from reasoning in a worked situation. These extend the earlier scope; the initial review record above describes the previous revision.

Source filtering moves into a native More filters disclosure. An active source remains named when it is closed, and valid source query links open it automatically. Clear filters is hidden until either filter is active. Random-question labels now describe the actual action. The existing result count and empty state remain.

Observed browser checks: category Evidence produced eight results; combined with Sport it produced zero and displayed the empty state. Closing More filters still showed “Source: Sport.” Clear restored 21 results and hid itself. Direct `?source=sport#all-tools` arrival opened the source controls and showed one result. The random picker revealed a question, changed it, and closed again. Desktop card typography measured 14px names, 20.8px questions, and 16px context; 320px reflow had no horizontal overflow. Existing nine Python tests, JavaScript syntax, and whitespace checks passed. No new unfamiliar-reader, zoom, or screen-reader review was performed.
