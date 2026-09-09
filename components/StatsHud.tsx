"use client";

import { PROFILE, SKILL_CATEGORIES } from "@/data/portfolio";
import { useGithub } from "@/hooks/useGithub";
import { Achievements } from "./Achievements";
import { ContactLinks } from "./ContactLinks";
import { GithubTimetable } from "./GithubTimetable";
import { ProfilePhoto } from "./ProfilePhoto";
import { Reveal } from "./Reveal";

export function StatsHud() {
  const { profile, commitsByDay, totalCommits, loading, error, rateLimited, retry } =
    useGithub(PROFILE.githubUsername);

  return (
    <section
      id="about"
      className="flex min-h-svh w-full scroll-mt-20 items-center px-4 py-10 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl rounded-xl bg-surface-container p-6 shadow-[6px_6px_0px_#1f1c0d] lg:p-8">
        <Reveal className="mb-8">
          <div className="font-label mb-1 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-primary">
            <span
              className="material-symbols-outlined text-[18px]"
              aria-hidden="true"
            >
              info
            </span>
            <span>Player file // Dossier</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface uppercase sm:text-4xl">
              About Me
            </h2>
            <div className="shrink-0 pt-1">
              <ContactLinks />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 flex-col items-start gap-2">
              <span className="w-fit shrink-0 rounded bg-secondary px-3 py-1 font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-secondary shadow-[2px_2px_0px_#1f1c0d]">
                Name
              </span>
              <span className="w-full flex-1 rounded bg-surface-container-low px-4 py-2 font-display text-lg font-semibold tracking-wide text-on-surface uppercase shadow-[2px_2px_0px_#1f1c0d]">
                {PROFILE.name}
              </span>
            </div>
            <div className="flex flex-1 flex-col items-start gap-2">
              <span className="w-fit shrink-0 rounded bg-secondary px-3 py-1 font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-secondary shadow-[2px_2px_0px_#1f1c0d]">
                Major
              </span>
              <span className="w-full flex-1 rounded bg-surface-container-low px-4 py-2 font-display text-lg font-semibold tracking-wide text-on-surface uppercase shadow-[2px_2px_0px_#1f1c0d]">
                {PROFILE.major}
              </span>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal className="h-full" delay={100}>
              <ProfilePhoto label={PROFILE.name} />
            </Reveal>
          </div>

          <div
            id="skills"
            className="flex scroll-mt-20 flex-col justify-start lg:col-span-7"
          >
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[22px] text-primary"
                  aria-hidden="true"
                >
                  inventory_2
                </span>
                <h4 className="font-display text-xl font-semibold text-on-surface uppercase">
                  Skill loadout
                </h4>
              </div>
              <div className="space-y-4">
                {SKILL_CATEGORIES.map((cat, i) => (
                  <Reveal key={cat.id} delay={i * 100}>
                  <div
                    className="rounded-lg bg-surface-container-low p-4 shadow-[3px_3px_0px_#1f1c0d]"
                  >
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded shadow-[2px_2px_0px_#1f1c0d] ${cat.accentClass}`}
                        >
                          <span
                            className="material-symbols-outlined text-[20px]"
                            aria-hidden="true"
                          >
                            {cat.icon}
                          </span>
                        </span>
                        <h5 className="font-display truncate text-lg font-semibold text-on-surface uppercase">
                          {cat.title}
                        </h5>
                      </div>
                      <span className="shrink-0 rounded bg-inverse-surface px-2 py-1 font-label text-[11px] font-bold uppercase tracking-[0.1em] text-tertiary-fixed">
                        {cat.level}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded bg-surface-container-high px-3 py-1 font-label text-[11px] font-bold uppercase tracking-[0.08em] text-on-surface shadow-[1px_1px_0px_#1f1c0d]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {!rateLimited && (
          <Reveal className="mt-8">
            <GithubTimetable
              username={PROFILE.githubUsername}
              profile={profile}
              commitsByDay={commitsByDay}
              totalCommits={totalCommits}
              loading={loading}
              error={error}
              rateLimited={rateLimited}
              onRetry={retry}
            />
          </Reveal>
        )}

        <Reveal className="mt-8" delay={100}>
          <Achievements />
        </Reveal>
      </div>
    </section>
  );
}
