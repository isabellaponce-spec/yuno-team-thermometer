'use client'
import { useState } from 'react'
import ProgressBar from './ProgressBar'

interface Props {
  onSubmit: (feedback: string) => void
}

export default function OpenFeedback({ onSubmit }: Props) {
  const [text, setText] = useState('')

  return (
    <div className="animate-slide-up max-w-lg mx-auto px-4 py-8">
      <ProgressBar current={11} total={11} />

      <div className="text-5xl mb-4">💬</div>
      <h2 className="text-2xl font-bold text-[#282A30] mb-2">Anything else you'd like to share?</h2>
      <p className="text-gray-500 mb-6 text-sm">
        Optional — feel free to share any thoughts, suggestions, or kudos for your team.
      </p>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Your thoughts here..."
        rows={5}
        className="w-full border-2 border-[#E8EAF5] rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#3E4FE0] bg-white resize-none mb-6"
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
