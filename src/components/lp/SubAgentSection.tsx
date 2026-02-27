"use client"

import { CHARACTERS } from "@/src/constants/characters"
import SectionHeader from "@/src/components/lp/SectionHeader"
import SubAgentCard from "@/src/components/lp/SubAgentCard"

/** Display order: Rin(5) -> Hinata(2) -> Luna(1) -> Yui(3) -> Tsubaki(4) */
const subAgentOrder = [5, 2, 1, 3, 4] as const

export default function SubAgentSection() {
  const orderedSubAgents = subAgentOrder.map((id) => {
    const character = CHARACTERS.find((c) => c.id === id)
    if (!character) {
      throw new Error(`Character with id ${id} not found`)
    }
    return character
  })

  return (
    <section id="sub-agents" className="relative py-20">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          label="SUB AGENTS"
          title="サブエージェントチーム"
        />

        <div className="mt-12 space-y-12">
          {orderedSubAgents.map((character, idx) => (
            <SubAgentCard
              key={character.id}
              character={character}
              index={idx}
              isReversed={idx % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
