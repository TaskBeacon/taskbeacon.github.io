"use client";

import clsx from "@/components/utils/clsx";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { TaskFacet, TaskIndexItem } from "@/lib/task-index";
import { taskHasPreview } from "@/lib/html-companions";
import {
  emptySelectedFacets,
  facetValues,
  filterTasks,
  type SelectedFacets
} from "@/lib/task-filter";
import { useTasksWithHtmlCompanions } from "@/lib/use-html-companions";
import { TagChip } from "@/components/tag-chip";
import { TaskRow } from "@/components/task-row";
import { TaskDrawer } from "@/components/task-drawer";
import { formatMaturityLabel } from "@/components/maturity-badge";

function FacetSection({
  title,
  facet,
  values,
  selected,
  onToggle,
  isOpen,
  onToggleOpen
}: {
  title: string;
  facet: TaskFacet;
  values: string[];
  selected: SelectedFacets;
  onToggle: (facet: TaskFacet, value: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}) {
  if (values.length === 0) return null;

  return (
    <section className="tb-frame-soft p-4">
      <button
        type="button"
        className="tb-focus-ring flex w-full items-center justify-between gap-3 rounded-lg text-left"
        onClick={onToggleOpen}
      >
        <h3 className="font-heading text-xl font-bold text-[#25314d]">{title}</h3>
        <div className="text-xs font-bold text-slate-600">
          {selected[facet].size > 0 ? `${selected[facet].size} selected` : `${values.length} options`}
        </div>
      </button>

      {isOpen ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {values.map((value) => (
            <TagChip
              key={`${facet}:${value}`}
              label={facet === "maturity" ? formatMaturityLabel(value) : value}
              selected={selected[facet].has(value)}
              onClick={() => onToggle(facet, value)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

const TASKS_PER_PAGE = 15;

function parsePageParam(value: string | null) {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}

function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="tb-frame flex flex-col gap-4 bg-[#fffdf9] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="text-sm text-slate-700">
        Showing <span className="font-bold text-[#25314d]">{startIndex + 1}</span>-
        <span className="font-bold text-[#25314d]">{endIndex}</span> of{" "}
        <span className="font-bold text-[#25314d]">{totalItems}</span> tasks
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={clsx(
            "tb-focus-ring inline-flex min-w-[112px] items-center justify-center gap-2 rounded-[16px] border-2 border-[#25314d] px-4 py-2 text-sm font-bold text-[#25314d]",
            currentPage === 1 ? "cursor-not-allowed bg-slate-100 text-slate-400" : "bg-white hover:bg-[#eef8ff]"
          )}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IconChevronLeft className="size-4" />
          Previous
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className={clsx(
                "tb-focus-ring min-w-11 rounded-[14px] border-2 px-3 py-2 text-sm font-bold",
                page === currentPage
                  ? "border-[#25314d] bg-[#25314d] text-white"
                  : "border-[#25314d] bg-white text-[#25314d] hover:bg-[#eef8ff]"
              )}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={clsx(
            "tb-focus-ring inline-flex min-w-[112px] items-center justify-center gap-2 rounded-[16px] border-2 border-[#25314d] px-4 py-2 text-sm font-bold text-[#25314d]",
            currentPage === totalPages
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-white hover:bg-[#eef8ff]"
          )}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <IconChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

export function GalleryClient({
  tasks
}: {
  tasks: TaskIndexItem[];
}) {
  const mergedTasks = useTasksWithHtmlCompanions(tasks);
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<SelectedFacets>(() => emptySelectedFacets());
  const [activeRepo, setActiveRepo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFacets, setOpenFacets] = useState<{
    maturity: boolean;
    preview: boolean;
    paradigm: boolean;
  }>({
    maturity: true,
    preview: true,
    paradigm: true
  });

  const deferredQuery = useDeferredValue(query);
  const allMaturities = useMemo(() => facetValues(mergedTasks, "maturity"), [mergedTasks]);
  const allPreviewValues = useMemo(() => facetValues(mergedTasks, "preview"), [mergedTasks]);
  const allParadigms = useMemo(() => facetValues(mergedTasks, "paradigm"), [mergedTasks]);
  const previewCount = useMemo(() => mergedTasks.filter((task) => taskHasPreview(task)).length, [mergedTasks]);
  const filtered = useMemo(
    () => filterTasks(mergedTasks, deferredQuery, selected),
    [deferredQuery, mergedTasks, selected]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / TASKS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * TASKS_PER_PAGE;
  const endIndex = Math.min(startIndex + TASKS_PER_PAGE, filtered.length);
  const visibleTasks = filtered.slice(startIndex, endIndex);
  const activeTask = useMemo(
    () => mergedTasks.find((task) => task.repo === activeRepo) ?? null,
    [activeRepo, mergedTasks]
  );

  const anyFilters =
    query.trim().length > 0 ||
    selected.maturity.size > 0 ||
    selected.preview.size > 0 ||
    selected.paradigm.size > 0 ||
    selected.response.size > 0 ||
    selected.modality.size > 0 ||
    selected.language.size > 0;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncPageFromLocation = () => {
      const params = new URLSearchParams(window.location.search);
      setCurrentPage(parsePageParam(params.get("page")));
    };

    syncPageFromLocation();
    window.addEventListener("popstate", syncPageFromLocation);
    return () => window.removeEventListener("popstate", syncPageFromLocation);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (safeCurrentPage === 1) params.delete("page");
    else params.set("page", String(safeCurrentPage));

    const queryString = params.toString();
    const nextUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    window.history.replaceState(null, "", nextUrl);
  }, [safeCurrentPage]);

  function updatePage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }

  function resetToFirstPage() {
    if (safeCurrentPage !== 1) updatePage(1);
  }

  function toggleFacet(facet: TaskFacet, value: string) {
    resetToFirstPage();
    setSelected((current) => {
      const next: SelectedFacets = {
        maturity: new Set(current.maturity),
        preview: new Set(current.preview),
        paradigm: new Set(current.paradigm),
        response: new Set(current.response),
        modality: new Set(current.modality),
        language: new Set(current.language)
      };
      if (next[facet].has(value)) next[facet].delete(value);
      else next[facet].add(value);
      return next;
    });
  }

  function clearAll() {
    resetToFirstPage();
    setQuery("");
    setSelected(emptySelectedFacets());
  }

  return (
    <section className="space-y-8 lg:pt-6">
      <div className="max-w-4xl">
        <div className="tb-section-chip bg-[#f5d7cf]">Task Explorer</div>
        <div className="mt-5 font-heading text-5xl font-bold leading-[0.94] text-[#25314d] sm:text-6xl">
            Find The Right Task,
            <br />
            <span className="text-[#39d95d]">Filter Faster,</span>
            <br />
            Expand Only What Matters.
        </div>
        <div className="mt-5 max-w-2xl text-base leading-8 text-slate-700">
          This explorer keeps the denser list workflow while adopting the clearer, stronger page
          language from the rest of the site.
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
            <div className="tb-frame-soft min-w-[160px] bg-[#fffdf9] px-5 py-4">
            <div className="font-heading text-3xl font-bold text-[#25314d]">{mergedTasks.length}</div>
            <div className="text-sm text-slate-600">Total tasks</div>
          </div>
          <div className="tb-frame-soft min-w-[160px] bg-[#eef8ff] px-5 py-4">
            <div className="font-heading text-3xl font-bold text-[#25314d]">{previewCount}</div>
            <div className="text-sm text-slate-600">With preview</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="space-y-4 lg:sticky lg:top-32">
            <section className="tb-frame p-4">
              <label className="block" htmlFor="task-explorer-search">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Search
                </span>
                <input
                  id="task-explorer-search"
                  value={query}
                  onChange={(event) => {
                    resetToFirstPage();
                    setQuery(event.target.value);
                  }}
                  placeholder="Search title, task ID, preview ID, repo..."
                  className="tb-focus-ring mt-3 w-full rounded-[18px] border-2 border-[#25314d] bg-white px-4 py-3 text-sm text-[#25314d] placeholder:text-slate-400"
                />
              </label>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-slate-700">
                  Showing <span className="font-bold text-[#25314d]">{filtered.length}</span> of{" "}
                  <span className="font-bold text-[#25314d]">{mergedTasks.length}</span>
                </div>
                {anyFilters ? (
                  <button type="button" className="tb-focus-ring tb-button-secondary text-sm" onClick={clearAll}>
                    Clear
                  </button>
                ) : null}
              </div>
            </section>

            <FacetSection
              title="Maturity"
              facet="maturity"
              values={allMaturities}
              selected={selected}
              onToggle={toggleFacet}
              isOpen={openFacets.maturity}
              onToggleOpen={() =>
                setOpenFacets((current) => ({ ...current, maturity: !current.maturity }))
              }
            />
            <FacetSection
              title="Preview"
              facet="preview"
              values={allPreviewValues}
              selected={selected}
              onToggle={toggleFacet}
              isOpen={openFacets.preview}
              onToggleOpen={() =>
                setOpenFacets((current) => ({ ...current, preview: !current.preview }))
              }
            />
            <FacetSection
              title="Task Type"
              facet="paradigm"
              values={allParadigms}
              selected={selected}
              onToggle={toggleFacet}
              isOpen={openFacets.paradigm}
              onToggleOpen={() =>
                setOpenFacets((current) => ({ ...current, paradigm: !current.paradigm }))
              }
            />
          </div>
        </aside>

        <section className="space-y-4 lg:col-span-8 xl:col-span-9">
          <PaginationControls
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={updatePage}
          />

          {filtered.length === 0 ? (
            <div className="tb-frame p-10 text-center">
              <div className="font-heading text-3xl font-bold text-[#25314d]">No matches</div>
              <div className="mt-3 text-sm text-slate-700">
                Try clearing filters or searching by task name, repo handle, or preview ID.
              </div>
              <div className="mt-5">
                <button type="button" className="tb-focus-ring tb-button-primary" onClick={clearAll}>
                  Reset explorer
                </button>
              </div>
            </div>
          ) : (
            visibleTasks.map((task) => (
              <TaskRow
                key={task.repo}
                task={task}
                onOpen={(nextTask) => setActiveRepo(nextTask.repo)}
              />
            ))
          )}

          <PaginationControls
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={updatePage}
          />
        </section>
      </div>

      <TaskDrawer task={activeTask} onClose={() => setActiveRepo(null)} />
    </section>
  );
}
