import { useCallback, useEffect, useState } from "react";

export interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface DayCell {
  key: string;
  label: string;
  month: string;
  /** null = hari di masa depan (belum terjadi) */
  count: number | null;
}

export interface GithubState {
  profile: GithubProfile | null;
  commitsByDay: Record<string, number>;
  totalCommits: number;
  loading: boolean;
  error: string | null;
  rateLimited: boolean;
  retry: () => void;
}

export const TIMETABLE_WEEKS = 26;
const MAX_PAGES = 3;
const MAX_REPOS = 12;
const REPO_CONCURRENCY = 4;
// Cache di localStorage supaya tidak menghantam rate limit (60 req/jam tanpa token)
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const cacheKey = (u: string) => `github-timetable:${u}`;

interface CachePayload {
  savedAt: number;
  profile: GithubProfile;
  commitsByDay: Record<string, number>;
  totalCommits: number;
}

function readCache(username: string): CachePayload | null {
  try {
    const raw = localStorage.getItem(cacheKey(username));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachePayload;
    if (!parsed || Date.now() - parsed.savedAt > CACHE_TTL_MS) return null;
    if (!parsed.profile) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(username: string, payload: CachePayload) {
  try {
    localStorage.setItem(cacheKey(username), JSON.stringify(payload));
  } catch {
    // storage penuh / mode privat — abaikan
  }
}

function dayKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Skala warna hijau GitHub (mode gelap) untuk aktivitas recent. */
export function commitLevel(count: number | null): string {
  if (count === null) return "rgba(248,240,217,0.06)";
  if (count === 0) return "rgba(248,240,217,0.14)";
  if (count <= 2) return "#0e4429";
  if (count <= 5) return "#006d32";
  if (count <= 9) return "#26a641";
  return "#39d353";
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
        label: cursor.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        month: cursor.toLocaleDateString("id-ID", { month: "short" }),
        count: future ? null : (byDay[key] ?? 0),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    cols.push(col);
  }
  return cols;
}

/**
 * Ambil data GitHub publik tanpa token:
 * profil + agregat commit PushEvent 26 minggu terakhir.
 */
export function useGithub(username: string): GithubState {
  // Nilai awal SELALU konsisten server vs client (null) supaya tidak
  // hydration mismatch — cache localStorage hanya dibaca di dalam effect.
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [commitsByDay, setCommitsByDay] = useState<Record<string, number>>({});
  const [totalCommits, setTotalCommits] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    try {
      localStorage.removeItem(cacheKey(username));
    } catch {
      // abaikan
    }
    setAttempt((a) => a + 1);
  }, [username]);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    async function run() {
      // Cache masih segar → pakai langsung tanpa fetch
      const cached = readCache(username);
      if (cached) {
        if (!cancelled) {
          setProfile(cached.profile);
          setCommitsByDay(cached.commitsByDay);
          setTotalCommits(cached.totalCommits);
        }
        return;
      }
      setLoading(true);
      setError(null);
      setRateLimited(false);
      try {
        // Token opsional (baca repo privat milik sendiri):
        // buat file .env.local berisi NEXT_PUBLIC_GITHUB_TOKEN=ghp_xxx lalu rebuild.
        const headers: HeadersInit = {};
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(`https://api.github.com/users/${username}`, {
          headers,
        });
        if (res.status === 404)
          throw new Error(`Username "${username}" tidak ditemukan di GitHub.`);
        if (res.status === 403) {
          if (!cancelled) setRateLimited(true);
          throw new Error(
            "Limit API GitHub habis — isi NEXT_PUBLIC_GITHUB_TOKEN di .env.local atau coba lagi nanti.",
          );
        }
        if (!res.ok) throw new Error(`GitHub API error (${res.status}).`);
        const p = (await res.json()) as GithubProfile;

        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - TIMETABLE_WEEKS * 7);
        const sinceISO = cutoff.toISOString();

        // Dedup berdasarkan SHA karena satu commit bisa muncul
        // di beberapa sumber (repo fetch + events).
        const seen = new Set<string>();
        const byDay: Record<string, number> = {};
        let total = 0;
        const addCommit = (sha: string | undefined, dateStr?: string) => {
          if (!sha || seen.has(sha)) return;
          const d = dateStr ? new Date(dateStr) : null;
          if (!d || Number.isNaN(d.getTime()) || d < cutoff) return;
          seen.add(sha);
          const key = dayKey(d);
          byDay[key] = (byDay[key] ?? 0) + 1;
          total += 1;
        };

        // 1. Commit asli per repo milik sendiri (tidak dibatasi 90 hari
        //    seperti events API) — repo non-fork yang terakhir di-push.
        try {
          const rr = await fetch(
            `https://api.github.com/users/${username}/repos?type=owner&sort=pushed&direction=desc&per_page=100`,
            { headers },
          );
          if (rr.status === 403 && !cancelled) setRateLimited(true);
          if (rr.ok) {
            const repos = (await rr.json()) as Array<{
              name: string;
              fork: boolean;
              pushed_at: string;
            }>;
            // Hanya repo yang aktif dalam jendela waktu — hemat request
            const targets = (Array.isArray(repos) ? repos : [])
              .filter((r) => !r.fork && r.pushed_at >= sinceISO)
              .slice(0, MAX_REPOS);
            for (let i = 0; i < targets.length; i += REPO_CONCURRENCY) {
              const batch = targets.slice(i, i + REPO_CONCURRENCY);
              await Promise.all(
                batch.map(async (repo) => {
                  try {
                    for (let page = 1; page <= MAX_PAGES; page++) {
                      const cr = await fetch(
                        `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&since=${sinceISO}&per_page=100&page=${page}`,
                        { headers },
                      );
                      if (cr.status === 403) {
                        if (!cancelled) setRateLimited(true);
                        break;
                      }
                      if (!cr.ok) break;
                      const commits = (await cr.json()) as Array<{
                        sha: string;
                        commit?: { author?: { date?: string } };
                      }>;
                      if (!Array.isArray(commits) || commits.length === 0)
                        break;
                      for (const c of commits)
                        addCommit(c.sha, c.commit?.author?.date);
                      if (commits.length < 100) break;
                    }
                  } catch {
                    // repo kosong/privat tanpa token — lewati
                  }
                }),
              );
            }
          }
        } catch {
          // lanjut ke events API sebagai cadangan
        }

        // 2. Events publik — menangkap push ke repo orang lain / organisasi.
        for (let page = 1; page <= MAX_PAGES; page++) {
          let events: unknown = null;
          try {
            const er = await fetch(
              `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`,
              { headers },
            );
            if (!er.ok) {
              if (er.status === 403 && !cancelled) setRateLimited(true);
              break;
            }
            events = await er.json();
          } catch {
            break;
          }
          const list = events as Array<{
            type: string;
            created_at: string;
            payload?: { commits?: Array<{ sha: string }> };
          }>;
          if (!Array.isArray(list) || list.length === 0) break;
          for (const ev of list) {
            if (ev.type !== "PushEvent") continue;
            for (const c of ev.payload?.commits ?? [])
              addCommit(c.sha, ev.created_at);
          }
          if (list.length < 100) break;
        }

        if (!cancelled) {
          setProfile(p);
          setCommitsByDay(byDay);
          setTotalCommits(total);
          writeCache(username, {
            savedAt: Date.now(),
            profile: p,
            commitsByDay: byDay,
            totalCommits: total,
          });
        }
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Gagal memuat data GitHub.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [username, attempt]);

  return { profile, commitsByDay, totalCommits, loading, error, rateLimited, retry };
}
