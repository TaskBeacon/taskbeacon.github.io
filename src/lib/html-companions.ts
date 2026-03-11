import type { TaskIndexItem, TaskWebVariant } from "@/lib/task-index";

export type HtmlCompanionManifestEntry = {
  directory: string;
  id: string;
  slug: string | null;
  title: string;
  acquisition: string | null;
  maturity: string | null;
  release_tag: string | null;
  short_description: string;
  repo_url: string;
  default_branch: string;
  download_url: string;
  run_url: string;
  last_updated: string;
};

export type HtmlCompanionManifest = {
  schema_version: number;
  generated_at: string;
  org: string;
  runner_repo: string;
  runner_url: string;
  tasks: HtmlCompanionManifestEntry[];
};

const DEFAULT_MANIFEST_URL =
  process.env.NEXT_PUBLIC_HTML_RUNNER_MANIFEST_URL || "/psyflow-web/task-manifest.json";

let manifestPromise: Promise<HtmlCompanionManifest | null> | null = null;

function normalizeValue(value: string | null | undefined): string {
  return String(value ?? "").trim().toLowerCase();
}

function pairedHtmlId(value: string | null | undefined): string | null {
  const normalized = String(value ?? "").trim();
  const match = /^T(\d{6})$/i.exec(normalized);
  return match ? `H${match[1]}` : null;
}

function taskToCompanion(task: TaskIndexItem, entry: HtmlCompanionManifestEntry): TaskWebVariant {
  return {
    id: entry.id,
    repo: entry.directory,
    title: entry.title,
    html_url: entry.repo_url,
    default_branch: entry.default_branch,
    short_description: entry.short_description,
    maturity: entry.maturity,
    acquisition: entry.acquisition,
    variant: "html",
    release_tag: entry.release_tag,
    last_updated: entry.last_updated,
    run_url: entry.run_url,
    download_zip: entry.download_url
  };
}

export function taskHasPreview(task: TaskIndexItem): boolean {
  return task.variant === "html" || Boolean(task.web_variant);
}

export function findHtmlCompanion(
  task: TaskIndexItem,
  manifest: HtmlCompanionManifest | null | undefined
): TaskWebVariant | null {
  if (!manifest || task.variant === "html") {
    return task.web_variant ?? null;
  }

  const taskSlug = normalizeValue(task.slug);
  const taskId = normalizeValue(task.id);
  const expectedHtmlId = normalizeValue(pairedHtmlId(task.id));

  const match =
    manifest.tasks.find((entry) => {
      const entrySlug = normalizeValue(entry.slug);
      if (taskSlug && entrySlug && taskSlug === entrySlug) {
        return true;
      }

      const entryId = normalizeValue(entry.id);
      return Boolean(expectedHtmlId) && entryId === expectedHtmlId;
    }) ?? null;

  if (!match) {
    return task.web_variant ?? null;
  }

  return taskToCompanion(task, match);
}

export function mergeTaskWithHtmlCompanion(
  task: TaskIndexItem,
  manifest: HtmlCompanionManifest | null | undefined
): TaskIndexItem {
  const webVariant = findHtmlCompanion(task, manifest);
  if (webVariant === task.web_variant) {
    return task;
  }
  return {
    ...task,
    web_variant: webVariant
  };
}

export function mergeTasksWithHtmlCompanions(
  tasks: TaskIndexItem[],
  manifest: HtmlCompanionManifest | null | undefined
): TaskIndexItem[] {
  if (!manifest) {
    return tasks;
  }
  return tasks.map((task) => mergeTaskWithHtmlCompanion(task, manifest));
}

export async function loadHtmlCompanionManifest(): Promise<HtmlCompanionManifest | null> {
  if (!manifestPromise) {
    manifestPromise = fetch(DEFAULT_MANIFEST_URL)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Manifest request failed: ${response.status}`);
        }
        return (await response.json()) as HtmlCompanionManifest;
      })
      .catch(() => null);
  }
  return manifestPromise;
}
