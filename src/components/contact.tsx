import { Section } from "@/components/section";
import { profile } from "@/lib/data";

function Channel({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group flex items-baseline justify-between gap-6 border-b border-line py-4 transition-colors hover:border-amber/50"
    >
      <span className="datum">{label}</span>
      <span className="text-right text-sm text-text transition-colors group-hover:text-amber">
        {value}
      </span>
    </a>
  );
}

export function Contact() {
  return (
    <Section
      id="contact"
      label="Contact"
      title="Open to Cloud, DevOps and AI roles"
      lede={profile.availabilityTypes}
    >
      <div className="grid gap-12 pb-16 lg:grid-cols-12 lg:gap-12 sm:pb-24">
        <div className="lg:col-span-7">
          <p className="max-w-[34ch] font-display text-[clamp(1.5rem,4vw,2.125rem)] leading-[1.12] tracking-[-0.03em] text-text">
            If you are hiring an intern who actually wants to touch production systems, my inbox is
            open.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-8 inline-flex items-center gap-3 bg-amber px-6 py-3.5 font-mono text-sm font-medium tracking-[0.04em] text-ink transition-colors hover:bg-amber/90"
          >
            {profile.email}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <div className="mt-12 max-w-md">
            <Channel
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <Channel
              label="LinkedIn"
              value={`in/${profile.linkedinHandle}`}
              href={profile.linkedin}
              external
            />
            <Channel
              label="GitHub"
              value={profile.githubHandle}
              href={profile.github}
              external
            />
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border border-line bg-panel p-6">
            <p className="datum text-amber">What I am looking for</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-text-2">
              <li className="flex gap-3">
                <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-line" />
                An internship or entry-level role on a Cloud, DevOps or AI infrastructure team.
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-line" />
                Access to real infrastructure — somewhere to deploy, break and fix things.
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-line" />
                Based in Karachi, or open to remote or hybrid work.
              </li>
            </ul>

            <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-text-3">
              Recruiter messages through LinkedIn are welcome. I read all of them.
            </p>
          </div>

          <div className="mt-6 border border-line p-6">
            <p className="datum">Source of record</p>
            <p className="mt-3 text-sm leading-relaxed text-text-2">
              Every claim on this site was read from a public profile or repository. If something
              here needs correcting, email me and I will fix it.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}