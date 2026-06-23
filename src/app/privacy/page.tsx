import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "TaskBeacon privacy notes for the public website."
};

export default function PrivacyPage() {
  return (
    <div className="space-y-8 lg:pt-6">
      <section className="tb-frame bg-[#fffdf9] p-8">
        <div className="tb-section-chip bg-[#b9dceb]">Privacy</div>
        <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-[#25314d]">
          Privacy notes for TaskBeacon
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
          TaskBeacon is a public task catalog and documentation site. The site does not provide
          user accounts, collect form submissions, or store participant data.
        </p>
      </section>

      <section className="tb-frame-soft bg-[#fffdf9] p-6">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Public content", "Task pages link to public repositories and rendered documentation."],
            ["External services", "GitHub and browser preview links follow the policies of those services."],
            ["Contact", "Questions about site content can be sent to braintrace@yeah.net."]
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
