/**
 * Deterministic topology for the hero visualisation.
 *
 * The shape is a radial service mesh rather than a random particle cloud,
 * because it mirrors what the work actually is: one entry point in front,
 * availability zones behind it, and services fanning out from there. Keeping
 * this pure (no three.js) lets the WebGL scene and the no-WebGL SVG fallback
 * share identical geometry.
 */

export type TopologyNode = {
  id: string;
  /** "entry" | "zone" | "service" | "leaf" */
  tier: "entry" | "zone" | "service" | "leaf";
  x: number;
  y: number;
  z: number;
  /** Relative visual weight. */
  scale: number;
};

export type TopologyEdge = {
  from: number;
  to: number;
  /** Edge length is used to offset pulse travel speed. */
  weight: number;
};

/** Mulberry32 — tiny seeded PRNG so the layout is identical on server and client. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type TopologyOptions = {
  /** Trim the outer leaf ring on small screens. */
  density?: "full" | "reduced";
};

export function buildTopology(options: TopologyOptions = {}) {
  const reduced = options.density === "reduced";
  const rand = rng(20260401);

  const nodes: TopologyNode[] = [];
  const edges: TopologyEdge[] = [];

  // Tier 0 — the single entry point.
  nodes.push({ id: "entry", tier: "entry", x: 0, y: 0, z: 0, scale: 1.5 });

  // Tier 1 — three availability zones, tilted so the mesh reads in 3D.
  const zoneCount = 3;
  for (let i = 0; i < zoneCount; i += 1) {
    const angle = (i / zoneCount) * Math.PI * 2 + 0.35;
    const radius = 2.35;
    nodes.push({
      id: `az-${i + 1}`,
      tier: "zone",
      x: Math.cos(angle) * radius,
      y: (i - 1) * 0.62,
      z: Math.sin(angle) * radius * 0.52,
      scale: 1.05,
    });
    edges.push({ from: 0, to: nodes.length - 1, weight: 1 });
  }

  // Tier 2 — services inside each zone.
  const servicesPerZone = reduced ? 2 : 3;
  const zoneIndices: number[] = [];
  for (let i = 1; i <= zoneCount; i += 1) zoneIndices.push(i);

  for (const zi of zoneIndices) {
    const zone = nodes[zi];
    for (let s = 0; s < servicesPerZone; s += 1) {
      const spread = (s - (servicesPerZone - 1) / 2) * 0.78;
      const angle = Math.atan2(zone.z, zone.x) + (rand() - 0.5) * 0.5;
      const radius = 1.42 + rand() * 0.5;
      nodes.push({
        id: `svc-${zi}-${s}`,
        tier: "service",
        x: zone.x + Math.cos(angle) * radius + spread * 0.34,
        y: zone.y + spread,
        z: zone.z + Math.sin(angle) * radius * 0.6,
        scale: 0.72,
      });
      edges.push({ from: zi, to: nodes.length - 1, weight: 0.7 });
    }
  }

  // Tier 3 — leaf requests.
  const leaves = reduced ? 7 : 14;
  for (let i = 0; i < leaves; i += 1) {
    const angle = (i / leaves) * Math.PI * 2 + rand() * 0.4;
    const radius = 4.1 + rand() * 0.75;
    nodes.push({
      id: `leaf-${i}`,
      tier: "leaf",
      x: Math.cos(angle) * radius,
      y: (rand() - 0.5) * 2.5,
      z: Math.sin(angle) * radius * 0.5,
      scale: 0.5,
    });
    // Each leaf attaches to the nearest service node, which keeps the mesh
    // connected without drawing a full 14 × services crossbar.
    let nearest = -1;
    let nearestDist = Infinity;
    for (let j = zoneIndices.length + 1; j < nodes.length - 1; j += 1) {
      const dx = nodes[j].x - nodes[nodes.length - 1].x;
      const dz = nodes[j].z - nodes[nodes.length - 1].z;
      const dy = (nodes[j].y - nodes[nodes.length - 1].y) * 1.6;
      const d = dx * dx + dz * dz + dy * dy;
      if (d < nearestDist) {
        nearestDist = d;
        nearest = j;
      }
    }
    if (nearest > 0) edges.push({ from: nearest, to: nodes.length - 1, weight: 0.35 });
  }

  return { nodes, edges };
}