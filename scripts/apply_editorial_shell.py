#!/usr/bin/env python3
"""Apply the shared static shell to committed HTML pages.

The site is published HTML rather than a Hugo source checkout. This script is
idempotent so a future static rebuild can reapply the common header and assets.
"""

from pathlib import Path
import re


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
    path.write_text(source)
    return True


def main() -> None:
    count = sum(apply(path) for path in ROOT.rglob("*.html"))
    print(f"Applied editorial shell to {count} HTML pages")


if __name__ == "__main__":
    main()
