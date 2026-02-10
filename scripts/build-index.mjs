import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

const ORG = process.env.TASKBEACON_ORG || "TaskBeacon";
const TOKEN =
  process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_PAT || "";

const GH_API = "https://api.github.com";
const OUT_INDEX = path.join(process.cwd(), "src", "data", "tasks_index.json");
const OUT_READMES_DIR = path.join(
  process.cwd(),
  "src",
  "data",
  "readmes"
);

const DENYLIST = new Set([
  "task-registry",
  ".github",
  "dev-kit",
  "psyflow",
  "taskbeacon-mcp",
  "community",
  "taskbeacon.github.io"
]);

const PARADIGM_MAP = [
  { re: /\bant\b/i, label: "ANT" },
  { re: /\bstroop\b/i, label: "Stroop" },
  { re: /\bsst\b/i, label: "SST" },
  { re: /\bn\s*-?back\b/i, label: "N-back" },
  { re: /\bmid\b/i, label: "MID" },
  { re: /\bprl\b/i, label: "PRL" },
  { re: /\bflanker\b/i, label: "Flanker" },
  { re: /\bsimon\b/i, label: "Simon" },
  { re: /\bgo\s*-?no\s*-?go\b/i, label: "Go/No-Go" },
  { re: /\bbart\b/i, label: "BART" },
  { re: /\bax\s*-?cpt\b/i, label: "AX-CPT" },
  { re: /\bcpt\b/i, label: "CPT" },
  { re: /\brest\b/i, label: "Rest" },
  { re: /\bmovie\b/i, label: "Movie" }
];

function ghHeaders(extra = {}) {
  const h = {
    "User-Agent": "taskbeacon-gallery-indexer",
    "X-GitHub-Api-Version": "2022-11-28",
    ...extra
  };
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return h;
}

async function ghGetJson(url, { allow404 = false } = {}) {
  const res = await fetch(url, {
    headers: ghHeaders({ Accept: "application/vnd.github+json" })
  });

  if (allow404 && res.status === 404) return null;

  if (!res.ok) {
    const body = await safeReadText(res);
    throw new Error(
      `GitHub API error ${res.status} ${res.statusText} for ${url}\n${body}`
    );
  }

  return res.json();
}

async function ghGetRaw(url, { allow404 = false } = {}) {
  const res = await fetch(url, {
    headers: ghHeaders({ Accept: "application/vnd.github.raw" })
  });

  if (allow404 && res.status === 404) return null;

  if (!res.ok) {
    const body = await safeReadText(res);
    throw new Error(
      `GitHub API error ${res.status} ${res.statusText} for ${url}\n${body}`
    );
  }

  return res.text();
}

async function safeReadText(res) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

function uniq(xs) {
  const out = [];
  const seen = new Set();
  for (const x of xs) {
    const v = String(x ?? "").trim();
    if (!v) continue;
    const k = v.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(v);
  }
  return out;
}

function toArray(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "string") return [v];
  return [];
}

function normalizeTags(tags) {
  return {
    paradigm: uniq(toArray(tags?.paradigm).map(String)),
    response: uniq(toArray(tags?.response).map(String)),
    modality: uniq(toArray(tags?.modality).map(String)),
    language: uniq(toArray(tags?.language).map(String))
  };
}

function detectRunAnchor(markdown) {
  const lines = String(markdown ?? "").split(/\r?\n/);
  for (const line of lines) {
    const m = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const heading = m[2].trim();

    // Prefer the exact section "Run".
    if (/^run$/i.test(heading)) return "#run";
    if (/^running$/i.test(heading)) return "#running";
  }

  // Fallback: find any heading containing "run".
  for (const line of lines) {
    const m = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const heading = m[2].trim();
    if (!/\brun\b/i.test(heading)) continue;
    const slug = githubSlug(heading);
    if (slug) return `#${slug}`;
  }

  return "#run";
}

