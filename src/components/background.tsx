import { Section, Tag } from "@/components/section";
import { achievements, certifications, education, experience } from "@/lib/data";

function SubBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-10 first:border-t-0 first:pt-0 sm:py-12">
      <h3 className="font-display text-lg tracking-[-0.025em] text-text">{title}</h3>
      {children}
    </div>
  );
}

export function Background() {
  return (
    <Section
      id="background"
      label="Record"
      title="Education, certifications, work and awards"
      lede="Everything below is taken from a public source. Where something is not recorded — like engineering employment — it is left out rather than filled in."
    >
      <div className="grid gap-12 pb-16 lg:grid-cols-12 lg:gap-12 sm:pb-20">
        <div className="lg:col-span-7 lg:col-start-1">
          <SubBlock title="Experience">
            <ul className="mt-7 space-y-9">
              {experience.map((job) => (
                <li key={`${job.org}-${job.period}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h4 className="font-display text-[1.0625rem] tracking-[-0.02em] text-text">
                      {job.role}
                      <span className="text-text-3"> · {job.org}</span>
                    </h4>
                    <p className="datum">{job.period}</p>
                  </div>
                  <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-text-3">
                    {job.location}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-text-2">
                        <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-line" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l border-line pl-4 text-sm leading-relaxed text-text-3">
              Tutoring, design and sales came before and alongside the degree. None of it is cloud
              engineering, and pretending otherwise would be the easy lie — so it is listed as what
              it is, with the transferable part named.
            </p>
          </SubBlock>

          <SubBlock title="Education">
            <ul className="mt-7 space-y-8">
              {education.map((ed) => (
                <li key={ed.school}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h4 className="font-display text-[1.0625rem] tracking-[-0.02em] text-text">
                      {ed.school}
                    </h4>
                    <p className="datum">{ed.period}</p>
                  </div>
                  <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-glacier">
                    {ed.degree}
                  </p>
                  <p className="measure mt-3 text-sm leading-relaxed text-text-2">{ed.detail}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {ed.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </SubBlock>
        </div>

        <div className="lg:col-span-5 lg:col-start-9">
          <SubBlock title="Certifications">
            <ul className="mt-7 space-y-6">
              {certifications.map((cert) => (
                <li key={cert.name} className="border border-line bg-panel p-5">
                  <p className="datum text-amber">{cert.issuer}</p>
                  <h4 className="mt-2 font-display text-[1.0625rem] leading-snug tracking-[-0.02em] text-text">
                    {cert.name}
                  </h4>
                  <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-text-3">
                    Issued {cert.issued}
                  </p>
                  {cert.credentialId ? (
                    <p className="mt-3 break-all border-t border-line pt-3 font-mono text-[0.625rem] leading-relaxed tracking-[0.04em] text-text-3/80">
                      {cert.credentialId}
                    </p>
                  ) : null}
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {cert.skills.map((s) => (
                      <li key={s}>
                        <Tag>{s}</Tag>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-text-3">
              Credential details are published on the LinkedIn profile. Earlier certifications in
              graphic design and information technology are omitted here because they are not part
              of the engineering record.
            </p>
          </SubBlock>

          <SubBlock title="Achievements">
            <ul className="mt-7 space-y-7">
              {achievements.map((a) => (
                <li key={a.title}>
                  <div className="flex items-baseline gap-3">
                    <h4 className="font-display text-[1.0625rem] leading-snug tracking-[-0.02em] text-text">
                      {a.title}
                    </h4>
                    <span className="datum shrink-0">{a.year}</span>
                  </div>
                  <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-text-3">
                    {a.org}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-2">{a.detail}</p>
                </li>
              ))}
            </ul>
          </SubBlock>
        </div>
      </div>
    </Section>
  );
}