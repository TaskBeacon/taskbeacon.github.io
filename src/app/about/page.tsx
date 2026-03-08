import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Teams",
  description: "Legacy alias for the Teams page."
};

export default function AboutPage() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        Legacy alias
      </div>
      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900">
        Teams moved to a dedicated page.
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
        The old About destination is no longer used in primary navigation. Use the Teams page for
        public project ownership and collaboration context.
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
