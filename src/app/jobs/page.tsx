import type { Metadata } from "next";
import { getIndex } from "@/lib/task-index";
import { JobLanguageNotice } from "./job-language-notice";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "TaskBeacon recruitment notice for psychology-background interns, with Chinese and English views."
};

export default function JobsPage() {
  const taskCount = getIndex().tasks?.length ?? 0;

  return (
    <div className="lg:pt-6">
      <JobLanguageNotice taskCount={taskCount} />
    </div>
  );
}
