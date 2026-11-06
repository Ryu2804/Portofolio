"use client";

import { useEffect, useState } from "react";

// seal stamps in (0–0.6s), then the sea drains down off the screen (0.7–2.0s)
const INTRO_MS = 2000;

/**
 * Opening: the page starts under the same sea the footer ends in. The CSS
 * animation alone carries the overlay off-screen, so it still clears if JS
 * never runs; JS only locks scrolling and unmounts it afterwards.
 */
export function TideIntro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      document.body.style.overflow = prevOverflow;
      setDone(true);
    }, INTRO_MS);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;
  return (
    <div className="tide" aria-hidden="true">
      <div className="tide-crest" />
      <div className="tide-sea">
        <span className="seal tide-seal px-5 py-3 text-[52px] tracking-[0.12em]">馬福隆</span>
      </div>
    </div>
  );
}
