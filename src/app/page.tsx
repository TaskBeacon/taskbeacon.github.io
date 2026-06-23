import Link from "next/link";
import { IconArrowRight } from "@/components/icons";
import { FeaturedTaskCarousel } from "@/components/featured-task-carousel";
import { ResourceAccordion } from "@/components/resource-accordion";
import { getIndex } from "@/lib/task-index";
import {
  frameworkResources,
  type PublicResourceLink,
  publicResourceLinks,
  skillResources,
  type ResourceLink
} from "@/lib/site-content";

const FEATURED_REPOS = ["T000006-mid", "T000002-bart", "T000012-sst"] as const;

const SKILL_FLOW = [
  {
    eyebrow: "task-build",
    title: "Build a task package",
    user: "Use task-build to create a stop-signal task for me."
  },
  {
    eyebrow: "task-plot",
    title: "Render the task flow",
    user: "Use task-plot to generate the task-flow diagram for T000012-sst."
  },
  {
    eyebrow: "task-py2js",
    title: "Port the preview",
    user: "Use task-py2js to port T000012-sst into a browser preview."
  }
] as const;

const HOME_FRAMEWORK_EYEBROWS = new Set(["TAPS", "PsyFlow", "psyflow-web"]);

function SkillShowcase({ skills }: { skills: ResourceLink[] }) {
  const skillByEyebrow = new Map(skills.map((skill) => [skill.eyebrow, skill]));

  return (
    <section id="skills" className="space-y-7">
      <div className="text-center">
        <h2 className="mx-auto max-w-3xl font-heading text-4xl font-bold leading-tight text-[#25314d]">
          Ask for a skill like this
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-700">
          These are agent workflows. Start with the skill name, the task, and the artifact you want back.
        </p>

        <a
          className="tb-focus-ring tb-button-secondary mt-6 w-fit"
          href="https://github.com/TaskBeacon/skills"
          target="_blank"
          rel="noreferrer"
        >
          Open skills repo
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {SKILL_FLOW.map((item, index) => {
          const skill = skillByEyebrow.get(item.eyebrow);

          return (
            <a
              key={item.eyebrow}
              className="tb-frame-soft group flex min-h-[24rem] flex-col overflow-hidden bg-[#fffdf9] transition-transform hover:-translate-y-1"
              href={skill?.href ?? "https://github.com/TaskBeacon/skills"}
              target="_blank"
              rel="noreferrer"
            >
              <div className="border-b-2 border-[#25314d] bg-[#eef8ff] px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      0{index + 1} / {item.eyebrow}
                    </div>
                    <h3 className="mt-1 font-heading text-2xl font-bold leading-tight text-[#25314d]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-[#ffb7a8]" />
                    <span className="size-2.5 rounded-full bg-[#bfe6f8]" />
                    <span className="size-2.5 rounded-full bg-[#a9cfc2]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-5 p-5">
                <div className="space-y-5">
                  <div className="flex items-start justify-end gap-3">
                    <div className="max-w-[82%] rounded-[18px] rounded-tr-[4px] border-2 border-[#25314d] bg-[#d9edf6] px-4 py-3 text-sm font-bold leading-6 text-[#15213a] shadow-[0_4px_0_#25314d]">
                      {item.user}
                    </div>
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-[12px] border-2 border-[#25314d] bg-[#d7ebf6] font-mono text-sm font-bold text-[#25314d]"
                      aria-label="User avatar"
                    >
                      U
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-[12px] border-2 border-[#25314d] bg-[#ffb7a8] font-mono text-sm font-bold text-[#25314d]"
                      aria-label="Agent avatar"
                    >
                      A
                    </div>
                    <div className="max-w-[86%] rounded-[18px] rounded-tl-[4px] border-2 border-[#25314d] bg-white px-5 py-3 font-mono text-sm font-bold leading-6 text-[#25314d]">
                      Thinking...
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t-2 border-dashed border-[#25314d]/30 pt-4 text-sm font-bold text-[#25314d]">
                  <span>{item.eyebrow}</span>
                  <span className="flex items-center gap-2">
                    <span>Open skill</span>
                    <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function FrameworkShowcase({ resources }: { resources: PublicResourceLink[] }) {
  return (
    <section id="framework" className="space-y-7">
      <div className="text-center">
        <h2 className="mx-auto max-w-3xl font-heading text-4xl font-bold leading-tight text-[#25314d]">
          TAPS, PsyFlow, and psyflow-web
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-8 text-slate-700">
          TaskBeacon separates the package standard, the canonical local runtime, and the aligned browser preview layer.
        </p>

      </div>

      <ResourceAccordion resources={resources} />
    </section>
  );
}

export default function Page() {
  const index = getIndex();
  const tasks = index.tasks ?? [];
  const featuredTasks = FEATURED_REPOS.map((repo) =>
    tasks.find((task) => task.repo === repo)
  ).filter((task): task is (typeof tasks)[number] => Boolean(task));
  const curatedFeaturedTasks = featuredTasks.length > 0 ? featuredTasks : tasks.slice(0, 3);
  const previewReadyCount = tasks.filter((task) => Boolean(task.web_variant)).length;
  const homeFrameworkResources = publicResourceLinks(
    frameworkResources.filter((card) =>
      card.eyebrow ? HOME_FRAMEWORK_EYEBROWS.has(card.eyebrow) : false
    )
  );

  return (
    <div className="space-y-20 pb-8">
      <section id="tasks" className="space-y-7 pt-3 sm:pt-5">
        <div className="text-center">
          <h1 className="mx-auto max-w-3xl font-heading text-4xl font-bold leading-tight text-[#25314d]">
            {tasks.length} canonical tasks
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-700">
            {previewReadyCount} web previews ready. {curatedFeaturedTasks.length} featured tasks shown below.
          </p>

          <Link className="tb-focus-ring tb-button-secondary mt-6 w-fit" href="/tasks/">
            Open tasks
          </Link>
        </div>

        <FeaturedTaskCarousel tasks={curatedFeaturedTasks} wide />
      </section>

      <SkillShowcase skills={skillResources} />

      <FrameworkShowcase resources={homeFrameworkResources} />
    </div>
  );
}
