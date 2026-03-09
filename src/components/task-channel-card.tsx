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
  const toneClass = tone === "web" ? "bg-[#eef8ff]" : "bg-[#fffdf9]";

  return (
    <section className={clsx("tb-frame-soft", toneClass, compact ? "p-3" : "p-4")}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            {eyebrow}
          </div>
          <div className={clsx("mt-2 flex flex-wrap items-center gap-2", compact ? "text-xs" : "text-sm")}>
            <code className="rounded-full border-2 border-[#25314d] bg-white px-2.5 py-1 font-mono font-semibold text-[#25314d]">
              {handle}
            </code>
            {releaseTag ? (
              <span className="rounded-full bg-[#ecffe5] px-2.5 py-1 text-[11px] font-bold text-[#25314d]">
                Release {releaseTag}
              </span>
            ) : null}
          </div>
          <div className="mt-3 font-mono text-xs text-slate-600">{repo}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {actions.map((action) => {
          if (action.type === "copy") {
            return <CopyButton key={`${repo}:${action.label}`} text={action.text} label={action.label} />;
          }

          if (action.type === "button") {
            const isPrimary = action.emphasis === "primary";
            return (
              <button
                key={`${repo}:${action.label}`}
                type="button"
                className={clsx(
                  "tb-focus-ring",
                  isPrimary ? "tb-button-primary w-full" : "tb-button-secondary"
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
                "tb-focus-ring",
                isPrimary ? "tb-button-primary" : "tb-button-secondary"
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
