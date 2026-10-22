import type { TaskFacet } from "./task-index";
import { emptySelectedFacets, type SelectedFacets } from "./task-filter";

export const galleryFacets: TaskFacet[] = ["domain", "maturity", "preview", "paradigm", "response", "modality", "language"];

export function readGalleryState(search: string) {
  const params = new URLSearchParams(search);
  const selected = emptySelectedFacets();
  for (const facet of galleryFacets) selected[facet] = new Set(params.getAll(facet).filter(Boolean));
  const page = Number(params.get("page") ?? 1);
  return { query: params.get("q") ?? "", selected, page: Number.isSafeInteger(page) && page > 0 ? page : 1 };
}

export function galleryHref(query: string, selected: SelectedFacets, page: number) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  for (const facet of galleryFacets) {
    for (const value of [...selected[facet]].sort()) params.append(facet, value);
  }
  if (page > 1) params.set("page", String(page));
  return `/tasks/${params.size ? `?${params}` : ""}`;
}

export function galleryReturnHref(search: string) {
  const target = new URLSearchParams(search).get("returnTo");
  if (!target || !(target === "/tasks/" || target.startsWith("/tasks/?"))) return "/tasks/";
  const state = readGalleryState(target.slice("/tasks/".length));
  return galleryHref(state.query, state.selected, state.page);
}

export function rememberGalleryScroll(href: string) {
  try { sessionStorage.setItem(`taskbeacon:scroll:${href}`, String(window.scrollY)); } catch { /* Storage is optional. */ }
}

export function subscribeGalleryLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

export function takeGalleryScroll(href: string) {
  try {
    const key = `taskbeacon:scroll:${href}`;
    const value = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
    const y = value === null ? null : Number(value);
    return y !== null && Number.isFinite(y) && y >= 0 ? y : null;
  } catch { return null; }
}
