'use client'
import { useState } from 'react'

interface Props {
  onSubmit: (concernName: string, concernText: string) => void
  onSkip: () => void
}

export default function RaiseConcern({ onSubmit, onSkip }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [concern, setConcern] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!name.trim() || !concern.trim()) return
    setSubmitted(true)
    setTimeout(() => {
      onSubmit(name.trim(), concern.trim())
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="animate-slide-up flex flex-col items-center text-center max-w-lg mx-auto px-4 py-16">
        <div className="w-16 h-16 rounded-2xl bg-[#E8EAF5] flex items-center justify-center text-3xl mb-6">
          💙
        </div>
        <p className="text-lg text-[#282A30] font-medium leading-relaxed">
          Thank you, {name}. Someone from the People team will reach out to you soon. 💙
        </p>
      </div>
    )
  }

  return (
    <div className="animate-slide-up max-w-lg mx-auto px-4 py-8">
      <div className="text-5xl mb-4">🛡️</div>
      <h2 className="text-2xl font-bold text-[#282A30] mb-2">Would you like to raise a concern?</h2>
      <p className="text-gray-500 mb-6 text-sm leading-relaxed">
        This is optional. If you'd like someone from HR to reach out, share your name below. Your concern will be handled confidentially.
      </p>

      {!showForm ? (
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary py-4 w-full"
          >
            Yes, I'd like to raise a concern
          </button>
          <button
            onClick={onSkip}
            className="btn-secondary py-4 w-full"
          >
            No, skip this
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#282A30] mb-1">Your name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full name"
              className="w-full border-2 border-[#E8EAF5] rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#3E4FE0] bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#282A30] mb-1">Your concern</label>
            <textarea
              value={concern}
              onChange={e => setConcern(e.target.value)}
              placeholder="Describe your concern..."
              rows={5}
              className="w-full border-2 border-[#E8EAF5] rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#3E4FE0] bg-white resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !concern.trim()}
              className="btn-primary flex-1 py-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit concern
            </button>
            <button
              onClick={onSkip}
              className="btn-secondary flex-1 py-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
