"use client"

import { useScrollReveal } from "@/src/hooks/useScrollReveal"

interface SectionHeaderProps {
  label: string
  title: string
  description?: string
}

export default function SectionHeader({
  label,
  title,
  description,
}: SectionHeaderProps) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="scroll-reveal">
      <p className="text-xs sm:text-sm uppercase tracking-widest text-blue-400/60">
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-slate-300/80 mt-4">
          {description}
        </p>
      )}
      <div className="h-0.5 w-24 bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0 mt-4" />
    </div>
  )
}
