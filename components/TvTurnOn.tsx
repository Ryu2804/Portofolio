"use client";

import { useEffect, useRef } from "react";

const INTRO_MS = 2100;

export function TvTurnOn() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrapRef.current?.remove();
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Semut statis ala TV analog (resolusi kecil, di-scale pixelated)
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const W = 180;
    const H = 100;
    let raf = 0;
    const t0 = performance.now();

    const draw = (now: number) => {
      const elapsed = now - t0;
      if (ctx && canvas) {
        if (elapsed > 950 && elapsed < 1950) {
          const img = ctx.createImageData(W, H);
          const d = img.data;
          for (let i = 0; i < d.length; i += 4) {
            const v = (Math.random() * 255) | 0;
            d[i] = v;
            d[i + 1] = v;
            d[i + 2] = v;
            d[i + 3] = 255;
          }
          ctx.putImageData(img, 0, 0);
        } else {
          ctx.clearRect(0, 0, W, H);
        }
      }
      if (elapsed < INTRO_MS) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const t = window.setTimeout(() => {
      wrapRef.current?.remove();
      document.body.style.overflow = prevOverflow;
    }, INTRO_MS);

    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="tv-intro"
      aria-hidden="true"
      role="presentation"
    >
      <div className="tv-line" />
      <div className="tv-flash" />
      <canvas ref={canvasRef} width={180} height={100} className="tv-static" />
      <div className="tv-roll" />
    </div>
  );
}
