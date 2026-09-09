"use client";

import { useEffect, useState } from "react";

export function HeroStage() {
  const [romState, setRomState] = useState("idle");
  const [glitchName, setGlitchName] = useState("Ryu");
  const [glitching, setGlitching] = useState(false);

  const todayLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Nama kadang glitch: Ryu → RyZ (ditahan) → kembali lagi
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timeout = 0;
    let alive = true;
    // [teks, tahan berapa ms] — alterasi bersih: Ryu → RyZ → Ryu → RyZ …
    const SEQ: Array<[string, number]> = [
      ["RyZ", 150],
      ["Ryu", 120],
      ["RyZ", 150],
      ["Ryu", 120],
      ["RyZ", 700],
    ];

    const schedule = () => {
      timeout = window.setTimeout(burst, 2800 + Math.random() * 3200);
    };
    const burst = () => {
      if (!alive) return;
      setGlitching(true);
      let i = 0;
      const stepFn = () => {
        if (!alive) return;
        if (i >= SEQ.length) {
          setGlitchName("Ryu");
          setGlitching(false);
          schedule();
          return;
        }
        const [text, hold] = SEQ[i] as [string, number];
        setGlitchName(text);
        i += 1;
        timeout = window.setTimeout(stepFn, hold);
      };
      stepFn();
    };
    schedule();
    return () => {
      alive = false;
      window.clearTimeout(timeout);
    };
  }, []);

  function handleResume() {
    const a = document.createElement("a");
    a.href = "/CV.pdf";
    a.download = "Benedictus_Ryu_Gunawan_CV.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setRomState("loaded");
    window.setTimeout(() => setRomState("idle"), 2400);
  }

  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] w-full flex-col items-center justify-center overflow-hidden px-4 py-10 lg:px-8">
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center select-none">
        <span className="font-display mb-2 text-2xl font-semibold tracking-widest text-tertiary uppercase drop-shadow-sm">
          {todayLabel}
        </span> 
        <h1 className="font-display text-[52px] leading-[54px] font-bold tracking-tighter uppercase sm:text-[88px] sm:leading-[90px] lg:text-[112px] lg:leading-[110px]">
          <span className="arcade-title arcade-outline">Hi! My Name is </span>
          <span
            className={`arcade-title arcade-outline relative inline-block ${glitching ? "glitching" : ""} ${glitchName === "RyZ" ? "ryz-mode" : ""}`}
          >
            {glitchName}
          </span>
        </h1>
        <div className="mt-3 inline-block rounded bg-surface-container px-6 py-2 shadow-[3px_3px_0px_#1f1c0d]">
          <span className="font-display text-3xl font-semibold tracking-widest text-primary uppercase sm:text-4xl">
            Machine Learning Engineer
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#cartridges"
            className="font-display flex items-center gap-2 rounded bg-primary px-6 py-3 text-xl font-semibold tracking-wider text-on-primary uppercase shadow-[4px_4px_0px_#1f1c0d] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-secondary hover:shadow-[2px_2px_0px_#1f1c0d] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              sports_esports
            </span>
            [ Project Cartridge ]
          </a>
          <button
            type="button"
            onClick={handleResume}
            className="font-display flex items-center gap-2 rounded bg-surface-container px-5 py-3 text-xl font-semibold tracking-wider text-on-surface uppercase shadow-[4px_4px_0px_#1f1c0d] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-surface-container-highest hover:shadow-[2px_2px_0px_#1f1c0d] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {romState === "loaded" ? "check" : "download"}
            </span>
            {romState === "loaded" ? "[ ROM LOADED! ]" : "[ RESUME.ROM ]"}
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="animate-pulse font-body text-sm tracking-wider text-on-surface uppercase">
            Press any key or insert coin to explore
          </span>
          <span
            className="inline-block h-4 w-2.5 animate-blink bg-primary"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
