"use client";

import { PROFILE } from "@/data/portfolio";

const CONTACTS = [
  {
    id: "instagram",
    label: "Instagram",
    href: PROFILE.instagram,
    icon: "/icons/instagram.svg",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: PROFILE.linkedin,
    icon: "/icons/linkedin.svg",
  },
  {
    id: "kaggle",
    label: "Kaggle",
    href: PROFILE.kaggle,
    icon: "/icons/kaggle.svg",
  },
] as const;

/** Logo kontak — yang URL-nya kosong tampil redup & tidak bisa diklik. */
export function ContactLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {CONTACTS.map((c) => {
        const ready = c.href.trim() !== "";
        const box =
          "flex h-10 w-10 items-center justify-center rounded bg-inverse-surface shadow-[2px_2px_0px_#000]";
        const icon = (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={c.icon}
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className={`h-5 w-5 ${ready ? "" : "opacity-40 grayscale"}`}
          />
        );
        return ready ? (
          <a
            key={c.id}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            aria-label={c.label}
            title={c.label}
            className={`${box} transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-on-primary-fixed-variant hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
          >
            {icon}
          </a>
        ) : (
          <span
            key={c.id}
            title={`${c.label} — isi URL di data/portfolio.ts`}
            aria-label={`${c.label} (URL belum diisi)`}
            className={`${box} cursor-not-allowed opacity-60`}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
}
