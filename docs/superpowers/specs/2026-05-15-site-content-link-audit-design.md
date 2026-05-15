# TaskBeacon Site Content And Link Audit Design

## Goal

Fix the public TaskBeacon site so page copy, preview counts, task entry points, recruitment text, team content, and documentation links match the current generated data and route to usable web pages.

## Scope

This change covers the Next.js site in `taskbeacon.github.io`. It does not change task repositories, PsyFlow runtime code, or psyflow-web task implementations.

## Requirements

- Preview counts must be derived from the generated index and HTML companion manifest consistently.
- Home, footer, task explorer, and featured task UI must not under-report available previews.
- Jobs copy must be readable UTF-8 text and must not hard-code the stale “35 tasks” count.
- Teams and About pages must avoid placeholder/internal migration language.
- Task list and featured task titles must provide direct links to full task pages.
- TAPS, localization, and versioning resources must route to first-class site pages instead of GitHub blob URLs.
- A repeatable verification command must catch stale task counts, placeholder copy, mojibake text, missing preview associations, broken exported internal links, and missing documentation pages.

## Design

The index builder will attach matching HTML companions during generation instead of leaving all `web_variant` values empty and relying on client-side manifest loading to correct the data later. The existing manifest remains available for psyflow-web and client-side fallback.

The site will get a lightweight content-audit script under `scripts/` and an npm script that can run after `npm run build`. This script will read `src/data/tasks_index.json`, `public/psyflow-web/task-manifest.json`, source files, and exported HTML to verify the public content contract.

Documentation pages will be implemented as simple Next routes with curated copy. The resource cards will point to these routes. Each page will include a GitHub source link for users who want the raw markdown.

Jobs and Teams content will be rewritten as public-facing copy. Jobs will read the current task count from the generated index at render time.

Task rows and the featured carousel will add direct links to task detail pages while preserving the existing drawer-based quick view.

## Testing

The first failing check will be `npm run check:site-content`, added before production code changes. It should initially fail on the current site because preview associations are missing from the index, Jobs text is stale/garbled, Teams contains placeholders, and documentation routes are absent. After fixes, `npm run check:site-content`, `npm run build`, and an exported internal-link audit must pass.
