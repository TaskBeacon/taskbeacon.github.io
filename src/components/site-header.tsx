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
    <span className="inline-flex items-center gap-3 font-sans text-sm font-bold text-[#25314d]">
      <span className="grid size-10 place-items-center rounded-2xl border-2 border-[#25314d] bg-[#f5c1b5]">
        <span className="grid size-5 place-items-center rounded-lg border-2 border-[#25314d] bg-[#b9dceb]">
          <span className="block size-1.5 rounded-full bg-[#25314d]" aria-hidden="true" />
        </span>
      </span>
      <span className="font-heading text-2xl leading-none">TaskBeacon</span>
    </span>
  );
}

function NavLink({
  href,
  label,
  onNavigate,
  mobile = false
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  return (
    <Link
      className={
        mobile
          ? "tb-focus-ring block w-full rounded-[18px] border-2 border-[#25314d] bg-[#fffdf9] px-4 py-3 text-left text-base font-bold text-[#25314d] shadow-[0_4px_0_#25314d] transition-transform hover:-translate-y-px"
          : "tb-focus-ring rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#25314d]"
      }
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
        <div className="tb-frame bg-[#fffdf9] px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link className="tb-focus-ring rounded-xl" href="/" onClick={() => setOpen(false)}>
              <Mark />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {PRIMARY_LINKS.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
              <a
                className="tb-focus-ring rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#25314d]"
                href="https://github.com/TaskBeacon"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="tb-focus-ring tb-button-primary px-5 py-3 text-sm"
                href="https://taskbeacon.github.io/psyflow-web"
                target="_blank"
                rel="noreferrer"
              >
                Open Preview
              </a>
            </nav>

            <button
              type="button"
              className="tb-focus-ring tb-frame-soft p-2 lg:hidden"
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            >
              {open ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
            </button>
          </div>

          {open ? (
            <div className="mt-4 rounded-[24px] border-2 border-[#25314d] bg-[#fffdf9] p-3 shadow-[0_5px_0_#25314d] lg:hidden">
              <div className="grid gap-2">
              {PRIMARY_LINKS.map((link) => (
                <NavLink key={link.href} {...link} mobile onNavigate={() => setOpen(false)} />
              ))}
              </div>
              <div className="mt-3 grid gap-2">
                <a
                  className="tb-focus-ring tb-button-secondary w-full text-sm"
                  href="https://github.com/TaskBeacon"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Org
                </a>
                <a
                  className="tb-focus-ring tb-button-primary w-full text-sm"
                  href="https://taskbeacon.github.io/psyflow-web"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Preview
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
