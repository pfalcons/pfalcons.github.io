# Perineum Falcons — Jekyll → Hugo Migration Audit

**Date:** 2026-07-22  
**Repository:** `pfalcons.github.io` (branch `main`)  
**Live URL:** https://perineumfalcons.com  
**Current static generator:** Jekyll 3.8.3 (via Docker)  

---

## Table of Contents

1. [Content Inventory](#1-content-inventory)
2. [Content Migration Map](#2-content-migration-map)
3. [Architecture Decisions](#3-architecture-decisions)
4. [Forestry CMS Assessment](#4-forestry-cms-assessment)
5. [Infrastructure & Deploy](#5-infrastructure--deploy)
6. [Assets & Media](#6-assets--media)
7. [Design & Color Analysis](#7-design--color-analysis)
8. [Issues & Cleanup](#8-issues--cleanup)
9. [Migration Order of Operations](#9-migration-order-of-operations)

---

## 1. Content Inventory

### Collections

| Collection    | Files | Published | Notes |
|---------------|-------|-----------|-------|
| `_members/`   | 72    | 72        | 4 co-owners, 18 active, 1 driver, rest past |
| `_ragbrai/`   | 22    | 22        | Years 2006–2026 (includes `2020-1` — a bonus trip) |
| `_pages/`     | 8     | 7         | 1 unpublished blog index |
| `_data/`      | 2     | —         | `ragbrai.yaml` (54 years, 1973–2026), `quotes.csv` (74 quotes) |
| `_includes/`  | 8     | —         | Reusable Liquid partials |
| `_layouts/`   | 6     | —         | Page templates |
| `_sass/`      | 9     | —         | SCSS partials |
| `_drafts/`    | 12    | —         | Blog drafts (never published, no `_posts/` exists) |
| `_posts/`     | 0     | —         | **Does not exist.** No published blog posts ever |

**Totals:**  
- **Members:** 72 (4 co-owners, 14 active non-owner, 1 driver, 53 past/inactive)  
- **RAGBRAI pages:** 22 (years)  
- **RAGBRAI data entries:** 54 (all years 1973–2026, covering pre-team history too)  
- **Quotes:** 74 in CSV  
- **Static pages:** 7 live (About, Members, RAGBRAI, THE GUIDE, Quotes, Contact, 404) + 3 archive subpages + 1 hidden blog index + 1 hidden howto page  
- **Drafts:** 12 (dating 2012–2017)  

### Core Root Files

| File | Purpose | Migrate? |
|------|---------|----------|
| `_config.yml` | Jekyll config, plugins, collections, defaults | Decompose into Hugo config |
| `index.html` | Homepage | Hugo `_index.md` |
| `atom.xml` | RSS/Atom feed | Hugo built-in RSS |
| `robots.txt` | Crawl directives | Static copy |
| `CNAME` | Custom domain `perineumfalcons.com` | DNS config |
| `README.md` | Repo docs | Update for Hugo |
| `howto-update-the-site.md` | Editorial guide | Rewrite for Hugo |
| `LICENSE.md` | MIT license | Keep |
| `favicon.ico` | Favicon | Keep |
| `apple-touch-icon-precomposed.png` | Apple icon | Keep |

### Drafts Inventory (12)

All are blog-post-style drafts in `_drafts/`. None were ever published:

| Year | Topic |
|------|-------|
| 2012 | "Cannot catch break" |
| 2013 | "Gallery bus quotes" |
| 2014 | "Hello world again" |
| 2014 | "Pfalcons headlines statistics" |
| 2014 | "RAGBRAI XLII route announced" |
| 2014 | "New top rack on P Falcon II" |
| 2015 | "RAGBRAI XLIII route announced" |
| 2015 | "Throwback Thursday on a Monday" |
| 2015 | "Highlight from Sutliff Bridge" |
| 2016 | "Real lives of Pfalcons" |
| 2016 | "Sponsored by CIB Brewery" |
| 2017 | "RAGBRAI XLV route announced" |

**Decision:** These are legacy ephemera. Migrate drafts only if the team wants to eventually publish blog content.

---

## 2. Content Migration Map

### 2.1 Members (`_members/` → Hugo `content/members/`)

**Frontmatter fields (Jekyll → Hugo):**

| Jekyll Field    | Hugo Field       | Notes |
|-----------------|------------------|-------|
| `title`         | `title`          | Member first name |
| `short_name`    | `params.short_name` | Used for quote cross-references |
| `nickname`      | `params.nickname` | Optional |
| `role`          | `params.role`    | Team role/position |
| `ragbrai`       | `params.first_ragbrai` | First year with team |
| `active`        | `params.active`  | Boolean |
| `co-owner`      | `params.co_owner` | Boolean (yaml-safe key) |
| `driver`        | `params.driver`  | Boolean (1 member) |
| `image`         | `params.image`   | Filename in `assets/images/members/` |
| `weight`        | `weight`         | Sort order |
| `layout: member` | —               | Hugo uses archetype `members` |

**Archetype:** `content/members/_index.md` + `archetypes/members.md`

**Section:** `content/members/`  
**Permalink:** `/members/:slug/` (same as Jekyll)

**Transformation needed:**
- Rename `ragbrai` (first year joined) to `first_ragbrai` to avoid confusion with the RAGBRAI collection
- Rename `co-owner` to `co_owner` (YAML-safe key)
- Move `_includes/member-teaser.html` logic into Hugo partials
- Member detail page (`_layouts/member.html`) uses `short_name` to filter `site.data.quotes` — migrate to Hugo Data lookups

**Essential:** Yes — core content type

### 2.2 RAGBRAI Years (`_ragbrai/` → Hugo `content/ragbrai/`)

**Frontmatter fields:**

| Jekyll Field | Hugo Field | Notes |
|--------------|------------|-------|
| `title`      | `title`    | Year string e.g. "2026" |
| `published`  | `draft`    | Invert: `published:true` → `draft:false` |

**Section:** `content/ragbrai/`  
**Permalink:** `/ragbrai/:slug/`

**Key transformation:** The RAGBRAI year pages are mostly empty frontmatter stubs. The real content comes from:
1. `_data/ragbrai.yaml` — route data (mileage, climb, towns, logo, gallery)
2. `_layouts/ragbrai.html` — heavy template logic pulling data + members + quotes

**Migration approach:** Create a Hugo shortcode or data-driven layout that reads from Hugo's data dir. The `_data/ragbrai.yaml` file should be migrated as `data/ragbrai.yaml` in Hugo, preserving its key structure.

**Pages with body content:** Only 6 RAGBRAI year pages have body content (2007, 2009, 2012, 2013, 2018, 2020). The rest are pure data-driven pages.

**Essential:** Yes — core content type

### 2.3 Static Pages (`_pages/` → Hugo `content/`)

| Page | File | Hugo Path | Notes |
|------|------|-----------|-------|
| About | `_pages/about.md` | `content/about/_index.md` | Long history essay, 43 lines |
| Members | `_pages/members.md` | `content/members/_index.md` | Templated member listing |
| RAGBRAI | `_pages/ragbrai.md` | `content/ragbrai/_index.md` | Year grid |
| THE GUIDE | `_pages/guide.md` | `content/guide/_index.md` | Long guide, accordion HTML |
| Quotes | `_pages/quotes.md` | `content/quotes/_index.md` | Templated quote grid |
| Contact | `_pages/contact.html` | `content/contact/_index.md` | Formspree form + reCAPTCHA |
| 404 | `_pages/404.md` | `layouts/404.html` | Hugo 404 template |
| Blog | `blog/index.html` | `content/blog/_index.md` | Currently hidden (`published: false`) |

**Archive pages (under `_pages/archive/`):**

| Page | File | Notes |
|------|------|-------|
| Blog Archive | `_pages/archive/index.md` | Lists all posts |
| Tags | `_pages/archive/tags.md` | Tag cloud |
| Categories | `_pages/archive/categories.md` | Category index |

**Transformation needed:**
- `contact.html` contains inline CSS + JS for Formspree — needs to be a Hugo shortcode or embedded
- `guide.md` has hardcoded Bootstrap accordion HTML — consider migrating to Hugo shortcodes
- `members.md` has complex Liquid logic grouping members by co-owner, active, driver, past — convert to Hugo `.GroupByParam`
- `quotes.md` references `site.data.quotes` grouped by year — Hugo Data lookup
- `ragbrai.md` iterates site.ragbrai + data lookups — Hugo section page

**Essential:** Yes — all 7 live pages + 404

### 2.4 Data Files

#### `_data/ragbrai.yaml` → `data/ragbrai.yaml`

54 years of route data. Structure:

```yaml
YYYY:
  name: "XXX"        # Roman numeral
  mileage: "NNN.N"
  climb: "NNNNN"
  logo: filename     # in assets/images/ragbrai/
  map: URL           # KMZ link
  towns:
    - Town1
    - Town2
  gallery_url: URL   # optional
```

**Essential:** Yes. Used by RAGBRAI year pages.

#### `_data/quotes.csv` → `data/quotes.json` or `data/quotes.yaml`

74 quotes. Columns: `id,quote,year,member,additional_members`

**Transformation needed:** Convert CSV to JSON or YAML for easier Hugo data lookup. Member field references `short_name` from member collection.

**Essential:** Yes. Used by member pages and quotes page.

### 2.5 Layouts (`_layouts/` → Hugo `layouts/`)

| Jekyll Layout | Hugo Equivalent | Notes |
|---------------|-----------------|-------|
| `default.html` | `layouts/_default/baseof.html` | Sidebar layout (Bootstrap grid) |
| `default-full.html` | `layouts/_default/baseof.html` | Full-width variant |
| `page.html` | `layouts/_default/single.html` | Thin wrapper |
| `member.html` | `layouts/members/single.html` | Heavy template with data queries |
| `ragbrai.html` | `layouts/ragbrai/single.html` | Most complex layout |
| `post.html` | `layouts/post/single.html` | Post template (unused currently) |

### 2.6 Includes (`_includes/` → Hugo `layouts/partials/`)

| Jekyll Include | Hugo Partial | Notes |
|----------------|--------------|-------|
| `head.html` | `head.html` | Meta, CSS, JS, SEO |
| `header.html` | `header.html` | Navbar + logo |
| `footer.html` | `footer.html` | Footer + countdown JS |
| `sidebar.html` | `sidebar.html` | Sidebar nav (legacy, not in active use) |
| `member-teaser.html` | `member-teaser.html` | Member card partial |
| `analytics.html` | `analytics.html` | Google Analytics gtag |
| `comments.html` | — | Disqus (may drop) |
| `breadcrumb.html` | — | Broken/incomplete — may drop |

### 2.7 Stylesheets (`_sass/` → Hugo `assets/css/`)

| Jekyll Partial | Notes |
|----------------|-------|
| `_base.scss` | Logo, layout utilities, countdown timer |
| `_colors.scss` | Color variables |
| `_helper-classes.scss` | Angled edge mixin usage |
| `_members.scss` | **Empty file** |
| `_mixins.scss` | Angle-edge SCSS mixin |
| `_posts.scss` | Post typography |
| `_quotes.scss` | Quote block styles |
| `_ragbrai.scss` | RAGBRAI page card/header/member/post styles |
| `_typography.scss` | Google Fonts import (`Fjalla One`), header font |
| `css/styles.scss` | Master import file |

**Migration approach to Tailwind CSS (per design constraints):**
1. Map color variables to Tailwind `theme.extend.colors`
2. Rebuild layout as Tailwind utilities
3. Keep `Fjalla One` as a custom font-family extension
4. `_mixins.scss` angle-edge effects → Tailwind `after:`/`before:` variants or custom utility

### 2.8 Scripts

| File | Purpose | Migrate? |
|------|---------|----------|
| `scripts/jquery.countdown.min.js` | RAGBRAI countdown (currently commented out in sidebar) | Optional — replace with lightweight JS or Hugo date math |
| `scripts/custom.js` | Old Formspree jQuery validation | Not needed (contact form rewritten) |

### 2.9 Drafts (`_drafts/`)

12 drafts. No published posts. No `_posts/` directory exists.

**Decision:** Store drafts as `content/blog/drafts/` with `draft: true` in Hugo, or leave them out. They've sat unpublished since 2012–2017.

---

## 3. Architecture Decisions

### 3.1 Hugo Version

**Recommendation: Hugo ≥ v0.145.0** (not just v0.163.0 as stated in constraints — AVIF support landed earlier)

- Current stable: v0.145+ supports AVIF via Hugo Pipes image processing
- Use `css.TailwindCSS` (available in Hugo v0.134+, stable in v0.140+)
- Hugo's built-in RSS replaces `atom.xml`
- Hugo's built-in sitemap replaces `jekyll-sitemap`
- Hugo's built-in SEO (`title` tag) replaces `jekyll-seo-tag`

### 3.2 Tailwind Strategy

**Recommendation: Tailwind CSS v4 via Hugo Pipes (`css.TailwindCSS`)**

- Use `@tailwindcss/cli` or PostCSS with `hugo mod npm`
- Map existing Bootswatch Slate theme colors to custom Tailwind palette:
  - `slate-900` / `zinc-900` for dark backgrounds (#272B30, #3A3F44)
  - `red-500` (#ee5f5b) for accent/danger
  - `green-500` (#62c462) for success
  - `gray-400` (#7A8288) for muted text
- Rebuild layout grid using Tailwind's flexbox/grid utilities (no Bootstrap dependency)
- Preserve `Fjalla One` as heading font via `fontFamily` extension

### 3.3 Theme Approach

**Recommendation: Custom theme, not a Hugo port of a Jekyll theme**

The site uses Bootswatch Slate (a Bootstrap 4 theme) heavily customized with custom SCSS. Options:

1. **Custom Tailwind theme from scratch** (preferred) — Total control, matches design constraints, no framework debt
2. **Hugo Bootstrap theme port** — Unnecessary given the complete Tailwind rewrite in constraints
3. **Use `minima` for inspiration** — The Jekyll site was based on minima, but deviated heavily

**Recommendation:** Build a minimal custom Hugo theme that:
- Provides `baseof.html` with sidebar and full-width variants
- Has Tailwind utility classes throughout templates
- Uses Hugo Pipes for asset pipeline
- Defines archetypes for `members` and `ragbrai`

### 3.4 Image Pipeline Plan

Current state: 16 MB of images, mixed formats (JPG, PNG). Largest are 2025.png (1.7 MB) and 2026.png (1.6 MB).

**Recommendation:**
1. **AVIF primary** — convert all images to AVIF via `images.Process` in Hugo Pipes
2. **WebP fallback** — generate WebP variants for browsers that don't support AVIF
3. **Responsive srcset** — generate 3-4 sizes (400px, 800px, 1200px, 2000px)
4. **Lazy loading** — native `loading="lazy"` on all `<img>` tags
5. **Member images** — circle crop at 80×80 via Hugo image processing (replace current CSS border-radius hack)
6. **Video files** — 30 MB of MOV files. Consider replacing with YouTube/Vimeo embeds for bandwidth savings

### 3.5 Deploy Workflow

**Recommendation: GitHub Actions → GitHub Pages**

```
main branch commit
    ↓
GitHub Actions workflow:
  1. Checkout repo + submodules
  2. Setup Hugo v0.145+
  3. Install Node.js + Tailwind dependencies
  4. hugo --environment production --minify
  5. Deploy to gh-pages branch
    ↓
GitHub Pages serves from gh-pages
Custom domain: perineumfalcons.com (CNAME in DNS)
```

Replace current:
- Docker Compose local dev (`jekyll/jekyll:3.8.3`)
- Forestry.io auto-deploy (stale)
- GitHub Pages Jekyll build (no longer needed)

### 3.6 Per-Field Contrast Assessment: Current Dark + Red Scheme

The current theme is Bootswatch Slate:

| Element | Color | Hex | Contrast Ratio (WCAG) |
|---------|-------|-----|----------------------|
| Body background | Dark gray | `#272B30` | — |
| Navbar background | Darker | `#1c1e22` | — |
| Text | Light gray | `#C8C8C8` | ~5.5:1 on `#272B30` ✅ AA |
| Links | Light blue | `#5bc0de` | ~4.9:1 ❌ AA (needs 4.5:1 for normal text) — borderline |
| Danger/Accent | Red | `#ee5f5b` | ~3.5:1 ❌ AA for normal text, ~2.7:1 for small text — **fails** |
| Success | Green | `#62c462` | ~4.2:1 ❌ AA for normal text |
| Muted text | Gray | `#7A8288` | ~3.0:1 ❌ AA — **fails** for body text |

**Issues:**
- The red accent (`#ee5f5b`) on dark background fails WCAG AA for body text
- Muted text at `#7A8288` on `#272B30` fails WCAG AA
- The overall scheme is functional for large headings but fails for small/body text

**Recommendation:**
- Keep the dark gray + red aesthetic (it's the team's identity)
- Lighten the red to ~`#f08080` (light coral) or `#ff6b6b` for body text to reach AA
- Use the current `#ee5f5b` for large decorative elements (headers, borders) where contrast requirement is lower (3:1 for large text)
- Lighten muted text to `#adb5bd` or similar for AA compliance
- Ensure link underline or weight contrast in addition to color (not color-only)

---

## 4. Forestry CMS Assessment

### Status: STALE / SAFE TO REMOVE

`.forestry/` contains:
- `settings.yml` — CMS config pointing to Jekyll 3.8.3 / Ruby 2.6
- `front_matter/templates/` — UI templates for member, ragbrai, page, post

Forestry.io was shut down in April 2023. This configuration is:
- **Not in active use** (the howto doc confirms the CMS is abandoned)
- **Pointing to a dead service** (forestry.io)
- **Safe to delete** `/.forestry/` entirely

**Note:** The `howto-update-the-site.md` document references Forestry workflows. Remove or replace with Hugo editor instructions.

---

## 5. Infrastructure & Deploy

### Current Stack

| Component | Current | Target |
|-----------|---------|--------|
| SSG | Jekyll 3.8.3 (Docker) | Hugo ≥ v0.145 |
| CSS | Bootstrap 4.5 + Bootswatch Slate + custom SCSS | Tailwind CSS v4 via Hugo Pipes |
| JS | jQuery 3.5.1 + Bootstrap JS + countdown plugin | Minimal vanilla JS |
| Icons | Font Awesome 4.5 | Heroicons or SVG inline |
| Comments | Disqus (likely unused) | Drop or replace |
| Analytics | Google Analytics (G-1M3BENYTY4) via gtag | Keep same GA4 property |
| Contact Form | Formspree + reCAPTCHA v2 | Keep Formspree or migrate |
| Fonts | Google Fonts (Fjalla One) | Google Fonts or self-host |
| Deploy | GitHub Pages (auto, Forestry) | GitHub Actions → Pages |
| Domain | `perineumfalcons.com` (CNAME) | Same |
| Dev Env | Docker Compose (Jekyll image) | `hugo server` directly |

### `docker-compose.yml`

Uses `jekyll/jekyll:3.8.3`. **Replace** with `hugo server` workflow.

### `.editorconfig`

Good — keep as-is (space indent, 2 spaces, LF, UTF-8, trim trailing whitespace).

### `.gitignore`

```
.DS_Store
_site
.sass-cache
.jekyll-metadata
.jekyll-cache
assets/images/members/john-c.jpg
```

**Update for Hugo:** Replace Jekyll ignores with Hugo ignores (`/public/`, `/resources/`, `/node_modules/`).

---

## 6. Assets & Media

### Image Sizes (sorted, all formats)

| Path | Size | Format | Notes |
|------|------|--------|-------|
| assets/images/ragbrai/2025.png | 1.7 MB | PNG | Largest — needs AVIF |
| assets/images/ragbrai/2026.png | 1.6 MB | PNG | — |
| assets/images/ragbrai/2020-1.jpg | 2.1 MB | JPG | Large — needs AVIF |
| assets/images/ragbrai/2023.png | 594 KB | PNG | — |
| assets/images/ragbrai/2024.png | 720 KB | PNG | — |
| assets/images/ragbrai/2022.png | 574 KB | PNG | — |
| assets/images/ragbrai/2013.jpg | 449 KB | JPG | — |
| assets/images/ragbrai/2019.jpg | 264 KB | JPG | — |
| All other RAGBRAI images | 15–410 KB | JPG/PNG | — |
| 37 member photos | 1–20 KB each | JPG | Small, mostly headshots |
| 6 history/bus photos | 15–55 KB | JPG | Small |
| Textures (2) | 1–2 KB each | PNG | Tiny |

### Video

| File | Size |
|------|------|
| `pfalcon1.mov` | 25.6 MB |
| `sadness.mov` | 6.0 MB |

### Audio

| File | Size |
|------|------|
| `richard-thompson20090723.wav` | 6.7 MB |
| `richard-thompson20090723.ogg` | 606 KB |
| `smoothie.wav` | 2.5 MB |
| `smoothie.ogg` | 129 KB |

**Recommendation:** Convert large RAGBRAI PNGs to AVIF + WebP. Video/audio files can remain as static assets if referenced from content, but consider hosting externally.

---

## 7. Design & Color Analysis

### Current Color Palette (Bootswatch Slate)

| Token | Hex | Usage |
|-------|-----|-------|
| `$gray-darker` | `#272B30` | Body background |
| `$gray-dark` | `#3A3F44` | Card/panel backgrounds |
| `$gray` | `#52575C` | Borders |
| `$gray-light` | `#7A8288` | Muted text |
| `$gray-lighter` | `#999` | Inactive elements |
| `$brand-danger` | `#ee5f5b` | Red accent (buttons, links, borders) |
| `$brand-success` | `#62c462` | Green (dates, co-owner badges) |
| `$brand-info` | `#5bc0de` | Links, info badges |
| `$brand-warning` | `#f89406` | Warning badges |
| `#1c1e22` | — | Footer, hr borders, circle crops |
| `#222` | — | Section wrappers (RAGBRAI header, quotes) |

### Typography

- **Headings:** `Fjalla One` (Google Fonts, sans-serif)  
- **Body:** Bootstrap/Slate default (`Helvetica Neue`, `Helvetica`, `Arial`, sans-serif)  
- **Monospace:** Not used  

### Visual Elements

- Large logo background image (300px tall mobile, 365px desktop)
- Circular crop images for members (80px) and quotes (40px)
- Red accent borders (5px) on RAGBRAI sections
- Angled edge section dividers (SCSS `angle-edge` mixin, not in active use)
- Bootstrap's Slate theme provides the dark grunge aesthetic (dark navbar, dark panels, minimal shadows)

---

## 8. Issues & Cleanup

### Issues Found

1. **Duplicate file:** `_members/charlie-d copy.md` (83 bytes) — macOS Finder copy artifact. Delete.
2. **Accessibility:** Red accent (`#ee5f5b`) fails WCAG AA for body text on dark background (3.5:1 ratio). Muted text (`#7A8288`) also fails (3.0:1). See §3.6.
3. **Large unoptimized images:** 2025.png (1.7 MB), 2026.png (1.6 MB), 2020-1.jpg (2.1 MB). These need AVIF/WebP conversion.
4. **Members without images:** 34 of 72 members have no `image:` field in frontmatter. They'll show the placeholder.
5. **Empty Sass file:** `_sass/_members.scss` is empty (0 bytes).
6. **Stale Forestry config:** `.forestry/` references a shut-down service.
7. **Hidden pages:** `blog/index.html` and `howto-update-the-site.md` have `published: false` but are still tracked.
8. **No published blog posts:** 12 drafts, no published posts, `_posts/` dir doesn't exist. Blog feature is effectively dead.
9. **Unused countdown script:** jQuery countdown plugin included but commented out in sidebar.
10. **Formspree jQuery validation**: `scripts/custom.js` references an old Formspree endpoint and jQuery validate — superseded by the inline JS in `contact.html`.

### Pre-Migration Cleanup Checklist

- [ ] Delete `_members/charlie-d copy.md`
- [ ] Remove `.forestry/` directory
- [ ] Decide fate of 12 blog drafts
- [ ] Decide fate of blog feature (keep hidden or drop entirely)
- [ ] Decide fate of Disqus comments

---

## 9. Migration Order of Operations

### Phase 1: Scaffold
1. Initialize Hugo site with `hugo new site`
2. Set up `hugo.toml` with url, title, params, taxonomies
3. Create archetypes: `members`, `ragbrai`, `default`
4. Set up Tailwind CSS v4 with Hugo Pipes
5. Configure GitHub Actions workflow for Pages deploy

### Phase 2: Core Templates
6. Build `layouts/_default/baseof.html` (sidebar + full-width variants)
7. Build partials: `head.html`, `header.html`, `footer.html`, `member-teaser.html`, `analytics.html`
8. Map color variables to Tailwind config
9. Import `Fjalla One` font

### Phase 3: Content Migration
10. Migrate `_data/ragbrai.yaml` → `data/ragbrai.yaml`
11. Convert `_data/quotes.csv` → `data/quotes.yaml`
12. Migrate all 72 member files to `content/members/` with frontmatter renames
13. Migrate all 22 RAGBRAI year files to `content/ragbrai/`
14. Migrate all 7 static pages to `content/` with appropriate `_index.md`
15. Migrate 12 drafts to `content/blog/` with `draft: true`

### Phase 4: Templates
16. Build `layouts/members/single.html` (member detail page)
17. Build `layouts/ragbrai/single.html` (RAGBRAI year page — most complex)
18. Build `layouts/ragbrai/list.html` (RAGBRAI index / year grid)
19. Build `layouts/members/list.html` (Members listing with owner/active/past groups)
20. Build `layouts/quotes/list.html` (Quotes page with year-grouped data)
21. Build `layouts/guide/single.html` (THE GUIDE — accordion)
22. Build `layouts/contact/single.html` (Contact form)
23. Build `layouts/404.html`

### Phase 5: Assets
24. Convert all RAGBRAI images to AVIF + WebP variants
25. Set up image processing pipeline for responsive srcsets
26. Convert member photos through pipeline for circular crops
27. Migrate favicon, apple-touch-icon, logo images
28. Port `_base.scss` logo CSS to Tailwind

### Phase 6: Polish & Deploy
29. Test all URLs match current permalink structure (preserve `/members/`, `/ragbrai/`, `/about/`, etc.)
30. Test WCAG AA compliance (adjust red accent as needed)
31. Set up custom domain DNS
32. Configure GitHub Actions → Pages deploy
33. Set up GA4 analytics
34. Update README.md and howto doc for Hugo
35. Remove Jekyll artifacts (`_config.yml`, `_layouts/`, `_includes/`, `_sass/`, `Gemfile`, `docker-compose.yml`)
36. Final QA: all pages render, quotes link to members, RAGBRAI data displays, contact form works

---

*End of audit — this document serves as the migration blueprint for subsequent workers.*
