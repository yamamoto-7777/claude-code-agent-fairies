import HeroSection from "@/src/components/lp/HeroSection";
import WorldViewSection from "@/src/components/lp/WorldViewSection";
import SystemDiagramSection from "@/src/components/lp/SystemDiagramSection";
import MainAgentSection from "@/src/components/lp/MainAgentSection";
import SubAgentSection from "@/src/components/lp/SubAgentSection";
import DemoSection from "@/src/components/lp/DemoSection";
import CtaFooterSection from "@/src/components/lp/CtaFooterSection";

export default function Home() {
  return (
    <>
      <aside
        role="note"
        aria-label="開発環境に関するお知らせ"
        className="w-full py-2 px-6 text-center text-sm text-amber-200/80 bg-amber-500/10 border-b border-amber-400/30"
      >
        ※ このページは開発テスト用のサンプルページです
      </aside>
      <main className="w-full">
        <HeroSection />
        <WorldViewSection />
        <SystemDiagramSection />
        <MainAgentSection />
        <SubAgentSection />
        <DemoSection />
        <CtaFooterSection />
      </main>
    </>
  );
}
