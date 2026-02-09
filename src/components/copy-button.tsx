"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy"
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1200);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 1200);
    }
  }

  const textLabel =
    status === "copied" ? "Copied" : status === "error" ? "Copy failed" : label;

  return (
    <button
      type="button"
      className="tb-focus-ring inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:border-brand-200 hover:bg-brand-50"
      onClick={onCopy}
    >
      {textLabel}
    </button>
  );
}
