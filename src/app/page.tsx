import Link from "next/link";
import { GalleryClient } from "@/app/_components/gallery-client";
import { IconArrowRight } from "@/components/icons";
import { getIndex } from "@/lib/task-index";
import { formatIsoDateTime } from "@/lib/format";

const capabilityCards = [
  {
    title: "TAPS",
    description:
      "Standardize task structure with a reusable layout for assets, config, code, data, analysis, and documentation.",
    href: "https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/taps.md"
  },
  {
    title: "PsyFlow",
    description:
      "Build modular PsychoPy experiments with scaffolding, QA utilities, simulation support, and shared runtime primitives.",
    href: "https://taskbeacon.github.io/psyflow/"
  },
  {
    title: "Web Preview",
    description:
      "Attach an HTML companion to the canonical local task so researchers can inspect aligned browser previews before deployment.",
    href: "https://github.com/TaskBeacon/psyflow-web"
  },
  {
    title: "Localization + TTS",
    description:
      "Keep participant-facing text in config so tasks can be localized and turned into multilingual voice instructions without rewriting task logic.",
    href: "https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/localization.md"
  },
  {
    title: "AI / MCP / Skills",
    description:
      "Use taskbeacon-mcp and checked-in workflows to build, localize, document, and align task variants more efficiently.",
    href: "https://github.com/TaskBeacon/taskbeacon-mcp"
  }
];

const tutorialCards = [
  {
    title: "Getting Started",
    description:
      "Follow the PsyFlow introduction to scaffold a task, structure config, and wire a runnable experiment.",
    href: "https://github.com/TaskBeacon/psyflow/blob/main/docs/tutorials/getting_started.md"
  },
  {
    title: "CLI and QA",
    description:
      "Use the CLI guides and QA runner docs to scaffold projects, validate contracts, and smoke-test tasks quickly.",
    href: "https://github.com/TaskBeacon/psyflow/blob/main/docs/tutorials/cli_usage.md"
  },
  {
    title: "Chinese Tutorials",
    description:
      "Direct Chinese-language entry points for onboarding, configuration, and command-line usage.",
    href: "https://github.com/TaskBeacon/psyflow/blob/main/docs/tutorials/getting_started_cn.md"
  }
];

const contributeCards = [
  {
    title: "Submit a New Task",
    description:
      "Propose a new task through the task-registry workflow with a structured issue and TAPS-oriented checklist.",
    href: "https://github.com/TaskBeacon/task-registry/issues/new/choose"
  },
  {
    title: "Track Meaningful Variants",
    description:
      "Publish substantial task variants as branches so lineage, differences, and maintenance stay explicit.",
    href: "https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/versioning.md"
  },
  {
    title: "Review TAPS Expectations",
    description:
      "Check the canonical repo shape and contribution notes before opening a new task proposal or branch-based variant.",
    href: "https://github.com/TaskBeacon/task-registry/blob/main/README.md"
  }
];

const skillsCards = [
  {
    title: "taskbeacon-mcp",
    description:
      "FastMCP server exposing build, download, task listing, localization, and voice-selection tools for LLM-assisted workflows.",
    href: "https://github.com/TaskBeacon/taskbeacon-mcp",
    cta: "Open repo"
  },
  {
    title: "task-py2js skill",
    description:
      "Alignment workflow for porting canonical PsyFlow tasks into browser-native H-series previews while preserving task semantics.",
    href: "https://github.com/TaskBeacon/psyflow-web",
    cta: "See web runtime"
  },
  {
    title: "Public skill catalog",
    description:
      "Placeholder: surface more reusable TaskBeacon skill docs here as they are promoted into stable public references.",
    href: "https://github.com/TaskBeacon",
    cta: "View org"
  }
];

function InfoCard({
  title,
  description,
  href,
  cta = "Read more"
}: {
  title: string;
  description: string;
  href: string;
  cta?: string;
}) {
  return (
    <a
      className="group rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        Resource
      </div>
      <div className="mt-3 font-heading text-xl font-semibold tracking-tight text-slate-900">
        {title}
      </div>
      <div className="mt-3 text-sm leading-6 text-slate-700">{description}</div>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-900">
        {cta}
        <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}

export default function Page() {
  const index = getIndex();
  const tasks = index.tasks ?? [];
  const previewCount = tasks.filter((task) => task.web_variant).length;
  const voiceCount = tasks.filter((task) => task.has_voiceover).length;
  const paradigmCount = new Set(
    tasks.flatMap((task) => task.tags?.paradigm ?? []).map((value) => value.toLowerCase())
  ).size;

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-white/90 shadow-sm">
        <div className="relative p-8 sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(5,150,105,0.12),_transparent_30%)]" />

          <div className="relative">
            <div className="max-w-4xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-900">
                TaskBeacon platform
              </div>
              <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Reusable local tasks, aligned web previews, and a clearer path from paradigm to deployment.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
                TaskBeacon organizes community-maintained PsyFlow and TAPS tasks for local execution, browser preview, localization, documentation, and collaborative iteration. Start with the explorer below, then dive into the standards, tooling, and contribution workflows that make the library reusable.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  className="tb-focus-ring inline-flex items-center justify-center rounded-xl bg-cta-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cta-600"
                  href="#explorer"
                >
                  Explore Tasks
                </Link>
                <Link
                  className="tb-focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
                  href="/about#contribute"
                >
                  Contribute a Task
                </Link>
                <a
                  className="tb-focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
                  href="https://github.com/TaskBeacon"
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub Org
                </a>
              </div>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Tasks</div>
                <div className="mt-2 font-heading text-3xl font-semibold text-slate-900">{tasks.length}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Web previews</div>
                <div className="mt-2 font-heading text-3xl font-semibold text-slate-900">{previewCount}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Paradigms</div>
                <div className="mt-2 font-heading text-3xl font-semibold text-slate-900">{paradigmCount}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Voice-ready tasks</div>
                <div className="mt-2 font-heading text-3xl font-semibold text-slate-900">{voiceCount}</div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/85 px-4 py-3 text-sm text-slate-700 shadow-sm">
              Index updated <span className="font-semibold text-slate-900">{formatIsoDateTime(index.generated_at)}</span>. The explorer below loads README snapshots on demand instead of shipping them in the first page payload.
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Platform capabilities
            </div>
            <div className="mt-2 font-heading text-2xl font-semibold tracking-tight text-slate-900">
              Standards, runtime layers, localization, and AI tooling.
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {capabilityCards.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <GalleryClient tasks={tasks} />

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-4" id="tutorials">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Tutorials
            </div>
            <div className="mt-2 font-heading text-2xl font-semibold tracking-tight text-slate-900">
              Learn PsyFlow and task authoring.
            </div>
          </div>
          {tutorialCards.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>

        <div className="space-y-4" id="contribute">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Contribute and variants
            </div>
            <div className="mt-2 font-heading text-2xl font-semibold tracking-tight text-slate-900">
              Submit, review, and iterate on tasks.
            </div>
          </div>
          {contributeCards.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>

        <div className="space-y-4" id="skills">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Related skills and MCP
            </div>
            <div className="mt-2 font-heading text-2xl font-semibold tracking-tight text-slate-900">
              AI-assisted workflows that sit next to the task library.
            </div>
          </div>
          {skillsCards.map((card) => (
            <InfoCard key={card.title} title={card.title} description={card.description} href={card.href} cta={card.cta} />
          ))}
        </div>
      </section>
    </div>
  );
}
