interface SkillBarProps {
  label: string
  value: number
  fillClass: string
  textClass: string
  delay?: number
}

export default function SkillBar({
  label,
  value,
  fillClass,
  textClass,
  delay = 0,
}: SkillBarProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className="flex flex-col gap-2"
    >
      <div className="flex justify-between items-center">
        <span className={`text-sm ${textClass}`}>{label}</span>
        <span className={`text-sm font-semibold ${textClass}`}>{value}%</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`skill-bar-fill h-full rounded-full ${fillClass}`}
          style={{
            "--skill-value": `${value}%`,
            "--skill-delay": `${delay}s`,
          } as React.CSSProperties}
        />
      </div>
    </div>
  )
}
