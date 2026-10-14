#!/usr/bin/env python3
"""Render the hand-curated related-reading links into the published HTML.

Edit data/related-reading.json, then run this script. Post titles stay in their
own HTML files, so the recommendations cannot retain an outdated copy.
"""

import argparse
from html import escape, unescape
import json
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
POSTS = ROOT / "posts"
DATA = ROOT / "data" / "related-reading.json"
BLOCK = re.compile(
    r"\n[ \t]*<!-- related-reading:start -->.*?<!-- related-reading:end -->\n?",
    re.DOTALL,
)
TITLE = re.compile(r'<meta property="og:title" content="([^"]*)"')


def post_title(path: Path) -> str:
    match = TITLE.search(path.read_text())
    if not match:
        raise ValueError(f"Missing Open Graph title: {path}")
    return unescape(match.group(1))


def build_section(slug: str, links: list[dict], titles: dict[str, str]) -> str:
    if len(links) != 2:
        raise ValueError(f"{slug} needs exactly two related posts")
    seen = set()
    rows = []
    for link in links:
        target = link["post"]
        reason = link["reason"].strip()
        if target not in titles or target == slug or target in seen or not reason:
            raise ValueError(f"Invalid related post for {slug}: {target}")
        seen.add(target)
        rows.append(
            f'    <li><a href="/posts/{escape(target, quote=True)}/">'
            f'<strong>{escape(titles[target])}</strong>'
            f'<span>{escape(reason)}</span></a></li>'
        )
    return "\n".join(
        [
            "<!-- related-reading:start -->",
            '<section class="editorial-related-reading" aria-labelledby="related-reading-title">',
            '  <h2 id="related-reading-title">Related reading</h2>',
            "  <ul>",
            *rows,
            "  </ul>",
            "</section>",
            "<!-- related-reading:end -->",
        ]
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Fail if HTML needs regenerating")
    args = parser.parse_args()

    recommendations = json.loads(DATA.read_text())
    pages = {path.parent.name: path for path in POSTS.glob("*/index.html")}
    essays = set(pages) - {"hello_world"}  # The four-word welcome note is not an essay.
    if set(recommendations) != essays:
        raise ValueError(
            f"Related-reading inventory differs from essays: "
            f"missing={sorted(essays - set(recommendations))}, "
            f"extra={sorted(set(recommendations) - essays)}"
        )
    titles = {slug: post_title(path) for slug, path in pages.items()}
    changed = []
    for slug in sorted(essays):
        path = pages[slug]
        source = path.read_text()
        start_count = source.count("<!-- related-reading:start -->")
        end_count = source.count("<!-- related-reading:end -->")
        if start_count != end_count or start_count > 1:
            raise ValueError(f"Invalid related-reading markers: {path}")
        source = BLOCK.sub("\n", source, count=1)
        marker = '<hr class="post-end">'
        if source.count(marker) != 1:
            raise ValueError(f"Expected one post-end marker: {path}")
        section = build_section(slug, recommendations[slug], titles)
        source = source.replace(marker, section + "\n\t\t\t" + marker, 1)
        if source != path.read_text():
            changed.append(path)
            if not args.check:
                path.write_text(source)

    if args.check and changed:
        parser.exit(1, f"Related reading needs regeneration in {len(changed)} posts\n")
    print(f"Related reading up to date in {len(essays)} essays")


if __name__ == "__main__":
    main()
