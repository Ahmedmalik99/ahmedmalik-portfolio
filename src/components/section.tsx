type SectionProps = {
  id: string;
  /** Short technical label that sits in the left rail. */
  label: string;
  title: string;
  /** Optional supporting sentence rendered under the title. */
  lede?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Section shell: a hairline top rule, a left-rail label and a title that stays
 * on a fixed measure. The rail gives every section the same structural rhythm
 * without resorting to decorative numbering.
 */
export function Section({ id, label, title, lede, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-line ${className}`}>
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <header className="flex flex-col gap-3 pt-14 pb-8 sm:flex-row sm:items-baseline sm:gap-8 sm:pt-20 sm:pb-10">
          <p className="datum w-28 shrink-0">{label}</p>
          <div className="min-w-0">
            <h2 className="font-display text-[1.75rem] leading-[1.1] text-text sm:text-[2.125rem]">
              {title}
            </h2>
            {lede ? (
              <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-text-2">{lede}</p>
            ) : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}

/** Small monospace chip used for technologies. */
export function Tag({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "amber" | "glacier" }) {
  const tones = {
    default: "border-line text-text-2",
    amber: "border-amber/35 text-amber/90",
    glacier: "border-glacier/35 text-glacier/90",
  } as const;
  return (
    <span
      className={`inline-flex items-center border px-2 py-[3px] font-mono text-[0.6875rem] leading-none tracking-[0.04em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Full-width hairline used to separate stacked blocks inside a section. */
export function Rule({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-line ${className}`} aria-hidden />;
}