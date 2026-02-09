"use client";

import clsx from "@/components/utils/clsx";

export function TagChip({
  label,
  selected,
  onClick,
  title
}: {
  label: string;
  selected?: boolean;
  title?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      className={clsx(
        "tb-focus-ring inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
        "cursor-pointer",
        selected
          ? "border-brand-700 bg-brand-700 text-white"
          : "border-slate-200 bg-white text-slate-800 hover:border-brand-300 hover:bg-brand-50"
      )}
      onClick={onClick}
    >
      <span className="truncate">{label}</span>
    </button>
  );
}

