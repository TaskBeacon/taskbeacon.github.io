import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ORG = process.env.TASKBEACON_ORG || "TaskBeacon";
const TOKEN = resolveToken();
const GH_API = "https://api.github.com";
const OUT_FILE = path.join(process.cwd(), "src", "data", "contributors.json");
const TMP_ROOT = path.join(process.cwd(), ".tmp", "contributors-build");
const TMP_FILE = path.join(TMP_ROOT, "contributors.json");

const EXCLUDED_LOGINS = new Set([
  "github-actions[bot]",
  "dependabot[bot]",
  "renovate[bot]"
]);

function resolveToken() {
  const envToken =
    process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_PAT || "";
  if (envToken) return envToken;
  if (process.env.CI) return "";

  const ghCandidates = [
    "gh",
    process.env.ProgramFiles
      ? path.join(process.env.ProgramFiles, "GitHub CLI", "gh.exe")
      : "",
    process.env["ProgramFiles(x86)"]
      ? path.join(process.env["ProgramFiles(x86)"], "GitHub CLI", "gh.exe")
      : ""
  ].filter(Boolean);

  for (const ghBin of ghCandidates) {
    try {
      return execFileSync(ghBin, ["auth", "token"], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      }).trim();
    } catch {
      continue;
    }
  }

  return "";
}

function ghHeaders(extra = {}) {
  const headers = {
    "User-Agent": "taskbeacon-contributors-indexer",
    "X-GitHub-Api-Version": "2022-11-28",
    ...extra
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  return headers;
}

async function safeReadText(res) {
  try {
    return await res.text();
  } catch {
    return "";
  }
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

async function listOrgRepos() {
  const perPage = 100;
  let page = 1;
  const repos = [];

  while (true) {
    const url = `${GH_API}/orgs/${encodeURIComponent(ORG)}/repos?per_page=${perPage}&page=${page}&type=public&sort=updated&direction=desc`;
    const batch = await ghGetJson(url);
    if (!Array.isArray(batch) || batch.length === 0) break;
    repos.push(
      ...batch.filter((repo) => repo?.name && !repo.archived && !repo.disabled)
    );
    if (batch.length < perPage) break;
    page += 1;
  }

  return repos;
}

async function listRepoContributors(repoName) {
  const perPage = 100;
  let page = 1;
  const contributors = [];

  while (true) {
    const url = `${GH_API}/repos/${encodeURIComponent(ORG)}/${encodeURIComponent(repoName)}/contributors?per_page=${perPage}&page=${page}&anon=false`;
    const batch = await ghGetJson(url, { allow404: true });
    if (!Array.isArray(batch) || batch.length === 0) break;
    contributors.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
  }

  return contributors;
}

async function getUserProfile(login) {
  const url = `${GH_API}/users/${encodeURIComponent(login)}`;
  return ghGetJson(url, { allow404: true });
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current], current);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker())
  );
  return results;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function buildContributors() {
  ensureDir(TMP_ROOT);
  const repos = await listOrgRepos();
  const byLogin = new Map();

  await mapLimit(repos, 4, async (repo) => {
    const contributors = await listRepoContributors(repo.name);
    for (const contributor of contributors) {
      const login = String(contributor?.login ?? "").trim();
      if (!login || EXCLUDED_LOGINS.has(login.toLowerCase())) continue;

      const current =
        byLogin.get(login) ??
        {
          login,
          name: login,
          avatar_url: contributor.avatar_url,
          html_url: contributor.html_url,
          contributions: 0,
          repos: []
        };

      current.contributions += Number(contributor.contributions ?? 0);
      current.repos.push(repo.name);
      current.avatar_url = contributor.avatar_url || current.avatar_url;
      current.html_url = contributor.html_url || current.html_url;
      byLogin.set(login, current);
    }
  });

  const contributors = Array.from(byLogin.values()).sort((left, right) => {
    if (right.contributions !== left.contributions) {
      return right.contributions - left.contributions;
    }
    return left.login.localeCompare(right.login);
  });

  await mapLimit(contributors, 6, async (contributor) => {
    const profile = await getUserProfile(contributor.login);
    const displayName = String(profile?.name ?? "").trim();
    if (displayName) contributor.name = displayName;
  });

  const index = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    org: ORG,
    repo_count: repos.length,
    contributors: contributors.map((contributor) => ({
      login: contributor.login,
      name: contributor.name,
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
      contributions: contributor.contributions,
      repo_count: new Set(contributor.repos).size
    }))
  };

  fs.writeFileSync(TMP_FILE, JSON.stringify(index, null, 2) + "\n", "utf8");
  ensureDir(path.dirname(OUT_FILE));
  fs.rmSync(OUT_FILE, { force: true });
  fs.renameSync(TMP_FILE, OUT_FILE);
  fs.rmSync(TMP_ROOT, { recursive: true, force: true });
  return index;
}

async function main() {
  try {
    const index = await buildContributors();
    console.log(
      `Indexed ${index.contributors.length} contributors across ${index.repo_count} repos. Wrote ${path.relative(
        process.cwd(),
        OUT_FILE
      )}`
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Contributor build failed:\n" + msg);

    if (process.env.CI) {
      fs.rmSync(TMP_ROOT, { recursive: true, force: true });
      process.exit(1);
    }

    if (fs.existsSync(OUT_FILE)) {
      console.warn(
        `Using existing ${path.relative(process.cwd(), OUT_FILE)} (stale).`
      );
      fs.rmSync(TMP_ROOT, { recursive: true, force: true });
      process.exit(0);
    }

    const fallback = {
      schema_version: 1,
      generated_at: new Date().toISOString(),
      org: ORG,
      repo_count: 0,
      contributors: []
    };
    ensureDir(path.dirname(OUT_FILE));
    fs.writeFileSync(OUT_FILE, JSON.stringify(fallback, null, 2) + "\n", "utf8");
    fs.rmSync(TMP_ROOT, { recursive: true, force: true });
  }
}

await main();
