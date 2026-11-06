"use client";

import { useState } from "react";

const NAV = [
  { label: "About Me", path: "about", href: "#about" },
  { label: "Achievements & Honors", path: "achievements", href: "#achievements" },
  { label: "Projects", path: "cartridges", href: "#cartridges" },
  { label: "Contact Me", path: "contact", href: "#contact" },
];

export function SiteHeader() {
  const [active, setActive] = useState("cartridges");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b-[3px] border-on-surface bg-surface-container-high/95 backdrop-blur-md">
      <div className="flex h-20 w-full items-center justify-between gap-4 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3">
            <span className="seal h-9 w-9 text-[22px]" aria-hidden="true">
              馬
            </span>
            <span className="font-display text-xl text-primary">
              CodeWithRyZ
            </span>
          </a>

        </div>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.path}
              href={item.href}
              aria-current={active === item.path ? "page" : undefined}
              onClick={() => setActive(item.path)}
              className={
                active === item.path
                  ? "bg-primary px-3 py-2 font-label text-[13px] font-bold uppercase tracking-[0.08em] text-on-primary transition-all"
                  : "px-3 py-2 font-label text-[13px] font-bold uppercase tracking-[0.08em] text-on-surface-variant transition-all hover:bg-surface-container hover:text-on-surface"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/CV.pdf"
            download="Benedictus_Ryu_Gunawan_CV.pdf"
            aria-label="Download CV"
            className="font-display flex h-10 items-center gap-2 rounded-sm border-[3px] border-on-surface bg-secondary px-2 text-sm text-on-secondary uppercase shadow-[2px_2px_0px_#413333] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#413333] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:px-3"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              download
            </span>
            <span className="hidden sm:inline">Download CV</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded bg-surface-container text-on-surface shadow-[2px_2px_0px_#413333] lg:hidden"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t-2 border-on-surface/10 bg-surface-container-high px-4 pt-2 pb-4 lg:hidden"
        >
          {NAV.map((item) => (
            <a
              key={item.path}
              href={item.href}
              onClick={() => {
                setActive(item.path);
                setOpen(false);
              }}
              className={
                active === item.path
                  ? "mt-2 block rounded bg-primary px-3 py-3 font-label text-[13px] font-bold uppercase text-on-primary"
                  : "mt-2 block rounded bg-surface-container px-3 py-3 font-label text-[13px] font-bold uppercase text-on-surface"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
