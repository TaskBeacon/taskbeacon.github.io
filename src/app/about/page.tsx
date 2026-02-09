import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "What TaskBeacon is and how to contribute task templates to the gallery."
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-slate-200 bg-white/85 p-8 shadow-sm">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-slate-900">
          About TaskBeacon
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
          TaskBeacon is a community-driven effort to share and standardize psychological task paradigms.
          The core idea is simple: tasks should be reusable, well documented, and easy to run across labs.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
          This website is an automatically generated gallery of task template repositories in the
          <span className="font-semibold text-slate-900"> TaskBeacon </span>
          GitHub organization.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="tb-focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
            href="https://github.com/TaskBeacon"
            target="_blank"
            rel="noreferrer"
          >
            TaskBeacon on GitHub
          </a>
          <a
            className="tb-focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
            href="https://github.com/TaskBeacon/task-registry"
            target="_blank"
            rel="noreferrer"
          >
            Task Registry
          </a>
        </div>
      </section>

      <section
        id="contribute"
        className="rounded-2xl border border-brand-200 bg-white/85 p-8 shadow-sm"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900">
          Contribute A Task
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
          To add a task to the gallery, create a new public repository under the TaskBeacon org.
          The indexer will include it automatically (unless it is on the denylist).
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Recommended Repo Structure
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li><span className="font-mono">config/</span> experiment configuration and defaults</li>
              <li><span className="font-mono">assets/</span> images, audio, stimuli</li>
              <li><span className="font-mono">src/</span> task implementation</li>
              <li><span className="font-mono">README.md</span> clear Install/Run/Output instructions</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Add <span className="font-mono">task.yaml</span> (Metadata)
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              If present in the repo root, <span className="font-mono">task.yaml</span> is parsed and shown on the site.
              Keep it concise; don’t overfit tags.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-xs text-slate-50">
              <code>{`# task.yaml (repo root)
name: "T000014-stroop"
short_description: "Classic Stroop color-word interference task template."

tags:
  paradigm: ["Stroop"]
  response: ["2-choice"]
  modality: ["behavior"]
  language: ["en"]

keywords:
  - stroop
  - interference

psyflow_version: "^0.2.0"  # optional
has_voiceover: false        # optional`}</code>
            </pre>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-brand-50 p-6">
          <div className="font-heading text-base font-semibold text-slate-900">
            Indexing Notes
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-800">
            <li>Indexing uses the GitHub API to list repos in the org and fetch README + metadata.</li>
            <li>CI runs with a token for a higher rate limit; local runs work without a token but may be limited.</li>
            <li>Non-task repos are excluded via a denylist in the indexer.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
