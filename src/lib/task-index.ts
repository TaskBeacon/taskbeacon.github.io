import rawIndex from "@/data/tasks_index.json";

export type TaskTagFacet = "paradigm" | "response" | "modality" | "language";

export type TaskFacet = TaskTagFacet | "maturity";

export type TaskTags = Record<TaskTagFacet, string[]>;

export type TaskStructure = {
  config?: boolean;
  assets?: boolean;
  src?: boolean;
};

export type TaskIndexItem = {
  repo: string;
  full_name: string;
  html_url: string;
  default_branch: string;
  short_description: string;
  maturity?: string | null;
  tags: TaskTags;
  keywords: string[];
  psyflow_version?: string | null;
  has_voiceover?: boolean | null;
  last_updated: string;
  structure?: TaskStructure;
  readme_run_anchor?: string;
};

export type TaskIndex = {
  schema_version: number;
  generated_at: string;
  org: string;
  tasks: TaskIndexItem[];
};

export function getIndex(): TaskIndex {
  return rawIndex as TaskIndex;
}

export function getTasks(): TaskIndexItem[] {
  return getIndex().tasks ?? [];
}

export function findTaskByRepo(
  repo: string | null | undefined
): TaskIndexItem | undefined {
  if (!repo) return undefined;
  const needle = String(repo).toLowerCase();
  return getTasks().find((t) => String(t.repo ?? "").toLowerCase() === needle);
}

export function taskLinks(t: TaskIndexItem) {
  const repo = t.html_url;
  const run = `${repo}${t.readme_run_anchor || "#run"}`;
  const downloadZip = `${repo}/archive/refs/heads/${t.default_branch}.zip`;
  return { repo, run, downloadZip };
}
