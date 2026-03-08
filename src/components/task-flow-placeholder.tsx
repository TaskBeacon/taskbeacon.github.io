import clsx from "@/components/utils/clsx";

const STEPS = ["Setup", "Trial", "Feedback", "Export"];

export function TaskFlowPlaceholder({
  compact = false
}: {
  compact?: boolean;
}) {
  return (
    <section
      className={clsx(
        "rounded-2xl border border-dashed border-brand-200 bg-gradient-to-br from-white via-brand-50/70 to-cyan-50/70",
        compact ? "p-4" : "p-5"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-900">
            Task Flow
          </div>
          <div className="mt-1 text-sm text-slate-700">
            Open details to inspect the README flow diagram and protocol notes.
          </div>
        </div>
        <div className="rounded-full border border-brand-200 bg-white px-3 py-1 text-[11px] font-semibold text-brand-900">
          README-driven
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 items-center gap-3">
        {STEPS.map((step, index) => (
          <div key={step} className="relative">
            {index > 0 ? (
              <div className="absolute -left-4 top-3 hidden h-px w-5 bg-brand-300 sm:block" />
            ) : null}
            <div className="rounded-2xl border border-white/80 bg-white/90 px-3 py-3 text-center shadow-sm">
              <div className="mx-auto size-3 rounded-full bg-brand-500" />
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                {step}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
