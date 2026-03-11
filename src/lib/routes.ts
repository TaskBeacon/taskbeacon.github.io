export function tasksPageHref(): string {
  return "/tasks/";
}

export function taskDetailHref(repo: string): string {
  return `/tasks/${encodeURIComponent(repo)}/index.html`;
}
