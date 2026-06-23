/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { IconArrowRight, IconGithub } from "@/components/icons";
import contributorsIndex from "@/data/contributors.json";

export const metadata: Metadata = {
  title: "Teams",
  description: "TaskBeacon maintainers, contributor openings, and acknowledgements."
};

const JOIN_MAILTO =
  "mailto:braintrace@yeah.net?subject=Join%20TaskBeacon&body=Hi%20TaskBeacon%2C%0A%0AI%20am%20interested%20in%20joining%20TaskBeacon.%20I%20would%20like%20to%20help%20with%3A%0A%0A-%20Task%20packages%0A-%20Browser%20previews%0A-%20Documentation%20or%20QA%0A%0AMy%20GitHub%20profile%3A%20%0A";

type Contributor = {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  repo_count: number;
};

function contributorAvatar(contributor: Contributor) {
  return contributor.login === "zh1peng" ? "/team/zh1peng.webp" : contributor.avatar_url;
}

export default function TeamsPage() {
  const contributors = (contributorsIndex.contributors ?? []) as Contributor[];

  return (
    <div className="space-y-8 lg:pt-6">
      <section className="grid gap-5 lg:grid-cols-2">
        <article className="tb-frame bg-[#fffdf9] p-5">
          <div className="flex h-full flex-col gap-5">
            <div className="flex gap-5">
              <img
                src="/team/zh1peng.webp"
                alt="zh1peng GitHub avatar"
                className="size-20 shrink-0 rounded-[18px] border-2 border-[#25314d] bg-white object-cover shadow-[0_4px_0_#25314d]"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <div className="tb-section-chip bg-[#b9dceb]">Core maintainer</div>
                <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#25314d]">
                  zh1peng
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Maintains task standards, website publishing, repository organization, and review paths.
                </p>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap justify-center gap-3">
              <a
                className="tb-focus-ring tb-button-primary px-4 py-2 text-sm"
                href="https://github.com/zh1peng"
                target="_blank"
                rel="noreferrer"
              >
                <IconGithub className="size-4" />
                GitHub profile
              </a>
              <a
                className="tb-focus-ring tb-button-secondary px-4 py-2 text-sm"
                href="https://taskbeacon.github.io/"
                target="_blank"
                rel="noreferrer"
              >
                TaskBeacon site
                <IconArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </article>

        <article className="tb-frame bg-[#fffdf9] p-5">
          <div className="flex h-full flex-col gap-5">
            <div className="flex gap-5">
              <img
                src="/team/core-maintainer-avatar-1.webp"
                alt="Open maintainer avatar"
                className="size-20 shrink-0 rounded-[18px] border-2 border-[#25314d] bg-slate-100 object-cover grayscale shadow-[0_4px_0_#25314d]"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <div className="tb-section-chip bg-slate-200 text-slate-600">Core maintainer</div>
                <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#25314d]">
                  Opening
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  We are looking for people who want to help make task packages easier to build, inspect, and share.
                </p>
              </div>
            </div>
            <a
              className="tb-focus-ring tb-button-ghost mx-auto mt-auto w-fit bg-slate-100 px-6 py-2 text-sm text-slate-600"
              href={JOIN_MAILTO}
            >
              Join
              <IconArrowRight className="size-4" />
            </a>
          </div>
        </article>

        <article className="tb-frame bg-[#fffdf9] p-5">
          <div className="flex h-full flex-col gap-5">
            <div className="flex gap-5">
              <img
                src="/team/core-maintainer-avatar-3.webp"
                alt="Open maintainer avatar"
                className="size-20 shrink-0 rounded-[18px] border-2 border-[#25314d] bg-slate-100 object-cover grayscale shadow-[0_4px_0_#25314d]"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <div className="tb-section-chip bg-slate-200 text-slate-600">Core maintainer</div>
                <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#25314d]">
                  Opening
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  We are looking for people who want to help make task packages easier to build, inspect, and share.
                </p>
              </div>
            </div>
            <a
              className="tb-focus-ring tb-button-ghost mx-auto mt-auto w-fit bg-slate-100 px-6 py-2 text-sm text-slate-600"
              href={JOIN_MAILTO}
            >
              Join
              <IconArrowRight className="size-4" />
            </a>
          </div>
        </article>

        <article className="tb-frame bg-[#fffdf9] p-5">
          <div className="flex h-full flex-col gap-5">
            <div className="flex gap-5">
              <img
                src="/team/core-maintainer-avatar-2.webp"
                alt="Open maintainer avatar"
                className="size-20 shrink-0 rounded-[18px] border-2 border-[#25314d] bg-slate-100 object-cover grayscale shadow-[0_4px_0_#25314d]"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <div className="tb-section-chip bg-slate-200 text-slate-600">Core maintainer</div>
                <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#25314d]">
                  Opening
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  We are looking for people who want to help make task packages easier to build, inspect, and share.
                </p>
              </div>
            </div>
            <a
              className="tb-focus-ring tb-button-ghost mx-auto mt-auto w-fit bg-slate-100 px-6 py-2 text-sm text-slate-600"
              href={JOIN_MAILTO}
            >
              Join
              <IconArrowRight className="size-4" />
            </a>
          </div>
        </article>
      </section>

      <section className="tb-frame-soft bg-[#fffdf9] p-6 sm:p-8">
        <div className="tb-section-chip bg-[#ddd7f4]">Acknowledgement</div>

        <div className="mt-5">
          <h2 className="font-heading text-3xl font-bold leading-tight text-[#25314d]">
            Contributors
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700">
            Automatically aggregated from public repositories in the TaskBeacon GitHub organization.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map((contributor) => (
              <a
                key={contributor.login}
                className="tb-focus-ring flex items-center gap-3 rounded-[18px] border-2 border-[#25314d] bg-[#f8fcff] p-3 shadow-[0_3px_0_#25314d] transition-transform hover:-translate-y-0.5"
                href={contributor.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={contributorAvatar(contributor)}
                  alt={`${contributor.login} GitHub avatar`}
                  className="size-12 shrink-0 rounded-[14px] border-2 border-[#25314d] bg-white object-cover"
                  loading="lazy"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-[#25314d]">
                    {contributor.name || contributor.login}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-xs text-slate-500">
                    @{contributor.login}
                  </span>
                </span>
                <span className="shrink-0 rounded-full bg-[#eef8ff] px-2.5 py-1 font-mono text-xs font-bold text-[#25314d]">
                  {contributor.contributions}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="my-7 border-t-2 border-dashed border-[#25314d]/25" />

        <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-[#25314d]">
          Funding
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
          zh1peng received support from the National Natural Science Foundation of China
          (Grant No.{" "}
          <a
            className="font-bold text-[#25314d] underline decoration-[#39d95d] decoration-2 underline-offset-4"
            href="https://www.sciencedirect.com/science/article/pii/S2667174325001223#gs1"
            target="_blank"
            rel="noreferrer"
          >
            32400925
          </a>
          ), the Key Medical Discipline Program of Shanghai Xuhui District (Grant No.{" "}
          <a
            className="font-bold text-[#25314d] underline decoration-[#39d95d] decoration-2 underline-offset-4"
            href="https://www.sciencedirect.com/science/article/pii/S2667174325001223#gs2"
            target="_blank"
            rel="noreferrer"
          >
            SHXHZDXK202308
          </a>
          ), and the Medical Research Project of Shanghai Xuhui District (Grant No.{" "}
          <a
            className="font-bold text-[#25314d] underline decoration-[#39d95d] decoration-2 underline-offset-4"
            href="https://www.sciencedirect.com/science/article/pii/S2667174325001223#gs3"
            target="_blank"
            rel="noreferrer"
          >
            SHXH202305
          </a>
          ).
        </p>
      </section>
    </div>
  );
}
