"use client";

import { useMemo, useState } from "react";
import type { TaskFacet, TaskIndexItem, TaskTagFacet } from "@/lib/task-index";
import {
  emptySelectedFacets,
  facetValues,
  filterTasks,
  type SelectedFacets
} from "@/lib/task-filter";
import { TagChip } from "@/components/tag-chip";
import { TaskCard } from "@/components/task-card";
import { formatMaturityLabel } from "@/components/maturity-badge";

function FacetSection({
  title,
  facet,
  values,
  selected,
  onToggle
}: {
  title: string;
  facet: TaskFacet;
  values: string[];
  selected: SelectedFacets;
  onToggle: (facet: TaskFacet, value: string) => void;
}) {
  if (values.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-heading text-sm font-semibold tracking-tight text-slate-900">
          {title}
        </h3>
        {selected[facet].size > 0 ? (
          <div className="text-xs font-semibold text-brand-800">
            {selected[facet].size} selected
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((v) => (
          <TagChip
            key={`${facet}:${v}`}
            label={facet === "maturity" ? formatMaturityLabel(v) : v}
            selected={selected[facet].has(v)}
            onClick={() => onToggle(facet, v)}
          />
        ))}
      </div>
    </section>
  );
}

export function GalleryClient({ tasks }: { tasks: TaskIndexItem[] }) {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<SelectedFacets>(() => emptySelectedFacets());

  const allMaturities = useMemo(() => facetValues(tasks, "maturity"), [tasks]);
  const allParadigms = useMemo(() => facetValues(tasks, "paradigm"), [tasks]);
  const allResponses = useMemo(() => facetValues(tasks, "response"), [tasks]);
  const allModalities = useMemo(() => facetValues(tasks, "modality"), [tasks]);
  const allLanguages = useMemo(() => facetValues(tasks, "language"), [tasks]);

  const filtered = useMemo(() => filterTasks(tasks, query, selected), [tasks, query, selected]);

  const anyFilters =
    query.trim().length > 0 ||
    selected.maturity.size > 0 ||
    selected.paradigm.size > 0 ||
    selected.response.size > 0 ||
    selected.modality.size > 0 ||
    selected.language.size > 0;

  function toggleFacet(facet: TaskFacet, value: string) {
    setSelected((prev) => {
      const next: SelectedFacets = {
        maturity: new Set(prev.maturity),
        paradigm: new Set(prev.paradigm),
        response: new Set(prev.response),
        modality: new Set(prev.modality),
        language: new Set(prev.language)
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <aside className="lg:col-span-4 xl:col-span-3">
        <div className="sticky top-24 space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600" htmlFor="search">
              Search
            </label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. stroop, sst, EEG"
              className="tb-focus-ring mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400"
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
                <span className="font-semibold text-slate-900">{tasks.length}</span>
              </div>
              {anyFilters ? (
                <button
                  type="button"
                  className="tb-focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:border-brand-200 hover:bg-brand-50"
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
          />
          <FacetSection
            title="Paradigm"
            facet="paradigm"
            values={allParadigms}
            selected={selected}
            onToggle={toggleFacet}
          />
          <FacetSection
            title="Response Type"
            facet="response"
            values={allResponses}
            selected={selected}
            onToggle={toggleFacet}
          />
          <FacetSection
            title="Modality"
            facet="modality"
            values={allModalities}
            selected={selected}
            onToggle={toggleFacet}
          />
          <FacetSection
            title="Language"
            facet="language"
            values={allLanguages}
            selected={selected}
            onToggle={toggleFacet}
          />
        </div>
      </aside>

      <section className="lg:col-span-8 xl:col-span-9">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white/85 p-10 text-center shadow-sm">
            <div className="font-heading text-lg font-semibold tracking-tight text-slate-900">
              No matches
            </div>
            <div className="mt-2 text-sm text-slate-700">
              Try clearing filters or searching by paradigm name (e.g., Stroop, SST, N-back).
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="tb-focus-ring rounded-lg bg-cta-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cta-600"
                onClick={clearAll}
              >
                Reset
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filtered.map((t) => (
              <TaskCard
                key={t.repo}
                task={t}
                onTagClick={(facet: TaskTagFacet, value) => toggleFacet(facet, value)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
