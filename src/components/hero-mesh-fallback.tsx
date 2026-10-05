import { buildTopology } from "@/lib/topology";

const VIEW_W = 520;
const VIEW_H = 420;
const YAW = -0.42;
const TILT = 0.16;

function project(x: number, y: number, z: number) {
  const cos = Math.cos(YAW);
  const sin = Math.sin(YAW);
  const rx = x * cos - z * sin;
  const rz = x * sin + z * cos;
  const ry = y - rz * TILT;
  // Depth drives opacity and scale so the mesh has a front and a back.
  const depth = (rz + 5) / 10;
  return {
    x: VIEW_W / 2 + rx * 58,
    y: VIEW_H / 2 + ry * 58,
    depth,
  };
}

/**
 * Static SVG rendering of the same topology the WebGL hero draws.
 *
 * Used when WebGL is unavailable, when the visitor prefers reduced motion, or
 * before the canvas has mounted — so the hero is never empty.
 */
export function HeroMeshFallback({ reduced = false }: { reduced?: boolean }) {
  const { nodes, edges } = buildTopology({ density: "full" });
  const pts = nodes.map((n) => project(n.x, n.y, n.z));

  const tierStroke: Record<string, string> = {
    entry: "var(--color-amber)",
    zone: "var(--color-amber)",
    service: "var(--color-glacier)",
    leaf: "var(--color-text-3)",
  };

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="h-full w-full"
      role="img"
      aria-label="A service mesh diagram: a single entry point in front of three availability zones, each hosting services, with request leaves fanning out behind."
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="mesh-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke="var(--color-line)" strokeWidth="0.75">
        {edges.map((e, i) => {
          const a = pts[e.from];
          const b = pts[e.to];
          const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const nx = -dy * 0.14;
          const ny = dx * 0.14;
          return (
            <path
              key={i}
              d={`M${a.x.toFixed(1)},${a.y.toFixed(1)} Q${(mid.x + nx).toFixed(1)},${(mid.y + ny).toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`}
              fill="none"
              opacity={0.25 + e.weight * 0.4}
            />
          );
        })}
      </g>

      <circle cx={pts[0].x} cy={pts[0].y} r="52" fill="url(#mesh-core)" />

      {nodes.map((n, i) => {
        const p = pts[i];
        const r = n.scale * (reduced ? 2.4 : 2.9) * (0.72 + p.depth * 0.5);
        const stroke = tierStroke[n.tier];
        return (
          <g key={n.id}>
            <circle
              cx={p.x}
              cy={p.y}
              r={r}
              fill="var(--color-ink-2)"
              stroke={stroke}
              strokeWidth={n.tier === "entry" ? 1.4 : 0.9}
              opacity={0.4 + p.depth * 0.6}
            />
            {n.tier === "entry" ? (
              <circle cx={p.x} cy={p.y} r={r * 0.42} fill={stroke} opacity="0.9" />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}