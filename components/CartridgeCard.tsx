"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/portfolio";

export function CartridgeCard({ project }: { project: Project }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = Boolean(project.image) && !imgFailed;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-surface-container shadow-[5px_5px_0px_#1f1c0d] transition-all hover:shadow-[7px_7px_0px_#1f1c0d]">
      <div
        className="flex flex-col gap-1 bg-surface-container-highest px-4 py-2 shadow-inner"
        aria-hidden="true"
      >
        <div className="h-1 rounded-full bg-surface-container-low" />
        <div className="h-1 rounded-full bg-surface-container-low" />
        <div className="h-1 rounded-full bg-surface-container-low" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className={`rounded px-2 py-1 font-label text-[11px] font-bold uppercase tracking-[0.1em] shadow-[2px_2px_0px_#1f1c0d] ${project.badgeClass}`}
          >
            {project.stage}
          </span>
          <span className="font-label text-[11px] font-bold text-secondary">
            SCORE: {project.score}
          </span>
        </div>

        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded bg-surface-dim shadow-[2px_2px_0px_#1f1c0d]">
          {showPhoto ? (
            <Image
              src={project.image as string}
              alt={`Foto ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.coverGradient}`}
                aria-hidden="true"
              />
              <div
                className="halftone absolute inset-0 opacity-60"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                <span
                  className="material-symbols-outlined text-[64px] text-white drop-shadow-[3px_3px_0_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {project.icon}
                </span>
                <span className="rounded bg-black/55 px-3 py-1 font-label text-[11px] font-bold tracking-[0.15em] text-white uppercase">
                  {project.title}
                </span>
              </div>
            </>
          )}
        </div>

        <h3 className="font-display mb-2 text-2xl font-semibold text-on-surface uppercase">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-2 flex-1 font-body text-sm leading-[22px] text-on-surface-variant">
          {project.description}
        </p>

        <div className="flex items-center justify-between gap-3 rounded bg-surface-container-high p-3">
          <div className="flex min-w-0 flex-col">
            <span className="font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
              Year / Client
            </span>
            <span className="font-label text-[13px] font-bold uppercase tracking-[0.08em] text-on-surface">
              {project.year} • {project.client}
            </span>
          </div>
          {project.caseUrl ? (
            <a
              href={project.caseUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`View case study for ${project.title}`}
              className="flex shrink-0 items-center gap-1 rounded bg-primary px-3 py-2 font-label text-[13px] font-bold whitespace-nowrap uppercase tracking-[0.08em] text-on-primary shadow-[2px_2px_0px_#1f1c0d] transition-all hover:bg-secondary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <span>View case</span>
              <span
                className="material-symbols-outlined text-[16px]"
                aria-hidden="true"
              >
                open_in_new
              </span>
            </a>
          ) : (
            <span
              title="Isi caseUrl di data/portfolio.ts untuk mengaktifkan tombol ini"
              aria-label={`Case study for ${project.title} belum tersedia`}
              className="flex shrink-0 cursor-not-allowed items-center gap-1 rounded bg-surface-container-highest px-3 py-2 font-label text-[13px] font-bold whitespace-nowrap uppercase tracking-[0.08em] text-on-surface-variant opacity-70"
            >
              <span>View case</span>
              <span
                className="material-symbols-outlined text-[16px]"
                aria-hidden="true"
              >
                arrow_forward
              </span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
