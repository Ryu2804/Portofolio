"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ACHIEVEMENTS } from "@/data/portfolio";
import { Reveal } from "./Reveal";

const GAP_PX = 24; // gap-6 antar kartu
const SPEED_PX_PER_FRAME = 1.4;
const RESUME_DELAY_MS = 2500;

/** Slider horizontal retro — auto-scroll infinit, pause saat hover. */
export function Achievements() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const resumeAtRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const markFailed = (id: string) => {
    setFailedImages((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const el = trackRef.current;
      if (!el || document.hidden) return;
      if (hoveringRef.current) return;
      if (performance.now() < resumeAtRef.current) return;
      // Setengah scrollWidth (+ setengah gap) = tepat satu copy → wrap mulus
      const half = el.scrollWidth / 2 + GAP_PX / 2;
      let next = el.scrollLeft + SPEED_PX_PER_FRAME;
      if (next >= half) next -= half;
      el.scrollLeft = next;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const step = () => {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + GAP_PX : 424;
  };

  const poke = (ms = RESUME_DELAY_MS) => {
    resumeAtRef.current = performance.now() + ms;
  };

  const slide = (dir: 1 | -1) => {
    poke();
    trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setIndex(
      Math.round(el.scrollLeft / step()) % ACHIEVEMENTS.length,
    );
  };

  // Daftar digandakan supaya loop wrap-nya mulus
  const loop = [...ACHIEVEMENTS, ...ACHIEVEMENTS];

  return (
    <div id="achievements" className="w-full scroll-mt-20">
      <div className="w-full">
        <Reveal>
        <div className="mb-8 flex flex-col justify-between gap-3 rounded-lg bg-surface-container-high p-4 shadow-[3px_3px_0px_#1f1c0d] md:flex-row md:items-end">
          <div>
            <div className="font-label mb-1 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-primary">
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                emoji_events
              </span>
              <span>Bonus stage // Trophy room</span>
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-on-surface uppercase">
              Achievements unlocked
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant"
              aria-live="polite"
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(ACHIEVEMENTS.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => slide(-1)}
              aria-label="Geser ke kiri"
              className="flex h-10 w-10 items-center justify-center rounded bg-surface-container text-on-surface shadow-[2px_2px_0px_#1f1c0d] transition-all hover:bg-surface-container-highest active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chevron_left
              </span>
            </button>
            <button
              type="button"
              onClick={() => slide(1)}
              aria-label="Geser ke kanan"
              className="flex h-10 w-10 items-center justify-center rounded bg-primary text-on-primary shadow-[2px_2px_0px_#1f1c0d] transition-all hover:bg-secondary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chevron_right
              </span>
            </button>
          </div>
        </div>
        </Reveal>

        <Reveal delay={150}>
        <div
          ref={trackRef}
          onScroll={onScroll}
          onPointerEnter={() => {
            hoveringRef.current = true;
          }}
          onPointerLeave={() => {
            hoveringRef.current = false;
            poke(1000);
          }}
          className="no-scrollbar flex gap-6 overflow-x-auto pb-2"
        >
          {loop.map((a, i) => {
            const dup = i >= ACHIEVEMENTS.length;
            const showPhoto = Boolean(a.image) && !failedImages.has(a.id);
            return (
              <article
                key={`${a.id}${dup ? "-loop" : ""}`}
                data-card
                aria-hidden={dup || undefined}
                className="w-[85%] shrink-0 rounded-lg bg-surface-container p-5 shadow-[5px_5px_0px_#1f1c0d] sm:w-[400px]"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span
                    className={`rounded px-2 py-1 font-label text-[11px] font-bold uppercase tracking-[0.1em] shadow-[2px_2px_0px_#1f1c0d] ${a.badgeClass}`}
                  >
                    {a.badge}
                  </span>
                  <span className="font-label text-[11px] font-bold text-secondary">
                    {a.points}
                  </span>
                </div>
                <div
                  className={`relative mb-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded shadow-[2px_2px_0px_#1f1c0d] ${
                    showPhoto
                      ? "bg-surface-dim"
                      : `halftone bg-gradient-to-br ${a.coverGradient}`
                  }`}
                >
                  {showPhoto ? (
                    <Image
                      src={a.image as string}
                      alt={`Foto ${a.title}`}
                      fill
                      sizes="(max-width: 640px) 85vw, 400px"
                      className="object-cover"
                      onError={() => markFailed(a.id)}
                    />
                  ) : (
                    <span
                      className="material-symbols-outlined text-[64px] text-white drop-shadow-[3px_3px_0_rgba(0,0,0,0.55)]"
                      aria-hidden="true"
                    >
                      {a.icon}
                    </span>
                  )}
                </div>
                <h3 className="font-display mb-1 text-2xl font-semibold text-on-surface uppercase">
                  {a.title}
                </h3>
                <p className="font-label mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
                  {a.issuer} • {a.year}
                </p>
                <p className="font-body text-sm leading-[22px] text-on-surface-variant">
                  {a.description}
                </p>
              </article>
            );
          })}
        </div>
        </Reveal>
      </div>
    </div>
  );
}
