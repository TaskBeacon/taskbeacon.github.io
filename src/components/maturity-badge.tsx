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
    return "bg-[#ffe7c2]";
  }

  if (k === "piloted") {
    return "bg-[#ecffe5]";
  }

  if (k === "alpha") {
    return "bg-[#f7d8f5]";
  }

  if (k === "beta") {
    return "bg-[#e2f3fb]";
  }

  if (k === "validated" || k === "production") {
    return "bg-[#c9f7b9]";
  }

  return "bg-white";
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
        "inline-flex items-center rounded-full border-2 border-[#25314d] px-3 py-1 text-xs font-bold text-[#25314d]",
        maturityClasses(maturity),
        className
      )}
    >
      {label}
    </span>
  );
}
