"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { TaskFacet, TaskIndexItem } from "@/lib/task-index";
import {
  emptySelectedFacets,
  facetValues,
  filterTasks,
  type SelectedFacets
} from "@/lib/task-filter";
import { TagChip } from "@/components/tag-chip";
import { TaskRow } from "@/components/task-row";
import { TaskDrawer } from "@/components/task-drawer";
import { formatMaturityLabel } from "@/components/maturity-badge";
import { formatIsoDateTime } from "@/lib/format";

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

export function GalleryClient({
  tasks,
  generatedAt
}: {
  tasks: TaskIndexItem[];
  generatedAt: string;
}) {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<SelectedFacets>(() => emptySelectedFacets());
  const [activeRepo, setActiveRepo] = useState<string | null>(null);
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
  const allMaturities = useMemo(() => facetValues(tasks, "maturity"), [tasks]);
  const allPreviewValues = useMemo(() => facetValues(tasks, "preview"), [tasks]);
  const allParadigms = useMemo(() => facetValues(tasks, "paradigm"), [tasks]);
  const previewCount = useMemo(() => tasks.filter((task) => task.web_variant).length, [tasks]);
  const filtered = useMemo(
    () => filterTasks(tasks, deferredQuery, selected),
    [deferredQuery, selected, tasks]
  );
  const activeTask = useMemo(
    () => tasks.find((task) => task.repo === activeRepo) ?? null,
    [activeRepo, tasks]
  );

  const anyFilters =
    query.trim().length > 0 ||
    selected.maturity.size > 0 ||
    selected.preview.size > 0 ||
    selected.paradigm.size > 0 ||
    selected.response.size > 0 ||
    selected.modality.size > 0 ||
    selected.language.size > 0;

  function toggleFacet(facet: TaskFacet, value: string) {
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
    setQuery("");
    setSelected(emptySelectedFacets());
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <div className="tb-badge">Task Explorer</div>
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

          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <div className="font-heading text-3xl font-bold text-[#25314d]">{tasks.length}</div>
              <div className="text-sm text-slate-600">Total tasks</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold text-[#25314d]">{previewCount}</div>
              <div className="text-sm text-slate-600">With preview</div>
            </div>
          </div>
        </div>

        <div className="tb-frame bg-[#fffdf9] p-5">
          <div className="text-sm font-bold text-slate-600">Quick Snapshot</div>
          <div className="mt-3 font-heading text-2xl font-bold text-[#25314d]">
            Explorer Updated
          </div>
          <div className="mt-2 text-sm text-slate-600">{formatIsoDateTime(generatedAt)}</div>

          <div className="mt-5 space-y-3">
            <div className="tb-frame-soft bg-[#eef8ff] px-4 py-3">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Order</div>
              <div className="mt-1 text-sm font-bold text-[#25314d]">Alphabetical by task title</div>
            </div>
            <div className="tb-frame-soft bg-[#fff8f0] px-4 py-3">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Details</div>
              <div className="mt-1 text-sm font-bold text-[#25314d]">Expand from Local / PsyFlow only</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="space-y-4 lg:sticky lg:top-24">
            <section className="tb-frame p-4">
              <label className="block" htmlFor="task-explorer-search">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Search
                </span>
                <input
                  id="task-explorer-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search title, task ID, preview ID, repo..."
                  className="tb-focus-ring mt-3 w-full rounded-[18px] border-2 border-[#25314d] bg-white px-4 py-3 text-sm text-[#25314d] placeholder:text-slate-400"
                />
              </label>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-slate-700">
                  Showing <span className="font-bold text-[#25314d]">{filtered.length}</span> of{" "}
                  <span className="font-bold text-[#25314d]">{tasks.length}</span>
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
            filtered.map((task) => (
              <TaskRow
                key={task.repo}
                task={task}
                onOpen={(nextTask) => setActiveRepo(nextTask.repo)}
              />
            ))
          )}
        </section>
      </div>

      <TaskDrawer task={activeTask} onClose={() => setActiveRepo(null)} />
    </section>
  );
}
