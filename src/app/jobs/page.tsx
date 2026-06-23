import type { Metadata } from "next";
import { JobLanguageNotice } from "./job-language-notice";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "TaskBeacon recruitment notice for psychology-background interns, with Chinese and English views."
};

export default function JobsPage() {
  return (
    <div className="lg:pt-6">
      <JobLanguageNotice />
    </div>
  );
}
