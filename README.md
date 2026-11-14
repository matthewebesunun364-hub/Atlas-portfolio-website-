# Atlas — Portfolio Website

A single-page portfolio for a GoHighLevel automation & CRM specialist.

## Structure

```
index.html          # the whole site (single page)
css/style.css       # styles
js/main.js          # nav, scroll reveals, counters, lightbox
atlas-media/        # fonts, images, and video (do not rename folders referenced above)
```

## Run locally

Just open `index.html` in a browser — no build step needed.

## Host on GitHub Pages

1. Create a new repository on GitHub (e.g. `atlas-portfolio`).
2. Upload/push **everything in this folder** (index.html, css/, js/, atlas-media/).
3. In the repo: **Settings → Pages → Source: Deploy from a branch → main / root**.
4. Your site will be live at `https://<username>.github.io/atlas-portfolio/`.

## Before going live — replace the placeholders

- **Email address**: search for `hello@atlas-studio.example` in `index.html` (2 places) and `js/main.js` (1 place) and put your real email.
- **Testimonials**: the three quotes in `index.html` (section `id="testimonials"`) are placeholders — swap in real client quotes.
- **Stats**: numbers come from real screenshots but adjust if needed.

## Tech notes

- No frameworks, no build step — pure HTML/CSS/JS.
- Fonts are self-hosted woff2 files in `atlas-media/fonts/`.
- Contact form uses a `mailto:` action so it works on static hosting.
