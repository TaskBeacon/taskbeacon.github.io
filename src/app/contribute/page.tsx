import type { Metadata } from "next";
import { ResourceCard } from "@/components/resource-card";
import { contributeResources } from "@/lib/site-content";

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
    <div className="space-y-8 lg:pt-6">
      <section className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Contribute
        </div>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900">
          Add new tasks, maintain aligned variants, and keep review paths explicit.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
          Contribution guidance now lives on its own page instead of the landing page. Use these
          notes for task submission, variant handling, repo expectations, and the GitHub entry
          points that already exist today.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {contributionSteps.map((step, index) => (
          <article
            key={step.title}
            className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Step {index + 1}
            </div>
            <div className="mt-3 font-heading text-xl font-semibold tracking-tight text-slate-900">
              {step.title}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{step.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {contributeResources.map((card) => (
          <ResourceCard key={card.title} {...card} />
        ))}
      </section>
    </div>
  );
}
