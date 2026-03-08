import Link from "next/link";
import { IconArrowRight } from "@/components/icons";

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
  const className =
    "group rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md";

  const body = (
    <>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {eyebrow}
      </div>
      <div className="mt-3 font-heading text-xl font-semibold tracking-tight text-slate-900">
        {title}
      </div>
      <div className="mt-3 text-sm leading-6 text-slate-700">{description}</div>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-900">
        {cta}
        <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </>
  );

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
