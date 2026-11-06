import { PROFILE } from "@/data/portfolio";
import { parseContributions } from "./parseContributions";

// GitHub's profile graph is the only source that matches what the profile shows
// (private contributions if enabled, org repos, PRs, issues, reviews).
// It has no CORS headers, so it is read here on the server and cached for an hour.
export const revalidate = 3600;

export async function GET() {
  const user = PROFILE.githubUsername;
  const headers: HeadersInit = { "User-Agent": "portfolio-site" };

  const res = await fetch(`https://github.com/users/${user}/contributions`, {
    headers,
    next: { revalidate },
  });
  if (!res.ok) {
    return Response.json(
      { error: `GitHub contribution graph returned ${res.status}.` },
      { status: 502 },
    );
  }
  const days = parseContributions(await res.text());
  if (Object.keys(days).length === 0) {
    return Response.json(
      { error: "GitHub changed its contribution graph format; the parser found no days." },
      { status: 502 },
    );
  }
  const total = Object.values(days).reduce((a, b) => a + b, 0);

  // Profile stats are optional: a rate-limited API still leaves the graph intact.
  // GITHUB_TOKEN is server-only, so it never reaches the browser.
  const token = process.env.GITHUB_TOKEN;
  const pr = await fetch(`https://api.github.com/users/${user}`, {
    headers: token ? { ...headers, Authorization: `Bearer ${token}` } : headers,
    next: { revalidate },
  });
  const profile = pr.ok ? await pr.json() : null;

  return Response.json({
    profile: profile && {
      login: profile.login,
      html_url: profile.html_url,
      public_repos: profile.public_repos,
      followers: profile.followers,
    },
    days,
    total,
  });
}
