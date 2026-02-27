"use client"

import Image from "next/image"
import { CHARACTERS } from "@/src/constants/characters"
import { useScrollReveal } from "@/src/hooks/useScrollReveal"
import SectionHeader from "@/src/components/lp/SectionHeader"
import SkillBar from "@/src/components/lp/SkillBar"
import VoicePlayButton from "@/src/components/lp/VoicePlayButton"
import SystemPromptAccordion from "@/src/components/lp/SystemPromptAccordion"
import { generateVoiceSamplePaths } from "@/src/utils/voiceSamples"

const mainAgent = CHARACTERS[0]

export default function MainAgentSection() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="main-agent"
      className="scroll-reveal relative py-20"
    >
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          label="MAIN COORDINATOR"
          title="メインエージェント"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Character image */}
          <div className="flex justify-center">
            <div className="relative w-64 sm:w-80">
              <Image
                src={mainAgent.standingArtPath}
                alt={`${mainAgent.name} - ${mainAgent.responsibility}`}
                width={320}
                height={480}
                sizes="(max-width: 640px) 256px, 320px"
                className="w-full h-auto object-contain drop-shadow-[0_0_24px_rgba(251,146,60,0.25)]"
                priority
              />
            </div>
          </div>

          {/* Right: Text information */}
          <div>
            {/* Role badge */}
            <span className="bg-orange-400/20 text-orange-200 border border-orange-400/30 px-3 py-1 rounded-full inline-block text-xs mb-4">
              Main Agent
            </span>

            {/* Character name */}
            <h3 className="text-3xl font-bold text-white mb-2">
              {mainAgent.name}
            </h3>

            {/* Responsibility */}
            <p className="text-sm text-slate-400 mb-6">
              {mainAgent.responsibility}
            </p>

            {/* Catchphrase */}
            <blockquote className="text-lg italic text-slate-300/80 mb-6 border-l-4 border-orange-400/60 pl-4">
              {mainAgent.catchphrase}
            </blockquote>

            {/* Description */}
            <p className="text-base leading-relaxed text-slate-300/80 mb-6">
              {mainAgent.description}
            </p>

            {/* System Prompt Accordion */}
            <div className="mb-6">
              <SystemPromptAccordion character={mainAgent} />
            </div>

            {/* Skill bars */}
            <div className="flex flex-col gap-4">
              {mainAgent.stats.map((stat, index) => (
                <SkillBar
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  fillClass={mainAgent.themeColor.skillFill}
                  textClass={mainAgent.themeColor.skillText}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Voice sample buttons */}
            <div className="mt-6">
              <p className="text-xs text-slate-400 mb-2">サンプルボイス</p>
              <div className="flex flex-wrap gap-2">
                {generateVoiceSamplePaths(mainAgent.voiceSamplePath).map(
                  (samplePath, sampleIndex) => (
                    <VoicePlayButton
                      key={samplePath}
                      voiceSamplePath={samplePath}
                      characterName={mainAgent.name}
                      buttonGradient={mainAgent.themeColor.button}
                      glowValue={mainAgent.themeColor.glowValue}
                      label={`${sampleIndex + 1}`}
                      compact
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
