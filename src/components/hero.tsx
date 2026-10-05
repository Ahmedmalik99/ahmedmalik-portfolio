"use client";

import dynamic from "next/dynamic";

import { HeroMeshFallback } from "@/components/hero-mesh-fallback";
import { metrics, profile } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/hooks";

// three + R3F are only pulled in for the hero, after hydration, so the initial
// HTML and CSS payload stay small.
const HeroScene = dynamic(() => import("@/components/hero-scene"), { ssr: false });

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-line" aria-labelledby="hero-title">
      {/* Substrate: grid plane, amber horizon wash, grain */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-plane absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(120%_80%_at_70%_20%,#000_20%,transparent_75%)]" />
        <div className="absolute -top-1/3 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-amber)_16%,transparent)_0%,transparent_62%)] blur-[2px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
        <div className="grain absolute inset-0" />
      </div>

      {/* 3D layer: the static mesh is the base, the canvas layers over it.
          With no WebGL — or with reduced motion — the SVG is all that shows. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-y-0 right-[-8%] w-[112%] sm:right-[-4%] sm:w-[88%] lg:right-0 lg:w-[62%]">
          <HeroMeshFallback reduced={reduced} />
          {!reduced ? <HeroScene /> : null}
        </div>
      </div>

      <div className="relative mx-auto max-w-[84rem] px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28">
        <div className="max-w-[46rem]">
          {/* Status line — factual, not decorative */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="datum text-amber">{profile.role}</p>
            <span className="hidden h-3 w-px bg-line sm:block" aria-hidden />
            <p className="datum">
              {profile.location} <span className="text-line-soft">/</span> {profile.timezone}
            </p>
          </div>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.5rem,9vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-text"
          >
            Ahmed Malik
          </h1>

          <p className="measure mt-6 text-lg leading-relaxed text-text-2 sm:text-xl sm:leading-[1.6]">
            {profile.headline}
          </p>

          {/* Primary lane stated plainly, so the AI work reads as part of one profile */}
          <dl className="mt-9 grid max-w-lg grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="border-l border-line pl-4">
              <dt className="datum">Primary</dt>
              <dd className="mt-1.5 text-sm text-text-2">
                Cloud infrastructure · Linux · automation
              </dd>
            </div>
            <div className="border-l border-line pl-4">
              <dt className="datum">Also builds</dt>
              <dd className="mt-1.5 text-sm text-text-2">
                LLM + RAG systems · computer vision · Python services
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#work"
              className="group inline-flex h-11 items-center justify-center gap-2.5 bg-amber px-6 font-mono text-xs font-medium tracking-[0.06em] text-ink transition-colors hover:bg-amber/90"
            >
              See the work
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 items-center justify-center gap-2.5 border border-line px-6 font-mono text-xs tracking-[0.06em] text-text transition-colors hover:border-amber/60 hover:text-amber"
            >
              Email me
            </a>
          </div>
        </div>

        {/* Verified figures — each traceable to a public source */}
        <dl className="mt-16 grid grid-cols-2 gap-px border border-line bg-line lg:mt-24 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-ink px-5 py-6">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <p className="font-display text-[1.75rem] leading-none tracking-[-0.03em] text-text">
                  {m.value}
                  <span className="ml-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-text-3">
                    {m.unit}
                  </span>
                </p>
                <p className="mt-3 text-[0.8125rem] leading-snug text-text-2">{m.label}</p>
                <p className="mt-2 font-mono text-[0.625rem] tracking-[0.08em] text-text-3/70 uppercase">
                  {m.source}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}