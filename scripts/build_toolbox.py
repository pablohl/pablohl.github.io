#!/usr/bin/env python3
"""Build the static toolbox pages and connect published tools to essays."""

from __future__ import annotations

import html
import json
import re
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "toolbox.json"
SITE_URL = "https://pablohl.github.io"
GLOBAL_CSS = f"{SITE_URL}/css/style.min.037b6ee8f8c1baab6a3d0a9da11c3ff18a7552471f16c59fd98538d5ce99208b.css"
GLOBAL_CSS_INTEGRITY = "sha256-A3tu6PjBuqtqPQqdoRw/8Yp1UkcfFsWf2YU41c6ZIIs="
BUNDLE_JS = f"{SITE_URL}/js/bundle.min.7d8545daa55d62427355498dd8da13f98ff79a7938ce7d2a5e2ae1ec0de3beb8.js"
BUNDLE_JS_INTEGRITY = "sha256-fYVF2qVdYkJzVUmN2NoT+Y/3mnk4zn0qXirh7A3jvrg="
TOOLBOX_CSS = "/css/toolbox.css?v=20260930"


def esc(value: object) -> str:
    return html.escape(str(value), quote=True)


def load_data() -> dict:
    data = json.loads(DATA_PATH.read_text())
    required = {"schema_version", "metadata", "problems", "sources", "posts", "tools"}
    if set(data) != required:
        raise ValueError(f"Unexpected top-level keys: {set(data) ^ required}")

    problems = {item["id"] for item in data["problems"]}
    sources = {item["id"] for item in data["sources"]}
    posts = {item["id"] for item in data["posts"]}
    tools = {item["id"] for item in data["tools"]}
    if len(tools) != len(data["tools"]):
        raise ValueError("Tool IDs must be unique")

    for tool in data["tools"]:
        if not tool["id"] or not tool["name"] or not tool["question"]:
            raise ValueError(f"Tool is missing an ID, name, or question: {tool}")
        unknown_problems = set(tool["problems"]) - problems
        unknown_sources = set(tool["sources"]) - sources
        linked_posts = {tool["posts"]["primary"], *tool["posts"]["supporting"]}
        unknown_posts = linked_posts - posts
        unknown_tools = {item["id"] for item in tool["related_tools"]} - tools
        if unknown_problems or unknown_sources or unknown_posts or unknown_tools:
            raise ValueError(
                f"Broken relationship in {tool['id']}: "
                f"problems={unknown_problems}, sources={unknown_sources}, "
                f"posts={unknown_posts}, tools={unknown_tools}"
            )
    return data


def post_file_from_url(url: str) -> Path:
    parsed = urlparse(url)
    relative = parsed.path.strip("/")
    return ROOT / relative / "index.html"


def extract(pattern: str, source: str, fallback: str) -> str:
    match = re.search(pattern, source, flags=re.IGNORECASE | re.DOTALL)
    if not match:
        return fallback
    return html.unescape(re.sub(r"<[^>]+>", "", match.group(1))).strip()


def resolve_post_metadata(post: dict) -> dict:
    resolved = dict(post)
    if not post.get("url"):
        return resolved
    path = post_file_from_url(post["url"])
    if not path.exists():
        raise FileNotFoundError(f"Post URL does not resolve locally: {post['url']}")
    source = path.read_text()
    resolved["title"] = extract(r"<h1[^>]*>(.*?)</h1>", source, post["title"])
    resolved["summary"] = extract(
        r'<meta\s+itemprop="description"\s+content="([^"]*)"',
        source,
        post["summary"],
    )
    resolved["url"] = extract(
        r'<meta\s+property="og:url"\s+content="([^"]*)"',
        source,
        post["url"],
    )
    resolved["display_date"] = extract(
        r'<div\s+class="post-meta"[^>]*>\s*<span[^>]*>(.*?)</span>',
        source,
        post["date"],
    )
    resolved["local_path"] = path
    return resolved


def site_head(title: str, description: str, url: str) -> str:
    return f"""<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#494f5c">
  <meta itemprop="name" content="{esc(title)}">
  <meta itemprop="description" content="{esc(description)}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{esc(url)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="{esc(title)}">
  <meta name="twitter:description" content="{esc(description)}">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <title>{esc(title)}</title>
  <link rel="stylesheet" href="{GLOBAL_CSS}" integrity="{GLOBAL_CSS_INTEGRITY}" crossorigin="anonymous">
  <link rel="stylesheet" href="{TOOLBOX_CSS}">
</head>"""


