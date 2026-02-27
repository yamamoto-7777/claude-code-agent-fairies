"use client"

import Image from "next/image"
import { CHARACTERS } from "@/src/constants/characters"
import { useScrollReveal } from "@/src/hooks/useScrollReveal"
import SectionHeader from "@/src/components/lp/SectionHeader"
import { getAssetPath } from "@/src/utils/getAssetPath"

const mainAgent = CHARACTERS[0]
const subAgents = CHARACTERS.filter((c) => c.id !== 0)

/**
 * SVG diagram node positions (radial layout around center).
 * Map character id -> angle on circle.
 */
const CENTER_X = 400
const CENTER_Y = 340
const RADIUS = 190
const MAIN_SIZE = 80
const SUB_SIZE = 55

/** User node position (left side) */
const USER_X = 120
const USER_Y = 340
const USER_SIZE = 44

interface NodePosition {
  characterId: number
  angle: number
}

const nodePositions: NodePosition[] = [
  { characterId: 5, angle: 270 },   // Rin - top
  { characterId: 2, angle: 315 },   // Hinata - top-right
  { characterId: 1, angle: 45 },    // Luna - bottom-right
  { characterId: 3, angle: 135 },   // Yui - bottom-left
  { characterId: 4, angle: 225 },   // Tsubaki - top-left
]

function getNodeCoords(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: CENTER_X + RADIUS * Math.cos(rad),
    y: CENTER_Y + RADIUS * Math.sin(rad),
  }
}

/** Background particles for the section */
const particles = [
  { top: "5%", left: "8%", size: "3px", color: "rgba(129,140,248,0.2)", delay: "0s" },
  { top: "15%", left: "92%", size: "4px", color: "rgba(96,165,250,0.2)", delay: "0.5s" },
  { top: "70%", left: "5%", size: "3px", color: "rgba(103,232,249,0.25)", delay: "1s" },
  { top: "80%", left: "88%", size: "4px", color: "rgba(167,243,208,0.15)", delay: "1.5s" },
]

