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
      "Placeholder: list public maintainers, ownership boundaries, and primary contact channels here."
  },
  {
    eyebrow: "Contributors",
    title: "Task and preview contributors",
    description:
      "Placeholder: surface active contributors across canonical tasks, HTML variants, localization, and documentation."
  },
  {
    eyebrow: "Partners",
    title: "Labs and collaborators",
    description:
      "Placeholder: describe partner labs, shared repositories, and collaboration scope once that information is public."
  }
];

export default function TeamsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Teams
        </div>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900">
          Keep people, ownership, and collaboration visible as the project grows.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
          This page replaces the generic About destination. It is reserved for public maintainer
          profiles, collaboration structure, and partner information, with placeholders where the
          final public content is still being assembled.
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
          Until public roster details are finalized, the GitHub organization remains the clearest
          public view of active repositories and maintenance activity.
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
