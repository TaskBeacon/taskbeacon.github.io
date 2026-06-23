"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconClose, IconMenu } from "@/components/icons";
import { TaskBeaconLogo } from "@/components/taskbeacon-logo";
import { jobsPageHref, tasksPageHref } from "@/lib/routes";

const PRIMARY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Tasks", href: tasksPageHref() },
  { label: "Tutorial", href: "/tutorial/" },
  { label: "Contribute", href: "/contribute/" },
  { label: "Teams", href: "/teams/" },
  { label: "Jobs", href: jobsPageHref() }
] as const;

function NavLink({
  href,
  label,
  onNavigate,
  active,
  mobile = false
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
  active?: boolean;
  mobile?: boolean;
}) {
  return (
    <Link
      className={
        mobile
          ? active
            ? "tb-focus-ring block w-full rounded-[18px] border-2 border-[#25314d] bg-[#25314d] px-4 py-3 text-left text-base font-bold text-white shadow-[0_4px_0_#39d95d] transition-transform hover:-translate-y-px"
            : "tb-focus-ring block w-full rounded-[18px] border-2 border-[#25314d] bg-[#fffdf9] px-4 py-3 text-left text-base font-bold text-[#25314d] shadow-[0_4px_0_#25314d] transition-transform hover:-translate-y-px"
          : active
            ? "tb-focus-ring rounded-full bg-[#25314d] px-3 py-2 text-sm font-bold text-white shadow-[0_3px_0_#39d95d]"
            : "tb-focus-ring rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-[#eef8ff] hover:text-[#25314d]"
      }
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    const normalize = (value: string) =>
      value.length > 1 ? value.replace(/\/+$/, "") : value;
    const path = normalize(pathname || "/");
    const target = normalize(href);
    if (target === "/") return path === "/";
    return path === target || path.startsWith(`${target}/`);
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto w-full max-w-7xl px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        <div className="tb-frame bg-[#fffdf9] px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <Link className="tb-focus-ring min-w-0 rounded-xl" href="/" onClick={() => setOpen(false)}>
              <TaskBeaconLogo
                className="gap-2 sm:gap-3"
                markClassName="size-8 sm:size-11"
                textClassName="text-[1.2rem] sm:text-[1.85rem]"
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {PRIMARY_LINKS.map((link) => (
                <NavLink key={link.href} {...link} active={isActive(link.href)} />
              ))}
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
              className="tb-focus-ring tb-frame-soft p-1.5 sm:p-2 lg:hidden"
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            >
              {open ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
            </button>
          </div>

          {open ? (
            <div className="mt-3 rounded-[24px] border-2 border-[#25314d] bg-[#fffdf9] p-3 shadow-[0_5px_0_#25314d] lg:hidden">
              <div className="grid gap-2">
                {PRIMARY_LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    {...link}
                    active={isActive(link.href)}
                    mobile
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </div>
            <div className="mt-3 grid gap-2">
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
