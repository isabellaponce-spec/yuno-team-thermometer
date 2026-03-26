'use client'
import { useState } from 'react'
import { TEAMS } from '@/lib/teams'
import ProgressBar from './ProgressBar'

interface Props {
  onSelect: (team: string, customTeam: string) => void
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
    <div className="animate-slide-up max-w-lg mx-auto px-4 py-8">
      <ProgressBar current={1} total={11} />

      <h2 className="text-2xl font-bold text-[#282A30] mb-2">Which team are you evaluating?</h2>
      <p className="text-gray-500 mb-2 text-sm">
        You can only evaluate one team at a time. If you're part of multiple teams, please submit a separate response for each.
      </p>
      <div className="bg-[#E8EAF5] text-[#3E4FE0] text-xs font-medium px-3 py-2 rounded-lg mb-5 inline-block">
        💡 Part of multiple teams? Submit once per team — each evaluation is for one team only.
      </div>

      <input
        type="text"
        placeholder="Search teams..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border-2 border-[#E8EAF5] rounded-xl px-4 py-3 mb-3 text-sm outline-none focus:border-[#3E4FE0] bg-white"
      />

      <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
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
          className={`option-card text-gray-400 ${selected === '__custom__' ? 'selected' : ''}`}
        >
          My team isn't listed…
        </button>
      </div>

      {showCustom && (
        <input
          type="text"
          placeholder="Enter your team name"
          value={customTeam}
          onChange={e => setCustomTeam(e.target.value)}
          className="w-full border-2 border-[#3E4FE0] rounded-xl px-4 py-3 mb-4 text-sm outline-none bg-white"
          autoFocus
        />
      )}

      <button
        onClick={handleContinue}
        disabled={!canContinue}
        className={`btn-primary w-full py-4 text-base mt-2 ${!canContinue ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        Continue →
      </button>
    </div>
  )
}
