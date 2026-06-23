import Link from "next/link";
import type { ReactNode } from "react";
import type { PublicResourceLink } from "@/lib/site-content";

function isExternalUrl(href: string) {
  return /^https?:\/\//i.test(href);
}

function ResourceTarget({
  href,
  children,
  className
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  if (isExternalUrl(href)) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export function ResourceAccordion({
  resources
}: {
  resources: PublicResourceLink[];
}) {
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {resources.map((item, index) => (
        <article key={item.title}>
          <ResourceTarget
            href={item.href}
            className="tb-focus-ring tb-frame-soft group flex min-w-0 items-center gap-4 bg-[#fffdf9] p-5 transition-transform hover:-translate-y-1 active:translate-y-0.5 sm:p-6"
          >
            <span className="font-mono text-lg font-bold tabular-nums text-[#25314d]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                {item.eyebrow ?? "Resource"}
              </span>
              <span className="mt-1 block font-heading text-2xl font-bold leading-tight text-[#25314d]">
                {item.title}
              </span>
              <span className="mt-2 block max-w-3xl text-sm leading-6 text-slate-700">
                {item.description}
              </span>
            </span>
          </ResourceTarget>
        </article>
      ))}
    </div>
  );
}
