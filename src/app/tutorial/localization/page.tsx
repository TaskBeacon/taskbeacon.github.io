import type { Metadata } from "next";
import Link from "next/link";
import { SiteMarkdown } from "@/components/site-markdown";
import { readSiteDoc, siteDocGithubUrl } from "@/lib/site-docs";

export const metadata: Metadata = {
  title: "Localization",
  description: "TaskBeacon localization workflow rendered from the source document."
};

export default function LocalizationPage() {
  const markdown = readSiteDoc("localization");

  return (
    <div className="space-y-8 lg:pt-6">
      <section className="tb-frame bg-[#fffdf9] p-6 sm:p-8">
        <div className="tb-section-chip bg-[#b9dceb]">Localization</div>
        <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight text-[#25314d] sm:text-5xl">
          Translate task content without rewriting task logic.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
          This page renders the maintained `source/localization.md` document as a TaskBeacon web page.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            className="tb-focus-ring tb-button-secondary"
            href={siteDocGithubUrl("localization")}
            target="_blank"
            rel="noreferrer"
          >
            View source document
          </a>
          <Link className="tb-focus-ring tb-button-primary" href="/tutorial/">
            Back to tutorials
          </Link>
        </div>
      </section>

      <section className="tb-frame bg-[#fffdf9] p-6 sm:p-8">
        <SiteMarkdown markdown={markdown} />
      </section>
    </div>
  );
}
