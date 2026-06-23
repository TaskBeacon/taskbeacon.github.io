import type { Metadata } from "next";
import Link from "next/link";
import { SiteMarkdown } from "@/components/site-markdown";
import { readSiteDoc, siteDocGithubUrl } from "@/lib/site-docs";

export const metadata: Metadata = {
  title: "CLI and QA",
  description: "TaskBeacon CLI and QA workflow rendered as a web page."
};

export default function CliQaPage() {
  const markdown = readSiteDoc("cli-qa");

  return (
    <div className="space-y-8 lg:pt-6">
      <section className="tb-frame bg-[#fffdf9] p-6 sm:p-8">
        <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight text-[#25314d] sm:text-5xl">
          Validate tasks before release.
        </h1>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="tb-focus-ring tb-button-primary" href="/tutorial/">
            Back to tutorials
          </Link>
          <a
            className="tb-focus-ring tb-button-secondary"
            href={siteDocGithubUrl("cli-qa")}
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
