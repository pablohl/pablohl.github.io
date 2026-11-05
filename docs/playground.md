# Playground

The homepage Playground section introduces small games and creative projects. Its collection route is `/playground/`; the first game is at `/playground/food-game/`. The related essay also links to the game. The game has a visible return to Playground and explains that leaving resets progress.

The collection uses the shared editorial shell and existing collection styles. The game retains its own restaurant styling, scoped through its separate page. There is no new global header item or change to the decision-focused Experiments collection.

## Game source

This is a static copy of the tested local game. `game/config.js` owns rule settings; `game/content.js` the food bank; `game/mechanics.js` the state transitions; `game/cpu.js` CPU decisions; `game/app.js` browser controls; and `game/styles.css` presentation. Keep those responsibilities separate. Run `node playground/food-game/tests/mechanics.test.cjs` for the rule checks.

The development source is the local ericgame project. To update the publication, copy its index and game files here, preserving the website return navigation and metadata, and rerun checks. No build, backend, sign-in, or browser storage is required. No progress is saved on reload.

## Review scope

The invitation describes a game rather than an explanatory simulation. The opening identifies player setup and CPU controls. Simplified food labels are described in the collection and game instructions; this is not a validated nutrition curriculum. Familiar-reader playtesting happened during game development; unfamiliar-reader comprehension and assistive-technology use have not been checked for this publication.

## Publication checks

- Automated: existing nine Python website checks and the game's rule tests pass.
- Browser: homepage → Playground → game → classify/eat → Playground, and collection → story → game paths worked. Collection fits a 390px viewport without horizontal overflow; the game's return link is keyboard-focusable.
- Editorial perspectives considered by one reviewer: a visitor can distinguish playing from reading the story; a new player can identify setup and the one-screen controls; maintenance keeps the game isolated from shared site styles. These are editorial checks, not independent reviewers or a reader study.
- Not checked: unfamiliar-reader comprehension, full screen-reader journey, and all combinations of game modes on the public host.
