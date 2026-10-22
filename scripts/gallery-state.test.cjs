const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const path = require("node:path");

// Exercise the actual TypeScript helpers without adding a test runtime dependency.
require.extensions[".ts"] = (module, filename) => {
  const originalRequire = module.require.bind(module);
  module.require = (specifier) => originalRequire(specifier.startsWith("@/") ? path.join(__dirname, "../src", specifier.slice(2)) : specifier);
  const source = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText, filename);
};
const { readGalleryState, galleryHref, galleryReturnHref, rememberGalleryScroll, takeGalleryScroll } = require("../src/lib/gallery-state.ts");

const state = readGalleryState("?q=memory+%26+%E8%AE%B0%E5%BF%86&maturity=draft&maturity=piloted&language=Chinese&page=3");
assert.equal(state.query, "memory & 记忆");
assert.deepEqual([...state.selected.maturity], ["draft", "piloted"]);
assert.equal(state.page, 3);
const href = galleryHref(state.query, state.selected, state.page);
assert.deepEqual(readGalleryState(href.slice("/tasks/".length)), state);
assert.equal(galleryReturnHref(`?${new URLSearchParams({ returnTo: href })}`), href);
for (const target of ["https://example.com", "//example.com", "/tasks/../privacy/", "/tasks/?returnTo=https://example.com"]) {
  assert.equal(galleryReturnHref(`?${new URLSearchParams({ returnTo: target })}`), "/tasks/");
}
for (const page of ["0", "-1", "1.5", "NaN", "Infinity", "9007199254740992"]) {
  assert.equal(readGalleryState(`?page=${page}`).page, 1);
}
assert.equal(galleryHref("", readGalleryState("").selected, 1), "/tasks/");
const storage = new Map();
global.sessionStorage = { setItem: (k, v) => storage.set(k, v), getItem: (k) => storage.get(k) ?? null, removeItem: (k) => storage.delete(k) };
global.window = { scrollY: 824 };
rememberGalleryScroll(href);
assert.equal(takeGalleryScroll("/tasks/"), null);
assert.equal(takeGalleryScroll(href), 824);
assert.equal(takeGalleryScroll(href), null);
delete global.sessionStorage;
assert.doesNotThrow(() => rememberGalleryScroll(href));
assert.equal(takeGalleryScroll(href), null);
console.log("Gallery URL, return navigation and scroll-state checks passed.");
const { taskDomains, taskParadigms, taskSummary } = require("../src/lib/task-catalog.ts");
const { filterTasks, emptySelectedFacets } = require("../src/lib/task-filter.ts");
const { documentationHeadings } = require("../src/lib/documentation-headings.ts");
const tasks = require("../src/data/tasks_index.json").tasks;
for (const task of tasks) {
  assert.ok(!taskDomains(task).includes("Other / uncategorized"), `Missing research area: ${task.repo}`);
  assert.ok(taskParadigms(task).length > 0);
  assert.ok(taskSummary(task).length > 20);
}
const filters = emptySelectedFacets();
filters.domain.add("Memory & learning");
const memory = filterTasks(tasks, "", filters);
assert.ok(memory.some((task) => task.id === "T000008"));
assert.ok(!memory.some((task) => task.id === "T000014"));
const domainState = readGalleryState("?domain=Memory+%26+learning&page=2");
assert.equal(galleryHref("", domainState.selected, 2), "/tasks/?domain=Memory+%26+learning&page=2");
assert.deepEqual(documentationHeadings("# Task\n## Overview\n```\n## not a heading\n```\n## Run"), [{ id: "doc-line-2", title: "Overview" }, { id: "doc-line-6", title: "Run" }]);
console.log("Research-area coverage, filtering and documentation navigation checks passed.");
