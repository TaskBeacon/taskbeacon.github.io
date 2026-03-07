# TaskBeacon Task Gallery

Public, statically deployed website that lists TaskBeacon task repositories as a searchable gallery and, when available, attaches a matched browser preview to the main task card.

- Gallery: list and card views, maturity + paradigm filters, last updated, repo/download links
- Task detail pages: README rendering, quick start, metadata, local access panel, optional web preview panel
- Companion detection: baseline tasks automatically pick up matching HTML repos when they share the same `slug` and the companion declares `variant: html`
- Deployment: static export to GitHub Pages via GitHub Actions

## Tech

- Next.js (App Router) with static export (`output: "export"`)
- Tailwind CSS
- Markdown rendering via `react-markdown` with GFM and code highlighting

## Local Dev

Prereqs: Node 20+.

```bash
cd taskbeacon.github.io
npm install

# Refresh the generated index and README snapshots.
npm run index

# Build the static site into ./out.
npm run build
```

Optional: set `GITHUB_TOKEN` locally to increase GitHub API rate limits.

```bash
# macOS/Linux
export GITHUB_TOKEN=...

# Windows PowerShell
$env:GITHUB_TOKEN = "..."
```

## How Indexing Works

Indexing is a build-time step that generates:

- `src/data/tasks_index.json`
- `src/data/readmes/*.md`

The indexer lives at:

- `scripts/build-index.mjs`

It:

1. Lists public repos in the `TaskBeacon` org.
2. Excludes non-task repos via `DENYLIST`.
3. Fetches README content, repo root contents, and optional metadata files.
4. Builds a normalized task record for each task repo.
5. Merges matching HTML companions into the main task card as `web_variant`.

Supported metadata files, in priority order:

- `taskbeacon.yaml`
- `taskbeacon.yml`
- `task.yaml`
- `task.yml`
- `task.json`

Additional parsing:

- README metadata tables can still provide `Short Description`, `PsyFlow Version`, `Language`, and `Voice Name`.
- README maturity badges like `![Maturity: smoke_tested]` are still supported.

Companion matching:

- Main task: usually `variant: baseline`
- Web companion: `variant: html`
- Shared key: `slug`

If both exist, the website keeps the main task card and adds:

- `Run Preview`
- `Repo`
- `Download`

for the matched HTML companion.

Rate limits:

- Without a token, GitHub API requests may fail.
- If indexing fails but an older `src/data/tasks_index.json` exists, the build falls back to the existing index.

## Recommended Metadata

Preferred metadata is `taskbeacon.yaml` at repo root.

Example:

```yaml
id: T000006
slug: mid
title: "Monetary Incentive Delay (MID) Task"
acquisition: eeg
variant: baseline
maturity: piloted
version:
  release_tag: "1.1.2"

tags:
  paradigm: ["MID"]
  modality: ["EEG"]
  language: ["Chinese"]

keywords:
  - mid
  - reward
```

HTML companion example:

```yaml
id: H000006
slug: mid
title: "Monetary Incentive Delay (MID) Task"
acquisition: behavior
variant: html
maturity: prototype
version:
  release_tag: "0.1.0"
```

## Deployment

- Workflow: `.github/workflows/pages.yml`
- Triggers: push to `main`, manual dispatch, and weekly schedule

CI does:

1. `npm ci`
2. `npm run index`
3. `npm run build`
4. Upload `out/` and deploy to GitHub Pages

Repository settings required:

- Settings -> Pages
- Source: `GitHub Actions`

## Excluding Non-Task Repos

Update `DENYLIST` in `scripts/build-index.mjs` for repos that should never appear in the gallery.
