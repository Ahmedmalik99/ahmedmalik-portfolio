"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep the detail in the console for whoever is debugging; the page stays calm.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-[84rem] flex-col justify-center px-5 py-28 sm:px-8">
      <p className="datum text-amber">Error 500</p>
      <h1 className="mt-6 max-w-[20ch] font-display text-[clamp(2rem,6vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-text">
        Something failed to render.
      </h1>
      <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-text-2">
        This is a bug on the site, not something you did. Reloading usually clears it.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center bg-amber px-6 font-mono text-xs font-medium tracking-[0.06em] text-ink transition-colors hover:bg-amber/90"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-11 items-center border border-line px-6 font-mono text-xs tracking-[0.06em] text-text transition-colors hover:border-amber/60 hover:text-amber"
        >
          Back to the start
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-8 font-mono text-[0.6875rem] tracking-[0.06em] text-text-3">
          Reference {error.digest}
        </p>
      ) : null}
    </div>
  );
}