import type { Metadata } from "next";

import { About } from "@/components/about";
import { Background } from "@/components/background";
import { Capabilities } from "@/components/capabilities";
import { Contact } from "@/components/contact";
import { GitHubSection } from "@/components/github-section";
import { Hero } from "@/components/hero";
import { ProjectList } from "@/components/project-list";
import { Section } from "@/components/section";
import { Stack } from "@/components/stack-section";

export const metadata: Metadata = {
  title: "Ahmed Malik — Cloud & DevOps Engineer",
  description:
    "Portfolio of Ahmed Malik, Cloud & DevOps Engineer in Karachi. AWS, Linux, Docker and automation alongside deployed LLM + RAG systems and a custom YOLO26 computer-vision model.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Section
        id="work"
        label="Work"
        title="Four projects, and why each one exists"
        lede="Each project below states the problem it was built for, the approach taken, and what actually came out of it. Figures are the ones published on LinkedIn — nothing here is rounded up or estimated."
      >
        <div className="pb-16 sm:pb-20">
          <ProjectList />
        </div>
      </Section>
      <Capabilities />
      <Stack />
      <GitHubSection />
      <Background />
      <Contact />
    </>
  );
}