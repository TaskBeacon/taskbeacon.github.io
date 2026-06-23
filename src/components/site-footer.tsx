import { IconArrowRight, IconGithub } from "@/components/icons";
import { TaskBeaconLogo } from "@/components/taskbeacon-logo";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="mt-16">
      <div className="mx-auto w-full max-w-7xl px-3 pb-8 sm:px-6 lg:px-8">
        <div className="tb-frame bg-[#fff8f0] px-5 py-5 sm:px-6">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="min-w-0">
              <TaskBeaconLogo
                className="gap-2 sm:gap-3"
                markClassName="size-8 sm:size-9"
                textClassName="text-[1.45rem] sm:text-2xl"
              />
              <div className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">
                Canonical cognitive tasks, aligned previews, and reusable framework references.
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-[#25314d]">
                <a className="tb-focus-ring rounded-md hover:underline" href="mailto:braintrace@yeah.net">
                  Contact
                </a>
                <a className="tb-focus-ring rounded-md hover:underline" href="/privacy/">
                  Privacy
                </a>
                <a className="tb-focus-ring rounded-md hover:underline" href="/terms/">
                  Terms
                </a>
              </div>
            </div>

            <div className="md:justify-self-end">
              <a
                className="tb-focus-ring group inline-flex w-full items-center justify-center gap-3 rounded-[18px] border-2 border-[#25314d] bg-[#eef8ff] px-5 py-3 text-sm font-bold text-[#25314d] shadow-[0_4px_0_#25314d] transition-transform hover:-translate-y-0.5 md:w-auto"
                href="https://github.com/TaskBeacon"
                target="_blank"
                rel="noreferrer"
                aria-label="Open the TaskBeacon GitHub organization"
              >
                <IconGithub className="size-4" />
                GitHub org
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
