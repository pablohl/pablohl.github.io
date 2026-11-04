#!/usr/bin/env python3
"""Build social JPEGs from existing artwork and update each post's head metadata.

Edit data/post-social-images.json when adding a post. Requires Pillow.
Use --check to validate the generated images and metadata without writing.
"""
import argparse
from html import escape
from html.parser import HTMLParser
from io import BytesIO
import json
from pathlib import Path
import re

from PIL import Image, ImageCms, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SIZE = (1200, 630)
SITE = 'https://pablohl.github.io'
BLOCK = re.compile(r'\s*<!-- social-preview:start -->.*?<!-- social-preview:end -->', re.S)


class Head(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.meta = {}
        self.feed(source.split('</head>', 1)[0])

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta':
            self.meta[attrs.get('property', attrs.get('name', ''))] = attrs.get('content', '')


def rgb_image(path):
    image = Image.open(path)
    image = ImageOps.exif_transpose(image)
    profile = image.info.get('icc_profile')
    if profile:
        image = ImageCms.profileToProfile(image.convert('RGB'), ImageCms.ImageCmsProfile(BytesIO(profile)),
                                          ImageCms.createProfile('sRGB'), outputMode='RGB')
    else:
        image = image.convert('RGB')
    return image


def font(size):
    # Use an installed serif face; Pillow's default is a portable fallback.
    for name in ('/System/Library/Fonts/Supplemental/Georgia.ttf', 'DejaVuSerif.ttf'):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            pass
    return ImageFont.load_default(size=size)


def title_lines(draw, title, face, width):
    lines = []
    line = ''
    for word in title.split():
        candidate = (line + ' ' + word).strip()
        if line and draw.textlength(candidate, font=face) > width:
            lines.append(line)
            line = word
        else:
            line = candidate
    return lines + [line]


def build_image(entry, title):
    image = rgb_image(ROOT / entry['source'])
    canvas = Image.new('RGB', SIZE, '#f6f2ea')
    if entry['layout'] == 'artwork':
        # Contain the complete image: screenshots and diagrams must stay intact.
        image = ImageOps.contain(image, SIZE, Image.Resampling.LANCZOS)
        canvas.paste(image, ((SIZE[0] - image.width) // 2, (SIZE[1] - image.height) // 2))
    elif entry['layout'] == 'author':
        image = ImageOps.fit(image, (280, 280), method=Image.Resampling.LANCZOS)
        canvas.paste(image, (65, 175))
        draw = ImageDraw.Draw(canvas)
        draw.rectangle((0, 0, 1200, 9), fill='#49634e')
        for size in range(48, 25, -1):
            face = font(size)
            lines = title_lines(draw, title, face, 710)
            if len(lines) * (size + 14) <= 290:
                break
        y = 160
        for line in lines:
            draw.text((395, y), line, font=face, fill='#292b28')
            y += size + 14
        draw.text((395, 475), 'Pablo Hernandez Leal', font=font(27), fill='#49634e')
        draw.text((395, 520), 'pablohl.github.io', font=font(22), fill='#60645b')
    else:
        raise ValueError(f'Unknown layout: {entry["layout"]}')
    return canvas


def metadata(slug, entry):
    url = f'{SITE}/img/posts/social/{slug}.jpg'
    alt = escape(entry['alt'], quote=True)
    return f'''\n<!-- social-preview:start -->
<meta property="og:image" content="{url}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{alt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{url}">
<meta name="twitter:image:alt" content="{alt}">
<!-- social-preview:end -->'''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    entries = json.loads((ROOT / 'data/post-social-images.json').read_text())
    posts = {p.parent.name: p for p in (ROOT / 'posts').glob('*/index.html')}
    if set(entries) != set(posts):
        raise ValueError('Social image inventory must match all post directories')
    for slug, page in posts.items():
        entry = entries[slug]
        if not entry['alt'].strip() or not (ROOT / entry['source']).is_file():
            raise ValueError(f'Missing image source or description for {slug}')
        source = page.read_text()
        title = Head(source).meta['og:title']
        # Remove prior owned blocks and image tags to avoid competing first values.
        head, body = source.split('</head>', 1)
        head = BLOCK.sub('', head)
        head = re.sub(r'<meta\b(?=[^>]*(?:name|property)=["\'](?:og:image(?::[^"\']*)?|twitter:image(?::[^"\']*)?|twitter:card)["\'])[^>]*>\s*', '', head, flags=re.I)
        output = head.rstrip() + metadata(slug, entry) + '\n</head>' + body
        dest = ROOT / 'img/posts/social' / f'{slug}.jpg'
        rendered = BytesIO()
        build_image(entry, title).save(rendered, 'JPEG', quality=90, optimize=True)
        if args.check:
            if output != source:
                raise ValueError(f'Stale social metadata: {page}')
            with Image.open(dest) as image:
                if image.size != SIZE or image.format != 'JPEG':
                    raise ValueError(f'Invalid social image: {dest}')
            tags = Head(source).meta
            if tags.get('twitter:card') != 'summary_large_image':
                raise ValueError(f'Missing large-image card: {slug}')
            if dest.read_bytes() != rendered.getvalue():
                raise ValueError(f'Stale social image: {dest}')
        else:
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(rendered.getvalue())
            page.write_text(output)
    print(f'{"Checked" if args.check else "Built"} social previews for {len(posts)} posts.')


if __name__ == '__main__':
    main()
