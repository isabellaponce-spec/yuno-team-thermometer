'use client'
import { useState } from 'react'

interface Props {
  onSubmit: (concernName: string, concernText: string) => void
  onSkip: () => void
}

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 160 140" className="w-full max-w-[130px] mx-auto mb-4" fill="none">
      {/* Shield shape */}
      <path
        d="M80 15 L130 35 L130 75 C130 105 80 130 80 130 C80 130 30 105 30 75 L30 35 Z"
        fill="#E8EAF5"
        stroke="#BDC3F6"
        strokeWidth="2"
      />
      {/* Inner shield gradient */}
      <path
        d="M80 28 L118 44 L118 73 C118 97 80 118 80 118 C80 118 42 97 42 73 L42 44 Z"
        fill="url(#shieldGrad)"
        opacity="0.8"
      />
      {/* Checkmark */}
      <path
        d="M62 72 L75 85 L100 58"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Decorative dots */}
      <circle cx="25" cy="45" r="4" fill="#E0ED80" opacity="0.7" />
      <circle cx="140" cy="50" r="3" fill="#BDC3F6" opacity="0.6" />
      <circle cx="20" cy="100" r="5" fill="#BDC3F6" opacity="0.4" />
      <circle cx="145" cy="95" r="4" fill="#E0ED80" opacity="0.5" />

      <defs>
        <linearGradient id="shieldGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#5967E4" />
          <stop offset="100%" stopColor="#3E4FE0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function ConfirmationIllustration() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto mb-6" fill="none">
      <circle cx="60" cy="60" r="50" fill="#E8EAF5" />
      <circle cx="60" cy="60" r="36" fill="#3E4FE0" />
      <path
        d="M42 60 L54 72 L78 48"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="20" cy="30" r="4" fill="#E0ED80" opacity="0.8" />
      <circle cx="100" cy="25" r="3" fill="#BDC3F6" />
      <circle cx="105" cy="95" r="4" fill="#E0ED80" opacity="0.6" />
    </svg>
  )
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
        <ConfirmationIllustration />
        <p className="text-lg text-[#282A30] font-medium leading-relaxed">
          Thank you, <span className="text-[#3E4FE0] font-bold">{name}</span>.
          <br />
          Someone from the People team will reach out to you soon.
        </p>
      </div>
    )
  }

  return (
    <div className="animate-slide-up max-w-lg mx-auto px-4 py-6">
      <ShieldIllustration />

      <h2 className="text-2xl font-bold text-[#282A30] mb-2">Would you like to raise a concern?</h2>
      <p className="text-[#92959B] mb-6 text-sm leading-relaxed">
        This is optional. If you&apos;d like someone from HR to reach out, share your name below.
        Your concern will be handled <span className="font-semibold text-[#3E4FE0]">confidentially</span>.
      </p>

      {!showForm ? (
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary py-4 w-full"
          >
            Yes, I&apos;d like to raise a concern
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
            <label className="block text-sm font-semibold text-[#282A30] mb-1.5">Your name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full name"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#282A30] mb-1.5">Your concern</label>
            <textarea
              value={concern}
              onChange={e => setConcern(e.target.value)}
              placeholder="Describe your concern..."
              rows={5}
              className="input-field resize-none"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !concern.trim()}
              className="btn-primary flex-1 py-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:!shadow-none"
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
