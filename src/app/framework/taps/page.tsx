import type { Metadata } from "next";
import Link from "next/link";
import { SiteMarkdown } from "@/components/site-markdown";
import { readSiteDoc, siteDocGithubUrl } from "@/lib/site-docs";

export const metadata: Metadata = {
  title: "TAPS",
  description: "Task and Paradigm Structure guidance rendered from the TaskBeacon source document."
};

export default function TapsPage() {
  const markdown = readSiteDoc("taps");

  return (
    <div className="space-y-8 lg:pt-6">
      <section className="tb-frame bg-[#fffdf9] p-6 sm:p-8">
        <div className="tb-section-chip bg-[#f5c1b5]">TAPS</div>
        <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight text-[#25314d] sm:text-5xl">
          Task and Paradigm Structure for auditable task packages.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
          This page renders the maintained `source/taps.md` document as a TaskBeacon web page.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="tb-focus-ring tb-button-primary" href="/#framework">
            Back to framework
          </Link>
          <a
            className="tb-focus-ring tb-button-secondary"
            href={siteDocGithubUrl("taps")}
            target="_blank"
            rel="noreferrer"
          >
            Edit source
          </a>
          <Link className="tb-focus-ring tb-button-primary" href="/tasks/">
            Browse task packages
          </Link>
        </div>
      </section>

      <section className="tb-frame bg-[#fffdf9] p-6 sm:p-8">
        <SiteMarkdown markdown={markdown} />
      </section>
    </div>
  );
}
