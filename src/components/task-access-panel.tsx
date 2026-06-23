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
      ? "bg-[#eef8ff]"
      : "bg-[#fffdf9]";

  return (
    <section className={clsx("tb-frame-soft p-4", panelClassName)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {eyebrow}
          </div>
          <div className="mt-2 font-heading text-lg font-bold leading-tight text-[#25314d]">
            {title}
          </div>
          <div className="mt-1 font-mono text-xs font-semibold text-slate-500">{repo}</div>
        </div>
        {meta ? (
          <div className="rounded-full border-2 border-[#25314d] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#25314d]">
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
                "tb-focus-ring inline-flex items-center gap-2 rounded-[14px] border-2 border-[#25314d] px-3 py-2 text-sm font-bold transition-colors",
                isPrimary
                  ? "bg-[#39d95d] text-[#25314d] shadow-[0_3px_0_#25314d] hover:bg-[#2fb651] hover:text-white"
                  : "bg-white text-[#25314d] hover:bg-[#eef8ff]"
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
