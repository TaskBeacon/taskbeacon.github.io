"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import clsx from "@/components/utils/clsx";
import { TaskRow } from "@/components/task-row";
import { TagChip } from "@/components/tag-chip";
import { formatMaturityLabel } from "@/components/maturity-badge";
import type { TaskFacet, TaskIndexItem } from "@/lib/task-index";
import { emptySelectedFacets, facetValues, filterTasks, type SelectedFacets } from "@/lib/task-filter";
import { galleryFacets, galleryHref, readGalleryState, takeGalleryScroll } from "@/lib/gallery-state";
import { useTasksWithHtmlCompanions } from "@/lib/use-html-companions";

const TASKS_PER_PAGE = 15;
const facets = [
  { key: "domain", title: "Research area" },
  { key: "language", title: "Task language" },
  { key: "maturity", title: "Maturity" },
  { key: "preview", title: "Preview" },
  { key: "paradigm", title: "Paradigm" }
] as const;

function Pagination({ page, pages, total, onChange }: {
  page: number; pages: number; total: number; onChange: (page: number) => void;
}) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Task pagination" className="flex flex-wrap items-center justify-between gap-3 px-1 py-2 text-sm text-slate-700">
      <span>Showing <strong>{(page - 1) * TASKS_PER_PAGE + 1}–{Math.min(page * TASKS_PER_PAGE, total)}</strong> of {total}</span>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)}
          className="tb-focus-ring rounded-[14px] border-2 border-[#25314d] bg-white px-3 py-2 font-bold disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
        <span className="px-1 font-bold sm:hidden">{page} / {pages}</span>
        <div className="hidden flex-wrap gap-1 sm:flex">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button key={n} type="button" onClick={() => onChange(n)} aria-label={`Page ${n}`} aria-current={n === page ? "page" : undefined}
              className={clsx("tb-focus-ring min-w-10 rounded-[12px] border-2 border-[#25314d] px-2 py-2 font-bold", n === page ? "bg-[#25314d] text-white" : "bg-white hover:bg-[#eef8ff]")}>{n}</button>
          ))}
        </div>
        <button type="button" disabled={page === pages} onClick={() => onChange(page + 1)}
          className="tb-focus-ring rounded-[14px] border-2 border-[#25314d] bg-white px-3 py-2 font-bold disabled:cursor-not-allowed disabled:opacity-40">Next</button>
      </div>
    </nav>
  );
}

