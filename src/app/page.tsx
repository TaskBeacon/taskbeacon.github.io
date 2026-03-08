import Link from "next/link";
import { ResourceCard } from "@/components/resource-card";
import { formatIsoDateTime } from "@/lib/format";
import { getIndex } from "@/lib/task-index";
import { landingDestinations } from "@/lib/site-content";

export default function Page() {
  const index = getIndex();
  const tasks = index.tasks ?? [];
  const previewCount = tasks.filter((task) => task.web_variant).length;
  const voiceCount = tasks.filter((task) => task.has_voiceover).length;
  const paradigmCount = new Set(
    tasks.flatMap((task) => task.tags?.paradigm ?? []).map((value) => value.toLowerCase())
  ).size;

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-white/90 shadow-sm">
        <div className="relative p-8 sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(5,150,105,0.12),_transparent_30%)]" />

          <div className="relative max-w-4xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-900">
              TaskBeacon platform
            </div>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Reusable cognitive tasks, aligned browser previews, and a cleaner path from repo to study deployment.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
              TaskBeacon brings together canonical local PsyFlow tasks, psyflow-web previews,
              TAPS-oriented structure, localization hooks, and contribution workflows. The
              homepage stays lightweight; task browsing, tutorials, framework references, and
              team information each live on their own pages.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="tb-focus-ring inline-flex items-center justify-center rounded-xl bg-cta-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cta-600"
                href="/tasks/"
              >
                Open Tasks
              </Link>
              <Link
                className="tb-focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
                href="/framework/"
              >
                Explore Framework
              </Link>
              <a
                className="tb-focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
                href="https://taskbeacon.github.io/psyflow-web"
                target="_blank"
                rel="noreferrer"
              >
                Open Preview
              </a>
            </div>
          </div>

          <div className="relative mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Tasks
              </div>
              <div className="mt-2 font-heading text-3xl font-semibold text-slate-900">
                {tasks.length}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Web previews
              </div>
              <div className="mt-2 font-heading text-3xl font-semibold text-slate-900">
                {previewCount}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Paradigms
              </div>
              <div className="mt-2 font-heading text-3xl font-semibold text-slate-900">
                {paradigmCount}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Voice-ready
              </div>
              <div className="mt-2 font-heading text-3xl font-semibold text-slate-900">
                {voiceCount}
              </div>
            </div>
          </div>

          <div className="relative mt-4 rounded-2xl border border-slate-200 bg-slate-50/85 px-4 py-3 text-sm text-slate-700 shadow-sm">
            Index updated{" "}
            <span className="font-semibold text-slate-900">
              {formatIsoDateTime(index.generated_at)}
            </span>
            . Use the dedicated Tasks page for filtering and README-backed task inspection.
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Site sections
          </div>
          <div className="mt-2 font-heading text-2xl font-semibold tracking-tight text-slate-900">
            Keep the landing page focused. Use dedicated pages for the rest.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {landingDestinations.map((card) => (
            <ResourceCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.25fr_0.9fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Why this structure
          </div>
          <div className="mt-3 font-heading text-2xl font-semibold tracking-tight text-slate-900">
            Separate discovery, execution, and documentation.
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            <p>
              The homepage now explains the platform rather than forcing task browsing into the
              first screen. Task filtering lives on its own page, where dense scanning works better.
            </p>
            <p>
              Tutorials, framework references, contribution notes, and team information are now
              explicit destinations instead of mixed into the task explorer.
            </p>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-slate-50/85 p-6 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Primary workflow
          </div>
          <ol className="mt-4 space-y-3 text-sm text-slate-700">
            <li>1. Learn the structure in Framework.</li>
            <li>2. Browse concrete tasks on the Tasks page.</li>
            <li>3. Launch browser previews in Preview.</li>
            <li>4. Use Tutorial and Contribute pages to extend the library.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
