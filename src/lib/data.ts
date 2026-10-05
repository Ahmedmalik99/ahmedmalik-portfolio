/**
 * Single source of truth for all portfolio content.
 *
 * Everything here was read from public sources on 2026-10-05:
 *   - LinkedIn: linkedin.com/in/ahmedmalik99 (headline, About, experience,
 *     education, licenses & certifications, featured projects)
 *   - GitHub: github.com/Ahmedmalik99 (public repos, READMEs, file trees)
 *
 * No metric, date, employer, certification or link in this file is invented.
 * Where a source was unavailable the entry is simply omitted rather than
 * filled with a placeholder claim.
 */

export const profile = {
  name: "Ahmed Malik",
  firstName: "Ahmed",
  role: "Cloud & DevOps Engineer",
  location: "Karachi, Pakistan",
  timezone: "PKT (UTC+5)",
  email: "ahmedabidjawad@gmail.com",
  phone: "+92 317 8878928",
  github: "https://github.com/Ahmedmalik99",
  githubHandle: "Ahmedmalik99",
  linkedin: "https://www.linkedin.com/in/ahmedmalik99/",
  linkedinHandle: "ahmedmalik99",
  availability: "Open to Cloud / DevOps / AI internships and entry-level roles",
  availabilityTypes: "Recruiters only · Karachi, hybrid or remote",
  headline:
    "I build the infrastructure that AI systems run on — AWS, Linux and automation on one side, LLM and computer-vision systems on the other.",
} as const;

/**
 * Numbers taken verbatim from LinkedIn. Each entry names its source so the
 * portfolio can be audited without guessing.
 */
export const metrics = [
  {
    value: "11M+",
    unit: "characters",
    label: "University data indexed for the RAG assistant",
    source: "LinkedIn · About",
  },
  {
    value: "78.2",
    unit: "% mAP50",
    label: "Pothole detection, custom YOLO26 model",
    source: "LinkedIn · Featured post",
  },
  {
    value: "1st",
    unit: "place",
    label: "Artificial Intelligence, SSUET exhibition",
    source: "LinkedIn · Projects",
  },
  {
    value: "3.86",
    unit: "CGPA",
    label: "Cloud Computing & Information Science",
    source: "LinkedIn · About",
  },
] as const;

export const profileStats = [
  { label: "Education", value: "SSUET · 2028" },
  { label: "Focus", value: "Cloud · Linux · AI" },
  { label: "Public repos", value: "17" },
] as const;

/** Capability pillars. Cloud/DevOps is the primary lane; AI is the applied lane. */
export const pillars = [
  {
    id: "cloud",
    tag: "Cloud",
    title: "Cloud infrastructure",
    summary:
      "Designing and hardening AWS topologies that stay up: multi-AZ VPCs, load-balanced entry points, auto scaling, and IAM written down rather than clicked together in a hurry.",
    points: [
      "Multi-AZ VPC design, subnets, routing and security groups",
      "EC2 fleets behind a load balancer with auto scaling",
      "Lambda scheduled by EventBridge, logged to CloudWatch",
      "EBS lifecycle automation to stop snapshot sprawl",
      "IAM policies designed to least privilege",
    ],
    stack: ["AWS", "VPC", "EC2", "Lambda", "EventBridge", "CloudWatch", "S3 / EBS", "IAM"],
  },
  {
    id: "linux",
    tag: "Host layer",
    title: "Linux & automation",
    summary:
      "The layer where a cloud diagram becomes a running system. Users, permissions, firewalls, services, scheduled jobs — and the shell to keep them honest.",
    points: [
      "Ubuntu server hardening: users, groups, permissions, UFW",
      "SSH key-based auth and least-privilege access",
      "systemd units and Cron for services and scheduled jobs",
      "Nginx reverse proxying and static serving",
      "Shell scripting and Python for repetitive operations work",
    ],
    stack: ["Linux", "Ubuntu", "Bash", "systemd", "Cron", "Nginx", "UFW", "OpenSSH"],
  },
  {
    id: "containers",
    tag: "Delivery",
    title: "Containers & CI-ready delivery",
    summary:
      "Packaging services so they behave the same on a laptop, in a container, and on an EC2 host — then reading the logs when they don't.",
    points: [
      "Dockerfiles, images and container lifecycle",
      "Running services inside Nginx containers on EC2",
      "Dependency pinning and reproducible build steps",
      "Log analysis and troubleshooting under load",
    ],
    stack: ["Docker", "Dockerfile", "psutil", "Git", "GitHub"],
  },
  {
    id: "ai",
    tag: "Applied AI",
    title: "Applied AI — RAG & vision",
    summary:
      "AI systems pointed at real problems. A university assistant grounded in 11M+ characters of official data, and a vision model trained to find potholes on Karachi roads.",
    points: [
      "Retrieval-Augmented Generation over institutional documents",
      "Chunking, retrieval and grounded answer generation",
      "Custom YOLO26 training and evaluation (mAP50 78.2%)",
      "ByteTrack object tracking across video frames",
      "Flask inference services for image and video pipelines",
    ],
    stack: ["Python", "LLM", "RAG", "YOLO", "Ultralytics", "OpenCV", "ByteTrack", "Flask"],
  },
] as const;

