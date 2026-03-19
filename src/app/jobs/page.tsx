import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CopyEmailButton } from "./copy-email-button";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "TaskBeacon recruitment notice for psychology-background interns, presented in Chinese and English."
};

const CONTACT_EMAIL = "braintrace@yeah.net";
const RECRUITMENT_UPDATED_AT = "2026-03-19";

type NumberedItem = {
  number: string;
  text: string;
};

type CopySection = {
  lang: "zh-CN" | "en";
  badge: string;
  title: string;
  summary: string;
  aboutTitle: string;
  aboutText: string;
  responsibilitiesTitle: string;
  responsibilities: NumberedItem[];
  requirementsTitle: string;
  requirements: NumberedItem[];
  benefitsTitle: string;
  benefits: string[];
  workModeTitle: string;
  workModeText: string;
  templateTitle: string;
  templateText: string;
};

function Panel({
  title,
  children,
  className = ""
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`tb-frame-soft bg-[#fffdf9] p-5 sm:p-6 ${className}`}>
      <div className="text-[0.98rem] font-bold tracking-[0.02em] text-[#25314d] sm:text-[1.05rem]">
        {title}
      </div>
      <div className="mt-4">{children}</div>
    </article>
  );
}

function NumberedList({ items }: { items: NumberedItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={`${item.number}-${item.text.slice(0, 20)}`} className="flex gap-3">
          <div className="mt-0.5 shrink-0 rounded-full border-2 border-[#25314d] bg-white px-2 py-0.5 text-xs font-bold text-[#25314d] shadow-[0_3px_0_#25314d]">
            {item.number}
          </div>
          <p className="text-sm leading-7 text-slate-700">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3">
          <span className="mt-2 size-2 shrink-0 rounded-full bg-[#39d95d]" aria-hidden="true" />
          <p className="text-sm leading-7 text-slate-700">{item}</p>
        </div>
      ))}
    </div>
  );
}

function RecruitmentSection(copy: CopySection) {
  const aboutTone = copy.lang === "zh-CN" ? "bg-[#eef8ff]" : "bg-[#fff8f0]";
  const chipTone = copy.lang === "zh-CN" ? "bg-[#f5c1b5]" : "bg-[#b9dceb]";

  return (
    <section lang={copy.lang} className="tb-frame bg-[#fffdf9] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <div className={`tb-section-chip ${chipTone}`}>{copy.badge}</div>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-[#25314d] sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-700">{copy.summary}</p>
        </div>

        <div className="grid gap-3 sm:justify-items-end">
          <span className="tb-badge">Updated {RECRUITMENT_UPDATED_AT}</span>
          <CopyEmailButton email={CONTACT_EMAIL} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Panel title={copy.aboutTitle} className={`md:col-span-2 ${aboutTone}`}>
          <p className="text-sm leading-7 text-slate-700">{copy.aboutText}</p>
        </Panel>

        <Panel title={copy.responsibilitiesTitle}>
          <NumberedList items={copy.responsibilities} />
        </Panel>

        <Panel title={copy.requirementsTitle}>
          <NumberedList items={copy.requirements} />
        </Panel>

        <Panel title={copy.benefitsTitle}>
          <BulletList items={copy.benefits} />
        </Panel>

        <Panel title={copy.workModeTitle}>
          <p className="text-sm leading-7 text-slate-700">{copy.workModeText}</p>
        </Panel>

        <Panel title={copy.templateTitle} className="md:col-span-2">
          <pre className="whitespace-pre-wrap rounded-[18px] border-2 border-[#25314d] bg-white p-4 text-sm leading-7 text-slate-700">
            {copy.templateText}
          </pre>
        </Panel>
      </div>
    </section>
  );
}

