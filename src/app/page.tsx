import Link from "next/link";
import { getIndex } from "@/lib/task-index";
import { formatIsoDateTime } from "@/lib/format";
import { GalleryClient } from "@/app/_components/gallery-client";

export default function Page() {
  const index = getIndex();
  const tasks = index.tasks ?? [];
  const previewCount = tasks.filter((task) => task.web_variant).length;

  return (
    <div className="space-y-10">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Local task repos with web previews when available.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
            Browse PsyFlow/TAPS task repositories under the TaskBeacon GitHub organization.
            Search by paradigm and maturity, open the canonical local repo, and launch a browser preview whenever a matched HTML companion exists.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="tb-focus-ring inline-flex items-center justify-center rounded-xl bg-cta-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cta-600"
              href="/about#contribute"
            >
              Add Your Task
            </Link>
            <a
              className="tb-focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
              href="https://github.com/TaskBeacon"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Index Status
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Tasks
                </div>
                <div className="mt-1 font-heading text-2xl font-semibold text-slate-900">
                  {tasks.length}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Web previews
                </div>
                <div className="mt-1 font-heading text-2xl font-semibold text-slate-900">
                  {previewCount}
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Generated
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {formatIsoDateTime(index.generated_at)}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-brand-50 p-4 text-sm text-slate-800">
              This site is statically deployed. A GitHub Action refreshes the index on a schedule and automatically folds matched HTML companions into the main task cards.
            </div>
          </div>
        </div>
      </section>

      <GalleryClient tasks={tasks} />
    </div>
  );
}
