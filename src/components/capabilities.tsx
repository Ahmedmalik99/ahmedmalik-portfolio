import { Section, Tag } from "@/components/section";
import { pillars } from "@/lib/data";

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      label="Capabilities"
      title="Infrastructure first, AI applied to it"
      lede="Cloud and Linux are the foundation I build on. The AI work runs on top of that foundation rather than sitting beside it as a separate career."
    >
      <ul className="grid gap-px border border-line bg-line pb-16 sm:pb-20 lg:grid-cols-2">
        {pillars.map((pillar) => (
          <li key={pillar.id} className="bg-ink">
            <div className="flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-baseline gap-3">
                <span className="datum text-amber">{pillar.tag}</span>
              </div>
              <h3 className="mt-3 font-display text-xl leading-snug tracking-[-0.025em] text-text">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-2">{pillar.summary}</p>

              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {pillar.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-text-2">
                    <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-line" />
                    {point}
                  </li>
                ))}
              </ul>

              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {pillar.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}