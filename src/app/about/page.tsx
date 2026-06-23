import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About TaskBeacon contributors, maintainers, and collaboration."
};

export default function AboutPage() {
  return (
    <div className="tb-frame bg-[#fffdf9] p-8">
      <div className="tb-section-chip bg-[#f5c1b5]">
        About
      </div>
      <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-[#25314d]">
        TaskBeacon is built around shared task packages and public collaboration.
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
        Use the Teams page to see how maintainers, contributors, and collaborators participate in
        the project.
      </p>
      <div className="mt-6">
        <Link
          className="tb-focus-ring tb-button-primary"
          href="/teams/"
        >
          Open Teams
        </Link>
      </div>
    </div>
  );
}
