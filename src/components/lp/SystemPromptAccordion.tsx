"use client"

import { useState } from "react"
import type { Character } from "@/src/constants/characters"

interface SystemPromptAccordionProps {
  character: Character
}

export default function SystemPromptAccordion({
  character,
}: SystemPromptAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { themeColor, characterProfile, mainRole, responseRules, systemPrompt } =
    character

  return (
    <div
      className={`relative rounded-2xl border ${themeColor.border} ${themeColor.cardBg} backdrop-blur-sm overflow-hidden`}
    >
      {/* Accordion header - always visible */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between p-4 cursor-pointer transition-colors duration-200 hover:bg-white/5`}
        aria-expanded={isOpen}
        aria-label={`${character.name}のシステムプロンプトを${isOpen ? "閉じる" : "開く"}`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold tracking-wide ${themeColor.skillText} opacity-80`}
          >
            -- System Prompt --
          </span>
        </div>
        <span
          className={`text-sm ${themeColor.skillText} transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        >
          &#9660;
        </span>
      </button>

      {/* Summary line - always visible below header */}
      <div className="px-4 pb-3">
        <p className="text-xs text-slate-400">
          {mainRole}
        </p>
      </div>

      {/* Expandable content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 space-y-4 border-t border-white/10 pt-4">
            {/* Character Profile section */}
            {characterProfile &&
              (characterProfile.firstPerson ||
                characterProfile.speechStyle ||
                characterProfile.personality) && (
                <div>
                  <h4
                    className={`text-xs font-bold ${themeColor.skillText} mb-2 flex items-center gap-1.5`}
                  >
                    <span aria-hidden="true">&#9733;</span>
                    キャラクター設定
                  </h4>
                  <div className="space-y-1.5">
                    {characterProfile.firstPerson && (
                      <p className="text-sm text-slate-300/90">
                        <span className="text-slate-400 font-medium">
                          一人称：
                        </span>
                        {characterProfile.firstPerson}
                      </p>
                    )}
                    {characterProfile.personality && (
                      <p className="text-sm text-slate-300/90">
                        <span className="text-slate-400 font-medium">
                          性格：
                        </span>
                        {characterProfile.personality}
                      </p>
                    )}
                    {characterProfile.speechStyle && (
                      <p className="text-sm text-slate-300/90">
                        <span className="text-slate-400 font-medium">
                          口調：
                        </span>
                        {characterProfile.speechStyle}
                      </p>
                    )}
                  </div>
                </div>
              )}

            {/* Main Role section */}
            <div>
              <h4
                className={`text-xs font-bold ${themeColor.skillText} mb-2 flex items-center gap-1.5`}
              >
                <span aria-hidden="true">&#9733;</span>
                主な役割
              </h4>
              <p className="text-sm leading-relaxed text-slate-300/90">
                {mainRole}
              </p>
            </div>

            {/* System Prompt full text */}
            <div>
              <h4
                className={`text-xs font-bold ${themeColor.skillText} mb-2 flex items-center gap-1.5`}
              >
                <span aria-hidden="true">&#9733;</span>
                プロンプト全文
              </h4>
              <p className="text-sm leading-relaxed text-slate-300/90">
                {systemPrompt}
              </p>
            </div>

            {/* Response Rules section */}
            {responseRules && (
              <div>
                <h4
                  className={`text-xs font-bold ${themeColor.skillText} mb-2 flex items-center gap-1.5`}
                >
                  <span aria-hidden="true">&#9733;</span>
                  応答ルール
                </h4>
                <p className="text-sm leading-relaxed text-slate-300/90">
                  {responseRules}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
