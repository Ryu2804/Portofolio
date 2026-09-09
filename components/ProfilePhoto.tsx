"use client";

import Image from "next/image";
import { useState } from "react";

/** Foto profil portrait 9:16 dari `public/profile.jpg` lokal (bukan foto GitHub). */
export function ProfilePhoto({ label }: { label: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="flex h-full w-full flex-col">
      <div className="relative aspect-[9/16] max-h-[80svh] w-full flex-1 overflow-hidden rounded-lg bg-surface-container-low shadow-[4px_4px_0px_#1f1c0d] lg:aspect-auto lg:max-h-none lg:min-h-[420px]">
        {!failed ? (
          <Image
            src="/profile.jpg"
            alt={`Foto profil ${label}`}
            fill
            sizes="(max-width: 1024px) 100vw, 460px"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="halftone absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary-container via-secondary to-[#360f00] p-6 text-center">
            <span
              className="material-symbols-outlined text-[72px] text-white drop-shadow-[3px_3px_0_rgba(0,0,0,0.55)]"
              aria-hidden="true"
            >
              face_6
            </span>
            <span className="rounded bg-black/55 px-3 py-1 font-label text-[11px] font-bold uppercase tracking-[0.15em] text-white">
              Foto belum dipasang
            </span>
          </div>
        )}
        <div className="absolute bottom-2 left-2 rounded bg-inverse-surface/90 px-2 py-1 font-label text-[11px] font-bold uppercase tracking-[0.1em] text-inverse-on-surface">
          P1 Photo
        </div>
      </div>
      {failed && (
        <figcaption className="mt-2 font-label text-[11px] uppercase leading-relaxed tracking-[0.08em] text-on-surface-variant">
          TIP: taruh foto portrait 9:16 di <code>public/profile.jpg</code>.
        </figcaption>
      )}
    </figure>
  );
}
