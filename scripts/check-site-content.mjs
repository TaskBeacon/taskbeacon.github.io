import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function fail(message) {
  failures.push(message);
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function pairedHtmlId(value) {
  const match = /^T(\d{6})$/i.exec(String(value ?? "").trim());
  return match ? `H${match[1]}` : null;
}

function expectedPreviewRepos(tasks, manifestTasks) {
  const repos = new Set();
  for (const task of tasks) {
    if (task.variant === "html") {
      repos.add(task.repo);
      continue;
    }

    const taskSlug = normalize(task.slug);
    const expectedHtmlId = normalize(pairedHtmlId(task.id));
    const match = manifestTasks.find((entry) => {
      const entrySlug = normalize(entry.slug);
      if (taskSlug && entrySlug && taskSlug === entrySlug) return true;
      return Boolean(expectedHtmlId) && normalize(entry.id) === expectedHtmlId;
    });

    if (match) repos.add(task.repo);
  }
  return repos;
}

function walkHtml(dir) {
  if (!fs.existsSync(dir)) return [];
  const pages = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) pages.push(...walkHtml(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".html")) pages.push(fullPath);
  }
  return pages;
}

function exportedTargetExists(outDir, href) {
  const clean = href.split("#")[0].split("?")[0];
  const decoded = decodeURIComponent(clean).replace(/^\/+/, "");
  const candidates = decoded
    ? [decoded, path.join(decoded, "index.html"), path.extname(decoded) ? decoded : `${decoded}.html`]
    : ["index.html"];
  return candidates.some((candidate) => fs.existsSync(path.join(outDir, candidate)));
}

const index = readJson("src/data/tasks_index.json");
const manifest = readJson("public/psyflow-web/task-manifest.json");
const tasks = index.tasks ?? [];
const manifestTasks = manifest.tasks ?? [];

const expectedPreviewRepoSet = expectedPreviewRepos(tasks, manifestTasks);
const attachedPreviewCount = tasks.filter((task) => task.variant === "html" || task.web_variant).length;
if (attachedPreviewCount !== expectedPreviewRepoSet.size) {
  fail(
    `Expected ${expectedPreviewRepoSet.size} indexed preview associations, found ${attachedPreviewCount}.`
  );
}

const jobsPage = readText("src/app/jobs/page.tsx");
if (/[涓�]/.test(jobsPage)) {
  fail("Jobs page contains mojibake Chinese text.");
}
if (jobsPage.includes("35 tasks") || jobsPage.includes("35 涓")) {
  fail("Jobs page contains stale hard-coded 35 task count.");
}
if (!jobsPage.includes("getIndex")) {
  fail("Jobs page should read the generated task count from getIndex().");
}

const teamsPage = readText("src/app/teams/page.tsx");
if (/Placeholder:|replaces the generic About|reserved for public/i.test(teamsPage)) {
  fail("Teams page contains placeholder or internal migration copy.");
}

const aboutPage = readText("src/app/about/page.tsx");
if (/Legacy alias|moved to a dedicated page|old About destination/i.test(aboutPage)) {
  fail("About page contains internal legacy alias copy.");
}

const taskRow = readText("src/components/task-row.tsx");
if (!taskRow.includes("taskDetailHref") || !taskRow.includes("Open full page")) {
  fail("Task rows should provide a direct full-page task link.");
}

const featuredCarousel = readText("src/components/featured-task-carousel.tsx");
if (!featuredCarousel.includes("taskDetailHref")) {
  fail("Featured carousel title should link to the full task page.");
}

const requiredDocRoutes = [
  "src/app/framework/taps/page.tsx",
  "src/app/tutorial/localization/page.tsx",
  "src/app/contribute/versioning/page.tsx"
];
for (const route of requiredDocRoutes) {
  if (!exists(route)) fail(`Missing documentation route: ${route}`);
}

const renderedDocRoutes = [
  ["src/app/framework/taps/page.tsx", "taps"],
  ["src/app/tutorial/localization/page.tsx", "localization"],
  ["src/app/contribute/versioning/page.tsx", "versioning"]
];
for (const [route, docId] of renderedDocRoutes) {
  if (!exists(route)) continue;
  const pageSource = readText(route);
  if (!pageSource.includes("readSiteDoc") || !pageSource.includes("SiteMarkdown")) {
    fail(`${route} should render source/${docId}.md through the site markdown renderer.`);
  }
}

const siteContent = readText("src/lib/site-content.ts");
const primarySiteSources = [
  ["src/lib/site-content.ts", siteContent],
  ["src/app/page.tsx", readText("src/app/page.tsx")]
];
for (const blobPath of [
  "github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/taps.md",
  "github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/localization.md",
  "github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/versioning.md"
]) {
  for (const [sourcePath, sourceText] of primarySiteSources) {
    if (sourceText.includes(blobPath)) {
      fail(`Primary site links should not point at GitHub blob in ${sourcePath}: ${blobPath}`);
    }
  }
}

const outDir = path.join(root, "out");
if (fs.existsSync(outDir)) {
  const broken = new Map();
  const hrefRe = /\s(?:href|src)="([^"]+)"/g;
  for (const file of walkHtml(outDir)) {
    const html = fs.readFileSync(file, "utf8");
    let match;
    while ((match = hrefRe.exec(html))) {
      const href = match[1];
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("data:") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        /^https?:\/\//i.test(href)
      ) {
        continue;
      }
      if (!href.startsWith("/")) continue;
      if (!exportedTargetExists(outDir, href)) {
        const rel = path.relative(outDir, file);
        const pages = broken.get(href) ?? [];
        pages.push(rel);
        broken.set(href, pages);
      }
    }
  }

  for (const [href, pages] of broken) {
    fail(`Exported internal link is broken: ${href} from ${pages.slice(0, 3).join(", ")}`);
  }
}

if (failures.length > 0) {
  console.error("Site content checks failed:");
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log(
  `Site content checks passed: ${tasks.length} tasks, ${attachedPreviewCount} preview associations.`
);
