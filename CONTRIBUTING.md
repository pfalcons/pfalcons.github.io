# Contributing to the Perineum Falcons site

This guide covers the common tasks editors and contributors need to do. The site is built with [Hugo](https://gohugo.io/) (static site generator) + [Tailwind CSS v4](https://tailwindcss.com/) (styling) and deployed via [GitHub Actions](https://github.com/features/actions).

## Prerequisites

- [Git](https://git-scm.com/)
- [Hugo (extended)](https://gohugo.io/installation/) v0.162.1 or later
- [Node.js](https://nodejs.org/) v22+
- A text editor (VS Code recommended)

## Quick start

```sh
git clone https://github.com/pfalcons/pfalcons.github.io.git
cd pfalcons.github.io
npm ci
hugo server
```

Open http://localhost:1313 in your browser. Changes to content, layouts, or styles are reflected automatically.

## Adding a new member

1. Create a member content file at `content/members/<name>.md` with frontmatter:

   ```yaml
   ---
   title: Firstname
   draft: false
   params:
     short_name: firstname        # lowercase, no spaces — used as the URL slug
     nickname: "Their Nickname"   # omit if they don't have one
     role: Team Role              # e.g. "Team Captain", "Bus Driver"
     first_ragbrai: 2024          # the year of their first RAGBRAI
     active: true                 # true if currently active, false for alumni
     image: firstname.jpg         # filename in static/images/members/
   ---
   ```

2. Add their photo to `static/images/members/` — JPEG, square crop preferred, filename must match `image` in frontmatter.

3. If the member doesn't need a dedicated profile page but should appear in quotes, skip step 1 and just add their `short_name` to `data/quotes.yaml` entries.

## Adding a RAGBRAI year

1. Create a year page at `content/ragbrai/<year>.md`:

   ```yaml
   ---
   title: "RAGBRAI LIII — 2025"
   year: 2025
   draft: false
   params:
     name: LIII
     route: "Sioux City — Davenport"
   ---
   Content about the year's ride, stories, etc.
   ```

2. Add route data in `data/ragbrai.yaml` under the year key:

   ```yaml
   '2025':
     name: LIII
     mileage: "450"
     climb: "18000"
     logo:
     map: http://www.geobike.com/geobike/RAGBRAI/r53.kmz
     towns:
     - Town 1
     - Town 2
     - ...
     - ''
   ```

## Adding a quote

1. Add an entry to `data/quotes.yaml`:

   ```yaml
   - id: 75                    # next available ID
     text: The quote text here.
     attribution: Initials      # e.g. MJ, JJ, JW
     members:
     - shortname               # must match a member's short_name in content/members/
     year: 2025                # optional
   ```

2. Every `members` reference must match a `short_name` in an existing member file. If the person isn't a member yet, add them first (see "Adding a new member" above).

## Editing existing pages

### About, THE GUIDE, Contact

These live in the `content/` directory:

- `content/about/_index.md` — About page
- `content/guide/_index.md` — THE GUIDE page
- `content/contact/_index.md` — Contact page

Each is a standard Markdown file with Hugo frontmatter. Edit directly.

### Blog posts

Blog posts live in `content/blog/`. Each post is a Markdown file with draft status managed by the `draft` frontmatter field.

## Building for production

```sh
hugo --environment production --minify
```

The output goes to `public/`, which is deployed to GitHub Pages.

## Color system

The site uses custom Tailwind colors defined in `assets/css/main.css` under `@theme`:

| Class               | Usage                  |
|---------------------|------------------------|
| `falcons-bg`        | Page background        |
| `falcons-card`      | Card / panel bg        |
| `falcons-nav`       | Navigation background  |
| `falcons-accent`    | Accent (red)           |
| `falcons-accent-light` | Lighter accent     |
| `falcons-green`     | Green highlights       |
| `falcons-link`      | Link color (blue)      |
| `falcons-text`      | Body text              |
| `falcons-text-muted`| Muted/secondary text   |
| `falcons-border`    | Borders                |

Use them in templates like `text-falcons-text`, `bg-falcons-bg`, `border-falcons-border`, etc.

## How deployment works

1. Push (or merge) to the `main` branch on GitHub.
2. The GitHub Actions workflow (`.github/workflows/hugo.yml`) triggers automatically.
3. It runs `npm ci`, builds with `hugo --environment production --minify`, and uploads the `public/` directory as a Pages artifact.
4. The `deploy` job publishes the artifact to GitHub Pages.
5. The live site at https://perineumfalcons.com updates within a minute or two.

You can also trigger a manual deploy from the Actions tab on GitHub.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE.md).
