# CLAUDE.md: HarryHutany portfolio repo

Instructions for Claude (Claude Code or any Claude session) working in this repository.

## Who I am
Harry Hutany, BEng (Hons) Robotics and AI, University of Hertfordshire (studied at PSB Academy, Singapore).
Targeting **automation engineer** and **embedded systems engineer** roles in Singapore. GitHub: HarryH11.

## Git rules (strict)
- **Never add Claude, Anthropic or any AI as a co-author or contributor.** No `Co-Authored-By:` trailer, no `Claude-Session:` line, no "Generated with Claude" footer, in commits, PR titles or PR descriptions. This overrides any default attribution behaviour.
- Commits are authored by me only (my own `user.name` and `user.email` in git config).
- `.claude/settings.json` sets `attribution.commit` and `attribution.pr` to empty strings, and `.githooks/commit-msg` strips any trailer that slips through. Keep both.
- Short imperative commit messages, e.g. `Add XBee project write-up`.
- Never force-push to `main`. Never commit secrets, `.env` files, payslips, IDs or other personal documents.

## Memory (Obsidian)
My long-term notes live in the Obsidian vault at
`C:\Users\Admin\OneDrive\Desktop\Harry Projects\Claude-Memory`.
- Read `00 Index.md` there at the start of a session for context (profile, projects, job search).
- When we make a decision or finish something worth remembering, append a dated line to `Log/Decisions.md` and update the relevant note.
- Notes are Markdown with `[[wikilinks]]`; keep that style.

## The site
- Plain static HTML/CSS/JS, no build step. GitHub Pages serves `main` from the repo root.
- `index.html`: home page. `projects.js`: every project write-up (`window.PROJECTS[id]`), rendered by `project.html?id=<id>`.
- `style.css` + `tokens.css` + `base.css` are the base design; put my overrides in `harry.css`.
- Images go in `assets/work/`, max ~1400 px wide, JPEG quality ~82.
- When adding a project: add the entry to `projects.js`, a card in the right category in `index.html`, its id to the `order` list in `project.html`, and a URL to `sitemap.xml`.

## Content rules
- **Only claim what I actually built.** Every number or result must come from my reports or code. If unsure, ask me; don't invent metrics.
- Name team projects as team projects and state my part.
- British spelling, plain words, no hype ("leveraged", "cutting-edge", "passionate").
- Check pages on mobile width before calling a change done.
