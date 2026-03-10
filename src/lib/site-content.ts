export type ResourceLink = {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
};

export const overviewResources: ResourceLink[] = [
  {
    eyebrow: "TAPS",
    title: "Understand the Task Package Standard",
    description:
      "See how TAPS keeps code, config, references, and docs in one auditable package.",
    href: "#taps",
    cta: "Jump to TAPS"
  },
  {
    eyebrow: "Framework",
    title: "Inspect PsyFlow and psyflow-web",
    description:
      "Follow the local runtime and the browser preview layer as one connected stack.",
    href: "#framework",
    cta: "Jump to framework"
  },
  {
    eyebrow: "Skills",
    title: "Use build, plot, and translation skills",
    description:
      "Use automation skills for building, plotting, and local-to-web transfer.",
    href: "#skills",
    cta: "Jump to skills"
  },
  {
    eyebrow: "Tutorial",
    title: "Learn localization, voice, and QA",
    description:
      "Open practical guides for setup, localization, voice, and validation.",
    href: "#tutorial",
    cta: "Jump to tutorials"
  },
  {
    eyebrow: "Contribute",
    title: "Contribute tasks and variants clearly",
    description:
      "Start from the registry and keep variants explicit and reviewable.",
    href: "#contribute",
    cta: "Jump to contribute"
  }
];

export const frameworkHighlights: ResourceLink[] = [
  {
    eyebrow: "PsyFlow",
    title: "Local runtime and authoring workflow",
    description:
      "Author canonical tasks, run QA and sim modes, and keep the local repo canonical.",
    href: "https://taskbeacon.github.io/psyflow/",
    cta: "Open PsyFlow",
    external: true
  },
  {
    eyebrow: "psyflow-web",
    title: "Shared browser preview runtime",
    description:
      "Launch HTML companions from one shared runner and keep them aligned to local tasks.",
    href: "https://taskbeacon.github.io/psyflow-web",
    cta: "Open psyflow-web",
    external: true
  }
];

export const frameworkResources: ResourceLink[] = [
  {
    eyebrow: "TAPS",
    title: "Task structure standard",
    description:
      "Reference the canonical directory model, documentation boundaries, and repo shape.",
    href: "https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/taps.md",
    cta: "Read TAPS",
    external: true
  },
  {
    eyebrow: "PsyFlow",
    title: "Local experiment runtime",
    description:
      "Use PsyFlow for scaffolding, runtime primitives, QA workflows, and local execution.",
    href: "https://taskbeacon.github.io/psyflow/",
    cta: "Open PsyFlow",
    external: true
  },
  {
    eyebrow: "psyflow-web",
    title: "Browser preview layer",
    description:
      "Inspect the HTML runtime that mirrors canonical tasks for browser walkthroughs.",
    href: "https://github.com/TaskBeacon/psyflow-web",
    cta: "Open psyflow-web",
    external: true
  },
  {
    eyebrow: "Skills",
    title: "Build and automation support",
    description:
      "Review skills and tooling for task construction, plotting, and aligned web translation.",
    href: "https://github.com/TaskBeacon/skills",
    cta: "Open skills",
    external: true
  }
];

export const skillResources: ResourceLink[] = [
  {
    eyebrow: "task-build",
    title: "Build literature-grounded PsyFlow tasks",
    description:
      "Create or refactor cognitive tasks into validated PsyFlow/TAPS projects from literature evidence.",
    href: "https://github.com/TaskBeacon/skills/tree/main/task-build",
    cta: "Open task-build",
    external: true
  },
  {
    eyebrow: "task-plot",
    title: "Generate auditable task flow plots",
    description:
      "Render condition-wise flow diagrams with audit artifacts for review.",
    href: "https://github.com/TaskBeacon/skills/tree/main/task-plot",
    cta: "Open task-plot",
    external: true
  },
  {
    eyebrow: "task-py2js",
    title: "Port local tasks into aligned web previews",
    description:
      "Convert a canonical PsyFlow task into an aligned psyflow-web companion.",
    href: "https://github.com/TaskBeacon/skills/tree/main/task-py2js",
    cta: "Open task-py2js",
    external: true
  }
];

export const tutorialResources: ResourceLink[] = [
  {
    eyebrow: "Getting Started",
    title: "Scaffold your first task",
    description:
      "Start with project setup, task structure, and the first runnable experiment.",
    href: "https://github.com/TaskBeacon/psyflow/blob/main/docs/tutorials/getting_started.md",
    cta: "Open guide",
    external: true
  },
  {
    eyebrow: "Localization",
    title: "Translate task content without touching logic",
    description:
      "Use config-driven localization instead of rewriting runtime code.",
    href: "https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/localization.md",
    cta: "Open localization",
    external: true
  },
  {
    eyebrow: "Voice",
    title: "Create instruction audio from config",
    description:
      "See a concrete task example that keeps instruction audio inside task config.",
    href: "https://github.com/TaskBeacon/T000001-ax-cpt/blob/main/README.md",
    cta: "Open voice example",
    external: true
  },
  {
    eyebrow: "CLI + QA",
    title: "Validate tasks before release",
    description:
      "Use the CLI and QA tutorials to inspect metadata and smoke-test tasks.",
    href: "https://github.com/TaskBeacon/psyflow/blob/main/docs/tutorials/cli_usage.md",
    cta: "Open CLI guide",
    external: true
  }
];

export const contributeResources: ResourceLink[] = [
  {
    eyebrow: "Registry",
    title: "Submit a new task",
    description:
      "Start with task-registry issue templates and bring metadata with the task.",
    href: "https://github.com/TaskBeacon/task-registry/issues/new/choose",
    cta: "Open registry",
    external: true
  },
  {
    eyebrow: "Variants",
    title: "Track meaningful branches",
    description:
      "Keep major task variants explicit instead of hiding incompatible changes in place.",
    href: "https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/versioning.md",
    cta: "Read versioning",
    external: true
  },
  {
    eyebrow: "Review",
    title: "Check repository expectations",
    description:
      "Review repository expectations before proposing a task or preview companion.",
    href: "https://github.com/TaskBeacon/task-registry/blob/main/README.md",
    cta: "Open README",
    external: true
  },
  {
    eyebrow: "Org",
    title: "Browse current repositories",
    description:
      "Use the GitHub organization as the source of truth for active repos and tooling.",
    href: "https://github.com/TaskBeacon",
    cta: "Open GitHub org",
    external: true
  }
];
