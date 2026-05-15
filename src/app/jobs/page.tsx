import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CopyEmailButton } from "./copy-email-button";
import { getIndex } from "@/lib/task-index";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "TaskBeacon recruitment notice for psychology-background interns, presented in Chinese and English."
};

const CONTACT_EMAIL = "braintrace@yeah.net";
const RECRUITMENT_UPDATED_AT = "2026-05-15";

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

function buildChineseCopy(taskCount: number): CopySection {
  return {
    lang: "zh-CN",
    badge: "中文招聘",
    title: "TaskBeacon 招募心理学背景实习生",
    summary:
      "这是一个面向认知任务开发、验证和文档整理的线上协作岗位。页面同时提供中文和英文说明，方便查看、转发和申请。",
    aboutTitle: "关于 TaskBeacon",
    aboutText:
      `TaskBeacon（https://taskbeacon.github.io/）是一个面向认知任务开发与整理的平台，整合了任务目录、TAPS 任务包标准、PsyFlow 本地开发框架、psyflow-web 浏览器预览，以及相关自动化技能和文档资源。当前网站整理了 ${taskCount} 个任务，目标是让任务设计、实现、预览、文档和复核更标准、清晰、可审计。`,
    responsibilitiesTitle: "工作内容",
    responsibilities: [
      {
        number: "1",
        text:
          "任务校验与测试：参与人工检查任务参数、任务流程、输出结果、流程图和浏览器预览，确认设计与实现保持一致。"
      },
      {
        number: "2",
        text:
          "文献调研与参数确认：查阅相关文献，整理刺激材料、流程设计和关键参数，为任务标准化提供依据。"
      },
      {
        number: "3",
        text:
          "网站内容与文档写作：补充任务说明、使用文档和介绍材料，提升平台的清晰度和可用性。"
      }
    ],
    requirementsTitle: "希望你具备",
    requirements: [
      {
        number: "0",
        text: "对本项目感兴趣，愿意认真阅读和检查任务材料。"
      },
      {
        number: "1",
        text:
          "有心理学、认知科学、神经科学或相关背景，做事细致，具备基本英文文献阅读能力。"
      },
      {
        number: "2",
        text: "有行为实验、PsychoPy、jsPsych、GitHub 或文档整理经验者优先，但不是硬性要求。"
      },
      {
        number: "3",
        text: "有 Python 或 AI 辅助编程经验者优先。"
      }
    ],
    benefitsTitle: "你将获得",
    benefits: [
      "根据实际贡献，在项目页面或相关仓库中展示贡献记录。",
      "根据贡献内容，可能获得后续论文署名或项目协作机会。",
      "可以进一步参与其他任务建设、验证和文档整理工作。",
      "是否提供报酬将根据经验、能力和实际投入另行确认。"
    ],
    workModeTitle: "工作形式",
    workModeText: "线上协作。",
    templateTitle: "申请模板",
    templateText:
      "您好，我想申请 TaskBeacon 实习生岗位。{自我介绍}。我已经阅读网站内容，并对项目整体结构有基本了解。我的专业/背景是 ______，相关经验包括 ______。我对该岗位感兴趣的主要原因是 ______，希望参与 ______ 相关工作。目前预计每周可投入 ______ 小时，可持续投入 ______ 周/月。"
  };
}

function buildEnglishCopy(taskCount: number): CopySection {
  return {
    lang: "en",
    badge: "English Recruitment",
    title: "TaskBeacon is recruiting psychology-background interns",
    summary:
      "An online collaboration role focused on cognitive task development, validation, and documentation. The Chinese version appears above; this section provides the matching English notice.",
    aboutTitle: "About TaskBeacon",
    aboutText:
      `TaskBeacon (https://taskbeacon.github.io/) is a platform for cognitive task development and organization. It brings together a canonical task catalog, the TAPS task package standard, the PsyFlow local development framework, psyflow-web browser previews, and related automation skills and documentation resources. The site currently organizes ${taskCount} tasks while emphasizing a unified structure for task logic, parameter configuration, references, and documentation.`,
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
        text:
          "Experience with behavioral experiments, PsychoPy, jsPsych, GitHub, and documentation organization is welcome but not required."
      },
      {
        number: "3",
        text: "Python or AI-assisted coding experience is helpful."
      }
    ],
    benefitsTitle: "What You Will Get",
    benefits: [
      "Contributions can be acknowledged on project pages or related repositories.",
      "Substantial contributions may create opportunities for future paper authorship or project collaboration.",
      "You may be able to join other task-building, validation, and documentation work.",
      "Compensation may be provided depending on experience, ability, and actual time commitment."
    ],
    workModeTitle: "Work Mode",
    workModeText: "Online collaboration.",
    templateTitle: "Application Template",
    templateText:
      "Hello, I would like to apply for the TaskBeacon internship position. {Self-introduction}. I have read the website content and have a basic understanding of the overall project structure. My major/background is ______, and related experience includes ______. I am interested in this role mainly because ______, and I hope to work on ______ related tasks. I can currently commit ______ hours per week and can continue for ______ weeks/months."
  };
}

export default function JobsPage() {
  const taskCount = getIndex().tasks?.length ?? 0;

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

      <RecruitmentSection {...buildChineseCopy(taskCount)} />
      <RecruitmentSection {...buildEnglishCopy(taskCount)} />
    </div>
  );
}
