import Image from "next/image"
import { CHARACTERS } from "@/src/constants/characters"

const sparkles = [
  { top: "10%", left: "15%", delay: "0s" },
  { top: "20%", left: "80%", delay: "0.4s" },
  { top: "35%", left: "5%", delay: "0.8s" },
  { top: "15%", left: "55%", delay: "1.2s" },
  { top: "40%", left: "90%", delay: "1.6s" },
  { top: "5%", left: "40%", delay: "2.0s" },
  { top: "25%", left: "70%", delay: "0.6s" },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center gap-8 px-6 overflow-hidden">
      {/* Sparkle particles */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {sparkles.map((s, i) => (
          <span
            key={i}
            className="absolute text-blue-300/60 text-lg animate-sparkle"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
            }}
          >
            &#10022;
          </span>
        ))}
      </div>

      {/* Super title */}
      <p
        className="opacity-0 animate-card-enter text-sm uppercase tracking-widest text-blue-400/60 mb-4"
        style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
      >
        Claude Code Agent Fairies
      </p>

      {/* Main title */}
      <h1
        className="opacity-0 animate-card-enter text-5xl sm:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        Claude Code Agent Fairies
      </h1>

      {/* Sub copy */}
      <p
        className="opacity-0 animate-card-enter text-lg sm:text-xl text-center text-slate-300/80 max-w-2xl mb-8"
        style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
      >
        コードに集中したまま、妖精エージェントたちが耳に進捗を届ける
        &#8212; あなたの開発を、6人の妖精が見守る世界へ
      </p>

      {/* Character thumbnails */}
      <div
        className="opacity-0 animate-card-enter flex flex-wrap justify-center gap-4 mb-8"
        style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
      >
        {CHARACTERS.map((character) => (
          <div
            key={character.id}
            className="group relative w-20 h-20 sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden transition-transform duration-300 hover:scale-110"
            style={{
              boxShadow: `0 0 12px ${character.themeColor.glowValue.split(" ").slice(-1)[0]}`,
            }}
          >
            <div
              className={`absolute inset-0 rounded-full border-2 ${character.themeColor.border} z-10 pointer-events-none`}
            />
            <Image
              src={character.imagePath}
              alt={`${character.name} - ${character.responsibility}`}
              fill
              sizes="(max-width: 640px) 80px, 100px"
              className="object-cover rounded-full"
            />
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div
        className="opacity-0 animate-card-enter flex gap-4 flex-col sm:flex-row justify-center"
        style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
      >
        <a
          href="#system-diagram"
          className="px-8 py-3 rounded-lg font-semibold text-center transition-all bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 hover:from-blue-300 hover:to-cyan-300 hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]"
          aria-label="agent fairies の構成図を見る"
        >
          agent fairies を見る
        </a>
        <a
          href="#world-view"
          className="px-8 py-3 rounded-lg font-semibold text-center transition-all border border-white/20 bg-white/10 text-slate-200 hover:bg-white/20 hover:border-white/30"
          aria-label="妖精の国の世界観を知る"
        >
          妖精の国を知る
        </a>
      </div>
    </section>
  )
}
