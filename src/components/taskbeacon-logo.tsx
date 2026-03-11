import clsx from "@/components/utils/clsx";

export function TaskBeaconMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      role="img"
      aria-label="TaskBeacon logo"
      className={clsx("size-12", className)}
    >
      <g
        fill="none"
        stroke="#25314d"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x="18"
          y="18"
          width="60"
          height="60"
          rx="14"
          transform="rotate(45 48 48)"
          fill="#5ba5ae"
        />

        <rect x="10" y="42" width="18" height="8" rx="3.5" fill="#f08a45" />
        <rect x="10" y="28" width="18" height="8" rx="3.5" fill="#f08a45" />
        <rect x="10" y="56" width="18" height="8" rx="3.5" fill="#f08a45" />

        <rect x="68" y="42" width="18" height="8" rx="3.5" fill="#f08a45" />
        <rect x="68" y="28" width="18" height="8" rx="3.5" fill="#f08a45" />
        <rect x="68" y="56" width="18" height="8" rx="3.5" fill="#f08a45" />

        <rect x="42" y="10" width="8" height="18" rx="3.5" fill="#f08a45" />
        <rect x="28" y="10" width="8" height="18" rx="3.5" fill="#f08a45" />
        <rect x="56" y="10" width="8" height="18" rx="3.5" fill="#f08a45" />

        <rect x="42" y="68" width="8" height="18" rx="3.5" fill="#f08a45" />
        <rect x="28" y="68" width="8" height="18" rx="3.5" fill="#f08a45" />
        <rect x="56" y="68" width="8" height="18" rx="3.5" fill="#f08a45" />

        <rect x="28" y="28" width="40" height="40" rx="14" fill="#fff8f0" stroke="#f08a45" strokeWidth="6" />
        <circle cx="48" cy="48" r="10" fill="#fff8f0" stroke="#f08a45" strokeWidth="6" />
        <circle cx="48" cy="48" r="4" fill="#25314d" stroke="none" />
      </g>
    </svg>
  );
}

export function TaskBeaconLogo({
  className,
  markClassName,
  textClassName
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-3", className)}>
      <TaskBeaconMark className={markClassName} />
      <span className={clsx("font-heading text-2xl leading-none text-[#25314d]", textClassName)}>
        TaskBeacon
      </span>
    </span>
  );
}
