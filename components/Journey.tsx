import {
  EDUCATION,
  ORGANIZATIONS,
  VOLUNTEERING,
  WORK,
  type TimelineEntry,
} from "@/data/portfolio";

function Track({ icon, title, entries }: { icon: string; title: string; entries: TimelineEntry[] }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-[22px] text-primary" aria-hidden="true">
          {icon}
        </span>
        <h4 className="font-display text-xl text-on-surface uppercase">{title}</h4>
      </div>
      {/* a real timeline: ink spine, lacquer diamond per stop */}
      <ol className="space-y-5 border-l-[3px] border-on-surface pl-5">
        {entries.map((e) => (
          <li key={e.id} className="relative">
            <span
              className="absolute top-1.5 -left-[29px] h-3.5 w-3.5 rotate-45 border-[3px] border-on-surface bg-secondary"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h5 className="font-body text-base font-bold text-on-surface">{e.org}</h5>
              <span className="font-body text-xs text-on-surface-variant">{e.period}</span>
            </div>
            <p className="font-body text-sm text-primary">{e.role}</p>
            <ul className="mt-2 max-w-prose list-disc space-y-1 pl-4 font-body text-sm leading-[22px] text-on-surface-variant">
              {e.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Work, organizations, volunteering and education from the CV, as dated timelines. */
export function Journey() {
  return (
    <div className="grid grid-cols-1 gap-8 rounded-lg bg-surface-container-low p-5 shadow-[3px_3px_0px_#413333] md:grid-cols-2 lg:p-6">
      <Track icon="work" title="Work" entries={WORK} />
      <Track icon="school" title="Education" entries={EDUCATION} />
      <Track icon="groups" title="Organizations" entries={ORGANIZATIONS} />
      <Track icon="volunteer_activism" title="Volunteering" entries={VOLUNTEERING} />
    </div>
  );
}
