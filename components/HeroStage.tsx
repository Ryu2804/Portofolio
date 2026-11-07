"use client";

import { useEffect, useState } from "react";
import { TechMarquee } from "./TechMarquee";

// Roles from the CV, shown one at a time on the hero plaque
const ROLES = [
  "Machine Learning Engineer",
  "Data Engineer",
  "Backend Developer",
  "Data Science Mentor",
];

export function HeroStage() {
  const [ryz, setRyz] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [released, setReleased] = useState<{ id: number; x: number; y: number }[]>([]);

  // Click/tap open sky: a sky lantern rises from that spot
  function releaseLantern(e: React.MouseEvent<HTMLElement>) {
    if ((e.target as HTMLElement).closest("button, a")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = e.currentTarget.getBoundingClientRect();
    const lantern = { id: e.timeStamp, x: e.clientX - box.left, y: e.clientY - box.top };
    setReleased((list) => [...list.slice(-7), lantern]); // at most 8 in the air
  }

  const todayLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Every few seconds the last letter glides Ryu → RyZ, holds, then glides back
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timeout = 0;
    const loop = () => {
      timeout = window.setTimeout(() => {
        setRyz(true);
        timeout = window.setTimeout(() => {
          setRyz(false);
          loop();
        }, 1600);
      }, 3500 + Math.random() * 3000);
    };
    loop();
    return () => window.clearTimeout(timeout);
  }, []);


  return (
    <section
      onClick={releaseLantern}
      className="relative flex min-h-[calc(100svh-5rem)] w-full flex-col items-center justify-center overflow-hidden px-4 pt-10 pb-[max(120px,9.5vw)] lg:px-8"
    >
      {released.map((l) => (
        // eslint-disable-next-line @next/next/no-img-element -- tiny pixel sprite
        <img
          key={l.id}
          src="/scenery/lantern.svg"
          alt=""
          aria-hidden="true"
          className="released-lantern pixelated pointer-events-none absolute z-20 h-[56px] w-9"
          style={{ left: l.x - 18, top: l.y - 28 }}
          onAnimationEnd={() => setReleased((list) => list.filter((x) => x.id !== l.id))}
        />
      ))}
      {/* banners carry the Chinese name 馬福隆 on both sides */}
      <Couplet side="right" text="馬福隆" />
      <Couplet side="left" text="馬福隆" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center select-none">
        <span className="mb-3 font-body text-base font-bold tracking-wide text-tertiary">
          {todayLabel}
        </span>
        {/* two tiers: quiet lead-in, then the name as the focal point */}
        <h1 className="font-display uppercase">
          <span className="block text-2xl text-on-surface sm:text-3xl lg:text-4xl">
            Hi! My name is
          </span>
          {/* full name on two balanced lines; "Ryu" glides to "RyZ" now and then */}
          <span className="arcade-title mt-2 block text-[38px] leading-[1.05] sm:text-[64px] lg:text-[92px]">
            <span className="block">Benedictus</span>
            <span className="block">
              <span className={`ryu-word ${ryz ? "ryz-mode is-ryz" : ""}`}>
                Ry
                <span className="ryu-swap">
                  <span className="ryu-u">u</span>
                  <span className="ryu-z" aria-hidden="true">
                    Z
                  </span>
                </span>
              </span>{" "}
              Gunawan
            </span>
          </span>
        </h1>
        {/* character-select plaque: click/tap cycles through roles from the CV */}
        <button
          type="button"
          onClick={() => setRoleIndex((i) => (i + 1) % ROLES.length)}
          title="Switch role"
          className="font-display mt-8 inline-block cursor-pointer rounded-sm border-[3px] border-on-surface bg-secondary px-6 py-2 text-xl text-on-secondary uppercase shadow-[4px_4px_0px_#315b8c] transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_#315b8c] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none sm:text-2xl"
        >
          <span aria-live="polite">
            <span key={roleIndex} className="role-flip inline-block">
              {ROLES[roleIndex]}
            </span>
          </span>
        </button>


      </div>
      {/* sits on the mountains' blue valley floor, visible on first load */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <TechMarquee />
      </div>
    </section>
  );
}

function Couplet({ side, text }: { side: "left" | "right"; text: string }) {
  return (
    <div
      className={`couplet-hang absolute top-0 z-0 hidden flex-col items-center md:flex ${side === "left" ? "left-[4%] lg:left-[7%]" : "right-[4%] lg:right-[7%]"}`}
      aria-hidden="true"
    >
      <div className="couplet-cord h-10 lg:h-16" />
      <div className="couplet px-3 py-5 text-[40px] tracking-[0.15em] lg:px-4 lg:py-6 lg:text-[56px]">
        {text}
      </div>
    </div>
  );
}
