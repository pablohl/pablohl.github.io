# From Playing with AI to Building with It

New essay added for local review on November 4, 2026. The supplied prose is preserved, with its four section headings. Uses the shared essay layout, navigation, response controls, and typography; `style.css` styles the conversation timeline and the optional session summary and its file table.

The page is directly maintained in `index.html`. Writing, both RSS feeds, and the sitemap include the new route, ready for publication after review. Related reading is owned by `data/related-reading.json` and rendered with `scripts/build_related_reading.py`.

Reading estimate: 1516 words in the essay, prompts, image caption, and timeline, rounded up at 200 words per minute to 8 minutes. The optional agent summary is additional. This is a reading estimate, not an observed completion time.

Preview: http://127.0.0.1:8891/posts/from-playing-with-ai-to-building-with-it/

## Local verification

Confirmed supplied body text is preserved, section IDs are unique, local links resolve, and both feeds and the sitemap parse as XML. Related-reading check and whitespace check pass. Browser inspection covered the desktop opening, 320px reflow without horizontal overflow, and the return-to-Writing/new-post journey. Reader comprehension, browser zoom, and a full screen-reader journey were not tested. These observations were recorded during local review before publication.

## Game screenshot

The author-supplied restaurant-game screenshot appears after the first playable version is introduced. The full WebP preserves the supplied framing; its alt text describes the game state. A 256 × 144 crop provides the Writing thumbnail, rendered at 128 × 72 with empty alt text alongside the linked title. Both assets are under `img/posts/`.

Social sharing uses a separate 1200 × 630 JPEG made from the full game screenshot. [Post social previews](../../docs/post-social-previews.md) owns the mapping, generation commands, and metadata checks.

## Prompts and session summary

The author supplied both verbatim prompts, the Astra 6 (High) model note, and an agent-generated summary reporting 25 completed exchanges and 12 files. The summary is in a closed native details element after the conclusion. These counts are attributed to the supplied agent summary; the game project was not inspected in this change.

The new disclosure was opened and closed with Enter and inspected at 320px without horizontal overflow. The supplied 12-file table sums to 12. Social-preview and related-reading checks pass.

## Conversation timeline

A static ordered timeline before the optional summary shows the author-supplied original turns 1, 2, 3, 5, 14, 15, 18, 19, 21, and 23. Labels identify chat turns rather than elapsed time. Descriptions adapt the agent’s first/second-person summary into the essay’s perspective without claiming the author’s and child’s exact contributions to every turn. A continuous green rule ties the moments together; the first playable version receives the only filled turn marker. The timeline is directly maintained in the article HTML and uses no JavaScript.

Timeline verification: inspected all ten moments in the desktop rendering, and 320px reflow with 16px descriptions and no horizontal overflow. Original turn values and unique IDs were checked; social-image and related-reading checks pass. No new zoom, screen-reader, or unfamiliar-reader review was performed.

Timeline follow-up: the author clarified that the agent offered three alternatives at turn 14 and his son chose one; the pixel-art mockup set the visual direction while the first playable version used simpler artwork; turn 23 now explains the snack correction and why CPU opponents addressed losing players taking another slot. The introduction foregrounds the child’s ideas and corrections. These details come from the author’s supplied account.

## Playable game link

Reviewed merged main at `3168fc8`: the game is published at `/playground/food-game/`, with setup, classification, Eat/Skip, CPU players, and a Playground return link. The simple invitation “You can play the game here” appears in a supporting aside after the narrative conclusion, before the timeline, so it no longer interrupts the story. Turn 21 also links directly to the game, connecting the first-playable milestone to the actual activity. Pending prompt, model, timeline, and summary additions are reconciled with the latest shared navigation.

Follow-up verification: timeline link → game setup → start → Lunch → Healthy (apple slices) → Eat awarded a point; Playground return worked. Game rule checks, nine Python checks, social-preview and related-reading checks passed. This verifies one local play path, not all game combinations or public-host deployment.
