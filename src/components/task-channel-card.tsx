"use client";

import { CopyButton } from "@/components/copy-button";
import { IconDownload, IconGithub, IconPlay } from "@/components/icons";
import clsx from "@/components/utils/clsx";

type LinkAction = {
  type?: "link";
  label: string;
  href: string;
  icon: "download" | "github" | "play";
  emphasis?: "primary" | "secondary";
};

type CopyAction = {
  type: "copy";
  label: string;
  text: string;
};

type ButtonAction = {
  type: "button";
  label: string;
  onClick: () => void;
  emphasis?: "primary" | "secondary";
};

export type TaskChannelAction = LinkAction | CopyAction | ButtonAction;

const ICONS = {
  download: IconDownload,
  github: IconGithub,
  play: IconPlay
} satisfies Record<LinkAction["icon"], (props: { className?: string }) => JSX.Element>;

export function TaskChannelCard({
  eyebrow,
  repo,
  handle,
  releaseTag,
  tone = "local",
  size = "regular",
  actions
}: {
  eyebrow: string;
  repo: string;
  handle: string;
  releaseTag?: string | null;
  tone?: "local" | "web";
  size?: "compact" | "regular";
  actions: TaskChannelAction[];
}) {
  const compact = size === "compact";
  const panelClassName =
    tone === "web"
      ? "border-brand-200 bg-[linear-gradient(135deg,rgba(236,254,255,0.96),rgba(255,255,255,0.94),rgba(255,247,237,0.92))]"
      : "border-brand-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(236,254,255,0.86))]";

  return (
    <section
      className={clsx(
        "rounded-[24px] border shadow-[0_16px_40px_rgba(14,165,233,0.08)]",
        panelClassName,
        compact ? "p-3" : "p-4"
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {eyebrow}
          </div>
          <div className={clsx("mt-2 flex flex-wrap items-center gap-2", compact ? "text-xs" : "text-sm")}>
            <code className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono font-semibold text-slate-900">
              {handle}
            </code>
            {releaseTag ? (
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                Release {releaseTag}
              </span>
            ) : null}
          </div>
          <div className="mt-2 font-mono text-xs text-slate-600">{repo}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {actions.map((action) => {
          if (action.type === "copy") {
            return (
              <CopyButton
                key={`${repo}:${action.label}`}
                text={action.text}
                label={action.label}
                className={clsx(
                  "border-slate-200 bg-white text-slate-800 hover:border-brand-200 hover:bg-brand-50",
                  compact ? "px-2.5 py-2" : ""
                )}
              />
            );
          }

          if (action.type === "button") {
            const isPrimary = action.emphasis === "primary";
            return (
              <button
                key={`${repo}:${action.label}`}
                type="button"
                className={clsx(
                  "tb-focus-ring inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold shadow-sm transition-colors",
                  isPrimary
                    ? "w-full justify-center bg-gradient-to-r from-cta-500 to-cta-600 text-white shadow-[0_12px_24px_rgba(245,158,11,0.24)] hover:-translate-y-0.5"
                    : "border border-brand-100 bg-white text-slate-800 hover:border-brand-200 hover:bg-brand-50"
                )}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            );
          }

          const Icon = ICONS[action.icon];
          const isPrimary = action.emphasis === "primary";

          return (
            <a
              key={`${repo}:${action.label}`}
              className={clsx(
                "tb-focus-ring inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold shadow-sm transition-colors",
                isPrimary
                  ? "bg-gradient-to-r from-cta-500 to-cta-600 text-white shadow-[0_12px_24px_rgba(245,158,11,0.24)] hover:-translate-y-0.5"
                  : "border border-brand-100 bg-white text-slate-800 hover:border-brand-200 hover:bg-brand-50"
              )}
              href={action.href}
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="size-4" />
              {action.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