def site_header() -> str:
    return f"""<header id="site-header" class="animated slideInUp">
  <div class="hdr-wrapper section-inner">
    <div class="hdr-left">
      <div class="site-branding"><a href="{SITE_URL}">Pablo Hernandez Leal</a></div>
      <nav class="site-nav hide-in-mobile">
        <a href="{SITE_URL}/toolbox/">Toolbox</a>
        <a href="{SITE_URL}/posts/">Writing</a>
        <a href="{SITE_URL}/about">About</a>
        <a href="{SITE_URL}/about/#research">Research</a>
      </nav>
    </div>
    <div class="hdr-right hdr-icons"><button id="menu-btn" class="hdr-btn" title="Menu">☰</button></div>
  </div>
</header>
<div id="mobile-menu" class="animated fast">
  <ul>
    <li><a href="{SITE_URL}/toolbox/">Toolbox</a></li>
    <li><a href="{SITE_URL}/posts/">Writing</a></li>
    <li><a href="{SITE_URL}/about">About</a></li>
    <li><a href="{SITE_URL}/about/#research">Research</a></li>
  </ul>
</div>"""


def site_footer() -> str:
    return f"""<footer id="site-footer" class="section-inner thin animated fadeIn faster">
  <p>&copy; 2026 <a href="{SITE_URL}/about">Pablo Hernandez Leal</a> &#183; <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener">CC BY-NC 4.0</a></p>
</footer>
<script src="{BUNDLE_JS}" integrity="{BUNDLE_JS_INTEGRITY}" crossorigin="anonymous"></script>"""


def problem_tags(tool: dict, problems: dict[str, dict]) -> str:
    return "".join(
        f'<span class="tool-tag">{esc(problems[item]["name"])}</span>'
        for item in tool["problems"]
    )


def tool_card(tool: dict, problems: dict[str, dict], sources: dict[str, dict]) -> str:
    source_names = ", ".join(sources[item]["name"] for item in tool["sources"])
    return f"""<article class="tool-card" data-tool-card data-problems="{esc(' '.join(tool['problems']))}" data-sources="{esc(' '.join(tool['sources']))}">
  <a href="/toolbox/{esc(tool['id'])}/">
    <span class="tool-eyebrow">Question worth trying</span>
    <h2>{esc(tool['name'])}</h2>
    <p class="tool-question">{esc(tool['question'])}</p>
    <div class="tool-meta">{problem_tags(tool, problems)}</div>
    <span class="source-note">From: {esc(source_names)}</span>
  </a>
</article>"""


def render_catalogue(data: dict, published: list[dict], problems: dict, sources: dict) -> None:
    used_source_ids = {source for tool in published for source in tool["sources"]}
    source_options = "\n".join(
        f'<option value="{esc(source["id"])}">{esc(source["name"])}</option>'
        for source in data["sources"]
        if source["id"] in used_source_ids
    )
    problem_buttons = "\n".join(
        f'<button type="button" data-problem-filter="{esc(problem["id"])}" aria-pressed="false">{esc(problem["name"])}</button>'
        for problem in data["problems"]
    )
    cards = "\n".join(tool_card(tool, problems, sources) for tool in published)
    description = "Portable questions for reasoning about unclear decisions, evidence, timing, people, communication, strategy, and learning."
    output = f"""<!DOCTYPE html>
<html lang="en-us">
{site_head('Toolbox', description, f'{SITE_URL}/toolbox/')}
<body id="page">
{site_header()}
<main class="site-main section-inner toolbox-page animated fadeIn faster">
  <header>
    <span class="tool-eyebrow">Not rules. Questions worth trying.</span>
    <h1>Toolbox</h1>
    <p class="toolbox-intro">A collection of reusable lenses for unclear decisions. Start with a problem, or explore ideas gathered from research, startups, trading, mentoring, games, and other places.</p>
  </header>
  <section class="toolbox-filters" aria-label="Filter the toolbox" id="problems">
    <div class="filter-group">
      <span class="filter-label">What are you dealing with?</span>
      <div class="filter-buttons">
        <button type="button" data-problem-filter="all" aria-pressed="true">All</button>
        {problem_buttons}
      </div>
    </div>
    <div class="filter-group">
      <label class="filter-label" for="source-filter">Or explore by source</label>
      <select id="source-filter" class="source-filter" data-source-filter>
        <option value="all">All sources</option>
        {source_options}
      </select>
    </div>
  </section>
  <div class="catalogue-meta">
    <span data-result-count aria-live="polite">{len(published)} tools</span>
    <button class="clear-filters" type="button" data-clear-filters>Clear filters</button>
  </div>
  <section class="tool-grid" data-tool-catalogue aria-label="Published tools">
    {cards}
  </section>
  <p class="empty-state" data-empty-state hidden>No tools match both filters. Try another problem or source.</p>
</main>
{site_footer()}
<script src="/js/toolbox.js"></script>
</body>
</html>
"""
    destination = ROOT / "toolbox" / "index.html"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(output)


