import type { Project } from "@/lib/data";

type Kind = Project["visual"];

const VB = "0 0 560 340";

const frame =
  "fill-panel-2 stroke-line";
const label = "font-mono text-[9px] tracking-[0.08em] uppercase fill-text-3";
const labelStrong = "font-mono text-[9px] tracking-[0.08em] uppercase fill-amber";
const body = "font-mono text-[10px] fill-text-2";

function Grid() {
  return (
    <>
      <defs>
        <pattern id="pv-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="var(--color-line)" strokeWidth="0.6" opacity="0.55" />
        </pattern>
        <marker id="pv-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 z" fill="var(--color-text-3)" />
        </marker>
      </defs>
      <rect width="560" height="340" fill="var(--color-panel)" />
      <rect width="560" height="340" fill="url(#pv-grid)" />
    </>
  );
}

/** RAG retrieval flow — mirrors how the assistant actually answers. */
function Rag() {
  const chunks = [
    { id: "0412", src: "Academic Handbook §4", hot: true },
    { id: "1187", src: "CS Dept. Circular 2026", hot: false },
    { id: "2034", src: "Exam Office Notice", hot: false },
  ];
  return (
    <svg viewBox={VB} className="h-full w-full" role="img" aria-label="Diagram: a student question is embedded and matched against a corpus of university documents, and the answer is generated from the retrieved chunks only.">
      <Grid />
      {/* Query */}
      <rect x="28" y="26" width="504" height="40" className={frame} />
      <text x="44" y="43" className={labelStrong}>Query</text>
      <text x="44" y="58" className={body}>“How is the final exam weighted in Cloud Computing?”</text>

      <line x1="280" y1="66" x2="280" y2="92" stroke="var(--color-text-3)" strokeWidth="0.8" markerEnd="url(#pv-arrow)" />

      {/* Retrieval */}
      <rect x="28" y="94" width="504" height="34" className={frame} />
      <text x="44" y="115" className={body}>Embed query → nearest chunks over 11M+ characters</text>
      <text x="516" y="115" textAnchor="end" className={label}>Retrieval</text>

      {/* Chunks */}
      {chunks.map((c, i) => (
        <g key={c.id}>
          <rect
            x="28"
            y={142 + i * 44}
            width="504"
            height="34"
            className={frame}
            style={c.hot ? { stroke: "var(--color-amber)", strokeOpacity: 0.6 } : undefined}
          />
          <rect
            x="28"
            y={142 + i * 44}
            width="2.5"
            height="34"
            fill={c.hot ? "var(--color-amber)" : "var(--color-line)"}
          />
          <text x="44" y={163 + i * 44} className={body}>chunk #{c.id}</text>
          <text x="516" y={163 + i * 44} textAnchor="end" className={c.hot ? labelStrong : label}>
            {c.src}
          </text>
        </g>
      ))}

      <line
        x1="280"
        y1="274"
        x2="280"
        y2="292"
        stroke="var(--color-amber)"
        strokeWidth="0.8"
        markerEnd="url(#pv-arrow)"
        strokeDasharray="3 3"
      />

      <rect x="28" y="294" width="504" height="34" fill="var(--color-ink-2)" stroke="var(--color-amber)" strokeOpacity="0.35" />
      <text x="44" y="315" className={body}>Answer generated from retrieved context only</text>
      <text x="516" y="315" textAnchor="end" className={label}>Grounded</text>
    </svg>
  );
}

/** Roadwatch — detection frame plus the published metrics. */
function Vision() {
  const metrics = [
    { k: "mAP50", v: 78.2, w: 78.2 },
    { k: "Precision", v: 78.4, w: 78.4 },
    { k: "Recall", v: 73.5, w: 73.5 },
  ];
  return (
    <svg viewBox={VB} className="h-full w-full" role="img" aria-label="Diagram: a road frame with a pothole inside a detection bounding box, beside readouts of mAP50 78.2, precision 78.4 and recall 73.5.">
      <Grid />

      {/* Camera frame */}
      <rect x="28" y="28" width="290" height="180" fill="var(--color-ink)" stroke="var(--color-line)" />
      {/* Lane markings */}
      <path d="M173 28 L150 208" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="10 8" />
      <path d="M387 28 L410 208" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="10 8" />
      {/* Surface */}
      <path d="M28 208 L438 208" stroke="var(--color-line)" strokeWidth="1" />

      {/* Pothole */}
      <path
        d="M148 176 q18 -10 40 -4 q16 6 34 2 q-14 16 -38 15 q-26 1 -36 -13 z"
        fill="var(--color-ink-2)"
        stroke="var(--color-text-3)"
        strokeWidth="0.8"
      />

      {/* Detection box + corner ticks */}
      <rect x="128" y="150" width="124" height="52" fill="none" stroke="var(--color-amber)" strokeWidth="1.1" />
      <g fill="var(--color-amber)">
        <rect x="124" y="146" width="8" height="2" />
        <rect x="124" y="146" width="2" height="8" />
        <rect x="248" y="198" width="8" height="2" />
        <rect x="252" y="192" width="2" height="8" />
      </g>
      <rect x="128" y="136" width="86" height="14" fill="var(--color-amber)" />
      <text x="134" y="146" className="font-mono text-[9px] fill-ink">
        pothole 0.91
      </text>

      <text x="28" y="224" className={label}>Input · image / video · 960px</text>

      {/* Metric readouts */}
      <text x="348" y="42" className={labelStrong}>Held-out metrics</text>
      {metrics.map((m, i) => (
        <g key={m.k}>
          <text x="348" y={72 + i * 44} className={body}>{m.k}</text>
          <text x="532" y={72 + i * 44} textAnchor="end" className="font-mono text-[10px] fill-text">
            {m.v}%
          </text>
          <rect x="348" y={80 + i * 44} width="184" height="4" fill="var(--color-line)" />
          <rect x="348" y={80 + i * 44} width={(184 * m.w) / 100} height="4" fill="var(--color-amber)" />
        </g>
      ))}

      <line x1="28" y1="252" x2="532" y2="252" stroke="var(--color-line)" strokeWidth="0.8" />
      <text x="28" y="276" className={label}>ByteTrack</text>
      <text x="28" y="292" className={body}>Detections persist across frames instead of flickering</text>
      <text x="28" y="316" className={label}>Flask</text>
      <text x="28" y="332" className={body}>Confidence + inference time returned per detection</text>
    </svg>
  );
}

