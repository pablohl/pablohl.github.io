#!/usr/bin/env python3
"""Apply the shared static shell to committed HTML pages.

The site is published HTML rather than a Hugo source checkout. This script is
idempotent so a future static rebuild can reapply the common header and assets.
"""

from pathlib import Path
from html import unescape
import re
from urllib.parse import quote


ROOT = Path(__file__).resolve().parents[1]
HEADER = """<header class="editorial-header">
  <div class="editorial-header__inner section-inner">
    <a class="editorial-header__brand" href="/">Pablo Hernandez Leal</a>
    <button class="editorial-header__menu" type="button" aria-controls="editorial-navigation" aria-expanded="false">Menu</button>
    <nav class="editorial-header__nav" id="editorial-navigation" aria-label="Primary navigation">
      <a href="/about/">About</a>
      <a href="/posts/">Writing</a>
      <a href="/about/#research">Research</a>
      <a href="/toolbox/">Toolbox</a>
    </nav>
  </div>
</header>"""

OLD_HEADER = re.compile(
    r'<header id="site-header".*?</header>\s*<div id="mobile-menu".*?</div>',
    re.DOTALL,
)


def add_post_actions(path: Path, source: str) -> str:
    """Add a static email invitation and progressively enhanced sharing controls."""
    if path.parent.parent != ROOT / "posts" or path.name != "index.html":
        return source
    if "<!-- post-conversation:start -->" in source:
        return source

    title_match = re.search(r"<h1\b[^>]*>(.*?)</h1>", source, re.DOTALL)
    url_match = re.search(r'<meta property="og:url" content="([^"]+)"', source)
    marker = '<hr class="post-end">'
    if not title_match or not url_match or marker not in source:
        raise ValueError(f"Cannot add post actions to {path}")

    title = unescape(re.sub(r"<[^>]+>", "", title_match.group(1))).strip()
    post_url = unescape(url_match.group(1))
    email_url = (
        "mailto:hleal.pablo@gmail.com?subject="
        + quote(f"Re: {title}", safe="")
        + "&amp;body="
        + quote(f"Post: {post_url}\n\n", safe="")
    )
    actions = (
        '<!-- post-conversation:start -->\n'
        '<aside class="post-conversation" aria-label="Respond and share">\n'
        f'  <p>Have a different take? <a href="{email_url}">Reply by email</a>.</p>\n'
        '  <div class="post-share-actions" hidden>\n'
        '    <button type="button" data-copy-link>Copy link</button>\n'
        '    <button type="button" data-share-link hidden>Share</button>\n'
        '    <span class="post-share-status" role="status" aria-live="polite"></span>\n'
        '  </div>\n'
        '</aside>\n'
        '<!-- post-conversation:end -->'
    )
    source = source.replace(marker, marker + "\n\t\t\t" + actions, 1)
    if '/js/post-actions.js' not in source:
        source = source.replace(
            "</head>",
            '  <script src="/js/post-actions.js" defer></script>\n</head>',
            1,
        )
    return source


def apply(path: Path) -> bool:
    source = path.read_text()
    if "style.min." not in source:
        return False

    if OLD_HEADER.search(source):
        source = OLD_HEADER.sub(HEADER, source, count=1)
    elif "editorial-header" not in source:
        source = re.sub(r"(<body\b[^>]*>)", r"\1\n" + HEADER, source, count=1)

    if path == ROOT / "index.html":
        source = re.sub(r'\s*<nav id="home-nav".*?</nav>', "", source, count=1, flags=re.DOTALL)

    if '/fonts/dm-sans-latin.woff2' not in source:
        source = source.replace(
            "</head>",
            '  <link rel="preload" href="/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossorigin>\n'
            '  <link rel="preload" href="/fonts/source-serif-4-latin.woff2" as="font" type="font/woff2" crossorigin>\n</head>',
            1,
        )
    if '/css/editorial.css' not in source:
        source = source.replace(
            "</head>",
            '  <link rel="stylesheet" href="/css/editorial.css?v=20261001">\n'
            '  <script src="/js/editorial-nav.js" defer></script>\n</head>',
            1,
        )
    source = source.replace('content="#494f5c"', 'content="#F6F2EA"')
    source = add_post_actions(path, source)
    path.write_text(source)
    return True


def main() -> None:
    count = sum(apply(path) for path in ROOT.rglob("*.html"))
    print(f"Applied editorial shell to {count} HTML pages")


if __name__ == "__main__":
    main()
