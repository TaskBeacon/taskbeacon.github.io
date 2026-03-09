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
        "tb-focus-ring inline-flex items-center gap-2 rounded-full border-2 px-3 py-1 text-xs font-bold transition-colors",
        "border-[#25314d] cursor-pointer",
        selected
          ? "bg-[#39d95d] text-white"
          : "bg-white text-[#25314d] hover:bg-[#e2f3fb]"
      )}
      onClick={onClick}
    >
      <span className="truncate">{label}</span>
    </button>
  );
}
