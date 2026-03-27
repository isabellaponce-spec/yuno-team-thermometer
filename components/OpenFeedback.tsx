'use client'
import { useState } from 'react'
import ProgressBar from './ProgressBar'

interface Props {
  onSubmit: (feedback: string) => void
}

function FeedbackIllustration() {
  return (
    <svg viewBox="0 0 200 100" className="w-full max-w-[160px] mx-auto mb-2" fill="none">
      {/* Speech bubble */}
      <rect x="30" y="10" width="140" height="60" rx="20" fill="#E8EAF5" />
      <polygon points="70,70 85,70 65,90" fill="#E8EAF5" />

      {/* Dots inside bubble */}
      <circle cx="75" cy="38" r="5" fill="#3E4FE0" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="38" r="5" fill="#5967E4" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="125" cy="38" r="5" fill="#7C89EF" opacity="0.4">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
      </circle>

      {/* Decorative accents */}
      <circle cx="20" cy="25" r="4" fill="#E0ED80" opacity="0.7" />
      <circle cx="185" cy="20" r="3" fill="#BDC3F6" opacity="0.6" />
      <circle cx="175" cy="85" r="5" fill="#E0ED80" opacity="0.4" />
    </svg>
  )
}

export default function OpenFeedback({ onSubmit }: Props) {
  const [text, setText] = useState('')

  return (
    <div className="animate-slide-up max-w-lg mx-auto px-4 py-6">
      <ProgressBar current={11} total={11} />

      <FeedbackIllustration />

      <h2 className="text-2xl font-bold text-[#282A30] mb-2">Anything else you&apos;d like to share?</h2>
      <p className="text-[#92959B] mb-6 text-sm">
        Optional — share any thoughts, suggestions, or kudos for your team.
      </p>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Your thoughts here..."
        rows={5}
        className="input-field resize-none mb-6"
      />

      <div className="flex gap-3">
        <button onClick={() => onSubmit(text)} className="btn-primary flex-1 py-4">
          Submit
        </button>
        <button onClick={() => onSubmit('')} className="btn-secondary flex-1 py-4">
          Skip & Submit
        </button>
      </div>
    </div>
  )
}
