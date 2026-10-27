> Historical snapshot captured from `661f5ba` on October 27, 2026. This file preserves earlier implementation descriptions, design iterations, and reported checks. Statements such as “current,” “now,” and “passes” refer to their original revision, not the present site. It is not an instruction source or evidence of current compliance. See the [current reference](../toolbox-navigation.md) and [documentation index](../README.md). Relative Markdown links have been rebased for this location.

# Toolbox entry and collection roles

`/toolbox/` is the shared entry point. It explains two routes before showing the question catalogue:

- **Decision tools:** reusable questions that a reader can apply to a choice at work or elsewhere. The existing situation-based starting points, filters, and all 21 tools remain under `#decision-tools`.
- **Engineering guides:** worked hiring and technical-recommendation situations at `/toolbox/engineering/`. Individual guides retain their URLs and link to the underlying decision tools.

The distinction is the reading task and format, not a claim that engineering decisions are separate from other decisions. A reader can start with a question for their own situation or follow a concrete engineering example. Both routes belong to Toolbox; they are no longer presented as two unexplained sibling “Toolboxes.”

The homepage describes both routes and links to the common entry point. The entry cards explain audience, purpose, and specific starting examples. The engineering index has links back to Toolbox and directly to the decision-tool section. Individual decision tools return to that section instead of the undifferentiated entry point. Existing tool routes and the `#decision-tools` anchor remain valid.

Implementation stays in the catalogue and engineering builders; generated pages preserve the structure on rebuild. The new collection cards need no JavaScript. All source catalogue content, situation suggestions, and example reasoning are preserved.

Checked: full build, six regression checks, 91 local links and target anchors across entry/detail pages, the engineering route and return link, and 375px reflow without horizontal overflow. This is an editorial navigation improvement; unfamiliar-reader wayfinding has not been tested.
