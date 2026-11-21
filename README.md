# HarryH11.github.io

Personal portfolio of **Harry Hutany**: robotics, automation and embedded systems (BEng (Hons) Robotics and AI, University of Hertfordshire).

Live site: https://harryh11.github.io/

## Run locally
```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Structure
| Path | What |
| --- | --- |
| `index.html` | Home page: about, skills, projects, experience, education |
| `project.html` + `projects.js` | Project write-ups, `project.html?id=<project-id>` |
| `harry.css` | My overrides on top of the base styles |
| `assets/work/` | Project images |
| `404.html`, `robots.txt`, `sitemap.xml` | GitHub Pages and search essentials |
| `CLAUDE.md`, `.claude/settings.json` | Rules for AI-assisted editing (no AI co-authors) |
| `.githooks/commit-msg` | Strips AI attribution trailers from commit messages |

## One-time setup after cloning
```bash
git config core.hooksPath .githooks
```

Layout adapted from a portfolio template by a fellow UH Robotics and AI graduate.
