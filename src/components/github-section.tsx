import { Section } from "@/components/section";
import { formatDate, github, sinceLabel } from "@/lib/github";

export function GitHubSection() {
  const { totals, repos, topLanguages } = github;
  const maxLang = Math.max(...topLanguages.map((l) => l.count), 1);

  return (
    <Section
      id="github"
      label="Open source"
      title="What the public repositories show"
      lede="Everything here is public and verifiable. Repository data is pulled from the GitHub API at build time, so visiting this page makes no GitHub requests — and no private repository can leak into it."
    >
      <div className="pb-16 sm:pb-20">
        {/* Totals */}
        <dl className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          <div className="bg-ink px-5 py-5">
            <dt className="datum">Public repos</dt>
            <dd className="mt-2 font-display text-2xl leading-none tracking-[-0.03em] text-text">
              {totals.publicRepos}
            </dd>
          </div>
          <div className="bg-ink px-5 py-5">
            <dt className="datum">Project repos</dt>
            <dd className="mt-2 font-display text-2xl leading-none tracking-[-0.03em] text-text">
              {totals.publicWorkRepos}
            </dd>
          </div>
          <div className="bg-ink px-5 py-5">
            <dt className="datum">Building for</dt>
            <dd className="mt-2 font-display text-2xl leading-none tracking-[-0.03em] text-text">
              {sinceLabel(totals.oldestRepo)}
            </dd>
          </div>
          <div className="bg-ink px-5 py-5">
            <dt className="datum">Last push</dt>
            <dd className="mt-2 font-display text-2xl leading-none tracking-[-0.03em] text-text">
              {formatDate(totals.lastPush)}
            </dd>
          </div>
        </dl>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Repos */}
          <div className="lg:col-span-8">
            <p className="datum mb-4">Selected repositories</p>
            <ul className="border-t border-line">
              {repos.map((repo) => (
                <li key={repo.name} className="border-b border-line py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-draw font-mono text-sm text-text transition-colors hover:text-amber"
                    >
                      {repo.name}
                    </a>
                    <p className="datum">
                      {repo.language ? `${repo.language} · ` : ""}
                      updated {formatDate(repo.updatedAt)}
                    </p>
                  </div>
                  {repo.description ? (
                    <p className="measure mt-2 text-sm leading-relaxed text-text-2">{repo.description}</p>
                  ) : null}
                  <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.06em] text-text-3">
                    {repo.headSha ? `${repo.headSha.slice(0, 7)} on ${repo.defaultBranch}` : repo.defaultBranch}
                    {"  ·  "}
                    <span className="text-text-3/70">public</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-text-3">
              Coursework scratch repositories also exist on the profile; they are not listed here
              because they are not work.
            </p>
          </div>

          {/* Languages + profile */}
          <aside className="lg:col-span-4">
            <p className="datum mb-4">Languages across public repos</p>
            <ul className="space-y-3">
              {topLanguages.map((lang) => (
                <li key={lang.name}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-xs text-text-2">{lang.name}</span>
                    <span className="font-mono text-[0.6875rem] text-text-3">{lang.count}</span>
                  </div>
                  <div className="mt-1.5 h-px w-full bg-line">
                    <div
                      className="h-px bg-glacier"
                      style={{ width: `${(lang.count / maxLang) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-text-3">
              Counts reflect the language GitHub detects per repository. Shell, Python and Jupyter
              notebooks carry most of the infrastructure and AI work.
            </p>

            <a
              href={github.profileUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-2 border border-line px-4 py-2.5 font-mono text-xs tracking-[0.06em] text-text transition-colors hover:border-amber/60 hover:text-amber"
            >
              github.user
            </a>

            <p className="mt-6 font-mono text-[0.625rem] leading-relaxed tracking-[0.06em] text-text-3/70 uppercase">
              Snapshot taken {formatDate(github.syncedAt)} · refresh with npm run sync:github
            </p>
          </aside>
        </div>
      </div>
    </Section>
  );
}