import Link from "next/link";
import { ResourceCard } from "@/components/resource-card";
import { getIndex } from "@/lib/task-index";
import { landingDestinations } from "@/lib/site-content";

const featureCards = [
  {
    title: "Canonical Local Tasks",
    description: "Start from PsyFlow-first repositories that remain editable, reviewable, and versionable."
  },
  {
    title: "Aligned Web Previews",
    description: "Attach browser-based companions so labs can inspect participant-facing flows before deployment."
  },
  {
    title: "Localization Ready",
    description: "Keep task text configurable so translation, TTS, and local adaptation do not require logic rewrites."
  },
  {
    title: "Contributor Workflow",
    description: "Use clear routes for frameworks, tutorials, variants, and contribution guidelines."
  }
];

const workflowCards = [
  {
    chip: "1",
    title: "Pick A Task",
    description: "Browse canonical tasks in the explorer and use README-backed details for fast triage."
  },
  {
    chip: "2",
    title: "Inspect The Stack",
    description: "Jump into TAPS, PsyFlow, and psyflow-web references when you need implementation context."
  },
  {
    chip: "3",
    title: "Preview And Extend",
    description: "Run browser previews, then branch, localize, document, or contribute a stronger variant."
  }
];

export default function Page() {
  const index = getIndex();
  const tasks = index.tasks ?? [];
  const previewCount = tasks.filter((task) => task.web_variant).length;
  const voiceCount = tasks.filter((task) => task.has_voiceover).length;
  const featuredTask = tasks.find((task) => task.web_variant) ?? tasks[0] ?? null;

  return (
    <div className="space-y-20 pb-8">
      <section className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <div className="tb-badge">New: Canonical Tasks + Web Preview</div>
          <h1 className="mt-6 max-w-3xl font-heading text-5xl font-bold leading-[0.92] text-[#25314d] sm:text-6xl">
            Build Better Tasks,
            <br />
            <span className="text-[#39d95d]">Preview Faster,</span>
            <br />
            Ship Together.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
            TaskBeacon helps researchers move from canonical local task repositories to aligned web
            previews, contributor workflows, framework references, and study-ready documentation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="tb-focus-ring tb-button-primary" href="/tasks/">
              Open Task Explorer
            </Link>
            <Link className="tb-focus-ring tb-button-secondary" href="/framework/">
              Browse Framework
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <div className="font-heading text-3xl font-bold text-[#25314d]">{tasks.length}+</div>
              <div className="text-sm text-slate-600">Canonical tasks</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold text-[#25314d]">{previewCount}+</div>
              <div className="text-sm text-slate-600">Web previews</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold text-[#25314d]">{voiceCount}+</div>
              <div className="text-sm text-slate-600">Voice-ready tasks</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="tb-frame bg-[#fffdf9] p-6">
            {featuredTask ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-slate-600">Featured Task Pair</div>
                    <div className="mt-2 font-heading text-2xl font-bold leading-tight text-[#25314d]">
                      {featuredTask.title ?? featuredTask.repo}
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      {featuredTask.id ?? featuredTask.repo}
                      {featuredTask.web_variant?.id ? ` + ${featuredTask.web_variant.id}` : ""}
                    </div>
                  </div>
                  <span className="rounded-full bg-[#ecffe5] px-3 py-1 text-xs font-bold text-[#25314d]">
                    {featuredTask.web_variant ? "Preview linked" : "Local only"}
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="tb-frame-soft bg-[#f8fcff] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-[#25314d]">Local / PsyFlow</div>
                        <div className="mt-1 text-sm text-slate-600">{featuredTask.repo}</div>
                      </div>
                      <span className="rounded-full bg-[#e2f3fb] px-3 py-1 text-xs font-bold text-[#25314d]">
                        Canonical
                      </span>
                    </div>
                  </div>

                  <div className="tb-frame-soft bg-[#fff8f0] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-[#25314d]">Preview</div>
                        <div className="mt-1 text-sm text-slate-600">
                          {featuredTask.web_variant?.repo ?? "No preview attached"}
                        </div>
                      </div>
                      <span className="rounded-full bg-[#ffe7dd] px-3 py-1 text-xs font-bold text-[#25314d]">
                        {featuredTask.web_variant ? "Browser ready" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link className="tb-focus-ring tb-button-primary flex-1" href="/tasks/">
                    Continue To Tasks
                  </Link>
                  <Link className="tb-focus-ring tb-button-secondary" href="/tutorial/">
                    Tutorials
                  </Link>
                </div>
              </>
            ) : (
              <div className="font-heading text-2xl font-bold text-[#25314d]">
                Task index unavailable in this build.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <div className="tb-section-chip">Popular Paths</div>
          <h2 className="mt-5 font-heading text-4xl font-bold text-[#25314d]">
            Explore The Main TaskBeacon Routes
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Browse the highest-traffic entry points first, then go deeper into specific frameworks or tasks.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {landingDestinations.slice(0, 4).map((card) => (
            <ResourceCard key={card.title} {...card} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link className="tb-focus-ring tb-button-secondary" href="/tasks/">
            View All Entry Points
          </Link>
        </div>
      </section>

      <section className="rounded-[40px] bg-[#efe7de] px-6 py-14 sm:px-8">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-[#f5c1b5] px-4 py-2 text-xs font-bold text-[#25314d]">
            Why TaskBeacon
          </div>
          <h2 className="mt-5 font-heading text-4xl font-bold text-[#25314d]">
            Everything You Need To Build Better Studies
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card, index) => {
            const tones = ["bg-[#f5c1b5]", "bg-[#b9dceb]", "bg-[#ddd7f4]", "bg-[#c9f7b9]"];
            return (
              <article key={card.title} className="tb-frame-soft min-h-[220px] p-5">
                <div className={`grid size-12 place-items-center rounded-2xl border-2 border-[#25314d] ${tones[index]}`}>
                  <span className="font-heading text-lg font-bold text-[#25314d]">{index + 1}</span>
                </div>
                <div className="mt-5 font-heading text-2xl font-bold text-[#25314d]">{card.title}</div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{card.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <div className="tb-section-chip bg-[#f5c1b5]">Workflow</div>
          <h2 className="mt-5 font-heading text-4xl font-bold text-[#25314d]">
            From Local Task To Previewed Variant
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {workflowCards.map((card) => (
            <article key={card.title} className="tb-frame-soft p-5">
              <div className="inline-flex rounded-full bg-[#e2f3fb] px-3 py-1 text-sm font-bold text-[#25314d]">
                {card.chip}
              </div>
              <div className="mt-4 font-heading text-2xl font-bold text-[#25314d]">{card.title}</div>
              <div className="mt-3 text-sm leading-6 text-slate-700">{card.description}</div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