/**
 * Featured projects. `visibility` records whether the source repo is public,
 * so the UI can honestly say "code not published" instead of showing a dead link.
 */
export type Project = {
  slug: string;
  title: string;
  kicker: string;
  period: string;
  context: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  metrics?: { label: string; value: string }[];
  repo?: string;
  repoNote?: string;
  visual: "rag" | "vision" | "lambda" | "server";
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "university-ai-assistant",
    title: "University AI Assistant",
    kicker: "LLM + Retrieval-Augmented Generation",
    period: "Mar 2026 — Jun 2026",
    context:
      "Sir Syed University of Engineering & Technology, as part of the Cloud Computing & Information Science degree.",
    problem:
      "Students were asking the same administrative questions across scattered notices, handbooks and department pages — and answers changed depending on which page you found first.",
    solution:
      "Built a retrieval-augmented assistant over roughly 11 million characters of university material. Questions are answered from retrieved source context rather than model memory, so responses stay traceable to official documents instead of being invented.",
    outcome:
      "Awarded 1st Place in Artificial Intelligence at the university exhibition. Reviewed by the Chairman and Vice Chairman, then demonstrated to the Chancellor and senior university leadership. Deployed online so students could reach it through a single interface.",
    stack: ["Python", "LLM", "RAG", "Retrieval pipelines", "Grounded generation"],
    metrics: [
      { label: "Data indexed", value: "11M+ chars" },
      { label: "Exhibition rank", value: "1st place" },
      { label: "Deployment", value: "Live, online" },
    ],
    repoNote: "Repository is private — code is not published.",
    visual: "rag",
    featured: true,
  },
  {
    slug: "roadwatch",
    title: "Roadwatch — Pothole Detection",
    kicker: "Computer vision · YOLO26",
    period: "2026",
    context:
      "Built as a self-directed project after noticing road damage reporting in Karachi is largely manual.",
    problem:
      "Potholes are reported by hand, one message at a time. There is no cheap way to turn a photo or a dashcam clip into a repeatable, measurable picture of road condition.",
    solution:
      "Trained a custom YOLO26 detector on 2,000+ images and wrapped it in a Flask service that handles both images and video. Video runs through ByteTrack so detections persist across frames instead of flickering, and results come back with per-detection confidence plus inference time.",
    outcome:
      "Reached 78.2% mAP50 (78.4% precision, 73.5% recall) on the held-out set. Image results return instantly; video output is re-encoded browser-playable with boxes drawn on every detected frame. The post outlining this drew 350 reactions and 34 comments.",
    stack: ["Python", "YOLO26", "Ultralytics", "ByteTrack", "OpenCV", "Flask", "FFmpeg"],
    metrics: [
      { label: "mAP50", value: "78.2%" },
      { label: "Precision", value: "78.4%" },
      { label: "Recall", value: "73.5%" },
      { label: "Training images", value: "2,000+" },
    ],
    repo: "https://github.com/Ahmedmalik99/road_hazard_detection",
    visual: "vision",
    featured: true,
  },
  {
    slug: "ebs-snapshot-cleaner",
    title: "AWS EBS Snapshot Cleaner",
    kicker: "Serverless cost control",
    period: "2025",
    context: "AWS automation project focused on the cost side of cloud operations.",
    problem:
      "Snapshots accumulate quietly. Nothing deletes them by default, so storage cost climbs invisibly while teams focus on compute.",
    solution:
      "A Lambda function that enumerates available EBS snapshots, determines which are no longer in use, and deletes them. EventBridge triggers it on a schedule, CloudWatch captures every operation, and a scoped IAM policy grants only DescribeSnapshots, DeleteSnapshot and logging.",
    outcome:
      "Deployed as a scheduled, self-documenting cleanup job with an IAM policy and a sample EventBridge rule included, so the whole thing is reproducible rather than a one-off console session.",
    stack: ["AWS Lambda", "EventBridge", "CloudWatch", "Python", "IAM", "EBS"],
    metrics: [
      { label: "Runtime", value: "Python 3.12" },
      { label: "Trigger", value: "EventBridge schedule" },
      { label: "IAM scope", value: "3 permissions" },
    ],
    repo: "https://github.com/Ahmedmalik99/aws-ebs-snapshot-cleaner",
    visual: "lambda",
    featured: true,
  },
  {
    slug: "cloud-server-administration",
    title: "Cloud Server Administration & Docker Deployment",
    kicker: "Hands-on Linux on EC2",
    period: "2025",
    context: "A full server lifecycle exercise on a real AWS EC2 instance running Ubuntu.",
    problem:
      "Cloud diagrams are easy to draw and easy to skip. The point was to own a live host end to end — access, security, services, backups and packaging.",
    solution:
      "Configured an Ubuntu host on EC2: created users and groups with explicit permissions, switched to SSH key authentication, locked the host down with UFW, served a site through Nginx, managed a systemd unit, scheduled backups with Cron, then built and deployed the dashboard as a Docker container.",
    outcome:
      "A hardened, containerised web service running on EC2, with the deployment path recorded as a diagram: EC2 → Ubuntu → Docker → Nginx container → dashboard. Log analysis and troubleshooting were part of the work, not an afterthought.",
    stack: ["AWS EC2", "Ubuntu", "Nginx", "Docker", "systemd", "Cron", "UFW", "SSH"],
    metrics: [
      { label: "Deployment path", value: "5 layers" },
      { label: "Backups", value: "Cron scheduled" },
      { label: "Access", value: "SSH keys only" },
    ],
    repo: "https://github.com/Ahmedmalik99/cloud-server-project",
    visual: "server",
    featured: true,
  },
];

