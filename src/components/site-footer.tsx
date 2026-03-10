import { getIndex } from "@/lib/task-index";

export function SiteFooter() {
  const index = getIndex();
  const tasks = index.tasks ?? [];
  const previewCount = tasks.filter((task) => task.web_variant).length;

  return (
    <footer className="mt-16 bg-[#efe7de]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="tb-frame bg-[#fff8f0] px-6 py-8">
          <div className="font-heading text-3xl font-bold text-[#25314d]">TaskBeacon</div>
          <div className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
            Canonical tasks, aligned previews, framework references, skills, and contribution
            guidance for reusable cognitive task development.
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-700">
            <div>{tasks.length} canonical tasks</div>
            <div>{previewCount} web previews</div>
            <div>Static index updated {new Date(index.generated_at).toLocaleDateString("en-US")}</div>
          </div>

          <div className="mt-6 text-xs text-slate-600">
            TaskBeacon GitHub organization remains the public source of truth for active repositories.
          </div>
        </div>
      </div>
    </footer>
  );
}
