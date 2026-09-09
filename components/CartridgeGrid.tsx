"use client";

import { useMemo, useState } from "react";
import { FILTERS, PROJECTS, type Filter } from "@/data/portfolio";
import { CartridgeCard } from "./CartridgeCard";
import { Reveal } from "./Reveal";

export function CartridgeGrid() {
  const [filter, setFilter] = useState<Filter>("ALL");

  const visible = useMemo(
    () =>
      filter === "ALL"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === filter),
    [filter],
  );

  const countLabel =
    filter === "ALL"
      ? `ALL (${String(PROJECTS.length).padStart(2, "0")})`
      : filter;

  return (
    <section
      id="cartridges"
      className="flex min-h-svh w-full scroll-mt-20 flex-col justify-center px-4 py-10 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
      <Reveal>
      <div className="mb-8 flex flex-col justify-between gap-3 rounded-lg bg-surface-container-high p-4 pb-4 shadow-[3px_3px_0px_#1f1c0d] md:flex-row md:items-end">
        <div>
          <div className="font-label mb-1 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-primary">
            <span
              className="material-symbols-outlined text-[18px]"
              aria-hidden="true"
            >
              videogame_asset
            </span>
            <span>Select mission // Stage catalog</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-on-surface uppercase">
            Cartridge archives
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
            Filter by mission:
          </span>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={
                filter === f
                  ? "rounded bg-primary px-2 py-1 font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-primary shadow-[1px_1px_0px_#1f1c0d]"
                  : "rounded bg-surface-container px-2 py-1 font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface hover:bg-surface-container-highest"
              }
            >
              {f === "ALL" ? countLabel : f}
            </button>
          ))}
        </div>
      </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {visible.map((project, i) => (
          <Reveal key={project.id} delay={(i % 2) * 120} className="h-full">
            <CartridgeCard project={project} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-6 rounded bg-surface-container p-4 text-center font-body text-sm text-on-surface-variant">
          No cartridges found for this mission. Insert another coin.
        </p>
      )}
      </div>
    </section>
  );
}