export const additionalProjects = [
  {
    title: "Docker Health Checker",
    description:
      "Windows desktop app that treats each running process as a container and reports health from CPU, memory and uptime. Built because Docker isn't installed everywhere; psutil enumerates real processes so the monitoring idea still works.",
    stack: ["Python", "Tkinter", "psutil"],
    repo: "https://github.com/Ahmedmalik99/docker-health-checker",
  },
  {
    title: "eBay Product Scraper",
    description:
      "Selenium WebDriver automation that extracts names, links and prices for computer listings and exports the result to Excel for analysis.",
    stack: ["Python", "Selenium", "OpenPyXL"],
    repo: "https://github.com/Ahmedmalik99/ebay_products_webscraper",
  },
  {
    title: "Network Design & Simulation",
    description:
      "Hands-on lab work on topologies, routers, switches, IP addressing and troubleshooting — the networking foundation the cloud work sits on.",
    stack: ["Networking", "Configuration", "Troubleshooting"],
  },
  {
    title: "Arduino Wireless Car",
    description:
      "Applied physics lab build: four motors, a custom chassis, and phone-based wireless control. Arduino programming, electronics and hardware integration.",
    stack: ["Arduino", "Embedded systems", "Wireless"],
  },
];

export const experience = [
  {
    role: "Online Tutor",
    org: "Self-employed",
    location: "Karachi · Remote",
    period: "Jul 2022 — Present",
    points: [
      "4+ years of one-on-one Math and English instruction for Year 4–11 Australian Curriculum students.",
      "Builds custom lesson plans and tracks progress across terms.",
      "Tutoring is where explaining a system to someone who didn't build it became a habit — a skill that carries straight into technical documentation and handover.",
    ],
  },
  {
    role: "Graphic Designer",
    org: "IT-GEN · Part-time",
    location: "Karachi · On-site",
    period: "Sep 2023 — Dec 2023 · 4 mos",
    points: [
      "Produced Instagram graphics and website icons in Photoshop and Illustrator.",
      "A 4-month engagement covering brand identity and digital presence.",
    ],
  },
  {
    role: "Salesperson",
    org: "Core 360",
    location: "Karachi",
    period: "May 2021 — Jun 2022 · 1 yr 2 mos",
    points: [
      "Ran outbound calling to US-based prospects and converted cold leads into active accounts.",
      "Owned the full client lifecycle in the CRM: inquiries, follow-up and retention, against daily and monthly targets.",
    ],
  },
];

