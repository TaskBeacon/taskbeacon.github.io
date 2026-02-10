import clsx from "@/components/utils/clsx";

export function formatMaturityLabel(maturity: string) {
  const k = String(maturity ?? "").trim().toLowerCase().replace(/\s+/g, "_");
  const s = k.replace(/[_-]+/g, " ").trim();
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function maturityClasses(maturity: string) {
  const k = String(maturity ?? "").trim().toLowerCase().replace(/\s+/g, "_");

  if (k === "smoke_tested") {
    return "border-amber-200 bg-amber-50 text-amber-950";
  }

  if (k === "piloted") {
    return "border-lime-200 bg-lime-50 text-lime-950";
  }

  if (k === "alpha") {
    return "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-950";
  }

  if (k === "beta") {
    return "border-sky-200 bg-sky-50 text-sky-950";
  }

  if (k === "validated" || k === "production") {
    return "border-emerald-200 bg-emerald-50 text-emerald-950";
  }

  return "border-slate-200 bg-slate-50 text-slate-800";
}

export function MaturityBadge({
  maturity,
  className
}: {
  maturity: string;
  className?: string;
}) {
  const label = formatMaturityLabel(maturity);
  if (!label) return null;

  return (
    <span
      title={`Maturity: ${label}`}
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        maturityClasses(maturity),
        className
      )}
    >
      {label}
    </span>
  );
}
