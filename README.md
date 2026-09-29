# Helper-Jarvis — Website

Official landing page for **Helper-Jarvis**, the open-source personal AI assistant by **SVTeam**.
Sover by **SVTeam Superintelligence Labs** · [svteam.in](https://svteam.in)

Modeled after the OpenJarvis (Stanford) site structure: hero + live terminal, stats,
features, architecture layers, quickstart, showcase and community CTA — rethemed in a
J.A.R.V.I.S.-style HUD look (arc-reactor mark, cyan/blue grid, dark/light themes).

## Structure

```
index.html          # single-page landing site
styles.css          # themeable styles (dark default, light via toggle)
script.js           # theme toggle, typing terminal, copy buttons, scroll reveals
assets/logo-mark.svg  # arc-reactor logo mark
assets/favicon.svg    # favicon
```

No build step, no dependencies — plain HTML/CSS/JS.

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8080
# → http://localhost:8080
```

## Deploy to GitHub Pages

1. Push this folder to the `SVTeam-Official/Helper-Jarvis` repo (or a `website` branch).
2. Repo **Settings → Pages → Deploy from a branch** → pick `main` and `/ (root)`.
3. The site will be live at `https://svteam-official.github.io/Helper-Jarvis/`.

All branding lives in `index.html` (title, meta, hero copy) and `styles.css` (colors in
the `:root` blocks at the top) if you want to tweak the look.

## Credits

- Design inspiration: [OpenJarvis](https://openjarvis.stanford.edu/) (Stanford) — structure only, no assets copied.
- Owned by **SVTeam** · Sover by **SVTeam Superintelligence Labs**.
