"use client";

import Link from "next/link";
import { useState } from "react";
import { IconClose, IconMenu } from "@/components/icons";
import { tasksPageHref } from "@/lib/routes";

const PRIMARY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Tasks", href: tasksPageHref() },
  { label: "Tutorial", href: "/tutorial/" },
  { label: "Framework", href: "/framework/" },
  { label: "Contribute", href: "/contribute/" },
  { label: "Teams", href: "/teams/" }
] as const;

function Mark() {
  return (
    <span className="inline-flex items-center gap-3 font-heading text-sm font-semibold tracking-tight text-slate-900">
      <span className="relative grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 shadow-[0_10px_26px_rgba(14,165,233,0.28)]">
        <span className="absolute right-1 top-1 size-2 rounded-full bg-cta-500" aria-hidden="true" />
        <span className="block size-4 rounded-[0.6rem] border border-white/70 bg-white/85" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span>TaskBeacon</span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-brand-700">
          Tasks + Preview
        </span>
      </span>
    </span>
  );
}

function NavLink({
  href,
  label,
  onNavigate
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      className="tb-focus-ring rounded-full px-3 py-2 font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-800"
      href={href}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-white/70 bg-white/82 px-4 py-3 shadow-crisp backdrop-blur supports-[backdrop-filter]:bg-white/75">
          <div className="flex items-center justify-between gap-4">
            <Link className="tb-focus-ring rounded-xl" href="/" onClick={() => setOpen(false)}>
              <Mark />
            </Link>

            <nav className="hidden items-center gap-1 text-sm lg:flex">
              {PRIMARY_LINKS.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
              <a
                className="tb-focus-ring rounded-full bg-gradient-to-r from-cta-500 to-cta-600 px-4 py-2 font-semibold text-white shadow-[0_12px_30px_rgba(245,158,11,0.24)] transition-transform hover:-translate-y-0.5"
                href="https://taskbeacon.github.io/psyflow-web"
                target="_blank"
                rel="noreferrer"
              >
                Preview
              </a>
              <a
                className="tb-focus-ring rounded-full px-3 py-2 font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-800"
                href="https://github.com/TaskBeacon"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </nav>

            <button
              type="button"
              className="tb-focus-ring inline-flex items-center justify-center rounded-2xl border border-brand-100 bg-white/90 p-2 text-brand-800 shadow-sm lg:hidden"
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            >
              {open ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
            </button>
          </div>

          {open ? (
            <div className="mt-4 grid gap-2 rounded-[24px] border border-brand-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(236,254,255,0.92),rgba(255,247,237,0.92))] p-3 lg:hidden">
              {PRIMARY_LINKS.map((link) => (
                <NavLink key={link.href} {...link} onNavigate={() => setOpen(false)} />
              ))}
              <a
                className="tb-focus-ring inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cta-500 to-cta-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(245,158,11,0.24)]"
                href="https://taskbeacon.github.io/psyflow-web"
                target="_blank"
                rel="noreferrer"
              >
                Open Preview
              </a>
              <a
                className="tb-focus-ring inline-flex items-center justify-center rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm font-semibold text-slate-800"
                href="https://github.com/TaskBeacon"
                target="_blank"
                rel="noreferrer"
              >
                GitHub Org
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
