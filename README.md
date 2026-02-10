# TaskBeacon Task Gallery (Website)

Public, statically deployed website that lists and showcases TaskBeacon task template repositories (PsyFlow/TAPS tasks) as a searchable, filterable gallery.

- Gallery: task cards, tags, last updated, links to repo/Run/download
- Task detail pages: README rendering + quick start + metadata panel
- Robust indexing: GitHub API repo list + README + optional `task.yaml`/`task.json`
- Deployment: GitHub Pages static export via GitHub Actions

## Tech

- Next.js (App Router) with static export (`output: "export"`)
- Tailwind CSS
- Markdown rendering via `react-markdown` (+ GFM + code highlighting)

## Local Dev

Prereqs: Node 20+ (Node 22 works).

```bash
cd taskbeacon.github.io
npm install

# Build/refresh the index (optional; works without token but rate-limited)
npm run index

# Build the static site into ./out
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

- `src/data/tasks_index.json` (task metadata used by the UI)
- `src/data/readmes/*.md` (README snapshots for static rendering)

The indexer lives at:

- `scripts/build-index.mjs`

It:

1. Lists public repos in the `TaskBeacon` org (GitHub API, paginated `per_page=100`).
2. Excludes non-task repos via a denylist (see `DENYLIST` in the script).
3. For each repo, fetches:
   - README (raw)
   - repo root contents (to detect `config/`, `assets/`, `src/` and metadata files)
   - optional metadata `task.yaml` / `task.yml` / `task.json` (repo root)
4. Produces conservative inferred tags when metadata is missing (primarily from repo name).

Additional parsing:

- If the README includes the standard metadata table, the indexer will use `Short Description`, `PsyFlow Version`, `Language`, and `Voice Name` when present.
- If the README includes a maturity badge like `![Maturity: smoke_tested]`, the maturity value is extracted and shown on cards.

Rate limits:

- Without token, GitHub API is rate-limited and the script may fail.
- If the script fails but an older `src/data/tasks_index.json` exists, it will fall back to the existing index so `npm run build` still works.

## Metadata Schema (`task.yaml`)

If a task repo includes `task.yaml` (or `task.yml`) at repo root, the indexer reads it.
Supported fields:

```yaml
name: "T000014-stroop"
short_description: "Classic Stroop color-word interference task template."

tags:
  paradigm: ["Stroop"]
  response: ["2-choice"]
  modality: ["behavior"]
  language: ["en"]

keywords:
  - stroop
  - interference

maturity: "smoke_tested"    # optional (e.g. smoke_tested, piloted)
psyflow_version: "^0.2.0"  # optional
has_voiceover: false        # optional
```

Notes:

- `tags.*` values must be arrays of strings.
- Keep tags stable and human-readable (e.g., `"N-back"`, not `"nback"`).

## Deployment (GitHub Pages)

- GitHub Action workflow: `.github/workflows/pages.yml`
- Triggered on push to `main`, manual dispatch, and weekly schedule.

What CI does:

1. `npm ci`
2. `npm run index` (uses `secrets.GITHUB_TOKEN` automatically)
3. `npm run build` (static export to `out/`)
4. Upload `out/` as Pages artifact + deploy

Repository settings required:

- Settings -> Pages
- Source: GitHub Actions

## Excluding Non-Task Repos

Update the denylist in `scripts/build-index.mjs`:

- `DENYLIST` contains known non-task repos (e.g., `task-registry`, `.github`, `psyflow`, `taskbeacon.github.io`).

## PR Notes

This repo historically contained a Sphinx build under `docs/`.
The Next.js site builds to `out/` for GitHub Pages, and does not modify `docs/`.

