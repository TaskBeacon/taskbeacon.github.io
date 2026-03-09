import type { TaskFacet, TaskIndexItem, TaskTagFacet } from "@/lib/task-index";

function norm(s: string) {
  return s.trim().toLowerCase();
}

export type SelectedFacets = Record<TaskFacet, Set<string>>;

export function emptySelectedFacets(): SelectedFacets {
  return {
    maturity: new Set(),
    preview: new Set(),
    paradigm: new Set(),
    response: new Set(),
    modality: new Set(),
    language: new Set()
  };
}

export function matchesQuery(t: TaskIndexItem, query: string) {
  const q = norm(query);
  if (!q) return true;

  const haystack = [
    t.id ?? "",
    t.title ?? "",
    t.repo,
    t.short_description ?? "",
    t.maturity ?? "",
    t.web_variant?.id ?? "",
    t.web_variant?.repo ?? "",
    t.web_variant?.title ?? "",
    ...(t.keywords ?? []),
    ...(t.tags.paradigm ?? []),
    ...(t.tags.response ?? []),
    ...(t.tags.modality ?? []),
    ...(t.tags.language ?? [])
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

function matchesMaturity(t: TaskIndexItem, wanted: Set<string>) {
  if (!wanted || wanted.size === 0) return true;
  const v = norm(t.maturity ?? "");
  if (!v) return false;
  for (const w of wanted) {
    if (v === norm(w)) return true;
  }
  return false;
}

function matchesPreview(t: TaskIndexItem, wanted: Set<string>) {
  if (!wanted || wanted.size === 0) return true;
  const hasPreview = Boolean(t.web_variant);
  const normalized = Array.from(wanted).map(norm);
  if (normalized.includes("with preview") && hasPreview) return true;
  if (normalized.includes("without preview") && !hasPreview) return true;
  return false;
}

export function matchesFacets(t: TaskIndexItem, selected: SelectedFacets) {
  if (!matchesMaturity(t, selected.maturity)) return false;
  if (!matchesPreview(t, selected.preview)) return false;

  const facets: TaskTagFacet[] = ["paradigm", "response", "modality", "language"];
  for (const facet of facets) {
    const wanted = selected[facet];
    if (!wanted || wanted.size === 0) continue;
    const values = new Set((t.tags?.[facet] ?? []).map(norm));
    let any = false;
    for (const w of wanted) {
      if (values.has(norm(w))) {
        any = true;
        break;
      }
    }
    if (!any) return false;
  }
  return true;
}

export function filterTasks(
  tasks: TaskIndexItem[],
  query: string,
  selected: SelectedFacets
) {
  return tasks
    .filter((t) => matchesQuery(t, query))
    .filter((t) => matchesFacets(t, selected))
    .sort((a, b) => {
      const labelA = String(a.title ?? a.repo).toLowerCase();
      const labelB = String(b.title ?? b.repo).toLowerCase();
      return labelA.localeCompare(labelB);
    });
}

export function facetValues(tasks: TaskIndexItem[], facet: TaskFacet) {
  const set = new Set<string>();

  if (facet === "maturity") {
    for (const t of tasks) {
      const v = String(t.maturity ?? "").trim();
      if (v) set.add(v);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }

  if (facet === "preview") {
    if (tasks.some((t) => t.web_variant)) set.add("With preview");
    if (tasks.some((t) => !t.web_variant)) set.add("Without preview");
    return Array.from(set);
  }

  for (const t of tasks) {
    for (const v of t.tags?.[facet] ?? []) {
      if (v?.trim()) set.add(v.trim());
    }
  }

  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
