# Reading comfort and shared navigation

Current shared presentation reference, reconciled with the implementation after PR #69. [Toolbox navigation](toolbox-navigation.md) owns collection roles and link destinations. The [historical snapshot](history/reading-comfort-navigation-2026-10-27.md) records the measurements and verification reported for that change; they are not fresh checks or a certification of the whole site.

## Presentation defaults

Preserve the cream background, green accent, Source Serif 4 editorial headings/essay prose, and DM Sans controls, supporting text, and comparisons. Reuse the shared tokens in [editorial.css](../css/editorial.css) rather than creating independent theme copies.

| Role | Current shared treatment at the default browser text size |
| --- | --- |
| Collection outer frame | Up to 1040px, with responsive side margins shared by header and footer |
| Reading measure | `--reading-width: min(68ch, 42rem)` for designated prose blocks; comparisons and diagrams may be wider |
| Guide and decision-tool narrative | `--font-body: 1.125rem` (18px with the browser's 16px default); line height 1.65 |
| Comparison cells and supporting descriptions | `--font-support: 1rem` (16px at that default); comparison cells have additional padding |
| Metadata and compact labels | `--font-meta: .875rem` (14px at that default) |
| Essay prose | Existing 18px serif treatment and 1.65 line height |
| Shared page-top spacing | `--page-top: 3rem`, reducing to `2rem` at 820px and below |

These describe the shared defaults, not a claim that every specialized label uses the same size. Interactive experiment layouts retain their specialized diagram widths. [home.css](../css/home.css), collection sheets, and individual experiment styles may refine the shared frame for their content.

The hiring/story comparison tables use the wider engineering frame. Long cells separate an opening observation from its qualification without dropping content. At viewport widths of **900px and below**, the comparison appears as stacked labeled cards. The framework questions and paired discussion statements also stack at that breakpoint in [engineering-toolbox.css](../css/engineering-toolbox.css). Architectural dependency diagrams have their own responsive rules in [engineering-selection.css](../css/engineering-selection.css); do not infer their breakpoint from the table rule.

## Global navigation and keyboard behavior

The same primary header serves the site. With JavaScript, its current link uses `aria-current="page"` for the matching destination and `aria-current="location"` for a containing section on detail pages. Toolbox collection navigation is a separate local level, with roles defined in its [owning reference](toolbox-navigation.md).

Each shared shell has a **Skip to content** link targeting its focusable main element. At 820px and below, the enhanced header offers a collapsible Menu button. Without JavaScript the navigation remains visible. Escape dismisses an open menu and returns focus to its button; it does not move focus when the menu is already closed. Link activation and a switch to desktop close the enhanced menu.

The shared shell is maintained by [apply_editorial_shell.py](../scripts/apply_editorial_shell.py); [editorial-nav.js](../js/editorial-nav.js) owns menu and current-state enhancement. Asset versions must stay consistent between generators, the shell applicator, and published pages. See the [source map and commands](README.md#source-files-and-commands).

## Evidence limits

Check actual rendered text, background, and state combinations when changing colors or type; do not assume the palette or a token alone guarantees accessibility. Preserve keyboard focus and readable reflow. Follow the relevant [experiment verification guidance](../experiments/README.md#11-review-and-verification) for interactive experiences and [multi-perspective review](multi-perspective-review.md) for explanatory judgments. Old measurements, a passing build, or a fitting viewport do not establish reader comprehension, zoom support, or an assistive-technology journey.