def render_tool_page(tool: dict, problems: dict, sources: dict, posts: dict, tools: dict) -> str:
    source_names = ", ".join(sources[item]["name"] for item in tool["sources"])
    use_when = "".join(f"<span>{esc(item)}</span>" for item in tool["use_when"])
    post_ids = [tool["posts"]["primary"], *tool["posts"]["supporting"]]
    post_links = []
    for index, post_id in enumerate(post_ids):
        post = posts[post_id]
        relationship = "Primary post" if index == 0 else "Supporting post"
        post_links.append(
            f'<a class="post-relationship" href="{esc(post["url"])}">'
            f'<strong>{esc(post["title"])}</strong>'
            f'<span>{relationship} · {esc(post.get("display_date", post["date"]))}</span></a>'
        )

    optional_sections = []
    if tool.get("example"):
        optional_sections.append(
            f'<section class="tool-section wide"><h2>Example</h2><p>{esc(tool["example"])}</p></section>'
        )
    if tool.get("lineage"):
        optional_sections.append(
            f'<section class="tool-section wide"><h2>Lineage</h2><p>{esc(tool["lineage"])}</p></section>'
        )
    if tool["related_tools"]:
        related = []
        for relation in tool["related_tools"]:
            related_tool = tools[relation["id"]]
            related.append(
                f'<a class="post-relationship" href="/toolbox/{esc(related_tool["id"])}/">'
                f'<strong>{esc(related_tool["name"])}</strong>'
                f'<span>{esc(relation["relationship"].capitalize())}</span></a>'
            )
        optional_sections.append(
            f'<section class="tool-section wide"><h2>Related tools</h2>{"".join(related)}</section>'
        )

    description = tool["observation"]
    return f"""<!DOCTYPE html>
<html lang="en-us">
{site_head(tool['name'], description, f'{SITE_URL}/toolbox/{tool["id"]}/')}
<body id="page">
{site_header()}
<main class="site-main section-inner tool-page animated fadeIn faster">
  <a class="back-link" href="/toolbox/">← Explore the toolbox</a>
  <div class="tool-tags">{problem_tags(tool, problems)}</div>
  <h1>{esc(tool['name'])}</h1>
  <blockquote class="tool-question-lead">{esc(tool['question'])}</blockquote>
  <div class="tool-sections">
    <section class="tool-section">
      <h2>Situation</h2>
      <p>{esc(tool['situation'])}</p>
    </section>
    <section class="tool-section">
      <h2>The idea</h2>
      <p>{esc(tool['observation'])}</p>
    </section>
    <section class="tool-section">
      <h2>Useful when</h2>
      <div class="use-list">{use_when}</div>
    </section>
    <section class="tool-section">
      <h2>Watch for</h2>
      <p>{esc(tool['watch_for'])}</p>
    </section>
    <section class="tool-section wide">
      <h2>Where this came from</h2>
      <p>{esc(source_names)}</p>
    </section>
    {''.join(optional_sections)}
    <section class="tool-section wide">
      <h2>Read the reasoning</h2>
      {''.join(post_links)}
    </section>
  </div>
</main>
{site_footer()}
</body>
</html>
"""


def insert_toolbox_nav(source: str) -> str:
    writing_link = f'<a href="{SITE_URL}/posts/">Writing</a>'
    toolbox_link = f'<a href="{SITE_URL}/toolbox/">Toolbox</a>'

    # Normalize output from an earlier generator run before checking whether the
    # link is already present. This keeps each mobile link in its own list item.
    malformed_mobile = f"<li>{toolbox_link}{writing_link}</li>"
    source = source.replace(
        malformed_mobile,
        f"<li>{toolbox_link}</li><li>{writing_link}</li>",
    )
    source = source.replace(toolbox_link + writing_link, toolbox_link + "\n\t\t\t\t\t" + writing_link)
    if f'{SITE_URL}/toolbox/' in source:
        return source

    mobile_writing = f"<li>{writing_link}</li>"
    mobile_placeholder = "<!-- toolbox-mobile-nav -->"
    source = source.replace(mobile_writing, mobile_placeholder)
    source = source.replace(writing_link, toolbox_link + "\n\t\t\t\t\t" + writing_link)
    return source.replace(
        mobile_placeholder,
        f"<li>{toolbox_link}</li><li>{writing_link}</li>",
    )


