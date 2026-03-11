import { getIndex } from "@/lib/task-index";
import { TaskBeaconLogo, TaskBeaconMark } from "@/components/taskbeacon-logo";

export function SiteFooter() {
  const index = getIndex();
  const tasks = index.tasks ?? [];
  const previewCount = tasks.filter((task) => task.web_variant).length;

  return (
    <footer className="mt-16 bg-[#efe7de]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="tb-frame bg-[#fff8f0] px-6 py-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
            <div>
              <TaskBeaconLogo markClassName="size-11" textClassName="text-3xl" />
              <div className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">
                Canonical tasks, aligned previews, framework references, and reusable guidance for
                auditable cognitive task development.
              </div>

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-700">
                <div>{tasks.length} canonical tasks</div>
                <div>{previewCount} web previews</div>
                <div>Index updated {new Date(index.generated_at).toLocaleDateString("en-US")}</div>
              </div>

              <div className="mt-5 text-xs text-slate-600">
                TaskBeacon GitHub organization remains the public source of truth for active repositories.
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="tb-frame-soft flex items-center justify-center bg-[#eef8ff] px-6 py-8">
                <div className="flex items-center gap-4">
                  <TaskBeaconMark className="size-20" />
                  <div>
                    <div className="font-heading text-[2.2rem] leading-none text-[#25314d]">
                      TaskBeacon
                    </div>
                    <div className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                      Canonical Task Hub
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
