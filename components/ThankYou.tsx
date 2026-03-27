'use client'
import { useEffect } from 'react'

interface Props {
  onReset: () => void
}

function CelebrationIllustration() {
  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-[220px] mx-auto mb-6" fill="none">
      {/* Central burst */}
      <circle cx="120" cy="80" r="45" fill="#E0ED80" opacity="0.3" />
      <circle cx="120" cy="80" r="32" fill="#E0ED80" opacity="0.5" />

      {/* Star / sparkle at center */}
      <path d="M120 50 L124 70 L144 66 L128 78 L138 98 L120 86 L102 98 L112 78 L96 66 L116 70 Z" fill="#3E4FE0" />

      {/* Confetti pieces */}
      <rect x="55" y="35" width="10" height="10" rx="2" fill="#3E4FE0" opacity="0.7" transform="rotate(25 60 40)" />
      <rect x="175" y="40" width="8" height="8" rx="2" fill="#5967E4" opacity="0.6" transform="rotate(-15 179 44)" />
      <rect x="45" y="100" width="8" height="8" rx="2" fill="#7C89EF" opacity="0.5" transform="rotate(40 49 104)" />
      <rect x="185" y="95" width="10" height="10" rx="2" fill="#3E4FE0" opacity="0.5" transform="rotate(-30 190 100)" />

      {/* Circles / dots scattered */}
      <circle cx="70" cy="55" r="5" fill="#E0ED80" />
      <circle cx="170" cy="60" r="4" fill="#BDC3F6" />
      <circle cx="85" cy="120" r="6" fill="#E8EAF5" />
      <circle cx="160" cy="125" r="5" fill="#E0ED80" opacity="0.7" />
      <circle cx="40" cy="75" r="4" fill="#BDC3F6" opacity="0.6" />
      <circle cx="200" cy="80" r="5" fill="#E8EAF5" />
      <circle cx="100" cy="30" r="3" fill="#5967E4" opacity="0.5" />
      <circle cx="145" cy="28" r="4" fill="#E0ED80" opacity="0.6" />

      {/* Streamers */}
      <path d="M60 25 Q75 45 65 65" stroke="#3E4FE0" strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M180 30 Q170 50 185 70" stroke="#E0ED80" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M100 140 Q115 125 105 110" stroke="#BDC3F6" strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M150 135 Q140 120 155 105" stroke="#5967E4" strokeWidth="2" fill="none" opacity="0.4" />
    </svg>
  )
}

export default function ThankYou({ onReset }: Props) {
  useEffect(() => {
    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3E4FE0', '#E0ED80', '#BDC3F6', '#5967E4', '#7C89EF'],
      })
    })
  }, [])

  return (
    <div className="animate-slide-up flex flex-col items-center text-center max-w-lg mx-auto px-4 py-12 relative">
      {/* Background accents */}
      <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#E0ED80] opacity-15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -right-12 w-28 h-28 rounded-full bg-[#BDC3F6] opacity-20 blur-3xl pointer-events-none" />

      <CelebrationIllustration />

      <h1 className="text-3xl font-extrabold text-[#282A30] mb-3">Thanks for sharing!</h1>
      <p className="text-[#92959B] text-base leading-relaxed mb-8 max-w-sm">
        Your feedback helps us build stronger teams at Yuno.
        <br />
        See you next month!
      </p>

      <div
        className="glass-card px-6 py-4 mb-8 flex items-center gap-3"
        style={{ background: 'linear-gradient(135deg, rgba(224,237,128,0.25) 0%, rgba(232,234,245,0.4) 100%)' }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none">
          <circle cx="12" cy="12" r="10" fill="#E0ED80" />
          <path d="M8 12 L11 15 L16 9" stroke="#282A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[#282A30] text-sm font-medium">Your response has been recorded anonymously.</span>
      </div>

      <button
        onClick={onReset}
        className="text-[#3E4FE0] text-sm font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
      >
        Submit another response (different team)
      </button>

      <p className="mt-12 text-xs text-[#BDC3F6] font-medium">People Team · Yuno</p>
    </div>
  )
}
