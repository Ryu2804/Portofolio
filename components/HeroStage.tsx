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
    <section className="relative flex min-h-[calc(100svh-5rem)] w-full flex-col items-center justify-center overflow-hidden px-4 pt-10 pb-[max(200px,18vw)] lg:px-8">
      {/* 對聯: "insert coin to start" / "welcome", hung either side of the marquee */}
      <Couplet side="left" text="投幣開始" />
      <Couplet side="right" text="歡迎光臨" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center select-none">
        {/* name seal, read left to right */}
        <span
          className="seal mb-6 -rotate-3 px-4 py-2 text-[32px] tracking-[0.12em]"
          role="img"
          lang="zh-Hant"
          aria-label="馬福隆, Chinese name"
        >
          馬福隆
        </span>
        <span className="mb-3 font-body text-base font-bold tracking-wide text-tertiary">
          {todayLabel}
        </span>
        <h1 className="font-display text-[40px] leading-[1.05] uppercase sm:text-[64px] lg:text-[88px]">
          <span className="arcade-title">Hi! My name is </span>
          <span
            className={`arcade-title relative inline-block ${glitching ? "glitching" : ""} ${glitchName === "RyZ" ? "ryz-mode" : ""}`}
          >
            {glitchName}
          </span>
        </h1>
        <div className="mt-8 inline-block rounded-sm border-[3px] border-on-surface bg-secondary px-6 py-2 shadow-[4px_4px_0px_#315b8c]">
          <span className="font-display text-xl text-on-secondary uppercase sm:text-2xl">
            Machine Learning Engineer
          </span>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#cartridges"
            className="font-display flex items-center gap-2 rounded-sm border-[3px] border-on-surface bg-primary px-6 py-3 text-lg text-on-primary uppercase shadow-[4px_4px_0px_#413333] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-primary-container hover:shadow-[2px_2px_0px_#413333] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              sports_esports
            </span>
            Play the projects
          </a>
          <button
            type="button"
            onClick={handleResume}
            className="font-display flex items-center gap-2 rounded-sm border-[3px] border-on-surface bg-surface-container-low px-5 py-3 text-lg text-on-surface uppercase shadow-[4px_4px_0px_#413333] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-surface-container-highest hover:shadow-[2px_2px_0px_#413333] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {romState === "loaded" ? "check" : "download"}
            </span>
            {romState === "loaded" ? "CV downloaded" : "Download CV"}
          </button>
        </div>

        <div className="mt-8 flex items-center gap-2 rounded-sm bg-surface px-3 py-1">
          <span className="font-body text-sm tracking-wide text-on-surface-variant">
            Insert coin to explore
          </span>
          <span
            className="inline-block h-4 w-2.5 animate-blink bg-secondary"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

function Couplet({ side, text }: { side: "left" | "right"; text: string }) {
  return (
    <div
      className={`pointer-events-none absolute top-0 z-0 hidden flex-col items-center md:flex ${side === "left" ? "left-[4%] lg:left-[7%]" : "right-[4%] lg:right-[7%]"}`}
      aria-hidden="true"
    >
      <div className="couplet-cord h-10 lg:h-16" />
      <div className="couplet px-3 py-5 text-[40px] tracking-[0.15em] lg:px-4 lg:py-6 lg:text-[56px]">
        {text}
      </div>
    </div>
  );
}
