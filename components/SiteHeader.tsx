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
    <header className="fixed top-0 right-0 left-0 z-50 bg-surface-container-high/95 backdrop-blur-md">
      <div className="flex h-20 w-full items-center justify-between gap-4 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="font-display text-xl font-semibold tracking-tight text-primary">
              CodeWithRyZ
            </span>
          </div>

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
          <div className="hidden items-center gap-1 bg-surface-container px-2 py-1 sm:flex">
            <span
              className="material-symbols-outlined text-[18px] text-secondary"
              aria-hidden="true"
            >
              volume_up
            </span>
            <span className="font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface">
              VOL 8-BIT
            </span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span
              className="material-symbols-outlined text-[18px] text-on-primary"
              aria-hidden="true"
            >
              person
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded bg-surface-container text-on-surface shadow-[2px_2px_0px_#1f1c0d] lg:hidden"
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
