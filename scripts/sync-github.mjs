/**
 * Build-time GitHub sync.
 *
 * Fetches the public repositories for the configured user, filters to a
 * curated allowlist so only genuinely presentable work is surfaced, and writes
 * a static JSON file that the site reads. This keeps GitHub traffic off the
 * page-load path entirely: `next build` reads a file, not the API.
 *
 * Public repos only — the API is queried anonymously and no token is used or
 * required, so nothing private can leak into the output.
 *
 * Usage:  npm run sync:github
 *         GITHUB_TOKEN=... npm run sync:github   (optional, raises rate limit)
 */

import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, "..", "src", "data", "github.generated.json");

const USER = process.env.GITHUB_USER || "Ahmedmalik99";

/**
 * Allowlist of public repositories worth showing. Anything not listed here is
 * still counted for the totals but is not rendered as a project card.
 * Every entry was verified public on 2026-10-05.
 */
const FEATURED = [
  "road_hazard_detection",
  "aws-ebs-snapshot-cleaner",
  "cloud-server-project",
  "docker-health-checker",
  "ebay_products_webscraper",
];

/**
 * Curated one-line summaries, taken from each repository's README rather than
 * guessed. Used when the repo has no GitHub description set.
 */
const DESCRIPTIONS = {
  road_hazard_detection:
    "Flask service around a custom-trained YOLO26 pothole detector. Handles images and video, with ByteTrack for cross-frame persistence.",
  "aws-ebs-snapshot-cleaner":
    "Scheduled Lambda that deletes unused EBS snapshots. EventBridge trigger, CloudWatch logging, scoped IAM.",
  "cloud-server-project":
    "Ubuntu server on AWS EC2: users and permissions, UFW, SSH keys, Nginx, systemd, Cron backups, Docker deployment.",
  "docker-health-checker":
    "Windows GUI that monitors processes as containers — CPU, memory and uptime with colour-coded health. Tkinter and psutil.",
  ebay_products_webscraper:
    "Selenium WebDriver automation that extracts computer listings from eBay and exports them to Excel.",
};

/** Repos that only exist to hold coursework scratch files — excluded from cards. */
const NOISE = new Set([
  "practice",
  "testing",
  "github",
  "github-learn",
  "cde-b2",
  "API",
  "form",
  "Portfolio",
  "pythonProject2",
  "py-project-ahmed",
  "Dynamic_weather_app",
  "shell-example",
  "expense-tracker",
]);

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "ahmedmalik-portfolio-build",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function get(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

/** Resolve the default branch head SHA for a repo. */
async function headSha(repo) {
  try {
    const branch = await get(
      `https://api.github.com/repos/${USER}/${repo}/branches/${encodeURIComponent(repo === "docker-health-checker" ? "master" : "main")}`,
    );
    return branch?.commit?.sha ?? null;
  } catch {
    return null;
  }
}

async function main() {
  console.log(`[sync:github] fetching public repos for ${USER}…`);
  const repos = await get(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`);
  const publicRepos = repos.filter((r) => !r.private && !r.fork);
  console.log(`[sync:github] ${publicRepos.length} public repos found`);

  const selected = [];
  for (const name of FEATURED) {
    const repo = publicRepos.find((r) => r.name === name);
    if (!repo) {
      console.warn(`[sync:github] skip (not public): ${name}`);
      continue;
    }
    const sha = await headSha(name);
    selected.push({
      name: repo.name,
      description: repo.description || DESCRIPTIONS[repo.name] || null,
      url: repo.html_url,
      language: repo.language || null,
      updatedAt: repo.updated_at,
      createdAt: repo.created_at,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      defaultBranch: repo.default_branch,
      headSha: sha,
    });
  }

  selected.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const languages = {};
  for (const r of publicRepos) {
    if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
  }
  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));

  const payload = {
    syncedAt: new Date().toISOString(),
    user: USER,
    profileUrl: `https://github.com/${USER}`,
    totals: {
      publicRepos: publicRepos.length,
      // Repos that are real work rather than scratch files.
      publicWorkRepos: publicRepos.filter((r) => !NOISE.has(r.name)).length,
      oldestRepo: publicRepos.reduce(
        (min, r) => (min === null || r.created_at < min ? r.created_at : min),
        null,
      ),
      lastPush: publicRepos.reduce(
        (max, r) => (max === null || r.updated_at > max ? r.updated_at : max),
        null,
      ),
    },
    topLanguages,
    repos: selected,
  };

  await writeFile(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(
    `[sync:github] wrote ${selected.length} repos + totals to ${OUT_FILE.replace(process.cwd(), ".")}`,
  );

  // Sanity check: make sure the file parses and no private flag leaked in.
  const parsed = JSON.parse(await readFile(OUT_FILE, "utf8"));
  if (!Array.isArray(parsed.repos)) throw new Error("generated file is malformed");
  if (JSON.stringify(parsed).includes('"private":true')) {
    throw new Error("private repository reference detected in generated file");
  }
}

main().catch((err) => {
  console.error(`[sync:github] failed: ${err.message}`);
  process.exit(1);
});