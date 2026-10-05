import Link from "next/link";

import { ProjectVisual } from "@/components/project-visual";
import { Tag } from "@/components/section";
import { additionalProjects, projects, type Project } from "@/lib/data";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const visual = (
    <div className="lg:sticky lg:top-24">
      <ProjectVisual kind={project.visual} />
    </div>
  );

  const copy = (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="datum text-amber">{project.kicker}</p>
        <p className="datum">{project.period}</p>
      </div>

      <h3 className="mt-3 font-display text-[1.5rem] leading-[1.12] tracking-[-0.03em] text-text sm:text-[1.875rem]">
        <Link href={`/work/${project.slug}`} className="transition-colors hover:text-amber">
          {project.title}
        </Link>
      </h3>

      <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-2">{project.context}</p>

      <dl className="mt-7 space-y-5">
        <div className="border-l border-line pl-4">
          <dt className="datum">Problem</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-text-2">{project.problem}</dd>
        </div>
        <div className="border-l border-line pl-4">
          <dt className="datum">Approach</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-text-2">{project.solution}</dd>
        </div>
        <div className="border-l border-amber/40 pl-4">
          <dt className="datum text-amber">Result</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-text-2">{project.outcome}</dd>
        </div>
      </dl>

      {project.metrics ? (
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-y border-line py-4">
          {project.metrics.map((m) => (
            <li key={m.label}>
              <p className="font-display text-lg leading-none tracking-[-0.02em] text-text">{m.value}</p>
              <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-text-3 uppercase">
                {m.label}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <li key={s}>
            <Tag>{s}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href={`/work/${project.slug}`}
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.06em] text-text transition-colors hover:text-amber"
        >
          Read the case study
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="link-draw font-mono text-xs tracking-[0.06em] text-text-2 transition-colors hover:text-text"
          >
            View on GitHub
          </a>
        ) : (
          <span className="font-mono text-[0.6875rem] tracking-[0.06em] text-text-3">{project.repoNote}</span>
        )}
      </div>
    </div>
  );

  return (
    <article className="border-t border-line py-12 first:border-t-0 first:pt-0 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : "lg:order-1"}`}>{visual}</div>
        <div className={`lg:col-span-7 ${flip ? "lg:order-1" : "lg:order-2"}`}>{copy}</div>
      </div>
    </article>
  );
}

export function ProjectList() {
  return (
    <>
      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="border-t border-line py-12 sm:py-14">
        <p className="datum mb-7">Also built</p>
        <ul className="grid gap-px bg-line sm:grid-cols-2">
          {additionalProjects.map((p) => (
            <li key={p.title} className="bg-ink p-6">
              <h3 className="font-display text-base leading-snug tracking-[-0.02em] text-text">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-text-2">{p.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
                {p.repo ? (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-draw font-mono text-[0.6875rem] tracking-[0.06em] text-text-2 transition-colors hover:text-text"
                  >
                    GitHub
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}