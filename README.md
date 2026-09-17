# Sohaib Temsamani — portfolio

Personal site of Sohaib Temsamani, AI & computer-vision engineer: https://sohaibtemsa.com

Static HTML + CSS + a small vanilla JS file, no build step. Everything works without JavaScript.

| Path | What |
|---|---|
| `index.html` | French page (default) |
| `en/index.html` | English page |
| `css/site.css` | The only stylesheet (tokens, dark bands, motion) |
| `js/site.js` | Progressive enhancement: scroll reveals, glass section edge, projects intro fade, active project, experience rail, active nav, clock, copy e-mail |
| `assets/icons.svg` | Phosphor icon sprite (MIT, licence alongside) |
| `assets/fonts/` | Archivo (text) and Martian Mono (numbers, dates, code), variable, subset to Latin, OFL licences alongside |
| `assets/img/` | Portrait and ST logo (WebP), link-preview images `og-fr.jpg` / `og-en.jpg` |
| `cv/CV_TEMSAMANI_Sohaib.pdf` | The CV (keep this path: it is linked from outside) |

Both pages carry the same content; edit them together.

## Preview locally (macOS)

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open http://127.0.0.1:8000 (French) and http://127.0.0.1:8000/en/ (English).

## Deploy

GitHub Pages publishes the `main` branch to `sohaibtemsa.com` (`CNAME`). Pushing `main` is a release.