function githubSlug(heading) {
  // GitHub’s exact slug algorithm is more complex (deduping, unicode, etc).
  // For our use (Run/Running/How to run) this approximation is sufficient.
  return String(heading ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripMarkdownInline(s) {
  return String(s ?? "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(s, max = 140) {
  const t = String(s ?? "").trim();
  if (!t) return "";
  return t.length > max ? `${t.slice(0, max - 1)}?` : t;
}

function readmeTableValue(markdown, fieldName) {
  const wanted = String(fieldName ?? "").trim().toLowerCase();
  if (!wanted) return "";

  const lines = String(markdown ?? "").split(/\r?\n/);
  for (const line of lines) {
    const t = String(line ?? "").trim();
    if (!t.startsWith("|")) continue;

    // Separator rows like: |-----|-----|
    if (/^\|\s*:?-+:?\s*\|/.test(t)) continue;

    let cols = t.split("|").map((c) => c.trim());
    while (cols.length && cols[0] === "") cols = cols.slice(1);
    while (cols.length && cols[cols.length - 1] === "") cols = cols.slice(0, -1);
    if (cols.length < 2) continue;

    const key = String(cols[0] ?? "").trim().toLowerCase();
    if (!key || key !== wanted) continue;

    const value = stripMarkdownInline(cols.slice(1).join(" | "));
    if (!value) continue;
    return value;
  }

  return "";
}

function normalizeLanguageLabel(v) {
  const s = String(v ?? "").trim();
  if (!s) return "";
  const lower = s.toLowerCase();
  if (lower === "en" || /\benglish\b/i.test(lower)) return "English";
  if (lower === "zh" || /^zh\b/.test(lower) || /\bchinese\b/i.test(lower) || /\u4e2d\u6587/.test(s)) return "Chinese";
  return s;
}

function normalizeMaturity(v) {
  const s = String(v ?? "").trim();
  if (!s) return "";
  return s.toLowerCase().replace(/\s+/g, "_");
}

function extractMaturityFromReadme(markdown) {
  const fromTable = readmeTableValue(markdown, "Maturity");
  if (fromTable) return fromTable;

  const m1 = /!\[\s*Maturity\s*:\s*([^\]]+?)\s*\]/i.exec(String(markdown ?? ""));
  if (m1?.[1]) return m1[1].trim();

  // shields.io style: .../badge/Maturity-smoke_tested-...
  const m2 = /badge\/Maturity-([^\-\s\)]+)-/i.exec(String(markdown ?? ""));
  if (m2?.[1]) {
    try {
      return decodeURIComponent(m2[1]).trim();
    } catch {
      return String(m2[1]).trim();
    }
  }

  return "";
}


function firstParagraphDescription(markdown) {
  const text = String(markdown ?? "").replace(/<!--([\s\S]*?)-->/g, "");
  const lines = text.split(/\r?\n/).map((l) => l.trim());

  const paragraphs = [];
  let buf = [];
  for (const l of lines) {
    if (!l) {
      if (buf.length) paragraphs.push(buf);
      buf = [];
      continue;
    }
    buf.push(l);
  }
  if (buf.length) paragraphs.push(buf);

  function isBadgeOrImageLine(l) {
    return /^\[!\[/.test(l) || /^!\[/.test(l);
  }

  function isHeadingLine(l) {
    return /^#{1,6}\s+/.test(l);
  }

  function looksLikeTableLine(l) {
    if (l.startsWith("|")) return true;
    return /^\|?\s*[-:]+\s*\|/.test(l);
  }

  function looksLikeListLine(l) {
    return /^[-*+]\s+/.test(l) || /^\d+\.\s+/.test(l);
  }

  for (const para of paragraphs) {
    const cleaned = para.filter((l) => !isBadgeOrImageLine(l));
    if (cleaned.length === 0) continue;

    if (isHeadingLine(cleaned[0])) continue;
    if (cleaned.every(looksLikeTableLine)) continue;
    if (cleaned.every(looksLikeListLine)) continue;

    const raw = stripMarkdownInline(cleaned.join(" "));
    if (!raw) continue;

    // Skip markdown tables that got flattened.
    const pipeCount = (raw.match(/\|/g) || []).length;
    if (pipeCount >= 6) continue;

    const max = 140;
    return raw.length > max ? `${raw.slice(0, max - 1)}…` : raw;
  }

  return "";
}

function inferTagsFromRepo(repoName, markdown) {
  const hayName = String(repoName ?? "");
  const hay = `${repoName}\n${markdown ?? ""}`;
  const paradigm = [];
  for (const p of PARADIGM_MAP) {
    // Avoid README false positives. Paradigms are usually encoded in the repo name.
    if (p.re.test(hayName)) {
      paradigm.push(p.label);
    }
  }

  const response = [];
  // Conservative: only infer when explicit.
  if (/\bgo\s*-?no\s*-?go\b/i.test(hay)) response.push("go/no-go");
  if (/\b2\s*-?choice\b/i.test(hay) || /\btwo\s+choice\b/i.test(hay))
    response.push("2-choice");
  if (/\bcontinuous\b/i.test(hay) && /\bresponse\b/i.test(hay))
    response.push("continuous");

  const modality = [];
  if (/\beeg\b/i.test(hay) || /\berp\b/i.test(hay)) modality.push("EEG");
  if (/\bfmri\b/i.test(hay) || /\bscanner\b/i.test(hay)) modality.push("fMRI");
  if (/\bbehavior\b/i.test(hay) || /\bbehaviour\b/i.test(hay))
    modality.push("behavior");

  const language = [];
  // Only infer language when explicitly stated.
  if (/\blanguage\s*:\s*en\b/i.test(hay) || /\benglish\b/i.test(hay))
    language.push("English");
  if (/\blanguage\s*:\s*zh\b/i.test(hay) || /\bchinese\b/i.test(hay) || /\u4e2d\u6587/.test(hay))
    language.push("Chinese");

  return {
    paradigm: uniq(paradigm),
    response: uniq(response),
    modality: uniq(modality),
    language: uniq(language)
  };
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function listOrgRepos() {
  const perPage = 100;
  let page = 1;
  const repos = [];

  while (true) {
    const url = `${GH_API}/orgs/${encodeURIComponent(ORG)}/repos?per_page=${perPage}&page=${page}&type=public&sort=updated&direction=desc`;
    const batch = await ghGetJson(url);
    if (!Array.isArray(batch) || batch.length === 0) break;
    repos.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
  }

  return repos;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function safeFilename(name) {
  return String(name).replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function buildIndex() {
  ensureDir(path.dirname(OUT_INDEX));
  ensureDir(OUT_READMES_DIR);

  const repos = await listOrgRepos();

  const tasks = [];

  for (const r of repos) {
    const repo = r?.name;
    if (!repo) continue;

    if (DENYLIST.has(repo)) continue;
    if (r.archived || r.disabled) continue;

    // Root contents (for structure + metadata presence)
    const rootContentsUrl = `${GH_API}/repos/${encodeURIComponent(ORG)}/${encodeURIComponent(repo)}/contents`;
    const root = await ghGetJson(rootContentsUrl, { allow404: true });
    const rootNames = new Set(
      Array.isArray(root) ? root.map((x) => String(x?.name ?? "")) : []
    );

    const structure = {
      config: rootNames.has("config"),
      assets: rootNames.has("assets"),
      src: rootNames.has("src")
    };

    const metaCandidates = ["task.yaml", "task.yml", "task.json"];
    const metaFile = metaCandidates.find((f) => rootNames.has(f)) || null;

    const looksLikeTask =
      /^T\d{6}[-_]/i.test(repo) ||
      Boolean(metaFile) ||
      (structure.src && (structure.config || structure.assets));
    if (!looksLikeTask) continue;

    let meta = null;
    if (metaFile) {
      const metaUrl = `${GH_API}/repos/${encodeURIComponent(ORG)}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(metaFile)}`;
      const raw = await ghGetRaw(metaUrl, { allow404: true });
      if (raw) {
        if (metaFile.endsWith(".json")) meta = safeJsonParse(raw);
        else {
          try {
            meta = parseYaml(raw);
          } catch {
            meta = null;
          }
        }
      }
    }

    // README
    const readmeUrl = `${GH_API}/repos/${encodeURIComponent(ORG)}/${encodeURIComponent(repo)}/readme`;
    const readme = await ghGetRaw(readmeUrl, { allow404: true });

    const shortFromReadmeTable = readmeTableValue(readme, "Short Description");
    const shortFromReadme = firstParagraphDescription(readme);
    const shortFromRepo = String(r.description ?? "").trim();

    const maturity = normalizeMaturity(
      (typeof meta?.maturity === "string" ? meta.maturity : "") ||
        extractMaturityFromReadme(readme)
    ) || null;

    const tagsFromMeta = normalizeTags(meta?.tags);
    const tagsInferred = inferTagsFromRepo(repo, readme);

    const tags = {
      paradigm: uniq([...(tagsFromMeta.paradigm ?? []), ...(tagsInferred.paradigm ?? [])]),
      response: uniq([...(tagsFromMeta.response ?? []), ...(tagsInferred.response ?? [])]),
      modality: uniq([...(tagsFromMeta.modality ?? []), ...(tagsInferred.modality ?? [])]),
      language: uniq([...(tagsFromMeta.language ?? []), ...(tagsInferred.language ?? [])])
    };

    // Prefer explicit README table language if present.
    const languageFromReadme = normalizeLanguageLabel(readmeTableValue(readme, "Language"));
    if (languageFromReadme) {
      tags.language = uniq([...(tags.language ?? []), languageFromReadme]);
    }

    tags.language = uniq((tags.language ?? []).map(normalizeLanguageLabel).filter(Boolean));

    const keywords = uniq([
      ...toArray(meta?.keywords).map(String),
      ...tags.paradigm,
      ...(repo
        .replace(/^T\d{6}-/i, "")
        .split(/[-_]+/)
        .filter(Boolean))
    ]);

    let short_description = String(meta?.short_description ?? "").trim();
    if (!short_description) short_description = shortFromReadmeTable;
    if (!short_description) short_description = shortFromReadme;
    if (!short_description) short_description = shortFromRepo;
    if (!short_description) {
      const p = tags.paradigm?.[0];
      short_description = p
        ? `${p} task template (PsyFlow/TAPS).`
        : `${repo} task template (PsyFlow/TAPS).`;
    }

    short_description = truncate(short_description);

    let psyflow_version = meta?.psyflow_version ?? null;
    if (!psyflow_version) {
      const v = readmeTableValue(readme, "PsyFlow Version");
      psyflow_version = v || null;
    }

    let has_voiceover =
      typeof meta?.has_voiceover === "boolean" ? meta.has_voiceover : null;
    if (has_voiceover === null) {
      const voiceName = readmeTableValue(readme, "Voice Name");
      if (voiceName) has_voiceover = true;
    }

    const run_anchor = readme ? detectRunAnchor(readme) : "#run";

    const item = {
      repo,
      full_name: r.full_name,
      html_url: r.html_url,
      default_branch: r.default_branch,
      short_description,
      maturity,
      tags,
      keywords,
      psyflow_version,
      has_voiceover,
      last_updated: r.pushed_at || r.updated_at,
      structure,
      readme_run_anchor: run_anchor
    };

    tasks.push(item);

    // Persist README into the repo for static rendering.
    if (readme) {
      const outReadmePath = path.join(OUT_READMES_DIR, `${safeFilename(repo)}.md`);
      fs.writeFileSync(outReadmePath, readme, "utf8");
    }
  }

  tasks.sort((a, b) => (a.last_updated < b.last_updated ? 1 : -1));

  const index = {
    schema_version: 2,
    generated_at: new Date().toISOString(),
    org: ORG,
    tasks
  };

  fs.writeFileSync(OUT_INDEX, JSON.stringify(index, null, 2) + "\n", "utf8");
  return index;
}

async function main() {
  try {
    const index = await buildIndex();
    console.log(
      `Indexed ${index.tasks.length} repos from ${ORG}. Wrote ${path.relative(
        process.cwd(),
        OUT_INDEX
      )}`
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Index build failed:\n" + msg);

    // Fail open if an index already exists. This keeps `npm run build` usable
    // even when GitHub rate limits are hit.
    if (fs.existsSync(OUT_INDEX)) {
      console.warn(
        `Using existing ${path.relative(process.cwd(), OUT_INDEX)} (stale).`
      );
      process.exit(0);
    }

    process.exit(1);
  }
}

await main();
