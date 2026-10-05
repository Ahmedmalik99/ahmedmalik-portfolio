import Link from "next/link";

import { nav, profile, sources } from "@/lib/data";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[84rem] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-xl tracking-[-0.025em] text-text">
              Let&apos;s talk infrastructure.
            </p>
            <p className="measure mt-3 text-sm leading-relaxed text-text-2">
              I&apos;m looking for a Cloud, DevOps or AI internship, or an entry-level role where
              someone will let me get close to real systems. If that sounds like your team, the
              fastest route is email or LinkedIn.
            </p>
          </div>

          <nav aria-label="Footer sections">
            <p className="datum mb-4">Sections</p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-draw text-sm text-text-2 transition-colors hover:text-text"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="datum mb-4">Elsewhere</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-draw text-sm text-text-2 transition-colors hover:text-text"
                >
                  GitHub — {profile.githubHandle}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-draw text-sm text-text-2 transition-colors hover:text-text"
                >
                  LinkedIn — {profile.linkedinHandle}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="link-draw text-sm text-text-2 transition-colors hover:text-text"
                >
                  Email
                </a>
              </li>
              <li>
                <Link href="/work" className="link-draw text-sm text-text-2 transition-colors hover:text-text">
                  All work
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="datum">
            © {year} {profile.name}. Built with Next.js, React Three Fiber and Tailwind CSS.
          </p>
          <p className="datum">
            Content verified against{" "}
            {sources.map((s, i) => (
              <span key={s.href}>
                {i > 0 && " and "}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-draw text-text-3 hover:text-text-2"
                >
                  {s.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}