export function GalleryClient({ tasks }: { tasks: TaskIndexItem[] }) {
  const mergedTasks = useTasksWithHtmlCompanions(tasks);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SelectedFacets>(() => emptySelectedFacets());
  const [page, setPage] = useState(1);
  const [ready, setReady] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [closedFacets, setClosedFacets] = useState<Set<TaskFacet>>(() => new Set());
  const restoredScroll = useRef(false);
  const resultsRef = useRef<HTMLElement>(null);
  const deferredQuery = useDeferredValue(query);
  const filtered = useMemo(() => filterTasks(mergedTasks, deferredQuery, selected), [mergedTasks, deferredQuery, selected]);
  const pages = Math.max(1, Math.ceil(filtered.length / TASKS_PER_PAGE));
  const safePage = Math.min(page, pages);
  const visibleTasks = filtered.slice((safePage - 1) * TASKS_PER_PAGE, safePage * TASKS_PER_PAGE);
  const filterCount = galleryFacets.reduce((sum, facet) => sum + selected[facet].size, 0);
  const activeFilters = galleryFacets.flatMap((facet) => [...selected[facet]].map((value) => ({ facet, value })));
  const anyFilters = Boolean(query.trim() || filterCount);
  const returnHref = galleryHref(query, selected, page);

  useEffect(() => {
    const syncFromLocation = () => {
      const state = readGalleryState(window.location.search);
      setQuery(state.query);
      setSelected(state.selected);
      setPage(state.page);
      setReady(true);
    };
    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  useEffect(() => {
    if (!ready) return;
    // Preserve Next.js metadata for browser Back/Forward navigation.
    window.history.replaceState(window.history.state, "", returnHref);
  }, [ready, returnHref]);

  useEffect(() => {
    if (!ready || deferredQuery !== query || restoredScroll.current) return;
    const y = takeGalleryScroll(returnHref);
    restoredScroll.current = true;
    if (y === null) return;
    const frame = requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, [ready, deferredQuery, query, returnHref]);

  function toggleFacet(facet: TaskFacet, value: string) {
    setPage(1);
    setSelected((current) => {
      const next = { ...current, [facet]: new Set(current[facet]) };
      if (next[facet].has(value)) next[facet].delete(value);
      else next[facet].add(value);
      return next;
    });
  }
  function clearAll() { setPage(1); setQuery(""); setSelected(emptySelectedFacets()); }
  function changePage(next: number) {
    setPage(Math.max(1, Math.min(next, pages)));
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ block: "start", behavior: "instant" }));
  }

  if (!ready) return <div className="tb-frame p-6 text-sm text-slate-600" role="status">Loading tasks…</div>;

  return (
    <section className="space-y-6 lg:pt-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside aria-label="Search and filters" className="lg:col-span-4 xl:col-span-3">
          <div className="space-y-4 lg:sticky lg:top-32">
            <section className="tb-content-card p-4">
              <label className="block" htmlFor="task-explorer-search">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Search tasks</span>
                <input id="task-explorer-search" value={query}
                  onChange={(event) => { setPage(1); setQuery(event.target.value); }}
                  placeholder="Task name, keyword or ID…"
                  className="tb-focus-ring mt-3 w-full rounded-[18px] border-2 border-[#25314d] bg-white px-4 py-3 text-sm text-[#25314d] placeholder:text-slate-400" />
              </label>
              <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-700">
                <span role="status" aria-live="polite"><strong>{filtered.length}</strong> of {mergedTasks.length} tasks</span>
                {anyFilters ? <button type="button" className="tb-focus-ring rounded-md px-2 py-1 text-xs font-bold underline underline-offset-4" onClick={clearAll}>Clear all</button> : null}
              </div>
            </section>

            <button type="button" className="tb-focus-ring tb-button-secondary w-full lg:hidden"
              aria-expanded={filtersOpen} aria-controls="task-filters" onClick={() => setFiltersOpen(!filtersOpen)}>
              {filtersOpen ? "Hide filters" : "Filters"}{filterCount ? ` (${filterCount})` : ""}
              <span aria-hidden="true" className="ml-auto">{filtersOpen ? "−" : "+"}</span>
            </button>

            {anyFilters ? <div aria-label="Active filters" className="flex flex-wrap gap-2">
              {query.trim() ? <button type="button" className="tb-focus-ring rounded-full bg-[#25314d] px-3 py-2 text-xs font-bold text-white"
                aria-label={`Remove search: ${query}`} onClick={() => { setQuery(""); setPage(1); }}>Search: {query.trim()} ×</button> : null}
              {activeFilters.map(({ facet, value }) => <button key={`${facet}:${value}`} type="button"
                className="tb-focus-ring rounded-full border-2 border-[#25314d] bg-white px-3 py-2 text-xs font-bold text-[#25314d]"
                aria-label={`Remove ${facet}: ${value}`} onClick={() => toggleFacet(facet, value)}>
                {facet === "maturity" ? formatMaturityLabel(value) : value} ×
              </button>)}
            </div> : null}

            <div id="task-filters" className={clsx("space-y-4 lg:block", !filtersOpen && "hidden")}>
              {facets.map(({ key, title }) => {
                const values = facetValues(mergedTasks, key);
                if (!values.length) return null;
                const open = !closedFacets.has(key);
                return <section key={key} className="tb-content-card p-4">
                  <button type="button" className="tb-focus-ring flex w-full items-center justify-between gap-3 rounded-lg text-left"
                    aria-expanded={open} aria-controls={`facet-${key}`}
                    onClick={() => setClosedFacets((current) => {
                      const next = new Set(current);
                      if (next.has(key)) next.delete(key); else next.add(key);
                      return next;
                    })}>
                    <span className="font-heading text-xl font-bold text-[#25314d]">{title}</span>
                    <span className="text-xs font-bold text-slate-500">{selected[key].size ? `${selected[key].size} selected` : `${values.length} options`} {open ? "−" : "+"}</span>
                  </button>
                  <div id={`facet-${key}`} hidden={!open}>
                    <div className="mt-4 flex max-h-52 flex-wrap gap-2 overflow-y-auto p-1">{values.map((value) => <TagChip key={value}
                      label={key === "maturity" ? formatMaturityLabel(value) : value}
                      selected={selected[key].has(value)} onClick={() => toggleFacet(key, value)} />)}</div>
                  </div>
                </section>;
              })}
              <details className="text-xs leading-6 text-slate-600">
                <summary className="tb-focus-ring cursor-pointer rounded-md font-bold">What do the statuses mean?</summary>
                <p className="mt-2">Draft: review and test before use. Smoke tested: basic execution checks only. Piloted: pilot use reported; check the documentation for its scope. These labels alone do not establish scientific validity.</p>
              </details>
            </div>
          </div>
        </aside>

        <section ref={resultsRef} aria-label="Task results" className="scroll-mt-28 space-y-4 lg:col-span-8 xl:col-span-9">
          <Pagination page={safePage} pages={pages} total={filtered.length} onChange={changePage} />
          {filtered.length === 0 ? <div className="tb-frame p-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-[#25314d]">No matches</h2>
            <p className="mt-3 text-sm text-slate-700">Try a different task name or remove a filter.</p>
            <button type="button" className="tb-focus-ring tb-button-primary mt-5" onClick={clearAll}>Reset explorer</button>
          </div> : visibleTasks.map((task) => <TaskRow key={task.repo} task={task} returnHref={returnHref} />)}
          <Pagination page={safePage} pages={pages} total={filtered.length} onChange={changePage} />
        </section>
      </div>
    </section>
  );
}
