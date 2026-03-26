'use client'
import { useEffect } from 'react'

interface Props {
  onReset: () => void
}

export default function ThankYou({ onReset }: Props) {
  useEffect(() => {
    // Subtle confetti on mount
    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3E4FE0', '#E0ED80', '#E8EAF5', '#282A30'],
      })
    })
  }, [])

  return (
    <div className="animate-slide-up flex flex-col items-center text-center max-w-lg mx-auto px-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-[#E0ED80] flex items-center justify-center text-4xl mb-6 shadow-md">
        🎉
      </div>

      <h1 className="text-3xl font-bold text-[#282A30] mb-3">Thanks for sharing!</h1>
      <p className="text-gray-500 text-lg leading-relaxed mb-10">
        Your feedback helps us build stronger teams at Yuno.<br />
        See you next month! 💙
      </p>

      <div className="bg-[#E0ED80] rounded-2xl px-6 py-4 mb-10 text-[#282A30] text-sm font-medium">
        Your response has been recorded anonymously.
      </div>

      <button onClick={onReset} className="text-[#3E4FE0] text-sm font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity">
        Submit another response (different team)
      </button>

      <p className="mt-12 text-xs text-gray-400">People Team · Yuno · Team Thermometer</p>
    </div>
  )
}