export const education = [
  {
    school: "Sir Syed University of Engineering & Technology (SSUET)",
    degree: "BS Cloud Computing & Information Science",
    period: "Oct 2024 — Oct 2028",
    detail:
      "Currently pursuing a degree focused on cloud computing, DevOps, networking, system administration and modern infrastructure technologies. Holds a 3.86 CGPA.",
    tags: ["Cloud Computing", "DevOps", "Networking", "System Administration"],
  },
  {
    school: "Dehli College",
    degree: "Pre-Engineering",
    period: "Aug 2021 — Sep 2024",
    detail: "Pre-engineering foundation before moving into the Cloud Computing programme.",
    tags: ["Pre-Engineering"],
  },
];

export const certifications = [
  {
    name: "Linux Essentials",
    issuer: "Cisco Networking Academy",
    issued: "Sep 2026",
    credentialId: "399bc16f-2384-4f97-b6cd-a2d913dc9c81",
    skills: ["Linux", "Networking", "Shell Scripting", "File Management", "Permissions", "Group Management", "AWS CLI", "Security", "Data Backup Solutions"],
  },
  {
    name: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    issued: "Aug 2026",
    credentialId: "AWS Skill Builder certificate",
    skills: ["AWS", "Cloud Fundamentals"],
  },
  {
    name: "Linux Unhatched",
    issuer: "Cisco",
    issued: "Aug 2026",
    credentialId: "Credential shown on profile",
    skills: ["Linux"],
  },
  {
    name: "Python Basics",
    issuer: "University of Michigan (Coursera)",
    issued: "Mar 2024",
    credentialId: "VTXXLQQPQWUR",
    skills: ["Python"],
  },
];

export const achievements = [
  {
    title: "1st Place, Artificial Intelligence",
    org: "SSUET Exhibition",
    year: "2026",
    detail:
      "Awarded to the University AI Assistant project. The Chairman and Vice Chairman spent 10–15 minutes reviewing it, then invited a demonstration for the Chancellor and senior leadership.",
  },
  {
    title: "Chancellor demonstration",
    org: "SSUET",
    year: "2026",
    detail:
      "Presented the RAG assistant to university leadership after the exhibition review, where the deployment was received with strong interest.",
  },
  {
    title: "350 reactions on the Roadwatch write-up",
    org: "LinkedIn",
    year: "2026",
    detail:
      "The pothole-detection project write-up reached 350 reactions and 34 comments, the most engaged technical post on the profile.",
  },
];

export const stackGroups = [
  {
    group: "Cloud",
    items: ["AWS", "EC2", "Lambda", "EventBridge", "CloudWatch", "S3", "EBS", "IAM", "VPC", "Multi-AZ", "Load balancing", "Auto scaling"],
  },
  {
    group: "Infrastructure",
    items: ["Linux", "Ubuntu", "Bash", "Shell Scripting", "systemd", "Cron", "Nginx", "UFW", "SSH", "Networking"],
  },
  {
    group: "Automation",
    items: ["Python", "Docker", "AWS CLI", "Git", "GitHub", "Flask", "psutil"],
  },
  {
    group: "AI & ML",
    items: ["LLM", "RAG", "Retrieval pipelines", "YOLO26", "Ultralytics", "ByteTrack", "OpenCV", "Selenium", "Tkinter"],
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Stack", href: "#stack" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
] as const;

/** Source citations — the portfolio claims nothing that isn't listed here. */
export const sources = [
  { label: "LinkedIn profile", href: "https://www.linkedin.com/in/ahmedmalik99/" },
  { label: "GitHub profile", href: "https://github.com/Ahmedmalik99" },
] as const;