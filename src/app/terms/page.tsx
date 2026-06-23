import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "TaskBeacon terms and usage notes for public task resources."
};

export default function TermsPage() {
  return (
    <div className="space-y-8 lg:pt-6">
      <section className="tb-frame bg-[#fffdf9] p-8">
        <div className="tb-section-chip bg-[#f5c1b5]">Terms</div>
        <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-[#25314d]">
          Usage notes for TaskBeacon
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
          TaskBeacon organizes public task packages, previews, and documentation. Always review
          each repository license, README, and validation status before using a task in research.
        </p>
      </section>

      <section className="tb-frame-soft bg-[#fffdf9] p-6">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Research review", "Task materials should be checked against your protocol and ethics requirements."],
            ["Repository licenses", "Source repositories may carry their own licenses and maintenance notes."],
            ["No warranty", "Public resources are provided for inspection, reuse, and contribution without a site-level warranty."]
          ].map(([title, text]) => (
            <article key={title} className="tb-surface p-5">
              <h2 className="font-heading text-xl font-bold text-[#25314d]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
