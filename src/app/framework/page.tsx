import type { Metadata } from "next";
import { ResourceCard } from "@/components/resource-card";
import { frameworkResources } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Framework",
  description: "Framework references for TAPS, PsyFlow, psyflow-web, and agent tooling."
};

export default function FrameworkPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Framework
        </div>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900">
          TAPS, PsyFlow, psyflow-web, and agent-support tooling.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
          This page collects the structural references behind TaskBeacon. Use it to understand the
          repository standard, the local runtime, the browser preview layer, and the tooling that
          connects them.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {frameworkResources.map((card) => (
          <ResourceCard key={card.title} {...card} />
        ))}
      </section>
    </div>
  );
}
