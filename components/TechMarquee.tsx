/* eslint-disable @next/next/no-img-element -- tiny local SVG logos */

// Logos: Simple Icons (CC0), saved in cream to public/stack/<slug>.svg
const FIELDS = [
  {
    field: "Machine Learning",
    tools: [
      { slug: "python", name: "Python" },
      { slug: "pytorch", name: "PyTorch" },
      { slug: "scikitlearn", name: "scikit-learn" },
      { slug: "opencv", name: "OpenCV" },
      { slug: "ultralytics", name: "YOLO" },
      { slug: "huggingface", name: "Hugging Face" },
    ],
  },
  {
    field: "Backend & Data",
    tools: [
      { slug: "go", name: "Go" },
      { slug: "fastapi", name: "FastAPI" },
      { slug: "postgresql", name: "PostgreSQL" },
    ],
  },
  {
    field: "DevOps",
    tools: [
      { slug: "docker", name: "Docker" },
      { slug: "githubactions", name: "GitHub Actions" },
    ],
  },
  {
    field: "Web",
    tools: [
      { slug: "typescript", name: "TypeScript" },
      { slug: "nextdotjs", name: "Next.js" },
    ],
  },
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {FIELDS.map((f) => (
        <li key={f.field} className="flex items-center">
          <ul className="flex items-center gap-10 md:gap-14" aria-label={hidden ? undefined : f.field}>
            {f.tools.map((t) => (
              <li key={t.slug} className="flex items-center gap-3 whitespace-nowrap md:gap-4">
                <img src={`/stack/${t.slug}.svg`} alt="" className="h-9 w-9 md:h-12 md:w-12" />
                <span className="font-body text-lg font-bold text-on-primary md:text-2xl">{t.name}</span>
              </li>
            ))}
          </ul>
          {/* lacquer dot between fields; also closes the row so the loop seam reads the same */}
          <span
            className="mx-10 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-on-surface bg-secondary md:mx-14 md:h-4 md:w-4"
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Tech stack ticker on the mountains' blue valley floor. Height matches the
 * floor exactly: 26 of the art's 100 rows of a max(300px, 31.25vw) box.
 */
export function TechMarquee() {
  return (
    <section
      aria-label="Tech stack"
      className="marquee relative flex h-[max(78px,8.125vw)] items-center overflow-hidden"
    >
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
