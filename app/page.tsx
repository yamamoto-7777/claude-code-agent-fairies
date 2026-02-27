import HeroSection from "@/src/components/lp/HeroSection";
import WorldViewSection from "@/src/components/lp/WorldViewSection";
import SystemDiagramSection from "@/src/components/lp/SystemDiagramSection";
import MainAgentSection from "@/src/components/lp/MainAgentSection";
import SubAgentSection from "@/src/components/lp/SubAgentSection";
import DemoSection from "@/src/components/lp/DemoSection";
import CtaFooterSection from "@/src/components/lp/CtaFooterSection";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <WorldViewSection />
      <SystemDiagramSection />
      <MainAgentSection />
      <SubAgentSection />
      <DemoSection />
      <CtaFooterSection />
    </main>
  );
}
