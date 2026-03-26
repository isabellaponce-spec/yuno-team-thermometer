'use client'
import { SCALE_LABELS } from '@/lib/dimensions'
import type { Dimension } from '@/lib/types'
import ProgressBar from './ProgressBar'

interface Props {
  dimension: Dimension
  stepIndex: number   // 0-based index among dimensions
  totalSteps: number  // total steps in survey (11)
  onAnswer: (value: number) => void
}

export default function DimensionQuestion({ dimension, stepIndex, totalSteps, onAnswer }: Props) {
  return (
    <div className="animate-slide-up max-w-lg mx-auto px-4 py-8">
      <ProgressBar current={stepIndex + 2} total={totalSteps} />

      <div className="text-5xl mb-4">{dimension.emoji}</div>
      <h2 className="text-xl font-bold text-[#3E4FE0] uppercase tracking-wide mb-2 text-sm">
        {dimension.name}
      </h2>
      <p className="text-2xl font-bold text-[#282A30] leading-snug mb-8">
        "{dimension.statement}"
      </p>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(val => (
          <button
            key={val}
            onClick={() => onAnswer(val)}
            className="option-card flex items-center gap-4"
          >
            <span className="w-8 h-8 rounded-full bg-[#E8EAF5] text-[#3E4FE0] font-bold text-sm flex items-center justify-center flex-shrink-0">
              {val}
            </span>
            <span>{SCALE_LABELS[val]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
