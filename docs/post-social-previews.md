# Post social preview images

All HTML post directories under `posts/` have a dedicated 1200 × 630 JPEG and Open Graph / X image metadata. The image URLs use the public HTTPS origin, so external services can fetch them once the changes are deployed. The Writing collection thumbnail and article image remain independent assets.

## Source and regeneration

`data/post-social-images.json` owns the source image, layout, and image description for each post. `scripts/build_post_social_images.py` builds `img/posts/social/<post-slug>.jpg` and maintains a marked metadata block in each article head. It also removes conflicting old image/card tags and sets `twitter:card` to `summary_large_image`.

Run from the repository root with Python and Pillow installed:

```sh
python3 scripts/build_post_social_images.py
python3 scripts/build_post_social_images.py --check
```

Add a manifest entry whenever adding a post; the inventory must match all post directories, including the short welcome note. Metadata includes an absolute image URL, JPEG type, width, height, and an image description for both Open Graph and X. Descriptions should identify the image rather than repeat a generic title or placeholder.

Existing artwork is fitted in full on a cream canvas, preserving screenshot controls and diagram labels. Embedded color profiles are converted to sRGB. The new game essay uses its supplied screenshot. The delegation essay currently has only its existing small thumbnail available, so that source limits the detail in its social image. Replace its manifest source when higher-resolution artwork becomes available.

The four posts without dedicated artwork (`great_intern`, `great_supervisor`, `thoughts`, `hello_world`) use a simple author layout: the existing profile photo, article title, author, and domain. No new artwork is generated. The author layout uses Georgia when available, DejaVu Serif otherwise, then Pillow's default; rebuilding on a different system can change that layout. The check regenerates expected JPEG bytes and flags stale images or metadata.

## Verification and limits

Validate inventory, image dimensions, descriptions, metadata uniqueness, and generated-image freshness with `--check`. Inspect representative artwork, screenshots, and author layouts at preview size. Test metadata in a platform inspector after deployment if confirmation of that platform's rendering is needed. Local metadata and image checks do not establish live LinkedIn, X, or other platform rendering; platforms may cache older previews.

Metadata follows the [Open Graph protocol](https://ogp.me/), including the structured image properties. Do not change article prose or publication dates when rebuilding preview assets.
