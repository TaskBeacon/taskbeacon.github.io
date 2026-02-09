import type { TaskIndexItem, TaskTagFacet } from "@/lib/task-index";

function norm(s: string) {
  return s.trim().toLowerCase();
}

export type SelectedFacets = Record<TaskTagFacet, Set<string>>;

export function emptySelectedFacets(): SelectedFacets {
  return {
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
    t.repo,
    t.short_description ?? "",
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

export function matchesFacets(t: TaskIndexItem, selected: SelectedFacets) {
  const facets = Object.keys(selected) as TaskTagFacet[];
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
    .sort((a, b) => (a.last_updated < b.last_updated ? 1 : -1));
}

export function facetValues(tasks: TaskIndexItem[], facet: TaskTagFacet) {
  const set = new Set<string>();
  for (const t of tasks) {
    for (const v of t.tags?.[facet] ?? []) {
      if (v?.trim()) set.add(v.trim());
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

