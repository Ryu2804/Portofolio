"use client";

import { Fragment, useMemo } from "react";
import {
  TIMETABLE_WEEKS,
  buildTimetable,
  commitLevel,
  type GithubProfile,
} from "@/hooks/useGithub";

interface GithubTimetableProps {
  username: string;
  profile: GithubProfile | null;
  commitsByDay: Record<string, number>;
  totalCommits: number;
  loading: boolean;
  error: string | null;
  rateLimited: boolean;
  onRetry: () => void;
}

const DAY_NAMES = ["", "Mon", "", "Wed", "", "Fri", ""];

export function GithubTimetable({
  username,
  profile,
  commitsByDay,
  totalCommits,
  loading,
  error,
  rateLimited,
  onRetry,
}: GithubTimetableProps) {
  const cols = useMemo(() => buildTimetable(commitsByDay), [commitsByDay]);

  // Kena rate limit → sembunyikan total, jangan tampilkan error
  if (rateLimited) return null;

  if (!username) {
    return (
      <div className="rounded-lg border-2 border-dashed border-outline bg-surface-container-low p-5 text-center shadow-[4px_4px_0px_#1f1c0d]">
        <span
          className="material-symbols-outlined text-[32px] text-secondary"
          aria-hidden="true"
        >
          insert_coin
        </span>
        <p className="font-label mt-2 text-[13px] font-bold uppercase tracking-[0.08em] text-on-surface">
          Insert GitHub username
        </p>
        <p className="font-body mt-2 text-xs leading-relaxed text-on-surface-variant">
          Isi <code>githubUsername</code> di <code>data/portfolio.ts</code>{" "}
          untuk menampilkan statistik & timetable commit asli.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-inverse-surface p-4 text-inverse-on-surface shadow-[4px_4px_0px_#000]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[20px] text-tertiary-fixed"
            aria-hidden="true"
          >
            history
          </span>
          <span className="font-display text-base font-semibold uppercase tracking-wider">
            GitHub Timetable
          </span>
        </div>
        {profile && (
          <a
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 font-label text-[11px] font-bold uppercase tracking-[0.1em] text-tertiary-fixed hover:underline"
          >
            <span>@{profile.login}</span>
            <span
              className="material-symbols-outlined text-[14px]"
              aria-hidden="true"
            >
              open_in_new
            </span>
          </a>
        )}
      </div>

      {loading ? (
        <div aria-live="polite">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded bg-white/10"
              />
            ))}
          </div>
          <div className="mt-3 h-28 animate-pulse rounded bg-white/10" />
          <p className="font-label mt-3 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-inverse-on-surface/70">
            Loading player data...
          </p>
        </div>
      ) : error ? (
        <div className="rounded bg-error-container p-4 text-center">
          <p className="font-body text-xs leading-relaxed text-on-error-container">
            {error}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="font-label mt-3 rounded bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-on-primary shadow-[2px_2px_0px_#000] transition-all hover:bg-secondary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Coba lagi
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Repos", value: profile?.public_repos ?? "–" },
              { label: "Followers", value: profile?.followers ?? "–" },
              { label: "Commits", value: totalCommits },
            ].map((chip) => (
              <div
                key={chip.label}
                className="rounded bg-white/10 p-2 text-center"
              >
                <div className="font-display text-xl font-bold text-tertiary-fixed">
                  {chip.value}
                </div>
                <div className="font-label text-[10px] font-bold uppercase tracking-[0.1em] text-inverse-on-surface/70">
                  {chip.label}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-3 grid w-full gap-[3px]"
            style={{
              gridTemplateColumns: `2.25rem repeat(${cols.length}, minmax(0, 1fr))`,
            }}
            role="img"
            aria-label={`Timetable commit ${TIMETABLE_WEEKS} minggu terakhir, total ${totalCommits} commit`}
          >
            <div aria-hidden="true" />
            {cols.map((col, i) => {
              const show =
                i === 0 || col[0]?.month !== cols[i - 1]?.[0]?.month;
              return (
                <div
                  key={`m-${i}`}
                  aria-hidden="true"
                  className="overflow-visible font-label text-[11px] leading-4 whitespace-nowrap text-inverse-on-surface/70"
                >
                  {show ? col[0]?.month : ""}
                </div>
              );
            })}
            {[0, 1, 2, 3, 4, 5, 6].map((r) => (
              <Fragment key={`r-${r}`}>
                <div
                  aria-hidden="true"
                  className="flex items-center font-label text-[10px] leading-none text-inverse-on-surface/70"
                >
                  {DAY_NAMES[r] ?? ""}
                </div>
                {cols.map((col) => {
                  const cell = col[r];
                  if (!cell) return null;
                  return (
                    <div
                      key={cell.key}
                      title={
                        cell.count === null
                          ? "Belum terjadi"
                          : `${cell.count} commit • ${cell.label}`
                      }
                      className="aspect-square w-full rounded-[3px]"
                      style={{ backgroundColor: commitLevel(cell.count) }}
                    />
                  );
                })}
              </Fragment>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-end gap-1">
            <span className="font-label mr-1 text-[10px] uppercase text-inverse-on-surface/70">
              Less
            </span>
            {[0, 1, 3, 6, 10].map((v) => (
              <div
                key={v}
                className="h-3 w-3 rounded-[3px]"
                style={{ backgroundColor: commitLevel(v) }}
                aria-hidden="true"
              />
            ))}
            <span className="font-label ml-1 text-[10px] uppercase text-inverse-on-surface/70">
              More
            </span>
          </div>
        </>
      )}

      <p className="font-label mt-3 border-t border-white/10 pt-2 text-center text-[10px] uppercase tracking-[0.1em] text-inverse-on-surface/50">
        Recent public pushes • {TIMETABLE_WEEKS} minggu terakhir
      </p>
    </div>
  );
}
