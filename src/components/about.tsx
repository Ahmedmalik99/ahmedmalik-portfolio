import Image from "next/image";

import { profile } from "@/lib/data";

const avatar = "https://avatars.githubusercontent.com/u/156577128?v=4";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <header className="flex flex-col gap-3 pt-14 pb-8 sm:flex-row sm:items-baseline sm:gap-8 sm:pt-20 sm:pb-10">
          <p className="datum w-28 shrink-0">Background</p>
          <h2 className="font-display text-[1.75rem] leading-[1.1] text-text sm:text-[2.125rem]">
            A Cloud Computing student who ships instead of waiting
          </h2>
        </header>

        <div className="grid gap-10 pb-16 lg:grid-cols-12 lg:gap-12 sm:pb-20">
          <div className="lg:col-span-7">
            <div className="space-y-5 text-[0.9375rem] leading-relaxed text-text-2">
              <p>
                I study Cloud Computing &amp; Information Science at Sir Syed University of
                Engineering &amp; Technology, graduating in 2028, and I hold a 3.86 CGPA. The
                coursework sets the syllabus — but the systems I build are mine, started because a
                problem was annoying enough to solve.
              </p>
              <p>
                My AI assistant for the university took shape as an answer to a real friction point:
                students hunting through scattered notices for information that was already written
                down. It retrieves from about 11 million characters of official material instead of
                inventing answers, and it won first place in Artificial Intelligence at the SSUET
                exhibition before being demonstrated to the Chancellor&apos;s office.
              </p>
              <p>
                The infrastructure side came next. A multi-AZ VPC behind a load balancer with auto
                scaling. A scheduled Lambda that deletes EBS snapshots nothing else cleans up. An
                EC2 host hardened by hand — users, permissions, UFW, key-based SSH, systemd, Cron
                backups — and then a Dockerised Nginx service running on top of it.
              </p>
              <p>
                Both halves use the same instinct: find the thing that fails quietly, then put
                something in place that catches it. Cloud work makes that instinct visible. AI work
                makes it useful.
              </p>
              <p className="text-text">
                Outside of it all, I have tutored Australian Curriculum Math and English for four
                years. Explaining something to someone who did not build it is most of the job —
                and it turns out that skill transfers directly to documentation and handover.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-line bg-panel p-6">
              <div className="flex items-center gap-4">
                <Image
                  src={avatar}
                  alt={`Portrait of ${profile.name}`}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 border border-line object-cover grayscale"
                />
                <div className="min-w-0">
                  <p className="font-display text-base leading-tight tracking-[-0.02em] text-text">
                    {profile.name}
                  </p>
                  <p className="mt-1 text-sm text-text-2">{profile.role}</p>
                  <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-text-3">
                    {profile.location}
                  </p>
                </div>
              </div>

              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-text-3">Degree</dt>
                  <dd className="text-right text-text-2">BS Cloud Computing &amp; IS</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-text-3">Institution</dt>
                  <dd className="text-right text-text-2">SSUET, Karachi</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-text-3">Graduating</dt>
                  <dd className="text-right text-text-2">2028</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-text-3">Certified</dt>
                  <dd className="text-right text-text-2">AWS Cloud Practitioner</dd>
                </div>
              </dl>

              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-text-2">
                {profile.availabilityTypes}.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}