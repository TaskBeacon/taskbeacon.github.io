import type { Metadata } from "next";
import Link from "next/link";
import { SiteMarkdown } from "@/components/site-markdown";
import { readSiteDoc, siteDocGithubUrl } from "@/lib/site-docs";

export const metadata: Metadata = {
  title: "Audio instructions",
  description: "TaskBeacon audio instruction workflow rendered from the source document."
};

export default function AudioInstructionsPage() {
  const markdown = readSiteDoc("audio-instructions");

  return (
    <div className="space-y-8 lg:pt-6">
      <section className="tb-frame bg-[#fffdf9] p-6 sm:p-8">
        <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight text-[#25314d] sm:text-5xl">
          Create audio instructions from task text.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
          This page renders the maintained `source/text2voice.md` guide for PsyFlow instruction audio.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="tb-focus-ring tb-button-primary" href="/tutorial/">
            Back to tutorials
          </Link>
          <a
            className="tb-focus-ring tb-button-secondary"
            href={siteDocGithubUrl("audio-instructions")}
            target="_blank"
            rel="noreferrer"
          >
            Edit source
          </a>
        </div>
      </section>

      <section className="tb-frame bg-[#fffdf9] p-6 sm:p-8">
        <SiteMarkdown markdown={markdown} />
      </section>
    </div>
  );
}
