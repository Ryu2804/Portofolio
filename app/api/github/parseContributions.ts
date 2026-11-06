// Reads GitHub's public contributions calendar HTML
// (https://github.com/users/<name>/contributions). Each day is a <td> with
// data-date and an id; its count lives in the <tool-tip for="<id>"> text.
const DAY = /<td\b[^>]*>/g;
const TIP = /<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g;

/** Parse `{ "2026-11-05": 3, ... }` from the contributions calendar HTML. */
export function parseContributions(html: string): Record<string, number> {
  const dateById: Record<string, string> = {};
  for (const [td] of html.matchAll(DAY)) {
    const date = /data-date="([\d-]+)"/.exec(td)?.[1];
    const id = /\bid="([^"]+)"/.exec(td)?.[1];
    if (date && id) dateById[id] = date;
  }
  const days: Record<string, number> = {};
  for (const [, id, text] of html.matchAll(TIP)) {
    const date = id ? dateById[id] : undefined;
    if (!date) continue;
    // "No contributions on …" | "1 contribution on …" | "1,234 contributions on …"
    const n = /^([\d,]+) contributions?/.exec(text ?? "")?.[1];
    days[date] = n ? Number(n.replaceAll(",", "")) : 0;
  }
  return days;
}
