import { Section } from "@/components/section";
import { stackGroups } from "@/lib/data";

export function Stack() {
  return (
    <Section
      id="stack"
      label="Stack"
      title="The tools behind the work"
      lede="Grouped by the job each one does rather than listed as an undifferentiated wall of logos. Everything here is something I have actually used in a project."
    >
      <dl className="grid gap-px border border-line bg-line pb-16 sm:grid-cols-2 sm:pb-20">
        {stackGroups.map((group) => (
          <div key={group.group} className="bg-ink px-6 py-6 sm:px-7 sm:py-7">
            <dt className="datum text-amber">{group.group}</dt>
            <dd>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[0.8125rem] leading-tight text-text-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}