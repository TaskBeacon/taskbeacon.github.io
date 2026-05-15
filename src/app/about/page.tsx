import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About TaskBeacon contributors, maintainers, and collaboration."
};

export default function AboutPage() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        About
      </div>
      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900">
        TaskBeacon is built around shared task packages and public collaboration.
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
        Use the Teams page to see how maintainers, contributors, and collaborators participate in
        the project.
      </p>
      <div className="mt-6">
        <Link
          className="tb-focus-ring inline-flex items-center justify-center rounded-xl bg-cta-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cta-600"
          href="/teams/"
        >
          Open Teams
        </Link>
      </div>
    </div>
  );
}