/** Lambda cleanup topology, as described in the project README. */
function Lambda() {
  const nodes = [
    { x: 28, y: 40, w: 150, h: 46, t: "EventBridge", s: "Schedule rule" },
    { x: 205, y: 40, w: 150, h: 46, t: "AWS Lambda", s: "Python 3.12" },
    { x: 382, y: 40, w: 150, h: 46, t: "EBS API", s: "Describe → Delete" },
    { x: 205, y: 148, w: 150, h: 46, t: "CloudWatch", s: "Logs" },
    { x: 28, y: 148, w: 150, h: 46, t: "IAM role", s: "3 permissions" },
    { x: 382, y: 148, w: 150, h: 46, t: "Snapshots", s: "Unused removed" },
  ];
  return (
    <svg viewBox={VB} className="h-full w-full" role="img" aria-label="Diagram: EventBridge triggers a Lambda function on a schedule, which lists and deletes unused EBS snapshots and logs each operation to CloudWatch, using a three-permission IAM role.">
      <Grid />
      {nodes.map((n) => (
        <g key={n.t}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} className={frame} />
          <text x={n.x + 14} y={n.y + 20} className={labelStrong}>{n.t}</text>
          <text x={n.x + 14} y={n.y + 35} className={body}>{n.s}</text>
        </g>
      ))}

      <g stroke="var(--color-text-3)" strokeWidth="0.8" markerEnd="url(#pv-arrow)" fill="none">
        <path d="M178 63 H205" />
        <path d="M355 63 H382" />
        <path d="M280 86 V124 H280 V148" />
        <path d="M203 63 H103 V148" strokeDasharray="3 3" />
        <path d="M457 86 V148" />
      </g>

      <text x="184" y="57" textAnchor="end" className={label}>triggers</text>

      <line x1="28" y1="228" x2="532" y2="228" stroke="var(--color-line)" strokeWidth="0.8" />
      <text x="28" y="252" className={label}>Execution role</text>
      <text x="28" y="270" className={body}>ec2:DescribeSnapshots</text>
      <text x="28" y="286" className={body}>ec2:DeleteSnapshot</text>
      <text x="28" y="302" className={body}>logs:*</text>

      <text x="300" y="252" className={label}>Why it exists</text>
      <text x="300" y="270" className={body}>Snapshots are never deleted by</text>
      <text x="300" y="286" className={body}>default, so storage cost climbs</text>
      <text x="300" y="302" className={body}>while teams watch compute.</text>
    </svg>
  );
}

/** The five-layer EC2 deployment path from the project README. */
function Server() {
  const layers = [
    { t: "AWS EC2", s: "Instance" },
    { t: "Ubuntu Linux", s: "Users · groups · permissions" },
    { t: "UFW + OpenSSH", s: "Firewall · key-based auth" },
    { t: "systemd + Cron", s: "Services · scheduled backups" },
    { t: "Docker → Nginx", s: "Containerised service" },
  ];
  return (
    <svg viewBox={VB} className="h-full w-full" role="img" aria-label="Diagram: the deployment path from an AWS EC2 instance down through Ubuntu Linux, the UFW firewall and SSH, systemd and Cron, to a Docker container running Nginx.">
      <Grid />
      {layers.map((l, i) => {
        const y = 30 + i * 48;
        const inset = i * 18;
        return (
          <g key={l.t}>
            <rect
              x={68 + inset}
              y={y}
              width={424 - inset * 2}
              height="38"
              fill={i === 0 ? "var(--color-ink-2)" : "var(--color-panel)"}
              stroke={i === 0 ? "var(--color-amber)" : "var(--color-line)"}
              strokeOpacity={i === 0 ? 0.5 : 1}
            />
            <text x={82 + inset} y={y + 17} className={i === 0 ? labelStrong : label}>{l.t}</text>
            <text x={478 - inset} y={y + 17} textAnchor="end" className={body}>{l.s}</text>
            {i < layers.length - 1 ? (
              <path
                d={`M280 ${y + 38} V${y + 48}`}
                stroke="var(--color-text-3)"
                strokeWidth="0.8"
                markerEnd="url(#pv-arrow)"
              />
            ) : null}
          </g>
        );
      })}

      <line x1="68" y1="286" x2="492" y2="286" stroke="var(--color-line)" strokeWidth="0.8" />
      <text x="68" y="308" className={label}>Also on this host</text>
      <text x="68" y="326" className={body}>Log analysis · troubleshooting · reverse proxying</text>
    </svg>
  );
}

const visuals: Record<Kind, () => React.JSX.Element> = {
  rag: Rag,
  vision: Vision,
  lambda: Lambda,
  server: Server,
};

export function ProjectVisual({ kind }: { kind: Kind }) {
  const Visual = visuals[kind];
  return (
    <div className="relative aspect-[560/340] w-full overflow-hidden border border-line bg-panel">
      <Visual />
    </div>
  );
}