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
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="editorial-header__inner section-inner">
    <a class="editorial-header__brand" href="/">Pablo Hernandez Leal</a>
    <button class="editorial-header__menu" type="button" aria-controls="editorial-navigation" aria-expanded="false">Menu</button>
    <nav class="editorial-header__nav" id="editorial-navigation" aria-label="Primary navigation">
      <a href="/about/">About</a>
      <a href="/posts/">Writing</a>
      <a href="/experiments/">Experiments</a>
      <a href="/about/#research">Research</a>
      <a href="/toolbox/">Toolbox</a>
    </nav>
  </div>
</header>"""

OLD_HEADER = re.compile(
    r'<header id="site-header".*?</header>\s*<div id="mobile-menu".*?</div>',
    re.DOTALL,
)

EDITORIAL_NAV = re.compile(
    r'(<nav class="editorial-header__nav"[^>]*>)(.*?)(</nav>)',
    re.DOTALL,
)


def add_experiments_nav(source: str) -> str:
    """Keep the Experiments entry in the shared static navigation."""
    def update(match: re.Match[str]) -> str:
        opening, links, closing = match.groups()
        if 'href="/experiments/"' in links:
            return match.group(0)
        links = re.sub(
            r'(?m)^([ \t]*)<a href="/posts/">Writing</a>',
            lambda line: line.group(0) + f'\n{line.group(1)}<a href="/experiments/">Experiments</a>',
            links,
            count=1,
        )
        return opening + links + closing

    return EDITORIAL_NAV.sub(update, source, count=1)


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
    original = path.read_text()
    source = original
    if "style.min." not in source:
        return False

    if OLD_HEADER.search(source):
        source = OLD_HEADER.sub(HEADER, source, count=1)
    elif "editorial-header" not in source:
        source = re.sub(r"(<body\b[^>]*>)", r"\1\n" + HEADER, source, count=1)
    source = re.sub(r'<header class="editorial-header">.*?</header>', HEADER, source, count=1, flags=re.S)
    main = re.search(r'<main\b([^>]*)>', source)
    if main:
        attrs = main.group(1)
        target = re.search(r'\bid="([^"]+)"', attrs)
        if not target:
            attrs += ' id="main-content"'
        if 'tabindex=' not in attrs:
            attrs += ' tabindex="-1"'
        source = source[:main.start()] + '<main' + attrs + '>' + source[main.end():]
        if target:
            source = source.replace('class="skip-link" href="#main-content"', f'class="skip-link" href="#{target.group(1)}"')
    source = add_experiments_nav(source)

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
            '  <link rel="stylesheet" href="/css/editorial.css?v=20261027comfort">\n'
            '  <script src="/js/editorial-nav.js?v=20261027comfort" defer></script>\n</head>',
            1,
        )
    source = re.sub(r'/css/editorial\.css\?v=[a-zA-Z0-9-]+', '/css/editorial.css?v=20261027comfort', source)
    source = re.sub(r'/js/editorial-nav\.js(?:\?v=[a-zA-Z0-9-]+)?', '/js/editorial-nav.js?v=20261027comfort', source)
    source = source.replace('content="#494f5c"', 'content="#F6F2EA"')
    source = add_post_actions(path, source)
    if source != original:
        path.write_text(source)
        return True
    return False


def main() -> None:
    count = sum(apply(path) for path in ROOT.rglob("*.html"))
    print(f"Applied editorial shell to {count} HTML pages")


if __name__ == "__main__":
    main()
