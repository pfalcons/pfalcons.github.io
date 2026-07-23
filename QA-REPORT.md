# QA Report — Perineum Falcons Hugo Site

**Date:** July 22, 2026  
**Site:** `https://perineumfalcons.com`  
**Build:** Hugo v0.162.1, production mode, minified  
**Theme:** `pfalcons` (Tailwind CSS)  

---

## Summary

| Check | Result |
|-------|--------|
| Build | ✅ 113 pages, 48 static files, 550 processed images (161 ms) |
| Broken Images | ✅ All 1,187 image references resolve correctly |
| Overflow / Layout | ✅ No critical overflow issues |
| Content Inventory | ⚠️ 1 minor issue (About page has 5 historical images, not 6) |
| Member Images | ✅ All checks pass |
| RAGBRAI Overflow | ✅ `overflow-hidden` and `object-contain` used properly |
| HTML Validity | ✅ No html/body tag mismatches, no duplicate IDs |
| Viewport Meta | ✅ Present on all pages |

---

## 1. Broken Images

**Result: ✅ PASS — 0 broken images out of 1,187 references**

All `<img src="...">` and `<img srcset="...">` references across all HTML files in `public/` were extracted and the resolved file paths (relative to `public/`) were checked for existence. Every image resolves to a real file — both original JPG sources and Hugo-processed AVIF/WebP variants.

---

## 2. Overflow / Layout Issues

**Result: ✅ PASS — No critical overflow issues**

- RAGBRAI year cards use `object-contain` and `max-h-full`/`max-w-full` on `<picture>` containers.
- The bonus ride (Katy Trail) card has `overflow-hidden` on its container.
- Member photos use `max-h-full max-w-full object-contain`.
- No inline styles with fixed-height without overflow were found.

**Note:** Several pages have a high density of images (`about/` has 6, `ragbrai/` has 22, `members/` has 71) but all images use responsive `<picture>` elements with `object-contain`, which prevents overflow.

---

## 3. Content Inventory

### 3.1 Required Pages — All Present

| Page | Path | Status |
|------|------|--------|
| Home | `public/index.html` | ✅ Logo + nav links present |
| About | `public/about/index.html` | ✅ Present with history images |
| Members | `public/members/index.html` | ✅ Present with 71 member images |
| Joe (member detail) | `public/members/joe/index.html` | ✅ Profile + quotes present (7,854 bytes) |
| RAGBRAI | `public/ragbrai/index.html` | ✅ Years 2006+ only |
| RAGBRAI 2026 | `public/ragbrai/2026/index.html` | ✅ Route data present |
| Guide | `public/guide/index.html` | ✅ Packing and lactation sections present |
| Quotes | `public/quotes/index.html` | ✅ 77 quote elements rendered |
| Contact | `public/contact/index.html` | ✅ Formspree form with Google reCAPTCHA |
| 404 | `public/404.html` | ✅ Custom 404 page |

### 3.2 Issues Found

| Severity | Page | Issue |
|----------|------|-------|
| **LOW** | `public/about/index.html` | Only **5 of 6** historical images available. Source content references `history2.jpg`, `history4.jpg`, `history5.jpg`, `history6.jpg`, `history7.jpg`. File `history3.jpg` does not exist in `static/images/misc/`. Either add the missing image or correct the expected count. |
| **INFO** | `public/ragbrai/index.html` | Regex scan detected "1976" in page content, but this is a **false positive** — it appears inside a Hugo-processed image hex hash (`e0719769c3020f40`), not as an actual year listing. All listed years are 2006+ as expected. |
| **INFO** | `public/contact/index.html` | Joining note says "Interested in riding with the Perineum Falcons? We're always looking for new members…" but doesn't use the word "join". This is stylistic, not a bug. |

---

## 4. Member Image Rendering

**Result: ✅ PASS — All checks pass**

| Check | Status |
|-------|--------|
| No `rounded-full` class | ✅ Class not present on members page |
| Member cards have `<img>` or `<picture>` | ✅ 71 `<img>` + 71 `<picture>` elements |
| Placeholder for members without photos | ✅ `profile_image_placeholder.png` used |
| All member images resolve | ✅ Every `/images/members/*` referenced exists |

Member cards use responsive `<picture>` elements with AVIF/WebP/JPEG sources, `loading=lazy`, and `object-contain` for proper sizing.

---

## 5. RAGBRAI Image Overflow

**Result: ✅ PASS — No overflow issues**

| Check | Status |
|-------|--------|
| Year card logos use `overflow-hidden` | ✅ Found on bonus card container |
| Year card logos use `object-contain` | ✅ All `<picture>` elements use `max-h-full max-w-full object-contain` |
| Katy Trail bonus card | ✅ Uses `overflow-hidden` + `object-contain` |
| Image sizing | ✅ All year logos constrained to `h-20` with responsive srcset sizes |

---

## 6. HTML Validity

**Result: ✅ PASS — No issues found**

- All HTML files have matching `<html>`/`</html>` and `<body>`/`</body>` tags.
- No duplicate `id` attributes detected.
- All pages include `<!doctype html>` and viewport meta tag.
- CSS file at `/css/main.css` loads correctly.

---

## 7. Pages That Passed All Checks

- ✅ No broken images found
- ✅ No overflow issues detected
- ✅ Home page exists and has navigation links
- ✅ About page has historical images
- ✅ Members listing has member cards
- ✅ Joe member page has profile and quotes
- ✅ RAGBRAI listing only shows 2006+ years
- ✅ RAGBRAI 2026 has route data
- ✅ Guide page has packing and lactation sections
- ✅ Quotes page renders quotes
- ✅ Contact page has joining note and form
- ✅ Custom 404 page
- ✅ Members page has no rounded-full class
- ✅ Members page has image/picture elements
- ✅ Placeholder image for members without photos
- ✅ Viewport meta tag present on all pages

---

## 8. Additional Observations

### Responsive Images
The site uses Hugo's built-in image processing extensively — every member photo and RAGBRAI year logo is rendered in multiple formats (AVIF, WebP, JPEG) and multiple sizes (200w, 400w, 800w) via `<picture>` with appropriate `sizes` attributes. This is excellent for performance.

### Form Handling
The contact page uses Formspree with Google reCAPTCHA v2. The form is functional but note that reCAPTCHA requires JavaScript and an internet connection to render. The success/error feedback is handled client-side.

### Blog Drafts
All blog content files in `content/blog/drafts/` are marked as drafts and correctly excluded from the production build — no blog pages appear in `public/`.

---

## Fix Instructions

### LOW: Missing history3.jpg

1. Create a `history3.jpg` file in `static/images/misc/` corresponding to the missing historical image.
2. Alternatively, if the 7-image sequence is intentional (no image for #3), update the content in `content/about/_index.md` to remove the gap or add a placeholder.

**Affected file:** `content/about/_index.md` (between `history2.jpg` and `history4.jpg`)  
**File to create:** `static/images/misc/history3.jpg`

---

*QA scan performed automatically via `qa-scan.py` on July 22, 2026.*
