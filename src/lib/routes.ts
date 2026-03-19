export function tasksPageHref(): string {
  return "/tasks/";
}

export function jobsPageHref(): string {
  return "/jobs/";
}

export function taskDetailHref(repo: string): string {
  return `/tasks/${encodeURIComponent(repo)}/index.html`;
}