export default function SystemDiagramSection() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="system-diagram"
      className="scroll-reveal relative py-20"
    >
      {/* Background particles */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-fairy-glow"
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

      <div className="relative max-w-4xl mx-auto px-6">
        <SectionHeader
          label="SYSTEM ARCHITECTURE"
          title="エージェント構成"
        />

        {/* Desktop: SVG Diagram */}
        <div className="hidden lg:flex justify-center mt-12">
          <svg
            viewBox="0 0 760 700"
            className="w-full max-w-3xl"
            role="img"
            aria-label="エージェント構成図: ユーザーからの入力をひか（メインエージェント）が受け取り、周囲の5体のサブエージェントに指示を出す構成"
          >
            <defs>
              {/* Arrow marker for user -> main agent line */}
              <marker
                id="arrow-user"
                viewBox="0 0 10 10"
                refX={8}
                refY={5}
                markerWidth={6}
                markerHeight={6}
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(148,163,184,0.6)" />
              </marker>
            </defs>

            {/* Connection line: User -> Main agent */}
            <line
              x1={USER_X + USER_SIZE}
              y1={USER_Y}
              x2={CENTER_X - MAIN_SIZE}
              y2={CENTER_Y}
              stroke="rgba(148,163,184,0.5)"
              strokeDasharray="6,4"
              strokeWidth={2}
              markerEnd="url(#arrow-user)"
            />

            {/* Flow label on the user -> main line */}
            <text
              x={(USER_X + USER_SIZE + CENTER_X - MAIN_SIZE) / 2}
              y={(USER_Y + CENTER_Y) / 2 - 8}
              textAnchor="middle"
              className="fill-slate-500 text-xs"
              fontSize={10}
            >
              指示・質問
            </text>

            {/* User node */}
            <g>
              <circle
                cx={USER_X}
                cy={USER_Y}
                r={USER_SIZE + 3}
                fill="none"
                stroke="rgba(148,163,184,0.3)"
                strokeWidth={2}
                className="animate-pulse-glow"
              />
              <circle
                cx={USER_X}
                cy={USER_Y}
                r={USER_SIZE}
                fill="rgba(30,41,59,0.8)"
                stroke="rgba(148,163,184,0.5)"
                strokeWidth={2}
              />
              {/* User silhouette icon */}
              <g transform={`translate(${USER_X - 18}, ${USER_Y - 20})`}>
                {/* Head */}
                <circle cx={18} cy={10} r={8} fill="rgba(148,163,184,0.7)" />
                {/* Body */}
                <path
                  d="M 4 32 Q 4 22 18 22 Q 32 22 32 32 L 32 36 L 4 36 Z"
                  fill="rgba(148,163,184,0.7)"
                />
              </g>
              <text
                x={USER_X}
                y={USER_Y + USER_SIZE + 18}
                textAnchor="middle"
                className="fill-slate-300 text-sm font-bold"
                fontSize={14}
              >
                ユーザー
              </text>
            </g>

            {/* Connection lines from center to each sub-agent */}
            {nodePositions.map(({ characterId, angle }) => {
              const coords = getNodeCoords(angle)
              return (
                <line
                  key={`line-${characterId}`}
                  x1={CENTER_X}
                  y1={CENTER_Y}
                  x2={coords.x}
                  y2={coords.y}
                  stroke="currentColor"
                  strokeDasharray="5,5"
                  className="text-slate-500/40"
                  strokeWidth={1.5}
                />
              )
            })}

            {/* Main agent (center) */}
            <g>
              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r={MAIN_SIZE + 4}
                fill="none"
                stroke="rgba(251,146,60,0.4)"
                strokeWidth={2}
                className="animate-pulse-glow"
              />
              <clipPath id="main-clip">
                <circle cx={CENTER_X} cy={CENTER_Y} r={MAIN_SIZE} />
              </clipPath>
              <image
                href={getAssetPath(mainAgent.imagePath)}
                x={CENTER_X - MAIN_SIZE}
                y={CENTER_Y - MAIN_SIZE}
                width={MAIN_SIZE * 2}
                height={MAIN_SIZE * 2}
                clipPath="url(#main-clip)"
                preserveAspectRatio="xMidYMid slice"
              />
              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r={MAIN_SIZE}
                fill="none"
                stroke="rgba(251,146,60,0.6)"
                strokeWidth={2}
              />
              <text
                x={CENTER_X}
                y={CENTER_Y + MAIN_SIZE + 20}
                textAnchor="middle"
                className="fill-orange-300 text-sm font-bold"
                fontSize={14}
              >
                {mainAgent.name}
              </text>
              <text
                x={CENTER_X}
                y={CENTER_Y + MAIN_SIZE + 38}
                textAnchor="middle"
                className="fill-slate-400 text-xs"
                fontSize={11}
              >
                {mainAgent.responsibility}
              </text>
            </g>

            {/* Sub-agent nodes */}
            {nodePositions.map(({ characterId, angle }) => {
              const character = CHARACTERS.find((c) => c.id === characterId)
              if (!character) return null
              const coords = getNodeCoords(angle)
              const clipId = `clip-${characterId}`

              return (
                <g key={characterId} className="group">
                  <clipPath id={clipId}>
                    <circle cx={coords.x} cy={coords.y} r={SUB_SIZE} />
                  </clipPath>
                  <image
                    href={getAssetPath(character.imagePath)}
                    x={coords.x - SUB_SIZE}
                    y={coords.y - SUB_SIZE}
                    width={SUB_SIZE * 2}
                    height={SUB_SIZE * 2}
                    clipPath={`url(#${clipId})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={SUB_SIZE}
                    fill="none"
                    stroke={character.themeColor.glowValue.split(" ").slice(-1)[0].replace(")", ",0.6)")}
                    strokeWidth={2}
                  />
                  <text
                    x={coords.x}
                    y={coords.y + SUB_SIZE + 18}
                    textAnchor="middle"
                    className="fill-slate-200 text-sm font-semibold"
                    fontSize={13}
                  >
                    {character.name}
                  </text>
                  <text
                    x={coords.x}
                    y={coords.y + SUB_SIZE + 34}
                    textAnchor="middle"
                    className="fill-slate-400 text-xs"
                    fontSize={10}
                  >
                    {character.responsibility}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Mobile: Vertical list */}
        <div className="lg:hidden flex flex-col items-center mt-12 gap-2">
          {/* User card */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur border border-slate-400/30 rounded-xl p-4 w-full max-w-sm">
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-slate-400/50 bg-slate-800/80 flex items-center justify-center">
              {/* User silhouette icon */}
              <svg width="28" height="28" viewBox="0 0 36 40" fill="none" aria-hidden="true">
                <circle cx={18} cy={10} r={8} fill="rgba(148,163,184,0.7)" />
                <path
                  d="M 4 32 Q 4 22 18 22 Q 32 22 32 32 L 32 36 L 4 36 Z"
                  fill="rgba(148,163,184,0.7)"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-300">ユーザー</p>
              <p className="text-xs text-slate-400">指示・質問</p>
            </div>
          </div>

          {/* Connection line (user -> main) */}
          <div className="w-px h-6 bg-slate-500/40" aria-hidden="true" />

          {/* Main agent card */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur border border-orange-400/30 rounded-xl p-4 w-full max-w-sm">
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-orange-400/60">
              <Image
                src={mainAgent.imagePath}
                alt={`${mainAgent.name} - ${mainAgent.responsibility}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-orange-300">{mainAgent.name}</p>
              <p className="text-xs text-slate-400">{mainAgent.responsibility}</p>
            </div>
          </div>

          {/* Connection line */}
          <div className="w-px h-6 bg-slate-500/40" aria-hidden="true" />

          {/* Sub agents */}
          <div className="flex flex-col gap-2 w-full max-w-sm">
            {subAgents.map((character, index) => (
              <div key={character.id}>
                {index > 0 && (
                  <div className="flex justify-center">
                    <div className="w-px h-2 bg-slate-500/20" aria-hidden="true" />
                  </div>
                )}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur border border-white/10 rounded-xl p-3 w-full">
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-px h-4 bg-slate-500/30" aria-hidden="true" />
                    <div className={`relative w-10 h-10 rounded-full overflow-hidden border-2 ${character.themeColor.border}`}>
                      <Image
                        src={character.imagePath}
                        alt={`${character.name} - ${character.responsibility}`}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{character.name}</p>
                    <p className="text-xs text-slate-400">{character.responsibility}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
