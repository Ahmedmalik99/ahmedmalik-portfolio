import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-[84rem] flex-col justify-center px-5 py-28 sm:px-8">
      <p className="datum text-amber">Error 404</p>
      <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2rem,6vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-text">
        That page does not exist.
      </h1>
      <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-text-2">
        The address may be mistyped, or a project may have moved. Everything published is listed in
        the work index.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/"
          className="inline-flex h-11 items-center bg-amber px-6 font-mono text-xs font-medium tracking-[0.06em] text-ink transition-colors hover:bg-amber/90"
        >
          Back to the start
        </Link>
        <Link
          href="/work"
          className="inline-flex h-11 items-center border border-line px-6 font-mono text-xs tracking-[0.06em] text-text transition-colors hover:border-amber/60 hover:text-amber"
        >
          See the work
        </Link>
      </div>
    </div>
  );
}