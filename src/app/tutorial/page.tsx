import type { Metadata } from "next";
import { ResourceCard } from "@/components/resource-card";
import { tutorialResources } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Tutorial",
  description: "Tutorial entry points for PsyFlow, CLI, QA, localization, and Chinese onboarding."
};

export default function TutorialPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Tutorial
        </div>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900">
          Learn setup, validation, localization, and workflow basics.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
          Keep onboarding separate from task browsing. Use these links for first-run setup, CLI
          workflows, QA checks, localization guidance, and Chinese-language materials.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {tutorialResources.map((card) => (
          <ResourceCard key={card.title} {...card} />
        ))}
      </section>
    </div>
  );
}
