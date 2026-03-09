import Link from "next/link";
import { IconArrowRight } from "@/components/icons";

const TONES = [
  { bg: "bg-[#f5c1b5]", pill: "bg-[#ffe2d8]" },
  { bg: "bg-[#b9dceb]", pill: "bg-[#e2f3fb]" },
  { bg: "bg-[#c9f7b9]", pill: "bg-[#ecffe5]" },
  { bg: "bg-[#ddd7f4]", pill: "bg-[#f1eeff]" }
];

function initialsFromTitle(title: string) {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ResourceCard({
  eyebrow = "Resource",
  title,
  description,
  href,
  cta,
  external = false
}: {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
}) {
  const tone = TONES[title.length % TONES.length];

  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className={`grid size-14 place-items-center rounded-2xl border-2 border-[#25314d] ${tone.bg}`}>
          <span className="font-heading text-lg font-bold text-[#25314d]">
            {initialsFromTitle(title)}
          </span>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold text-[#25314d] ${tone.pill}`}>
          {eyebrow}
        </span>
      </div>

      <div className="mt-5 font-heading text-2xl font-bold leading-tight text-[#25314d]">
        {title}
      </div>
      <div className="mt-3 text-sm leading-6 text-slate-700">{description}</div>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#25314d]">
        {cta}
        <IconArrowRight className="size-4" />
      </div>
    </>
  );

  const className = "tb-frame-soft flex min-h-[240px] flex-col justify-between p-5";

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {body}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {body}
    </Link>
  );
}
