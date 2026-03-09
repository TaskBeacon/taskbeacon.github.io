"use client";

import { useState } from "react";
import clsx from "@/components/utils/clsx";

export function CopyButton({
  text,
  label = "Copy",
  className
}: {
  text: string;
  label?: string;
  className?: string;
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
      className={clsx("tb-focus-ring tb-button-ghost", className)}
      onClick={onCopy}
    >
      {textLabel}
    </button>
  );
}
