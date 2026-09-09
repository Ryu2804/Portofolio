export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-high py-6">
      <div className="flex w-full flex-col items-center justify-between gap-4 px-4 lg:px-8 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 animate-ping rounded-full bg-primary" />
          <span className="font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
            System ready • Press any key to operate
          </span>
        </div>
        <div className="font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant text-center md:text-right">
          2026 Portoflio Website // Benedictus Ryu Gunawan
        </div>
      </div>
    </footer>
  );
}
