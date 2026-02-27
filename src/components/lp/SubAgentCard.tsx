"use client"

import Image from "next/image"
import { getAssetPath } from "@/src/utils/getAssetPath"
import { useScrollReveal } from "@/src/hooks/useScrollReveal"
import SkillBar from "@/src/components/lp/SkillBar"
import VoicePlayButton from "@/src/components/lp/VoicePlayButton"
import SystemPromptAccordion from "@/src/components/lp/SystemPromptAccordion"
import type { Character } from "@/src/constants/characters"
import { generateVoiceSamplePaths } from "@/src/utils/voiceSamples"

interface SubAgentCardProps {
  character: Character
  index: number
  isReversed: boolean
}

export default function SubAgentCard({
  character,
  index,
  isReversed,
}: SubAgentCardProps) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="scroll-reveal"
      aria-label={`${character.name}の紹介`}
    >
      {/* Desktop layout: grid 2-col with order swap */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-8 items-center">
        {/* Image column */}
        <div
          className={`flex justify-center ${isReversed ? "order-2" : "order-1"}`}
        >
          <div className="relative w-64 sm:w-80">
            <Image
              src={getAssetPath(character.standingArtPath)}
              alt={`${character.name} - ${character.responsibility}`}
              width={320}
              height={480}
              sizes="(max-width: 640px) 256px, 320px"
              className="w-full h-auto object-contain"
              style={{
                filter: `drop-shadow(0 0 24px ${character.themeColor.glowValue.split(" ").pop()?.replace(")", ",0.25)") ?? "rgba(255,255,255,0.2)"})`,
              }}
            />
          </div>
        </div>

        {/* Text column */}
        <div className={isReversed ? "order-1" : "order-2"}>
          <AgentInfo character={character} index={index} />
        </div>
      </div>

      {/* Mobile layout: vertical stack */}
      <div className="flex flex-col gap-6 md:hidden">
        {/* Image */}
        <div className="flex justify-center">
          <div className="relative w-56 sm:w-64">
            <Image
              src={getAssetPath(character.standingArtPath)}
              alt={`${character.name} - ${character.responsibility}`}
              width={256}
              height={384}
              sizes="(max-width: 640px) 224px, 256px"
              className="w-full h-auto object-contain"
              style={{
                filter: `drop-shadow(0 0 20px ${character.themeColor.glowValue.split(" ").pop()?.replace(")", ",0.2)") ?? "rgba(255,255,255,0.15)"})`,
              }}
            />
          </div>
        </div>

        {/* Text info */}
        <AgentInfo character={character} index={index} />
      </div>
    </div>
  )
}

/** Shared text information block used in both desktop and mobile layouts. */
function AgentInfo({
  character,
  index,
}: {
  character: Character
  index: number
}) {
  return (
    <div>
      {/* Role badge */}
      <span
        className={`${character.themeColor.badge} border px-3 py-1 rounded-full inline-block text-xs mb-4`}
      >
        Sub Agent
      </span>

      {/* Character name */}
      <h3 className="text-3xl font-bold text-white mb-2">{character.name}</h3>

      {/* Responsibility */}
      <p className="text-sm text-slate-400 mb-4">{character.responsibility}</p>

      {/* Catchphrase */}
      <blockquote
        className={`text-lg italic text-slate-300/80 mb-4 border-l-4 ${character.themeColor.border} pl-4`}
      >
        {character.catchphrase}
      </blockquote>

      {/* Description */}
      <p className="text-base leading-relaxed text-slate-300/80 mb-4">
        {character.description}
      </p>

      {/* System Prompt Accordion */}
      <div className="mb-4">
        <SystemPromptAccordion character={character} />
      </div>

      {/* Tags (max 3) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {character.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="bg-white/10 text-slate-300 rounded-full px-3 py-1 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Skill bars */}
      <div className="flex flex-col gap-4">
        {character.stats.map((stat, statIndex) => (
          <SkillBar
            key={stat.label}
            label={stat.label}
            value={stat.value}
            fillClass={character.themeColor.skillFill}
            textClass={character.themeColor.skillText}
            delay={index * 0.3 + statIndex * 0.1}
          />
        ))}
      </div>

      {/* Voice sample buttons */}
      <div className="mt-6">
        <p className="text-xs text-slate-400 mb-2">サンプルボイス</p>
        <div className="flex flex-wrap gap-2">
          {generateVoiceSamplePaths(character.voiceSamplePath).map(
            (samplePath, sampleIndex) => (
              <VoicePlayButton
                key={samplePath}
                voiceSamplePath={samplePath}
                characterName={character.name}
                buttonGradient={character.themeColor.button}
                glowValue={character.themeColor.glowValue}
                label={`${sampleIndex + 1}`}
                compact
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}
