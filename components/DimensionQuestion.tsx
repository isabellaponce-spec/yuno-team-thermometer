'use client'
import { SCALE_LABELS } from '@/lib/dimensions'
import type { Dimension } from '@/lib/types'
import ProgressBar from './ProgressBar'

interface Props {
  dimension: Dimension
  stepIndex: number
  totalSteps: number
  onAnswer: (value: number) => void
}

const DIMENSION_COLORS: Record<string, { bg: string; accent: string }> = {
  direction: { bg: '#3E4FE0', accent: '#E8EAF5' },
  accountability: { bg: '#1726A6', accent: '#BDC3F6' },
  motivation: { bg: '#E0ED80', accent: '#282A30' },
  externalOrientation: { bg: '#5967E4', accent: '#E8EAF5' },
  innovationLearning: { bg: '#7C89EF', accent: '#E8EAF5' },
  teamDynamicsTrust: { bg: '#3E4FE0', accent: '#E0ED80' },
  leadership: { bg: '#1726A6', accent: '#E0ED80' },
  mentorship: { bg: '#5967E4', accent: '#BDC3F6' },
  apprenticeship: { bg: '#282A30', accent: '#E0ED80' },
}

export default function DimensionQuestion({ dimension, stepIndex, totalSteps, onAnswer }: Props) {
  const colors = DIMENSION_COLORS[dimension.id] || { bg: '#3E4FE0', accent: '#E8EAF5' }

  return (
    <div className="animate-slide-up max-w-lg mx-auto px-4 py-6">
      <ProgressBar current={stepIndex + 2} total={totalSteps} />

      {/* Dimension icon with colored background */}
      <div
        className="dimension-icon mb-5"
        style={{ background: colors.accent }}
      >
        <span className="relative z-10">{dimension.emoji}</span>
      </div>

      {/* Dimension accent bar + name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-1 w-8 rounded-full" style={{ background: colors.bg }} />
        <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: colors.bg }}>
          {dimension.name}
        </h2>
      </div>

      <p className="text-2xl font-bold text-[#282A30] leading-snug mb-8">
        &ldquo;{dimension.statement}&rdquo;
      </p>

      <div className="space-y-3 stagger-children">
        {[1, 2, 3, 4, 5].map(val => (
          <button
            key={val}
            onClick={() => onAnswer(val)}
            className="option-card flex items-center gap-4"
          >
            <span
              className="w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center flex-shrink-0"
              style={{
                background: val >= 4 ? colors.bg : '#E8EAF5',
                color: val >= 4 ? '#FFFFFF' : '#3E4FE0',
              }}
            >
              {val}
            </span>
            <span>{SCALE_LABELS[val]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
