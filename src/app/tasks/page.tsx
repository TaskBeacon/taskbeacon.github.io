import type { Metadata } from "next";
import { GalleryClient } from "@/app/_components/gallery-client";
import { getIndex } from "@/lib/task-index";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Browse canonical TaskBeacon tasks, attached previews, metadata, and README-backed details."
};

export default function TasksPage() {
  const index = getIndex();

  return <GalleryClient tasks={index.tasks ?? []} generatedAt={index.generated_at} />;
}
