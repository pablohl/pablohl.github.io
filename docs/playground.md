# Playground

The homepage Playground section introduces small games and creative projects. Its collection route is `/playground/`; version 1 remains at `/playground/food-game/` and version 1.1 is at `/playground/food-game/version-1.1/`. The collection’s main play link opens version 1.1, with compact links to both versions. The related essay also links to the game. The game has a visible return to Playground and explains that leaving resets progress.

The collection uses the shared editorial shell and existing collection styles. The game retains its own restaurant styling, scoped through its separate page. Playground is included in the shared primary navigation on editorial pages, including the mobile menu. Its collection link is marked current on `/playground/`. The game retains its explicit return link rather than adopting the editorial page shell. The decision-focused Experiments collection is unchanged.

The collection heading includes a small pear illustration with optional pose feedback. Its ownership and interaction behavior are documented in [Personal page illustrations](reading-comfort-navigation.md#personal-page-illustrations). The game artwork and mechanics are unchanged.

## Game source

This is a static copy of the tested local game. `game/config.js` owns rule settings; `game/content.js` the food bank; `game/mechanics.js` the state transitions; `game/cpu.js` CPU decisions; `game/app.js` browser controls; and `game/styles.css` presentation. Keep those responsibilities separate. Run `node playground/food-game/tests/mechanics.test.cjs` for the rule checks.

The development source is the local ericgame project. To update the publication, copy its index and game files here, preserving the website return navigation and metadata, and rerun checks. No build, backend, sign-in, or browser storage is required. No progress is saved on reload. Version 1.1 optionally remembers the selected language in local storage and works when storage is unavailable.

## Review scope

The invitation describes a game rather than an explanatory simulation. The opening identifies player setup and CPU controls. Simplified food labels are described in the collection and game instructions; this is not a validated nutrition curriculum. Familiar-reader playtesting happened during game development; unfamiliar-reader comprehension and assistive-technology use have not been checked for this publication.

## Publication checks

- Automated: existing nine Python website checks and the game's rule tests pass.
- Browser: homepage → Playground → game → classify/eat → Playground, and collection → story → game paths worked. Collection fits a 390px viewport without horizontal overflow; the game's return link is keyboard-focusable.
- Editorial perspectives considered by one reviewer: a visitor can distinguish playing from reading the story; a new player can identify setup and the one-screen controls; maintenance keeps the game isolated from shared site styles. These are editorial checks, not independent reviewers or a reader study.
- Not checked: unfamiliar-reader comprehension, full screen-reader journey, and all combinations of game modes on the public host.

Navigation update checks: all 80 pages with the shared header include exactly one Playground link and the current navigation script. Reapplying the shell makes no further changes. Browser checks passed for desktop essay → Playground navigation, current-page highlighting, the 390px mobile menu, Escape returning focus to Menu, and link activation closing the menu. Existing nine Python checks and navigation JavaScript syntax checks passed.

## Version 1.1

The version 1.1 publication copies the local `version-1.1/index.html`, `game/`, and `tests/` into `playground/food-game/version-1.1/`. Keep its canonical URL, translated leaving/reset notice, and Playground return link when refreshing that copy. Version 1 files and existing links from the homepage and story remain unchanged.

Version 1.1 offers English, Spanish, and French through `game/i18n.js`, direct meal selection at every difficulty, mixed decorative shelf foods, a small kitchen, and a tabletop plate with answer buttons below. The existing scoreboard and scoring rules are retained. On phones the sign and scenery shrink while controls remain at least 44px high and answer buttons at least 52px high.

Run both version 1.1 checks:

```sh
node playground/food-game/version-1.1/tests/mechanics.test.cjs
node playground/food-game/version-1.1/tests/i18n.test.cjs
```

Development browser checks covered six viewport widths (320–1280px) and all three languages, including full games at five widths. This is simulated phone sizing, not physical-device testing or unfamiliar-reader evidence.

Publication checks for version 1.1: the collection’s main link opened the new canonical route; the artwork loaded; Spanish setup and question controls worked at 390px with 52px answer buttons and no horizontal overflow; the translated leaving/reset notice appeared; returning to Playground and following Version 1 opened the original game. Both versions’ rule checks, version 1.1 translation checks, and all nine website Python checks passed. Keyboard and assistive-technology journeys were not rechecked for this addition.
