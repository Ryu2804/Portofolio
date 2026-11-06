import { useCallback, useEffect, useState } from "react";

export interface GithubProfile {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
}

export interface DayCell {
  key: string;
  label: string;
  month: string;
  /** null = a future day */
  count: number | null;
}

export interface GithubState {
  profile: GithubProfile | null;
  commitsByDay: Record<string, number>;
  totalCommits: number;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

// a full year, matching the graph on the GitHub profile
export const TIMETABLE_WEEKS = 52;

function dayKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Lantern ramp on the ink panel: dim ember to bright lacquer. */
export function commitLevel(count: number | null): string {
  if (count === null) return "rgba(245,235,221,0.05)";
  if (count === 0) return "rgba(245,235,221,0.14)";
  if (count <= 2) return "#7d4c42";
  if (count <= 5) return "#b65f4b";
  if (count <= 9) return "#f2765e";
  return "#f7a592";
}

/** Bangun kolom mingguan (7 hari, mulai Minggu) ala contribution graph. */
export function buildTimetable(
  byDay: Record<string, number>,
  weeks = TIMETABLE_WEEKS,
): DayCell[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = today.getTime();

  const start = new Date(today);
  start.setDate(start.getDate() - (weeks * 7 - 1));
  start.setDate(start.getDate() - start.getDay()); // mundur ke hari Minggu

  const cols: DayCell[][] = [];
  const cursor = new Date(start);
  while (cursor.getTime() <= end) {
    const col: DayCell[] = [];
    for (let r = 0; r < 7; r++) {
      const future = cursor.getTime() > end;
      const key = dayKey(cursor);
      col.push({
        key,
        label: cursor.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        month: cursor.toLocaleDateString("en-GB", { month: "short" }),
        count: future ? null : (byDay[key] ?? 0),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    cols.push(col);
  }
  return cols;
}

/** Contribution graph + profile stats from our cached /api/github route. */
export function useGithub(): GithubState {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [commitsByDay, setCommitsByDay] = useState<Record<string, number>>({});
  const [totalCommits, setTotalCommits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setLoading(true);
    setError(null);
    setAttempt((a) => a + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? `GitHub data failed to load (${res.status}).`);
        if (cancelled) return;
        setProfile(data.profile);
        setCommitsByDay(data.days);
        setTotalCommits(data.total);
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "GitHub data failed to load.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  return { profile, commitsByDay, totalCommits, loading, error, retry };
}
