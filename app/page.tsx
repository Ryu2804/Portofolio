import { CartridgeGrid } from "@/components/CartridgeGrid";
import { ContinueCta } from "@/components/ContinueCta";
import { CrtOverlay } from "@/components/CrtOverlay";
import { HeroStage } from "@/components/HeroStage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StatsHud } from "@/components/StatsHud";
import { TvTurnOn } from "@/components/TvTurnOn";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-surface-container-low">
      <TvTurnOn />
      <CrtOverlay />
      <SiteHeader />
      <main className="w-full flex-1 bg-surface-container-low pt-20">
        <HeroStage />
        <StatsHud />
        <CartridgeGrid />
        <ContinueCta />
      </main>
      <SiteFooter />
    </div>
  );
}
