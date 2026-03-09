"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { TaskFacet, TaskIndexItem, TaskTagFacet } from "@/lib/task-index";
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
    <section className="rounded-[24px] border border-white/80 bg-white/88 p-4 shadow-[0_16px_40px_rgba(14,165,233,0.08)]">
      <button
        type="button"
        className="tb-focus-ring flex w-full items-center justify-between gap-3 rounded-lg text-left"
        onClick={onToggleOpen}
      >
        <h3 className="font-heading text-sm font-semibold tracking-tight text-slate-900">
          {title}
        </h3>
        <div className="text-xs font-semibold text-slate-600">
          {selected[facet].size > 0 ? `${selected[facet].size} selected` : `${values.length} options`}
        </div>
      </button>

      {isOpen ? (
        <div className="mt-3 flex flex-wrap gap-2">
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
  const voiceCount = useMemo(() => tasks.filter((task) => task.has_voiceover).length, [tasks]);
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
    <section className="space-y-6">
      <div className="rounded-[36px] border border-white/80 bg-white/84 p-5 shadow-[0_20px_60px_rgba(14,165,233,0.12)]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-800">
                Tasks
              </div>
              <div className="mt-2 font-heading text-3xl font-semibold tracking-tight text-slate-900">
                Browse canonical local tasks and aligned previews.
              </div>
              <div className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
                Filter from the left, scan a cleaner alphabetical list on the right, and expand
                README-backed details only when you need deeper context.
              </div>
            </div>

            <div className="rounded-[24px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(236,254,255,0.88),rgba(255,247,237,0.86))] px-4 py-3 text-sm text-slate-700 shadow-sm">
              Index updated{" "}
              <span className="font-semibold text-slate-900">
                {formatIsoDateTime(generatedAt)}
              </span>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[24px] border border-brand-100 bg-white/90 p-4 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Total tasks
              </div>
              <div className="mt-2 font-heading text-2xl font-semibold text-slate-900">
                {tasks.length}
              </div>
            </div>
            <div className="rounded-[24px] border border-brand-100 bg-white/90 p-4 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Matching now
              </div>
              <div className="mt-2 font-heading text-2xl font-semibold text-slate-900">
                {filtered.length}
              </div>
            </div>
            <div className="rounded-[24px] border border-brand-100 bg-white/90 p-4 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Previews
              </div>
              <div className="mt-2 font-heading text-2xl font-semibold text-slate-900">
                {previewCount}
              </div>
            </div>
            <div className="rounded-[24px] border border-brand-100 bg-white/90 p-4 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Voice-ready
              </div>
              <div className="mt-2 font-heading text-2xl font-semibold text-slate-900">
                {voiceCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 space-y-4">
            <section className="rounded-[24px] border border-white/80 bg-white/90 p-4 shadow-[0_16px_40px_rgba(14,165,233,0.08)]">
              <label className="block" htmlFor="task-explorer-search">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Search
                </span>
                <input
                  id="task-explorer-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="e.g. stroop, T000012, H000006, EEG"
                  className="tb-focus-ring mt-2 w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
                />
              </label>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-slate-700">
                  Showing <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
                  of <span className="font-semibold text-slate-900">{tasks.length}</span>
                </div>
                {anyFilters ? (
                  <button
                    type="button"
                    className="tb-focus-ring rounded-2xl border border-brand-100 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:border-brand-200 hover:bg-brand-50"
                    onClick={clearAll}
                  >
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
              title="Paradigm / Task Type"
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

        <section className="space-y-3 lg:col-span-8 xl:col-span-9">
          {filtered.length === 0 ? (
            <div className="rounded-[32px] border border-white/80 bg-white/90 p-10 text-center shadow-[0_18px_44px_rgba(14,165,233,0.08)]">
              <div className="font-heading text-lg font-semibold tracking-tight text-slate-900">
                No matches
              </div>
              <div className="mt-2 text-sm text-slate-700">
                Try clearing filters or searching by task name, repo handle, or task ID.
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="tb-focus-ring rounded-2xl bg-gradient-to-r from-cta-500 to-cta-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(245,158,11,0.24)] hover:-translate-y-0.5"
                  onClick={clearAll}
                >
                  Reset explorer
                </button>
              </div>
            </div>
          ) : (
            filtered.map((task) => (
              <TaskRow
                key={task.repo}
                task={task}
                onTagClick={(facet: TaskTagFacet, value) => toggleFacet(facet, value)}
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
