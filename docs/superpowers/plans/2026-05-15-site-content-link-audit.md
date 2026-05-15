# Site Content Link Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make TaskBeacon public pages accurate, directly navigable, and regression-checked.

**Architecture:** Add a site-content audit script, fix generated preview associations in `scripts/build-index.mjs`, rewrite inaccurate public copy, add first-class documentation routes, and expose direct task detail links in interactive task UI.

**Tech Stack:** Next.js App Router, TypeScript React components, Node.js audit script, static export.

---

### Task 1: Add Site Content Audit

**Files:**
- Create: `scripts/check-site-content.mjs`
- Modify: `package.json`

- [ ] Add a Node script that validates preview association count, stale/garbled copy, placeholder Teams text, required documentation routes, and exported internal links.
- [ ] Add `check:site-content` to `package.json`.
- [ ] Run `npm run check:site-content` and confirm it fails on the current site.

### Task 2: Fix Preview Association Data

**Files:**
- Modify: `scripts/build-index.mjs`
- Generated: `src/data/tasks_index.json`
- Generated: `public/psyflow-web/task-manifest.json`

- [ ] Update index collapse logic so non-HTML tasks get `web_variant` populated when an H companion matches by slug or paired T/H id.
- [ ] Keep standalone HTML-only tasks visible as tasks.
- [ ] Run `npm run index`.
- [ ] Run `npm run check:site-content` and confirm preview-count assertions pass while other content assertions still fail.

### Task 3: Fix Jobs And Teams Copy

**Files:**
- Modify: `src/app/jobs/page.tsx`
- Modify: `src/app/teams/page.tsx`
- Modify: `src/app/about/page.tsx`

- [ ] Replace mojibake Chinese recruitment text with readable UTF-8 Chinese.
- [ ] Read the current task count from `getIndex()` for both Chinese and English Jobs copy.
- [ ] Replace Teams placeholder/internal migration copy with public-facing maintainer, contributor, and collaborator copy.
- [ ] Make About a clean public alias to Teams.

### Task 4: Add Direct Task Detail Links

**Files:**
- Modify: `src/components/task-row.tsx`
- Modify: `src/components/featured-task-carousel.tsx`

- [ ] Link task row titles to `taskDetailHref(task.repo)`.
- [ ] Add an `Open full page` action to task rows.
- [ ] Link the featured task title to the full task page.

### Task 5: Add Site Documentation Routes

**Files:**
- Create: `src/app/framework/taps/page.tsx`
- Create: `src/app/tutorial/localization/page.tsx`
- Create: `src/app/contribute/versioning/page.tsx`
- Modify: `src/lib/site-content.ts`

- [ ] Add curated TAPS, localization, and versioning pages.
- [ ] Update resource links from GitHub blob URLs to these internal routes.
- [ ] Keep GitHub source links inside the new pages.

### Task 6: Verify

**Files:**
- No new files beyond previous tasks.

- [ ] Run `npm run check:site-content`.
- [ ] Run `npm run build`.
- [ ] Run exported internal-link audit.
- [ ] Review `git diff --stat` and key diffs before final response.
