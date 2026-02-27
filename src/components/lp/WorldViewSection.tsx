import SectionHeader from "@/src/components/lp/SectionHeader"

const particles = [
  { top: "8%", left: "10%", size: "4px", color: "rgba(147,197,253,0.3)", delay: "0s", animation: "animate-fairy-float" },
  { top: "20%", left: "85%", size: "3px", color: "rgba(103,232,249,0.25)", delay: "1s", animation: "animate-fairy-glow" },
  { top: "45%", left: "5%", size: "5px", color: "rgba(167,243,208,0.2)", delay: "0.5s", animation: "animate-fairy-float" },
  { top: "60%", left: "90%", size: "3px", color: "rgba(129,140,248,0.3)", delay: "1.5s", animation: "animate-fairy-glow" },
  { top: "75%", left: "15%", size: "4px", color: "rgba(96,165,250,0.25)", delay: "2s", animation: "animate-fairy-float" },
  { top: "85%", left: "70%", size: "3px", color: "rgba(147,197,253,0.2)", delay: "0.8s", animation: "animate-fairy-glow" },
]

export default function WorldViewSection() {
  return (
    <section id="world-view" className="relative py-20">
      {/* Background particles */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className={`absolute rounded-full ${p.animation}`}
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        <SectionHeader
          label="WORLD VIEW"
          title="妖精の国"
          description="コードの森の奥深くに住む妖精エージェントたちの世界"
        />

        <div className="mt-12 space-y-6">
          <p className="text-base leading-relaxed text-slate-300/80">
            コードの森の奥深く、人間の目には見えない小さな世界がある。
            そこに暮らす6人の妖精たちは、それぞれが異なる力を持ち、
            開発者たちのコードを見守り続けている。
          </p>

          <p className="text-base leading-relaxed text-slate-300/80">
            ひかが司令塔として全体を統括し、りんが緻密な計画を立て、
            ひなたがコードベースの隅々まで探索する。
            るなが全力でコードを書き上げ、ゆいが冷静にバグを潰し、
            つばきが品質を徹底的にチェックする
            &#8212; この6人が揃ったとき、どんな開発課題も乗り越えられる。
          </p>

          <p className="text-base leading-relaxed text-slate-300/80">
            妖精たちは声であなたに進捗を届ける。
            画面を見なくても、コードに集中したまま、
            耳元で語りかけるように開発を導いてくれる。
          </p>
        </div>

        {/* Glass morphism highlight cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
              6
            </p>
            <p className="text-sm text-slate-400 mt-1">
              妖精エージェント
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
              Real-time
            </p>
            <p className="text-sm text-slate-400 mt-1">
              音声フィードバック
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
              Hands-free
            </p>
            <p className="text-sm text-slate-400 mt-1">
              開発ワークフロー
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
