export function tasksPageHref(): string {
  return "/tasks/";
}

export function taskDetailHref(repo: string): string {
  return `/tasks/${encodeURIComponent(repo)}/`;
}

export function taskDetailStaticHref(repo: string): string {
  return `${taskDetailHref(repo)}index.html`;
}
