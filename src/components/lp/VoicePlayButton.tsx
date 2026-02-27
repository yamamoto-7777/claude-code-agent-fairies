"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { getAssetPath } from "@/src/utils/getAssetPath"

/**
 * Module-level singleton callback to ensure only one audio plays at a time.
 * When a new VoicePlayButton starts playing, any currently-playing
 * instance is stopped first via this callback.
 */
let currentStopCallback: (() => void) | null = null

interface VoicePlayButtonProps {
  /** Path to the audio file (e.g. "/sound/hika-sample.mp3") */
  voiceSamplePath: string | undefined
  /** Character name for aria-label */
  characterName: string
  /** Tailwind gradient from/to classes for the button (e.g. "from-amber-400 to-orange-500") */
  buttonGradient: string
  /** CSS box-shadow raw value for glow effect (e.g. "0 0 20px rgba(251,146,60,0.4)") */
  glowValue?: string
  /** Custom label text for the button (defaults to "サンプルボイス") */
  label?: string
  /** If true, use a compact style (smaller padding, no pulse ring) */
  compact?: boolean
}

export default function VoicePlayButton({
  voiceSamplePath,
  characterName,
  buttonGradient,
  glowValue,
  label,
  compact = false,
}: VoicePlayButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Stop callback for the global singleton pattern
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (currentStopCallback === stop) {
        currentStopCallback = null
      }
    }
  }, [stop])

  // Don't render if no voice sample is available
  if (!voiceSamplePath) {
    return null
  }

  const handleClick = () => {
    if (isPlaying) {
      // Pause current playback
      stop()
      if (currentStopCallback === stop) {
        currentStopCallback = null
      }
      return
    }

    // Stop any other playing audio
    if (currentStopCallback && currentStopCallback !== stop) {
      currentStopCallback()
    }

    // Create or reuse audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(getAssetPath(voiceSamplePath))

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false)
        if (currentStopCallback === stop) {
          currentStopCallback = null
        }
      })
    }

    // Play
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {
      // Autoplay may be blocked; silently fail
      setIsPlaying(false)
    })

    setIsPlaying(true)
    currentStopCallback = stop
  }

  const displayLabel = label ?? "サンプルボイス"
  const playingLabel = label ? `${label} 再生中...` : "再生中..."

  return (
    <div className="relative inline-flex">
      {/* Animated pulse ring behind the button (idle state) - hidden in compact mode */}
      {!compact && !isPlaying && (
        <span
          className="absolute inset-0 rounded-full bg-gradient-to-r opacity-30 animate-ping"
          style={{
            animationDuration: "2.5s",
          }}
          aria-hidden="true"
        />
      )}

      <button
        type="button"
        onClick={handleClick}
        aria-label={
          isPlaying
            ? `${characterName}の${displayLabel}を停止`
            : `${characterName}の${displayLabel}を再生`
        }
        className={`relative z-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${buttonGradient} text-white font-bold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 cursor-pointer ${isPlaying ? "voice-btn-playing" : ""} ${compact ? "px-4 py-2 text-sm min-h-[40px]" : "px-6 py-3 text-base min-h-[48px] gap-3"}`}
        style={{
          "--voice-btn-glow": glowValue ?? "rgba(251, 146, 60, 0.4)",
        } as React.CSSProperties}
      >
        {isPlaying ? (
          /* Wave bars animation during playback */
          <span className="flex items-center gap-0.5 h-5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="voice-bar w-1 rounded-full bg-white/90"
                style={{ height: "4px" }}
              />
            ))}
          </span>
        ) : (
          /* Speaker icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={compact ? "w-5 h-5 drop-shadow-md" : "w-6 h-6 drop-shadow-md"}
            aria-hidden="true"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
        <span className="tracking-wide">
          {isPlaying ? playingLabel : displayLabel}
        </span>
      </button>
    </div>
  )
}
