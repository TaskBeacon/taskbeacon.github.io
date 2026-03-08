export type ResourceLink = {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
};

export const landingDestinations: ResourceLink[] = [
  {
    eyebrow: "Tasks",
    title: "Browse canonical tasks",
    description:
      "Open the dedicated explorer for local PsyFlow tasks, aligned previews, filters, and README-backed details.",
    href: "/tasks/",
    cta: "Open tasks"
  },
  {
    eyebrow: "Tutorial",
    title: "Learn the workflow",
    description:
      "Follow setup, CLI, QA, localization, and Chinese onboarding guides without overloading the homepage.",
    href: "/tutorial/",
    cta: "Open tutorials"
  },
  {
    eyebrow: "Framework",
    title: "Inspect the stack",
    description:
      "Review TAPS, PsyFlow, psyflow-web, and agent tooling as separate framework references.",
    href: "/framework/",
    cta: "Open framework"
  },
  {
    eyebrow: "Contribute",
    title: "Add tasks and variants",
    description:
      "See contribution paths for canonical tasks, HTML variants, metadata, and review expectations.",
    href: "/contribute/",
    cta: "Open contribute"
  },
  {
    eyebrow: "Teams",
    title: "Track people and ownership",
    description:
      "Reserve a dedicated page for maintainers, collaborators, partner labs, and future public team profiles.",
    href: "/teams/",
    cta: "Open teams"
  },
  {
    eyebrow: "Preview",
    title: "Launch the web runner",
    description:
      "Go straight to the psyflow-web preview environment for runnable browser-based task companions.",
    href: "https://taskbeacon.github.io/psyflow-web",
    cta: "Open preview",
    external: true
  }
];

export const frameworkResources: ResourceLink[] = [
  {
    eyebrow: "TAPS",
    title: "Task structure standard",
    description:
      "Reference the TAPS document for the canonical directory model, documentation boundaries, and reusable repository shape.",
    href: "https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/taps.md",
    cta: "Read TAPS",
    external: true
  },
  {
    eyebrow: "PsyFlow",
    title: "Local experiment runtime",
    description:
      "Use the PsyFlow docs for scaffolding, runtime primitives, QA workflows, and local task execution.",
    href: "https://taskbeacon.github.io/psyflow/",
    cta: "Open PsyFlow",
    external: true
  },
  {
    eyebrow: "psyflow-web",
    title: "Browser preview layer",
    description:
      "Inspect the HTML runtime that mirrors canonical tasks for browser walkthroughs and validation.",
    href: "https://github.com/TaskBeacon/psyflow-web",
    cta: "Open psyflow-web",
    external: true
  },
  {
    eyebrow: "Agent Skills",
    title: "MCP and AI tooling",
    description:
      "Review taskbeacon-mcp and related skills for build, localization, voice, and workflow automation support.",
    href: "https://github.com/TaskBeacon/taskbeacon-mcp",
    cta: "Open tooling",
    external: true
  }
];

export const tutorialResources: ResourceLink[] = [
  {
    eyebrow: "Getting Started",
    title: "Scaffold your first task",
    description:
      "Follow the PsyFlow introduction for project setup, task structure, and the first runnable experiment.",
    href: "https://github.com/TaskBeacon/psyflow/blob/main/docs/tutorials/getting_started.md",
    cta: "Open guide",
    external: true
  },
  {
    eyebrow: "CLI + QA",
    title: "Validate tasks quickly",
    description:
      "Use the CLI and QA tutorials to scaffold, inspect metadata, and smoke-test local tasks.",
    href: "https://github.com/TaskBeacon/psyflow/blob/main/docs/tutorials/cli_usage.md",
    cta: "Open CLI guide",
    external: true
  },
  {
    eyebrow: "Localization",
    title: "Translate without rewriting logic",
    description:
      "Keep participant-facing strings configurable so localization and TTS can be layered onto the same task logic.",
    href: "https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/localization.md",
    cta: "Open localization",
    external: true
  },
  {
    eyebrow: "中文教程",
    title: "Chinese onboarding paths",
    description:
      "Use the Chinese-language PsyFlow tutorial entry points for setup, config, and command-line usage.",
    href: "https://github.com/TaskBeacon/psyflow/blob/main/docs/tutorials/getting_started_cn.md",
    cta: "打开教程",
    external: true
  }
];

export const contributeResources: ResourceLink[] = [
  {
    eyebrow: "Registry",
    title: "Submit a new task",
    description:
      "Start with the task-registry issue templates so new tasks arrive with the expected metadata and review context.",
    href: "https://github.com/TaskBeacon/task-registry/issues/new/choose",
    cta: "Open registry",
    external: true
  },
  {
    eyebrow: "Variants",
    title: "Track meaningful branches",
    description:
      "Use the versioning notes to keep major task variants explicit instead of hiding incompatible changes in place.",
    href: "https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/versioning.md",
    cta: "Read versioning",
    external: true
  },
  {
    eyebrow: "Review",
    title: "Check repository expectations",
    description:
      "Review the task-registry README before proposing a task or preview companion.",
    href: "https://github.com/TaskBeacon/task-registry/blob/main/README.md",
    cta: "Open README",
    external: true
  },
  {
    eyebrow: "Org",
    title: "Browse current repositories",
    description:
      "Use the TaskBeacon GitHub organization as the source of truth for active task repos, runtimes, and support tooling.",
    href: "https://github.com/TaskBeacon",
    cta: "Open GitHub org",
    external: true
  }
];
