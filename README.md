# moribund-murdoch-blogger-theme

A modular dark Blogger theme for [MoribundMurdoch](https://moribundmurdoch.com/), served via Cloudflare Pages. CSS and JS are hosted externally and loaded into Blogger via `<link>` and `<script>` tags in the XML template.

---

## Structure

```
moribund-murdoch-blogger-theme/
├── css/
│   ├── base.css          # CSS variables, reset, typography defaults
│   ├── header.css        # Header layout, logo, title, bell, search bar
│   ├── layout.css        # Page grid, sidebar/content columns, main content
│   ├── sidebar.css       # Sidebar panel, label grid, archive tiles
│   ├── posts.css         # Post cards, titles, footer, pager, labels
│   ├── comments.css      # Comments section and form wrapper
│   ├── footer.css        # Footer layout, social links, music player
│   └── responsive.css    # Mobile breakpoints
├── js/
│   ├── header.js         # Bell dropdown, latest post redirect, autocomplete
│   ├── sidebar.js        # Label randomisation, sidebar toggle
│   ├── posts.js          # Random post fetcher, popular posts grid
│   ├── music-player.js   # Footer music player controls
│   └── back-to-top.js    # Back to top button
├── assets/
│   └── reference/        # Reference screenshots, not deployed
│       └── README.md
├── profile/
│   └── blogger-profile.md  # Blogger profile field reference
└── README.md
```

---

## How it works

Blogger's XML template has `b:css='false'` and an empty `<b:skin>` block. All styling comes from the CSS files served by Cloudflare Pages. The XML handles only structure and Blogger widget logic.

CSS and JS are loaded in the XML `<head>` like so:

```html
<link href='https://moribund-murdoch-blogger-theme.pages.dev/css/base.css' rel='stylesheet'/>
<link href='https://moribund-murdoch-blogger-theme.pages.dev/css/header.css' rel='stylesheet'/>
<!-- etc. -->
<script src='https://moribund-murdoch-blogger-theme.pages.dev/js/header.js'/>
<!-- etc. -->
```

Cloudflare Pages auto-deploys on every push to `main`.

---

## Deployment

1. Push changes to `main`
2. Cloudflare Pages detects the push and redeploys automatically
3. Changes are live at `https://moribund-murdoch-blogger-theme.pages.dev/`

To verify a deployment go to the Cloudflare dashboard → Pages → `moribund-murdoch-blogger-theme` → Deployments.

---

## Customisation

All colours and spacing are defined as CSS variables in `base.css`. Change a value there and it updates everywhere.

| Variable | Default | Purpose |
|---|---|---|
| `--color-bg` | `#121212` | Page background |
| `--color-surface-0` | `#0a0a0a` | Deepest surface |
| `--color-surface-4` | `#1a1a1a` | Header, dropdowns |
| `--color-text` | `#f5f5f5` | Primary text |
| `--color-border` | `rgba(255,255,255,0.10)` | Subtle borders |
| `--font-primary` | IM Fell English, Georgia | Main font |

The Blogger Theme Designer will show "Not applicable for this theme". This is expected. Edit variables in `base.css` directly instead.

---

## Things you must personalise

Before using this theme on your own blog, update the following:

1. All 13 Cloudflare Pages URLs: replace `moribund-murdoch-blogger-theme.pages.dev` with your own
2. Font links in `<head>`
3. Favicon URLs
4. OG meta tags: title, description, image URL
5. Twitter card meta tags
6. Header logo `src` and home link `href`
7. Glowing title text and link
8. Search autocomplete feed URL
9. Structured data JSON-LD: publisher name, logo URL, default image URL
10. Footer social links
11. Footer copyright name
12. Music player `src`: needs a real hosted `.mp3` URL
13. GitHub repo link in footer

## Live blog

[moribundmurdoch.blogspot.com](https://moribundmurdoch.blogspot.com/)
