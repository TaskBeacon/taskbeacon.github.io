"use client";

import { useState } from "react";
import { IconChevronRight } from "@/components/icons";
import { CopyEmailButton } from "./copy-email-button";

const CONTACT_EMAIL = "braintrace@yeah.net";
const RECRUITMENT_UPDATED_AT = "2026-05-15";

type Lang = "zh" | "en";

type NoticeCopy = {
  label: string;
  title: string;
  sections: {
    title: string;
    body: string | string[];
    pre?: boolean;
  }[];
};

const NOTICE: Record<Lang, NoticeCopy> = {
  zh: {
    label: "CN",
    title: "TaskBeacon 招募心理学背景实习生",
    sections: [
      {
        title: "岗位简介",
        body:
          "这是一个面向认知任务开发、验证和文档整理的线上协作岗位。你会参与任务参数检查、流程复核、文献依据整理、README 写作，以及网页预览的人工验证。"
      },
      {
        title: "工作内容",
        body: [
          "任务校验与测试：检查任务参数、任务流程、输出结果、流程图和浏览器预览是否一致。",
          "文献调研与参数确认：整理刺激材料、流程设计和关键参数，为任务标准化提供依据。",
          "网站内容与文档写作：补充任务说明、使用文档和介绍材料，提升平台清晰度。"
        ]
      },
      {
        title: "希望你具备",
        body: [
          "对 TaskBeacon 感兴趣，愿意认真阅读和检查任务材料。",
          "心理学、认知科学、神经科学或相关背景，具备基本英文文献阅读能力。",
          "有行为实验、PsychoPy、jsPsych、GitHub、Python 或 AI 辅助编程经验者优先。"
        ]
      },
      {
        title: "你将获得",
        body: [
          "根据实际贡献，在项目页面或相关仓库中展示贡献记录。",
          "根据贡献内容，可能获得后续论文署名或项目协作机会。",
          "是否提供报酬将根据经验、能力和实际投入另行确认。"
        ]
      },
      {
        title: "申请模板",
        pre: true,
        body:
          "您好，我想申请 TaskBeacon 实习生岗位。{自我介绍}。我已阅读网站内容，并对项目整体结构有基本了解。我的专业/背景是 ______，相关经验包括 ______。我对该岗位感兴趣的主要原因是 ______，希望参与 ______ 相关工作。目前预计每周可投入 ______ 小时，可持续投入 ______ 周/月。"
      }
    ]
  },
  en: {
    label: "EN",
    title: "TaskBeacon is recruiting psychology-background interns",
    sections: [
      {
        title: "Role",
        body:
          "This is an online collaboration role focused on cognitive task development, validation, and documentation. You will help review task parameters, task flow, literature evidence, README quality, and browser preview alignment."
      },
      {
        title: "Responsibilities",
        body: [
          "Task validation: check task parameters, procedure flow, outputs, diagrams, and browser previews.",
          "Literature and parameter review: organize stimuli, procedure design, and key parameters from source papers.",
          "Documentation: improve task descriptions, usage notes, and site content."
        ]
      },
      {
        title: "Desired qualifications",
        body: [
          "Interest in TaskBeacon and careful review work.",
          "Background in psychology, cognitive science, neuroscience, or a related field.",
          "Experience with behavioral experiments, PsychoPy, jsPsych, GitHub, Python, or AI-assisted coding is helpful."
        ]
      },
      {
        title: "Benefits",
        body: [
          "Contributions can be acknowledged on project pages or related repositories.",
          "Substantial contributions may create opportunities for future authorship or project collaboration.",
          "Compensation may be discussed based on experience, ability, and actual time commitment."
        ]
      },
      {
        title: "Application template",
        pre: true,
        body:
          "Hello, I would like to apply for the TaskBeacon internship position. {Self-introduction}. I have read the website content and have a basic understanding of the project structure. My major/background is ______, and related experience includes ______. I am interested in this role mainly because ______, and I hope to work on ______ related tasks. I can currently commit ______ hours per week and can continue for ______ weeks/months."
      }
    ]
  }
};

function NoticeBody({ body, pre = false }: { body: string | string[]; pre?: boolean }) {
  if (Array.isArray(body)) {
    return (
      <ul className="space-y-3">
        {body.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-[#39d95d]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (pre) {
    return (
      <pre className="whitespace-pre-wrap rounded-[18px] border-2 border-[#25314d] bg-white p-4 text-sm leading-7 text-slate-700">
        {body}
      </pre>
    );
  }

  return <p className="max-w-3xl text-sm leading-7 text-slate-700">{body}</p>;
}

export function JobLanguageNotice() {
  const [lang, setLang] = useState<Lang>("zh");
  const copy = NOTICE[lang];

  return (
    <section className="space-y-5" aria-label="TaskBeacon recruitment notice">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-[20px] border-2 border-[#25314d] bg-[#fffdf9] p-1 shadow-[0_4px_0_#25314d]">
          {(["zh", "en"] as const).map((option) => (
            <button
              key={option}
              type="button"
              className={`tb-focus-ring rounded-[15px] px-5 py-2 text-sm font-bold transition-colors ${
                lang === option ? "bg-[#39d95d] text-[#25314d]" : "text-[#25314d] hover:bg-[#eef8ff]"
              }`}
              onClick={() => setLang(option)}
              aria-pressed={lang === option}
            >
              {NOTICE[option].label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="tb-badge">Updated {RECRUITMENT_UPDATED_AT}</span>
          <CopyEmailButton email={CONTACT_EMAIL} />
        </div>
      </div>

      <details
        className="group tb-frame overflow-hidden bg-[#fffdf9]"
        lang={lang === "zh" ? "zh-CN" : "en"}
      >
        <summary className="tb-focus-ring flex cursor-pointer list-none items-center gap-4 p-6 [&::-webkit-details-marker]:hidden sm:p-8">
          <span className="min-w-0 flex-1 font-heading text-4xl font-bold leading-tight text-[#25314d] sm:text-5xl">
            {copy.title}
          </span>
          <IconChevronRight className="size-6 shrink-0 transition-transform group-open:rotate-90" />
        </summary>

        <div className="border-t-2 border-[#25314d] bg-[#eef8ff] p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {copy.sections.map((section, index) => (
              <article
                key={`${lang}-${section.title}`}
                className={`tb-frame-soft bg-[#fffdf9] p-5 ${
                  index === 0 || section.pre ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold tabular-nums text-[#25314d]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-heading text-2xl font-bold leading-tight text-[#25314d]">
                    {section.title}
                  </h2>
                </div>
                <div className="mt-4">
                  <NoticeBody body={section.body} pre={section.pre} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </details>
    </section>
  );
}
