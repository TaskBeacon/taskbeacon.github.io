import { IconDownload, IconGithub, IconPlay } from "@/components/icons";
import clsx from "@/components/utils/clsx";

type ActionIcon = "download" | "github" | "play";

export type TaskAccessAction = {
  label: string;
  href: string;
  icon: ActionIcon;
  emphasis?: "primary" | "secondary";
};

const ICONS: Record<ActionIcon, (props: { className?: string }) => JSX.Element> = {
  download: IconDownload,
  github: IconGithub,
  play: IconPlay
};

export function TaskAccessPanel({
  eyebrow,
  title,
  repo,
  description,
  meta,
  tone = "local",
  actions,
  extraActions
}: {
  eyebrow: string;
  title: string;
  repo: string;
  description?: string | null;
  meta?: string | null;
  tone?: "local" | "web";
  actions: TaskAccessAction[];
  extraActions?: React.ReactNode;
}) {
  const panelClassName =
    tone === "web"
      ? "border-brand-200 bg-gradient-to-br from-brand-50 via-white to-cyan-50"
      : "border-slate-200 bg-slate-50/80";

  return (
    <section className={clsx("rounded-xl border p-4 shadow-sm", panelClassName)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {eyebrow}
          </div>
          <div className="mt-2 font-heading text-lg font-semibold tracking-tight text-slate-900">
            {title}
          </div>
          <div className="mt-1 font-mono text-xs text-slate-500">{repo}</div>
        </div>
        {meta ? (
          <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
            {meta}
          </div>
        ) : null}
      </div>

      {description ? (
        <div className="mt-3 text-sm leading-6 text-slate-700">{description}</div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {actions.map((action) => {
          const Icon = ICONS[action.icon];
          const isPrimary = action.emphasis === "primary";
          return (
            <a
              key={`${title}:${action.label}`}
              className={clsx(
                "tb-focus-ring inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold shadow-sm transition-colors",
                isPrimary
                  ? "bg-cta-500 text-white hover:bg-cta-600"
                  : "border border-slate-200 bg-white text-slate-800 hover:border-brand-200 hover:bg-brand-50"
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
        {extraActions}
      </div>
    </section>
  );
}
