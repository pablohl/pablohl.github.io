# When does adding agents help?

Research in Practice essay integrated into Writing for local review on November 7, 2026. Adapted from the v9 local prototype. The article text, benchmark overview, comparison controls, task diagrams and editorial conclusion are preserved. No deployment or public-host check was performed.

## Sources and maintenance

- `index.html` is the directly maintained post, including the overview and explanatory diagrams.
- `style.css` scopes comparison and diagram styles to this article and uses the site's shared font and color tokens. The shared shell, navigation and base essay styles remain in `css/editorial.css` and `js/editorial-nav.js`.
- `app.js` owns the four architecture buttons, persistent single-agent comparisons and local section highlighting.
- `data/figures-1-2.csv` is the published Nature source-data download, with line endings normalized to LF and values unchanged. `data.js` is its browser-readable benchmark data. If updating the underlying data, update both that representation and the static overview/delta references; the embedded figures currently reflect this fixed source snapshot.
- The diagrams are explanatory schematics, not observed execution traces. Their reported deltas concern whole-benchmark averages, not the pictured example.

The Writing listing, both feeds, sitemap, adjacent-post route, related-reading manifest and social-image manifest include this route. The existing related-reading and social-preview builders own their respective output. The social image and thumbnail derive from an actual local rendering of the task-dependency figure; no external artwork was introduced.

Reading estimate: approximately 2,260 words, including tables, captions and supporting labels, rounded up at 200 words per minute to 12 minutes. This is an estimate, not observed reader completion time.

## Local review

Post: http://127.0.0.1:8894/posts/when-does-adding-agents-help/

Writing: http://127.0.0.1:8894/posts/

Verified the new and existing essay prose both compute to Source Serif 4 at 18px with 29.7px line height. Desktop and mobile renderings were inspected. Local browser checks covered widths 320/390/768/1040/1280, 200% text, mobile Menu/Escape, all four architecture comparisons, the Writing Research filter, entry and return routes, and absence of page errors. The new post's assets load locally, with no dependency on the public origin for its shell, fonts or interactions.

The nine existing Python checks, related-reading check, social-preview check, XML parsing, asset-link resolution and whitespace check passed. Reader comprehension, full assistive-technology behavior and social-platform cache/rendering remain untested.
