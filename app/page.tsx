import { CartridgeGrid } from "@/components/CartridgeGrid";
import { ContinueCta } from "@/components/ContinueCta";
import { CrtOverlay } from "@/components/CrtOverlay";
import { HeroStage } from "@/components/HeroStage";
import { CloudSeam, Koi, LanternSeam, MountainSeam, Petals, SkyLanterns, WaveSeam } from "@/components/Scenery";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StatsHud } from "@/components/StatsHud";
import { TideIntro } from "@/components/TideIntro";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-surface">
      <TideIntro />
      <CrtOverlay />
      <SiteHeader />
      <main className="w-full flex-1 bg-surface pt-20">
        {/* above the scenery: mountains rise behind the hero content */}
        <div className="relative z-[3]">
          <HeroStage />
        </div>
        <MountainSeam />
        <LanternSeam />
        <div className="relative z-[1] bg-primary pt-16 pb-32 md:pt-28">
          <SkyLanterns />
          <StatsHud />
        </div>
        <CloudSeam />
        <div className="relative z-[1] pb-28">
          <Petals />
          <CartridgeGrid />
        </div>
        <WaveSeam />
        <div className="relative z-[1] overflow-hidden bg-primary">
          <ContinueCta />
          <Koi />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
