"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/data/portfolio";
import { Reveal } from "./Reveal";

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function ContinueCta() {
  const [count, setCount] = useState(9);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((c) => (c <= 1 ? 9 : c - 1));
    }, 1200);
    return () => window.clearInterval(id);
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROFILE.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="flex min-h-svh w-full scroll-mt-20 items-center justify-center px-4 py-10 lg:px-8">
      <Reveal className="w-full max-w-3xl">
      <div className="relative flex w-full flex-col items-center overflow-hidden rounded-xl bg-primary p-6 text-center text-on-primary shadow-[8px_8px_0px_#1f1c0d] lg:p-10">
        <div
          className="dot-grid-light pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="z-10 mb-4 flex items-center gap-2 rounded-full bg-inverse-surface px-4 py-1 text-tertiary-fixed shadow-[2px_2px_0px_#000]">
          <span
            className="material-symbols-outlined text-[18px]"
            aria-hidden="true"
          >
            alarm
          </span>
          <span className="font-display text-xl font-semibold tracking-widest uppercase">
            Continue? <span aria-live="polite">{pad(count)}</span>
          </span>
        </div>
        <h2 className="font-display z-10 mb-2 text-4xl font-bold tracking-tight uppercase">
          Ready to collaborate?
        </h2>
        <p className="z-10 mb-6 max-w-xl font-body text-base leading-[26px] text-primary-fixed">
          Insert coin to recruit Player 1 for brand identity, full-stack visual
          design, or art direction campaigns.
        </p>
        <div className="z-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:${PROFILE.email}`}
            className="font-display flex w-full items-center justify-center gap-2 rounded bg-inverse-surface px-6 py-4 text-xl font-semibold text-inverse-on-surface uppercase shadow-[4px_4px_0px_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-on-primary-fixed-variant hover:text-on-primary hover:shadow-[2px_2px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none sm:w-auto"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              group_add
            </span>
            [ Start 2P Co-op : Hire me ]
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="font-label flex w-full items-center justify-center gap-2 rounded bg-surface-container px-5 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-on-surface shadow-[4px_4px_0px_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-surface-lowest hover:shadow-[2px_2px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none sm:w-auto"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {copied ? "check" : "content_copy"}
            </span>
            <span>{copied ? "Email copied!" : "Copy Email"}</span>
          </button>
        </div>
      </div>
      </Reveal>
    </section>
  );
}
