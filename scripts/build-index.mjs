import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

const ORG = process.env.TASKBEACON_ORG || "TaskBeacon";
const TOKEN =
  process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_PAT || "";
const PAGES_ORIGIN =
  process.env.TASKBEACON_PAGES_ORIGIN || `https://${String(ORG).toLowerCase()}.github.io`;
const HTML_RUNNER_REPO = process.env.TASKBEACON_HTML_RUNNER_REPO || "psyflow-web";
const HTML_RUNNER_URL =
  process.env.TASKBEACON_HTML_RUNNER_URL ||
  `${PAGES_ORIGIN}/${encodeURIComponent(HTML_RUNNER_REPO)}/`;
const LOCAL_WORKSPACE_ROOT = process.env.TASKBEACON_LOCAL_WORKSPACE || path.resolve(process.cwd(), "..");

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

const METADATA_FILES = [
  "taskbeacon.yaml",
  "taskbeacon.yml",
  "task.yaml",
  "task.yml",
  "task.json"
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
  return t.length > max ? `${t.slice(0, max - 3)}...` : t;
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

function normalizeVariant(v) {
  const s = String(v ?? "").trim();
  if (!s) return null;
  return s.toLowerCase().replace(/\s+/g, "_");
}

function normalizeModalityLabel(v) {
  const s = String(v ?? "").trim();
  if (!s) return "";
  const lower = s.toLowerCase();
  if (lower === "eeg") return "EEG";
  if (lower === "fmri") return "fMRI";
  if (lower === "behavior" || lower === "behaviour") return "behavior";
  return s;
}

function normalizeAcquisition(v) {
  return normalizeModalityLabel(v);
}

function inferSlugFromRepo(repo) {
  return String(repo ?? "")
    .replace(/^[A-Z]\d{6}[-_]/i, "")
    .trim()
    .toLowerCase();
}

function inferHtmlRunUrl(repo, explicitUrl = null) {
  if (explicitUrl) return String(explicitUrl);
  const url = new URL(String(HTML_RUNNER_URL));
  url.searchParams.set("task", String(repo ?? "").trim());
  return url.toString();
}

function isHtmlVariant(item) {
  return normalizeVariant(item?.variant) === "html";
}

function downloadZipUrl(htmlUrl, defaultBranch) {
  return `${htmlUrl}/archive/refs/heads/${defaultBranch}.zip`;
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
    return raw.length > max ? `${raw.slice(0, max - 3)}...` : raw;
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

function buildTaskItem({
  repo,
  full_name,
  html_url,
  default_branch,
  last_updated,
  repo_description,
  structure,
  meta,
  readme
}) {
  const shortFromReadmeTable = readmeTableValue(readme, "Short Description");
  const shortFromReadme = firstParagraphDescription(readme);
  const shortFromRepo = String(repo_description ?? "").trim();

  const maturity =
    normalizeMaturity(
      (typeof meta?.maturity === "string" ? meta.maturity : "") ||
        extractMaturityFromReadme(readme)
    ) || null;

  const acquisition = normalizeAcquisition(meta?.acquisition);
  const variant = normalizeVariant(meta?.variant);
  const tagsFromMeta = normalizeTags(meta?.tags);
  if (acquisition) {
    tagsFromMeta.modality = uniq([...(tagsFromMeta.modality ?? []), acquisition]);
  }
  const tagsInferred = inferTagsFromRepo(repo, readme);

  const tags = {
    paradigm: uniq([...(tagsFromMeta.paradigm ?? []), ...(tagsInferred.paradigm ?? [])]),
    response: uniq([...(tagsFromMeta.response ?? []), ...(tagsInferred.response ?? [])]),
    modality: uniq([...(tagsFromMeta.modality ?? []), ...(tagsInferred.modality ?? [])]),
    language: uniq([...(tagsFromMeta.language ?? []), ...(tagsInferred.language ?? [])])
  };

  const languageFromReadme = normalizeLanguageLabel(readmeTableValue(readme, "Language"));
  if (languageFromReadme) {
    tags.language = uniq([...(tags.language ?? []), languageFromReadme]);
  }

  tags.language = uniq((tags.language ?? []).map(normalizeLanguageLabel).filter(Boolean));

  const title = String(meta?.title ?? meta?.name ?? repo).trim() || repo;
  const slug = String(meta?.slug ?? inferSlugFromRepo(repo)).trim().toLowerCase() || repo.toLowerCase();
  const id = String(meta?.id ?? meta?.name ?? repo).trim() || repo;
  const release_tag = String(meta?.version?.release_tag ?? meta?.release_tag ?? "").trim() || null;
  const explicitRunUrl =
    meta?.links?.run_url ??
    meta?.preview?.run_url ??
    meta?.deploy?.run_url ??
    meta?.web?.run_url ??
    null;

  const keywords = uniq([
    ...toArray(meta?.keywords).map(String),
    ...tags.paradigm,
    slug,
    ...(repo
      .replace(/^[A-Z]\d{6}-/i, "")
      .split(/[-_]+/)
      .filter(Boolean))
  ]);

  let short_description = String(meta?.short_description ?? "").trim();
  if (!short_description) short_description = shortFromReadmeTable;
  if (!short_description) short_description = shortFromReadme;
  if (!short_description) short_description = shortFromRepo;
  if (!short_description) {
    const p = tags.paradigm?.[0];
    short_description =
      variant === "html"
        ? `${title} web preview built for browser-based task walkthroughs.`
        : p
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

  return {
    id,
    slug,
    title,
    acquisition: acquisition || null,
    variant,
    release_tag,
    repo,
    full_name,
    html_url,
    default_branch,
    short_description,
    maturity,
    tags,
    keywords,
    psyflow_version,
    has_voiceover,
    last_updated,
    structure,
    readme_run_anchor: run_anchor,
    run_url: variant === "html" ? inferHtmlRunUrl(repo, explicitRunUrl) : null,
    web_variant: null
  };
}

function discoverLocalHtmlTasks(existingRepos) {
  if (!fs.existsSync(LOCAL_WORKSPACE_ROOT)) {
    return [];
  }

  const entries = fs.readdirSync(LOCAL_WORKSPACE_ROOT, { withFileTypes: true });
  const items = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || !/^H\d{6}[-_]/i.test(entry.name)) continue;
    if (existingRepos.has(entry.name)) continue;

    const repoDir = path.join(LOCAL_WORKSPACE_ROOT, entry.name);
    const rootNames = new Set(fs.readdirSync(repoDir));
    const metaFile = METADATA_FILES.find((name) => rootNames.has(name)) || null;
    if (!metaFile) continue;
    const metaPath = path.join(repoDir, metaFile);

    let meta = null;
    try {
      const raw = fs.readFileSync(metaPath, "utf8");
      meta = metaFile.endsWith(".json") ? safeJsonParse(raw) : parseYaml(raw);
    } catch {
      meta = null;
    }

    if (normalizeVariant(meta?.variant) !== "html") continue;

    const readmePath = path.join(repoDir, "README.md");
    const readme = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : "";
    const stats = fs.statSync(metaPath);

    items.push(
      buildTaskItem({
        repo: entry.name,
        full_name: `${ORG}/${entry.name}`,
        html_url: `https://github.com/${ORG}/${entry.name}`,
        default_branch: "main",
        last_updated: stats.mtime.toISOString(),
        repo_description: "",
        structure: {
          config: rootNames.has("config"),
          assets: rootNames.has("assets"),
          src: rootNames.has("src")
        },
        meta,
        readme
      })
    );
  }

  return items;
}

function pickPrimaryTask(items) {
  return (
    items.find((item) => normalizeVariant(item.variant) === "baseline") ||
    items.find((item) => /^T\d{6}[-_]/i.test(item.repo)) ||
    items[0]
  );
}

function toWebVariant(item) {
  return {
    repo: item.repo,
    title: item.title,
    html_url: item.html_url,
    default_branch: item.default_branch,
    short_description: item.short_description,
    maturity: item.maturity ?? null,
    acquisition: item.acquisition ?? null,
    variant: item.variant ?? null,
    release_tag: item.release_tag ?? null,
    last_updated: item.last_updated,
    run_url: item.run_url ?? inferHtmlRunUrl(item.repo),
    download_zip: downloadZipUrl(item.html_url, item.default_branch)
  };
}

function mergeHtmlCompanions(items) {
  const groups = new Map();
  for (const item of items) {
    const key = item.slug || item.repo.toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }

  const merged = [];
  for (const groupItems of groups.values()) {
    const htmlItems = groupItems.filter((item) => isHtmlVariant(item));
    const nonHtmlItems = groupItems.filter((item) => !isHtmlVariant(item));

    if (htmlItems.length === 0 || nonHtmlItems.length === 0) {
      merged.push(...groupItems);
      continue;
    }

    const primary = pickPrimaryTask(nonHtmlItems);
    const webVariant = toWebVariant(
      [...htmlItems].sort((a, b) => (a.last_updated < b.last_updated ? 1 : -1))[0]
    );

    merged.push({ ...primary, web_variant: webVariant });
    for (const item of nonHtmlItems) {
      if (item.repo !== primary.repo) {
        merged.push(item);
      }
    }
  }

  return merged;
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

    const metaCandidates = METADATA_FILES;
    const metaFile = metaCandidates.find((f) => rootNames.has(f)) || null;

    const looksLikeTask =
      /^[TH]\d{6}[-_]/i.test(repo) ||
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

    const item = buildTaskItem({
      repo,
      full_name: r.full_name,
      html_url: r.html_url,
      default_branch: r.default_branch,
      last_updated: r.pushed_at || r.updated_at,
      repo_description: r.description,
      structure,
      meta,
      readme
    });

    tasks.push(item);

    // Persist README into the repo for static rendering.
    if (readme) {
      const outReadmePath = path.join(OUT_READMES_DIR, `${safeFilename(repo)}.md`);
      fs.writeFileSync(outReadmePath, readme, "utf8");
    }
  }

  const existingRepos = new Set(tasks.map((task) => task.repo));
  tasks.push(...discoverLocalHtmlTasks(existingRepos));

  const mergedTasks = mergeHtmlCompanions(tasks);
  mergedTasks.sort((a, b) => (a.last_updated < b.last_updated ? 1 : -1));

  const index = {
    schema_version: 3,
    generated_at: new Date().toISOString(),
    org: ORG,
    tasks: mergedTasks
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
