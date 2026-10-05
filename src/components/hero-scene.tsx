"use client";

import { AdaptiveDpr } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { useElementVisible, useRichPointer } from "@/lib/hooks";
import { buildTopology } from "@/lib/topology";

const AMBER = new THREE.Color("#f5a03c");
const GLACIER = new THREE.Color("#74b6d6");
const LINE = new THREE.Color("#1e3a49");

/** Traffic pulse riding a single edge. */
function usePulses(
  edges: { from: number; to: number; weight: number }[],
  positions: THREE.Vector3[],
  reduced: boolean,
) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  // Each pulse gets its own phase and speed so the mesh never pulses in lockstep.
  const phases = useMemo(
    () =>
      edges.map((e, i) => ({
        offset: (i * 0.37) % 1,
        speed: 0.11 + e.weight * 0.13,
        from: new THREE.Color().lerpColors(AMBER, GLACIER, Math.min(1, e.weight)),
      })),
    [edges],
  );

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;

    if (reduced) {
      // Draw one representative pose so the scene is composed, then stop moving.
      const t = 0.5;
      for (let i = 0; i < edges.length; i += 1) {
        dummy.position.lerpVectors(positions[edges[i].from], positions[edges[i].to], t);
        dummy.scale.setScalar(0.9);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, color.setRGB(0, 0, 0));
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      return;
    }

    const time = clock.getElapsedTime();
    for (let i = 0; i < edges.length; i += 1) {
      const { offset, speed, from } = phases[i];
      const t = (time * speed + offset) % 1;
      const eased = t * t * (3 - 2 * t);
      dummy.position.lerpVectors(positions[edges[i].from], positions[edges[i].to], eased);
      const envelope = Math.sin(t * Math.PI);
      dummy.scale.setScalar(0.45 + envelope * 0.85);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.copy(from).multiplyScalar(0.35 + envelope * 0.65));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return ref;
}

function Mesh({ reduced, density }: { reduced: boolean; density: "full" | "reduced" }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { nodes, edges, positions, linePositions, lineColors, nodeMatrices, nodeColors } =
    useMemo(() => {
      const topology = buildTopology({ density });
      const pos = topology.nodes.map((n) => new THREE.Vector3(n.x, n.y, n.z));

      const lines = new Float32Array(topology.edges.length * 6);
      const lineCols = new Float32Array(topology.edges.length * 6);
      topology.edges.forEach((e, i) => {
        const a = pos[e.from];
        const b = pos[e.to];
        lines.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
        const c = LINE.clone().multiplyScalar(0.4 + e.weight * 0.9);
        lineCols.set([c.r, c.g, c.b, c.r, c.g, c.b], i * 6);
      });

      const dummy = new THREE.Object3D();
      const mats = topology.nodes.map((n, i) => {
        dummy.position.copy(pos[i]);
        dummy.scale.setScalar(n.scale * 0.075);
        dummy.updateMatrix();
        return dummy.matrix.clone();
      });

      const cols = topology.nodes.map((n) =>
        n.tier === "leaf"
          ? new THREE.Color("#2f5468")
          : n.tier === "service"
            ? GLACIER
            : AMBER,
      );

      return {
        nodes: topology.nodes,
        edges: topology.edges,
        positions: pos,
        linePositions: lines,
        lineColors: lineCols,
        nodeMatrices: mats,
        nodeColors: cols,
      };
    }, [density]);

  const pulseRef = usePulses(edges, positions, reduced);
  const nodeRef = useRef<THREE.InstancedMesh>(null);

  // Pointer parallax — damped, and only ever a few degrees of drift.
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useEffect(() => {
    const mesh = nodeRef.current;
    if (!mesh) return;
    nodeMatrices.forEach((m, i) => mesh.setMatrixAt(i, m));
    nodeColors.forEach((c, i) => mesh.setColorAt(i, c));
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [nodeMatrices, nodeColors]);

  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (!g) return;

    if (!reduced) {
      // Very slow drift: ~50s per revolution.
      g.rotation.y += delta * 0.125;
      const targetY = pointer.current.y * 0.16;
      const targetX = -pointer.current.y * 0.1;
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);
      g.rotation.z = THREE.MathUtils.damp(g.rotation.z, targetY * 0.12, 3, delta);
      g.position.x = THREE.MathUtils.damp(g.position.x, pointer.current.x * 0.28, 3, delta);
      g.position.y = THREE.MathUtils.damp(g.position.y, -pointer.current.y * 0.18, 3, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.12, 3, delta);
    }

    if (core.current) {
      const pulse = reduced ? 1 : 1 + Math.sin(clock.getElapsedTime() * 0.9) * 0.08;
      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} />
      </lineSegments>

      <instancedMesh ref={nodeRef} args={[undefined, undefined, nodes.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial vertexColors transparent opacity={0.95} blending={THREE.AdditiveBlending} />
      </instancedMesh>

      {/* The entry point gets its own solid core so the eye has an anchor. */}
      <mesh ref={core} position={[0, 0, 0]}>
        <sphereGeometry args={[0.115, 20, 20]} />
        <meshBasicMaterial color="#ffd9a8" transparent opacity={0.95} blending={THREE.AdditiveBlending} />
      </mesh>

      <instancedMesh ref={pulseRef} args={[undefined, undefined, edges.length]} frustumCulled={false}>
        <sphereGeometry args={[0.032, 8, 8]} />
        <meshBasicMaterial vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} />
      </instancedMesh>
    </group>
  );
}

function supportsWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext && canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }),
    );
  } catch {
    return false;
  }
}

export default function HeroScene() {
  // Resolved during the first client render rather than in an effect: this
  // component loads with ssr:false, and the server-side value is a safe `false`.
  const [ready] = useState(supportsWebGL);
  const richPointer = useRichPointer();
  const { ref, visible } = useElementVisible<HTMLDivElement>(ready);

  if (!ready) return null;

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={visible ? "always" : "demand"}
        camera={{ position: [0, 0, 9.6], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        onCreated={({ invalidate }) => invalidate()}
      >
        <AdaptiveDpr />
        <fog attach="fog" args={["#04070a", 9, 20]} />
        <ambientLight intensity={0.6} />
        <Mesh reduced={false} density={richPointer ? "full" : "reduced"} />
      </Canvas>
    </div>
  );
}