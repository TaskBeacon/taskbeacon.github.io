import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Contribution paths for new tasks, variants, review expectations, and repository structure."
};

const contributionSteps = [
  {
    title: "Start from the registry",
    description:
      "Open a structured issue first so the new task or variant arrives with enough review context."
  },
  {
    title: "Keep local tasks canonical",
    description:
      "Treat the PsyFlow repository as the source of truth, then attach HTML previews only when they remain aligned."
  },
  {
    title: "Document the task clearly",
    description:
      "README, metadata, and release information should be usable without opening the implementation first."
  }
];

export default function ContributePage() {
  return (
    <div className="space-y-7 lg:pt-6">
      <div className="text-center">
        <h1 className="mx-auto max-w-3xl font-heading text-4xl font-bold leading-tight text-[#25314d]">
          How to contribute a new task
        </h1>
      </div>

      <section className="relative mx-auto max-w-4xl space-y-5" aria-label="Contribution timeline">
        <div className="absolute bottom-8 left-[1.4rem] top-8 hidden w-0.5 bg-[#25314d] sm:block" />
        {contributionSteps.map((step, index) => (
          <article
            key={step.title}
            className="tb-frame-soft relative grid gap-5 bg-[#fffdf9] p-6 sm:grid-cols-[4rem_1fr]"
          >
            <div className="relative z-10 flex size-12 items-center justify-center rounded-[18px] border-2 border-[#25314d] bg-[#b9dceb] font-mono text-lg font-bold text-[#25314d] shadow-[0_4px_0_#25314d]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Step {index + 1}
              </div>
              <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-[#25314d]">
                {step.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">{step.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