const chineseCopy: CopySection = {
  lang: "zh-CN",
  badge: "中文招募",
  title: "TaskBeacon招募心理学背景实习生",
  summary:
    "面向认知任务开发、验证和文档整理的线上协作岗位，中文和英文版本都展示在本页中，方便直接查看与转发。",
  aboutTitle: "关于 TaskBeacon",
  aboutText:
    "TaskBeacon（https://taskbeacon.github.io/） 是一个面向认知任务开发与整理的平台，聚合了经典任务目录、任务包标准（TAPS）、PsyFlow 本地开发框架、psyflow-web 网页预览，以及相关 Agent 自动化技能（Skills）与文档资源，目标是让认知任务的设计、实现、预览、文档和复核更加标准、清晰、可审计。当前网站已整理 35 个任务，目标是 99 个，并强调以统一结构组织任务逻辑、参数配置、参考文献和说明文档。",
  responsibilitiesTitle: "工作内容",
  responsibilities: [
    {
      number: "1",
      text:
        "任务校验与测试：参与人工校验任务参数、任务流程、任务输出、任务流程图，以及网页版任务的测试与实际执行，确保任务设计与实现一致、结果可靠。"
    },
    {
      number: "2",
      text:
        "文献调研与参数确认：查阅相关文献，整理并确认任务所使用的刺激材料、流程设计及关键参数，为任务标准化提供依据。"
    },
    {
      number: "3",
      text:
        "网站建设与文档撰写：参与网站内容建设，补充和撰写任务说明、使用文档及相关介绍材料，提升平台的清晰度与可用性。"
    }
  ],
  requirementsTitle: "希望你",
  requirements: [
    {
      number: "0",
      text: "对本项目感兴趣。"
    },
    {
      number: "1",
      text:
        "心理学背景，做事认真细致，对心理学实验、认知任务或科研工具建设有兴趣，具备基本的英文文献阅读能力。"
    },
    {
      number: "2",
      text: "有行为实验、PsychoPy、jsPsych（非必须）、GitHub、文档整理经验。"
    },
    {
      number: "3",
      text: "有 Python 以及 Vibe Coding 经验。"
    }
  ],
  benefitsTitle: "你将获得",
  benefits: [
    "将在项目页面中以贡献者身份进行展示。",
    "根据实际贡献，有机会获得后续论文署名。",
    "有机会进一步参与其他项目及后续合作。",
    "可根据经验、能力及实际投入确定是否提供报酬。"
  ],
  workModeTitle: "工作形式",
  workModeText: "线上协作。",
  templateTitle: "申请模板",
  templateText:
    "您好，我想应聘实习生岗位。{自我介绍}，我已阅读网站内容，并对项目整体架构有基本了解。我的专业 / 背景是 ______，相关经验包括 ______。我对该岗位感兴趣，主要原因是______，希望参与 ______ 相关工作。目前预计每周可投入 ______ 小时，可持续投入 ______ 周/月。"
};

const englishCopy: CopySection = {
  lang: "en",
  badge: "English Recruitment",
  title: "TaskBeacon is recruiting psychology-background interns",
  summary:
    "An online collaboration role focused on cognitive task development, validation, and documentation. The Chinese version appears above; this section provides the matching English notice.",
  aboutTitle: "About TaskBeacon",
  aboutText:
    "TaskBeacon (https://taskbeacon.github.io/) is a platform for cognitive task development and organization. It brings together a canonical task catalog, the TAPS task package standard, the PsyFlow local development framework, psyflow-web browser previews, and related agent automation skills (Skills) and documentation resources. The goal is to make cognitive task design, implementation, previewing, documentation, and review more standardized, clearer, and auditable. The site currently organizes 35 tasks and aims to reach 99, while emphasizing a unified structure for task logic, parameter configuration, references, and documentation.",
  responsibilitiesTitle: "Responsibilities",
  responsibilities: [
    {
      number: "1",
      text:
        "Task validation and testing: participate in manual checks of task parameters, task flow, task outputs, task flowcharts, and browser-based task testing and execution to ensure the design and implementation stay aligned and results remain reliable."
    },
    {
      number: "2",
      text:
        "Literature review and parameter confirmation: review relevant literature, organize and confirm the stimuli, procedure design, and key parameters used by the tasks, and help establish the basis for standardization."
    },
    {
      number: "3",
      text:
        "Website build-out and documentation: help improve the website content, write task instructions, usage guides, and related introduction materials, and make the platform clearer and easier to use."
    }
  ],
  requirementsTitle: "Desired Qualifications",
  requirements: [
    {
      number: "0",
      text: "Interested in this project."
    },
    {
      number: "1",
      text:
        "Psychology background, careful and detail-oriented work habits, interest in psychological experiments, cognitive tasks, or research tooling, and basic English reading ability."
    },
    {
      number: "2",
      text: "Experience with behavioral experiments, PsychoPy, jsPsych (optional), GitHub, and documentation organization."
    },
    {
      number: "3",
      text: "Python and Vibe Coding experience."
    }
  ],
  benefitsTitle: "What You Will Get",
  benefits: [
    "You will be shown as a contributor on the project page.",
    "Depending on actual contributions, there may be opportunities for future paper authorship.",
    "You may be able to join other projects and future collaborations.",
    "Compensation may be provided depending on experience, ability, and actual time commitment."
  ],
  workModeTitle: "Work Mode",
  workModeText: "Online collaboration.",
  templateTitle: "Application Template",
  templateText:
    "Hello, I would like to apply for the internship position. {Self-introduction}. I have read the website content and have a basic understanding of the overall project structure. My major/background is ______, and related experience includes ______. I am interested in this role mainly because ______, and I hope to work on ______ related tasks. I can currently commit ______ hours per week and can continue for ______ weeks/months."
};

export default function JobsPage() {
  return (
    <div className="space-y-8 lg:pt-6">
      <section className="tb-frame bg-[#fffdf9] p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="tb-section-chip bg-[#f5c1b5]">Jobs</div>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[0.95] text-[#25314d] sm:text-5xl">
            TaskBeacon recruitment, in Chinese and English.
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-700">
            The notice below is shown in Chinese first and English second, with the same role
            scope, benefits, and application template in both sections.
          </p>
        </div>
      </section>

      <RecruitmentSection {...chineseCopy} />
      <RecruitmentSection {...englishCopy} />
    </div>
  );
}
