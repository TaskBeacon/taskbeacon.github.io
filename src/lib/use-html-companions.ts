"use client";

import { useEffect, useMemo, useState } from "react";

import type { TaskIndexItem } from "@/lib/task-index";
import {
  loadHtmlCompanionManifest,
  mergeTaskWithHtmlCompanion,
  mergeTasksWithHtmlCompanions,
  type HtmlCompanionManifest
} from "@/lib/html-companions";

export function useTasksWithHtmlCompanions(tasks: TaskIndexItem[]): TaskIndexItem[] {
  const [manifest, setManifest] = useState<HtmlCompanionManifest | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadHtmlCompanionManifest().then((nextManifest) => {
      if (!cancelled) {
        setManifest(nextManifest);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(() => mergeTasksWithHtmlCompanions(tasks, manifest), [manifest, tasks]);
}

export function useTaskWithHtmlCompanion(task: TaskIndexItem): TaskIndexItem {
  const [manifest, setManifest] = useState<HtmlCompanionManifest | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadHtmlCompanionManifest().then((nextManifest) => {
      if (!cancelled) {
        setManifest(nextManifest);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(() => mergeTaskWithHtmlCompanion(task, manifest), [manifest, task]);
}
