import type { Metadata } from "next";

import { ProjectList } from "@/components/project-list";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by Ahmed Malik: a university RAG assistant that won 1st place in AI, a YOLO26 pothole detection system at 78.2% mAP50, a scheduled AWS Lambda for EBS cleanup, and a fully hardened EC2 deployment.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-line pt-28 sm:pt-36">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <header className="flex flex-col gap-3 pb-12 sm:flex-row sm:items-baseline sm:gap-8">
            <p className="datum w-28 shrink-0 text-amber">Index</p>
            <div className="min-w-0">
              <h1 className="font-display text-[clamp(2rem,6vw,3.25rem)] leading-[1.02] tracking-[-0.035em] text-text">
                Work
              </h1>
              <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-text-2">
                Four projects with a full write-up, plus the smaller builds behind them. Each entry
                states the problem, the approach and the measured result — open one for the
                diagrams.
              </p>
            </div>
          </header>
        </div>
      </section>

      <Section id="all-work" label="Projects" title="Project case studies">
        <div className="pb-16 sm:pb-24">
          <ProjectList />
        </div>
      </Section>
    </>
  );
}