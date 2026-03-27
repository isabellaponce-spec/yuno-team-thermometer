'use client'
import { useState } from 'react'
import { TEAMS } from '@/lib/teams'
import ProgressBar from './ProgressBar'

interface Props {
  onSelect: (team: string, customTeam: string) => void
}

function TeamIllustration() {
  return (
    <svg viewBox="0 0 280 100" className="w-full max-w-[240px] mx-auto mb-4" fill="none">
      {/* Three abstract person silhouettes */}
      <circle cx="90" cy="38" r="14" fill="#3E4FE0" opacity="0.9" />
      <rect x="78" y="56" width="24" height="30" rx="12" fill="#3E4FE0" opacity="0.9" />

      <circle cx="140" cy="32" r="16" fill="#5967E4" opacity="0.8" />
      <rect x="126" y="52" width="28" height="34" rx="14" fill="#5967E4" opacity="0.8" />

      <circle cx="190" cy="38" r="14" fill="#7C89EF" opacity="0.7" />
      <rect x="178" y="56" width="24" height="30" rx="12" fill="#7C89EF" opacity="0.7" />

      {/* Connecting dots */}
      <circle cx="115" cy="50" r="3" fill="#E0ED80" />
      <circle cx="165" cy="50" r="3" fill="#E0ED80" />
      <circle cx="140" cy="75" r="4" fill="#BDC3F6" />

      {/* Decorative elements */}
      <circle cx="50" cy="30" r="6" fill="#E8EAF5" />
      <circle cx="230" cy="25" r="5" fill="#E8EAF5" />
      <circle cx="60" cy="75" r="4" fill="#E0ED80" opacity="0.6" />
      <circle cx="220" cy="70" r="4" fill="#BDC3F6" opacity="0.5" />
    </svg>
  )
}

export default function TeamSelect({ onSelect }: Props) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [customTeam, setCustomTeam] = useState('')

  const filtered = TEAMS.filter(t => t.toLowerCase().includes(search.toLowerCase()))

  const handleSelect = (team: string) => {
    if (team === '__custom__') {
      setSelected('__custom__')
      setShowCustom(true)
    } else {
      setSelected(team)
      setShowCustom(false)
    }
  }

  const handleContinue = () => {
    if (selected === '__custom__' && customTeam.trim()) {
      onSelect(customTeam.trim(), customTeam.trim())
    } else if (selected && selected !== '__custom__') {
      onSelect(selected, '')
    }
  }

  const canContinue = selected && selected !== '__custom__' || (selected === '__custom__' && customTeam.trim().length > 0)

  return (
    <div className="animate-slide-up max-w-lg mx-auto px-4 py-6">
      <ProgressBar current={1} total={11} />

      <TeamIllustration />

      <h2 className="text-2xl font-bold text-[#282A30] mb-2">Which team are you evaluating?</h2>
      <p className="text-[#92959B] mb-2 text-sm">
        You can only evaluate one team at a time. If you&apos;re part of multiple teams, please submit a separate response for each.
      </p>
      <div className="bg-gradient-to-r from-[#E8EAF5] to-[#BDC3F6] text-[#3E4FE0] text-xs font-medium px-3 py-2 rounded-lg mb-5 inline-block">
        💡 Part of multiple teams? Submit once per team.
      </div>

      <input
        type="text"
        placeholder="Search teams..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="input-field mb-3"
      />

      <div className="space-y-2 max-h-64 overflow-y-auto mb-4 stagger-children">
        {filtered.map(team => (
          <button
            key={team}
            onClick={() => handleSelect(team)}
            className={`option-card ${selected === team ? 'selected' : ''}`}
          >
            {team}
          </button>
        ))}
        <button
          onClick={() => handleSelect('__custom__')}
          className={`option-card text-[#92959B] ${selected === '__custom__' ? 'selected' : ''}`}
        >
          My team isn&apos;t listed…
        </button>
      </div>

      {showCustom && (
        <input
          type="text"
          placeholder="Enter your team name"
          value={customTeam}
          onChange={e => setCustomTeam(e.target.value)}
          className="input-field mb-4 border-[#3E4FE0]"
          style={{ borderColor: '#3E4FE0' }}
          autoFocus
        />
      )}

      <button
        onClick={handleContinue}
        disabled={!canContinue}
        className={`btn-primary w-full py-4 text-base mt-2 ${!canContinue ? 'opacity-40 cursor-not-allowed !shadow-none' : ''}`}
      >
        Continue →
      </button>
    </div>
  )
}
