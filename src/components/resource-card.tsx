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
    "group relative overflow-hidden rounded-[32px] border border-white/80 bg-white/86 p-5 shadow-[0_18px_50px_rgba(14,165,233,0.10)] transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_22px_56px_rgba(245,158,11,0.14)]";

  const body = (
    <>
      <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.18),_transparent_34%)]" />
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
