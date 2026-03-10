import Link from "next/link";
import { FeaturedTaskCarousel } from "@/components/featured-task-carousel";
import { ResourceCard } from "@/components/resource-card";
import { getIndex } from "@/lib/task-index";
import {
  contributeResources,
  frameworkHighlights,
  overviewResources,
  skillResources,
  tutorialResources
} from "@/lib/site-content";

const FEATURED_REPOS = ["T000002-bart", "T000012-sst", "T000006-mid"] as const;

function TapsDiagram() {
  return (
    <div className="tb-frame bg-[#fffdf9] p-5">
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-3">
          <div className="tb-frame-soft bg-[#eef8ff] p-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Entry Layer
            </div>
            <div className="mt-2 font-heading text-2xl font-bold text-[#25314d]">
              README + taskbeacon.yaml
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-700">
              Start with one public description of the paradigm and one machine-readable metadata file.
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="tb-frame-soft bg-[#fff8f0] p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Config
              </div>
              <div className="mt-2 font-heading text-xl font-bold text-[#25314d]">
                parameters, stimuli, subject info
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-700">
                Keep participant-facing text and tunable settings outside runtime code.
              </div>
            </div>

            <div className="tb-frame-soft bg-[#f3efff] p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Runtime
              </div>
              <div className="mt-2 font-heading text-xl font-bold text-[#25314d]">
                main + run_trial + controller
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-700">
                Keep the task flow auditable and the state machine easy to review.
              </div>
            </div>
          </div>

          <div className="tb-frame-soft bg-[#ecffe5] p-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Evidence + Review
            </div>
            <div className="mt-2 font-heading text-2xl font-bold text-[#25314d]">
              references + task flow artifacts
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-700">
              Map protocol evidence, plots, and README snapshots back to the implementation.
            </div>
          </div>
        </div>

        <div className="tb-frame-soft bg-[#fff8f0] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            TAPS Outcome
          </div>
          <div className="mt-3 font-heading text-3xl font-bold leading-tight text-[#25314d]">
            One task package that stays readable across code, docs, and deployment.
          </div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <div className="rounded-[18px] border-2 border-[#25314d] bg-white px-4 py-3 shadow-[0_4px_0_#25314d]">
              Canonical local task for installation, editing, QA, and review
            </div>
            <div className="rounded-[18px] border-2 border-[#25314d] bg-white px-4 py-3 shadow-[0_4px_0_#25314d]">
              Optional aligned browser preview without breaking the local contract
            </div>
            <div className="rounded-[18px] border-2 border-[#25314d] bg-white px-4 py-3 shadow-[0_4px_0_#25314d]">
              Reusable documentation for localization, voice, publication, and contribution
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const index = getIndex();
  const tasks = index.tasks ?? [];
  const previewCount = tasks.filter((task) => task.web_variant).length;
  const featuredTasks = FEATURED_REPOS.map((repo) => tasks.find((task) => task.repo === repo)).filter(
    (task): task is (typeof tasks)[number] => Boolean(task)
  );
  const curatedFeaturedTasks = featuredTasks.length > 0 ? featuredTasks : tasks.slice(0, 3);

  return (
    <div className="space-y-20 pb-8">
      <section className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <div className="tb-badge">New: canonical tasks, previews, docs, and skills</div>
          <h1 className="mt-6 max-w-3xl font-heading text-5xl font-bold leading-[0.92] text-[#25314d] sm:text-6xl">
            Build Better Tasks,
            <br />
            <span className="text-[#39d95d]">Preview Faster,</span>
            <br />
            Share Clearer Workflows.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
            TaskBeacon brings together canonical tasks, the TAPS structure, PsyFlow authoring,
            psyflow-web previews, automation skills, and contribution guidance in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              className="tb-focus-ring tb-button-primary"
              href="https://taskbeacon.github.io/psyflow-web"
              target="_blank"
              rel="noreferrer"
            >
              Preview Tasks
            </a>
            <Link className="tb-focus-ring tb-button-secondary" href="/tasks/">
              See Tasks
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
              <div className="font-heading text-3xl font-bold text-[#25314d]">
                {skillResources.length}
              </div>
              <div className="text-sm text-slate-600">Automation skills</div>
            </div>
          </div>
        </div>

        <FeaturedTaskCarousel tasks={curatedFeaturedTasks} />
      </section>

      <section id="overview" className="space-y-8">
        <div className="text-center">
          <div className="tb-section-chip">Overview</div>
          <h2 className="mt-5 font-heading text-4xl font-bold text-[#25314d]">
            Explore The Main TaskBeacon Sections
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Start here for the big picture, then jump into the section you need next.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {overviewResources.map((card, index) => (
            <div key={card.title} className={index === overviewResources.length - 1 ? "md:col-span-2" : undefined}>
              <ResourceCard {...card} />
            </div>
          ))}
        </div>
      </section>

      <section id="taps" className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <div className="tb-section-chip bg-[#f5c1b5]">TAPS</div>
            <h2 className="mt-5 font-heading text-4xl font-bold text-[#25314d]">
              A structure standard for task packages, not just another gallery label.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              TAPS organizes task logic, config, references, and documentation into a package that
              remains inspectable for labs, reviewers, and downstream tooling. It is the backbone
              that lets TaskBeacon pair canonical local tasks with aligned previews and reusable docs.
            </p>
            <div className="mt-6">
              <a
                className="tb-focus-ring tb-button-primary"
                href="https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/taps.md"
                target="_blank"
                rel="noreferrer"
              >
                Read TAPS
              </a>
            </div>
          </div>

          <TapsDiagram />
        </div>
      </section>

      <section id="framework" className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="tb-section-chip">Framework</div>
            <h2 className="mt-5 font-heading text-4xl font-bold text-[#25314d]">
              PsyFlow authors the task. psyflow-web previews the same task in the browser.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700">
              Keep the local task canonical, then attach a browser-native companion only when it stays aligned.
            </p>
          </div>

          <Link className="tb-focus-ring tb-button-secondary" href="/framework/">
            Open Framework Page
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {frameworkHighlights.map((card) => (
            <ResourceCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section id="skills" className="space-y-8">
        <div className="text-center">
          <div className="tb-section-chip bg-[#ddd7f4]">Skills</div>
          <h2 className="mt-5 font-heading text-4xl font-bold text-[#25314d]">
            Automation skills for building, plotting, and translating tasks
          </h2>
          <p className="mt-3 text-base text-slate-600">
            These skills focus on concrete production work instead of generic prompts.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillResources.map((card) => (
            <ResourceCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section id="tutorial" className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="tb-section-chip bg-[#b9dceb]">Tutorial</div>
            <h2 className="mt-5 font-heading text-4xl font-bold text-[#25314d]">
              Learn the practical workflows that matter first
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700">
              Start with setup, then move into localization, voice instructions, and QA before release.
            </p>
          </div>

          <Link className="tb-focus-ring tb-button-secondary" href="/tutorial/">
            Open Tutorials
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {tutorialResources.map((card) => (
            <ResourceCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section id="contribute" className="rounded-[40px] bg-[#efe7de] px-6 py-14 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <div className="inline-flex rounded-full bg-[#f5c1b5] px-4 py-2 text-xs font-bold text-[#25314d]">
              Contribute
            </div>
            <h2 className="mt-5 font-heading text-4xl font-bold text-[#25314d]">
              Add new tasks and variants without making the catalog harder to read
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Contribution should start with a clear registry path, explicit variant handling, and
              docs that stay usable before someone opens the source code.
            </p>
            <div className="mt-6">
              <Link className="tb-focus-ring tb-button-primary" href="/contribute/">
                Open Contribute Page
              </Link>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {contributeResources.slice(0, 2).map((card) => (
              <ResourceCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
