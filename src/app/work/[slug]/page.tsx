import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectVisual } from "@/components/project-visual";
import { Rule, Tag } from "@/components/section";
import { projects } from "@/lib/data";
import { siteUrl } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const title = project.title;
  const description = `${project.kicker}. ${project.solution.slice(0, 140)}…`;

  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/work/${project.slug}`,
      title: `${title} — Ahmed Malik`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Ahmed Malik`,
      description,
    },
  };
}

function BackLink() {
  return (
    <Link
      href="/work"
      className="link-draw font-mono text-xs tracking-[0.06em] text-text-2 transition-colors hover:text-text"
    >
      All work
    </Link>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="pt-28 sm:pt-36">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <BackLink />

        <header className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
          <p className="datum w-28 shrink-0 text-amber">{project.kicker}</p>
          <div className="min-w-0">
            <h1 className="font-display text-[clamp(2rem,6vw,3.25rem)] leading-[1.02] tracking-[-0.035em] text-text">
              {project.title}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="datum">{project.period}</span>
              <span className="h-3 w-px bg-line" aria-hidden />
              <span className="text-sm text-text-2">{project.context}</span>
            </p>
          </div>
        </header>

        <div className="mt-12">
          <ProjectVisual kind={project.visual} />
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-12 sm:py-16">
          <div className="lg:col-span-7">
            <dl className="space-y-8">
              <div>
                <dt className="datum">The problem</dt>
                <dd className="measure mt-2 text-[0.9375rem] leading-relaxed text-text-2">
                  {project.problem}
                </dd>
              </div>
              <div>
                <dt className="datum">What I built</dt>
                <dd className="measure mt-2 text-[0.9375rem] leading-relaxed text-text-2">
                  {project.solution}
                </dd>
              </div>
              <div>
                <dt className="datum text-amber">Outcome</dt>
                <dd className="measure mt-2 text-[0.9375rem] leading-relaxed text-text-2">
                  {project.outcome}
                </dd>
              </div>
            </dl>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            {project.metrics ? (
              <>
                <p className="datum mb-4">Recorded figures</p>
                <ul className="border-t border-line">
                  {project.metrics.map((m) => (
                    <li
                      key={m.label}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-3"
                    >
                      <span className="text-sm text-text-2">{m.label}</span>
                      <span className="font-display text-base tracking-[-0.02em] text-text">
                        {m.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <p className="datum mb-4 mt-10">Built with</p>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s}>
                  <Tag>{s}</Tag>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 border border-line px-5 py-3 font-mono text-xs tracking-[0.06em] text-text transition-colors hover:border-amber/60 hover:text-amber"
                >
                  View source on GitHub
                </a>
              ) : (
                <p className="border border-line px-5 py-3 text-sm leading-relaxed text-text-3">
                  {project.repoNote}
                </p>
              )}
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-amber px-5 py-3 font-mono text-xs font-medium tracking-[0.06em] text-ink transition-colors hover:bg-amber/90"
              >
                Get in touch
              </Link>
            </div>
          </aside>
        </div>

        <Rule />

        <nav aria-label="Project pagination" className="flex items-center justify-between gap-6 py-10">
          <p className="datum max-w-[12rem] truncate">
            {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>
          <Link href={`/work/${next.slug}`} className="group text-right">
            <p className="datum">Next project</p>
            <p className="mt-2 font-display text-lg tracking-[-0.025em] text-text transition-colors group-hover:text-amber">
              {next.title}
            </p>
          </Link>
        </nav>
      </div>
    </article>
  );
}