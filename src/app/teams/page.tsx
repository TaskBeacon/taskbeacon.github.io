import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teams",
  description: "Public-facing team, maintainer, and collaboration overview for TaskBeacon."
};

const teamCards = [
  {
    eyebrow: "Maintainers",
    title: "Core maintainers",
    description:
      "Core maintainers coordinate task standards, site publishing, review expectations, and public repository organization."
  },
  {
    eyebrow: "Contributors",
    title: "Task and preview contributors",
    description:
      "Contributors help build canonical PsyFlow tasks, browser previews, localization files, QA checks, and task documentation."
  },
  {
    eyebrow: "Partners",
    title: "Labs and collaborators",
    description:
      "Labs and collaborators can use TaskBeacon to publish auditable task packages, compare variants, and review implementation details."
  }
];

export default function TeamsPage() {
  return (
    <div className="space-y-8 lg:pt-6">
      <section className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Teams
        </div>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900">
          People, ownership, and collaboration around TaskBeacon.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
          TaskBeacon is maintained through public repositories, task review work, documentation,
          and preview validation. This page summarizes how contributors and collaborators fit into
          the project today.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {teamCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {card.eyebrow}
            </div>
            <div className="mt-3 font-heading text-xl font-semibold tracking-tight text-slate-900">
              {card.title}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{card.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-slate-50/85 p-6 shadow-sm">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Current public anchor
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
          The GitHub organization is the clearest public view of active repositories, task packages,
          preview companions, and maintenance activity.
        </p>
        <div className="mt-4">
          <a
            className="tb-focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
            href="https://github.com/TaskBeacon"
            target="_blank"
            rel="noreferrer"
          >
            Open GitHub Org
          </a>
        </div>
      </section>
    </div>
  );
}