def essay_callout(tool_list: list[dict]) -> str:
    links = []
    for tool in tool_list:
        links.append(
            f'<a class="essay-tool-link" href="/toolbox/{esc(tool["id"])}/">'
            f'<strong>{esc(tool["name"])}</strong>'
            f'<span class="essay-tool-question">Try asking: {esc(tool["question"])}</span>'
            f'<span class="essay-tool-action">Open tool →</span></a>'
        )
    return (
        '<section class="toolbox-callout" aria-labelledby="toolbox-callout-title">\n'
        '  <h2 id="toolbox-callout-title">In the toolbox</h2>\n'
        f'  {"".join(links)}\n'
        '</section>\n'
    )


def update_essay_pages(data: dict, published_tools: dict[str, dict], resolved_posts: dict[str, dict]) -> None:
    post_tools = defaultdict(list)
    for tool in published_tools.values():
        post_tools[tool["posts"]["primary"]].append(tool)
        for post_id in tool["posts"]["supporting"]:
            post_tools[post_id].append(tool)

    post_pages = sorted((ROOT / "posts").glob("*/index.html"))
    for path in [ROOT / "posts" / "index.html", *post_pages]:
        source = insert_toolbox_nav(path.read_text())
        path.write_text(source)

    style_link = f'<link rel="stylesheet" href="{TOOLBOX_CSS}">'
    for post_id, tools_for_post in post_tools.items():
        post = resolved_posts[post_id]
        path = post["local_path"]
        source = path.read_text()
        source = source.replace(
            '<link rel="stylesheet" href="/css/toolbox.css">',
            style_link,
        )
        if style_link not in source:
            source = source.replace("</head>", f"\t{style_link}\n</head>")
        source = re.sub(
            r'\n[ \t]*<!-- toolbox-callout:start -->.*?<!-- toolbox-callout:end -->[ \t]*\n?',
            "\n",
            source,
            flags=re.DOTALL,
        )
        marker = '<hr class="post-end">'
        if marker not in source:
            raise ValueError(f"Cannot place toolbox callout in {path}")
        callout = (
            "<!-- toolbox-callout:start -->\n"
            + essay_callout(tools_for_post)
            + "<!-- toolbox-callout:end -->"
        )
        source = re.sub(
            r"(?:\n[ \t]*)+" + re.escape(marker),
            "\n\t\t\t" + callout + "\n\t\t\t" + marker,
            source,
            count=1,
        )
        path.write_text(source)


def write_lens_data(published: list[dict]) -> None:
    lenses = [
        {
            "id": tool["id"],
            "name": tool["name"],
            "question": tool["question"],
            "url": f"/toolbox/{tool['id']}/",
        }
        for tool in published
        if tool["random_enabled"]
    ]
    output = "window.toolboxLenses = " + json.dumps(lenses, ensure_ascii=False, indent=2) + ";\n"
    (ROOT / "js" / "toolbox-data.js").write_text(output)


def update_sitemap(published: list[dict]) -> None:
    path = ROOT / "sitemap.xml"
    source = re.sub(
        r'\s*<!-- toolbox:start -->.*?<!-- toolbox:end -->\s*',
        "\n",
        path.read_text(),
        flags=re.DOTALL,
    )
    urls = [f"{SITE_URL}/toolbox/"] + [f"{SITE_URL}/toolbox/{tool['id']}/" for tool in published]
    entries = "\n".join(
        f"  <url><loc>{esc(url)}</loc><lastmod>2026-09-30T00:00:00+00:00</lastmod></url>"
        for url in urls
    )
    block = f"  <!-- toolbox:start -->\n{entries}\n  <!-- toolbox:end -->\n"
    if "</urlset>" not in source:
        raise ValueError("Malformed sitemap")
    path.write_text(source.replace("</urlset>", block + "</urlset>"))


def main() -> None:
    data = load_data()
    published = [tool for tool in data["tools"] if tool["status"] == "published"]
    if not published:
        raise ValueError("No published tools; the public toolbox would be empty")

    problems = {item["id"]: item for item in data["problems"]}
    sources = {item["id"]: item for item in data["sources"]}
    resolved_posts = {item["id"]: resolve_post_metadata(item) for item in data["posts"]}
    published_tools = {item["id"]: item for item in published}

    render_catalogue(data, published, problems, sources)
    for tool in published:
        destination = ROOT / "toolbox" / tool["id"] / "index.html"
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(
            render_tool_page(tool, problems, sources, resolved_posts, published_tools)
        )
    update_essay_pages(data, published_tools, resolved_posts)
    write_lens_data(published)
    update_sitemap(published)
    print(f"Built {len(published)} tool pages and updated essay relationships.")


if __name__ == "__main__":
    main()
