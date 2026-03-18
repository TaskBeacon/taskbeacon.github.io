import Link from "next/link";
import {
  IconArrowRight,
  IconFrameworkBridge,
  IconLocalizationGlobe,
  IconOrgCluster,
  IconPreviewWindow,
  IconQaChecklist,
  IconRegistryPath,
  IconReviewSheet,
  IconSkillSpark,
  IconTapsPackage,
  IconTutorialCompass,
  IconVariantBranch,
  IconVoiceWave
} from "@/components/icons";

const TONES = [
  { bg: "bg-[#f5c1b5]", pill: "bg-[#ffe2d8]" },
  { bg: "bg-[#b9dceb]", pill: "bg-[#e2f3fb]" },
  { bg: "bg-[#c9f7b9]", pill: "bg-[#ecffe5]" },
  { bg: "bg-[#ddd7f4]", pill: "bg-[#f1eeff]" }
];

type ResourceCardIconKind =
  | "taps"
  | "framework"
  | "preview"
  | "skills"
  | "tutorial"
  | "localization"
  | "voice"
  | "qa"
  | "registry"
  | "variant"
  | "review"
  | "org";

function getResourceCardIconKind(eyebrow: string, title: string): ResourceCardIconKind {
  const label = `${eyebrow} ${title}`.toLowerCase();

  if (label.includes("registry") || label.includes("submit")) return "registry";
  if (label.includes("variant") || label.includes("branch")) return "variant";
  if (label.includes("review")) return "review";
  if (label.includes("org") || label.includes("repositories")) return "org";
  if (label.includes("localization") || label.includes("translate")) return "localization";
  if (label.includes("voice") || label.includes("audio")) return "voice";
  if (label.includes("qa") || label.includes("validate") || label.includes("cli")) return "qa";
  if (label.includes("tutorial") || label.includes("guide") || label.includes("scaffold")) return "tutorial";
  if (label.includes("skill") || label.includes("build") || label.includes("automation") || label.includes("task-")) {
    return "skills";
  }
  if (label.includes("psyflow-web") || label.includes("preview") || label.includes("browser")) {
    return "preview";
  }
  if (label.includes("psyflow") || label.includes("framework") || label.includes("runtime")) {
    return "framework";
  }
  if (label.includes("taps") || label.includes("package") || label.includes("structure")) {
    return "taps";
  }
  return "org";
}

function ResourceCardIcon({ kind }: { kind: ResourceCardIconKind }) {
  const className = "size-8";

  switch (kind) {
    case "taps":
      return <IconTapsPackage className={className} />;
    case "framework":
      return <IconFrameworkBridge className={className} />;
    case "preview":
      return <IconPreviewWindow className={className} />;
    case "skills":
      return <IconSkillSpark className={className} />;
    case "tutorial":
      return <IconTutorialCompass className={className} />;
    case "localization":
      return <IconLocalizationGlobe className={className} />;
    case "voice":
      return <IconVoiceWave className={className} />;
    case "qa":
      return <IconQaChecklist className={className} />;
    case "registry":
      return <IconRegistryPath className={className} />;
    case "variant":
      return <IconVariantBranch className={className} />;
    case "review":
      return <IconReviewSheet className={className} />;
    case "org":
      return <IconOrgCluster className={className} />;
  }
}

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
  const tone = TONES[title.length % TONES.length];
  const iconKind = getResourceCardIconKind(eyebrow, title);

  const body = (
    <>
      <div className="flex items-start gap-4">
        <span
          className={`mt-1 inline-flex size-14 shrink-0 items-center justify-center rounded-[18px] border-2 border-[#25314d] ${tone.bg} text-[#25314d] shadow-[0_4px_0_#25314d]`}
          aria-hidden="true"
        >
          <ResourceCardIcon kind={iconKind} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-bold text-[#25314d] ${tone.pill}`}>
              {eyebrow}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Resource
            </span>
          </div>

          <div className="mt-3 font-heading text-[1.75rem] font-bold leading-tight text-[#25314d]">
            {title}
          </div>
          <div className="mt-2 max-w-[34ch] text-sm leading-6 text-slate-700">{description}</div>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#25314d]">
            {cta}
            <IconArrowRight className="size-4" />
          </div>
        </div>
      </div>
    </>
  );

  const className = "tb-frame-soft flex h-full min-h-[206px] flex-col justify-between p-5";

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
