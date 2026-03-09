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
          ? "border-brand-600 bg-gradient-to-r from-brand-600 to-brand-700 text-white"
          : "border-brand-100 bg-white/92 text-slate-800 hover:border-brand-300 hover:bg-brand-50"
      )}
      onClick={onClick}
    >
      <span className="truncate">{label}</span>
    </button>
  );
}
