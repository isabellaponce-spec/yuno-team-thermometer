'use client'
import { useState } from 'react'

interface ResponseRow {
  id: string
  created_at: string
  team: string
  custom_team: string | null
  direction: number | null
  accountability: number | null
  motivation: number | null
  external_orientation: number | null
  innovation_learning: number | null
  team_dynamics_trust: number | null
  leadership: number | null
  mentorship: number | null
  apprenticeship: number | null
  open_feedback: string | null
  concern_name: string | null
  concern_text: string | null
}

const DIMENSION_KEYS = [
  { key: 'direction', label: 'Direction' },
  { key: 'accountability', label: 'Accountability' },
  { key: 'motivation', label: 'Motivation' },
  { key: 'external_orientation', label: 'Ext. Orientation' },
  { key: 'innovation_learning', label: 'Innovation' },
  { key: 'team_dynamics_trust', label: 'Dynamics & Trust' },
  { key: 'leadership', label: 'Leadership' },
  { key: 'mentorship', label: 'Mentorship' },
  { key: 'apprenticeship', label: 'Apprenticeship' },
] as const

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [storedPassword, setStoredPassword] = useState('')
  const [responses, setResponses] = useState<ResponseRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchResponses = async (pw: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/responses', {
        headers: { 'x-admin-password': pw },
      })
      if (!res.ok) {
        if (res.status === 401) {
          setError('Invalid password')
          setAuthed(false)
          return
        }
        throw new Error('Failed to fetch')
      }
      const data = await res.json()
      setResponses(data.responses || [])
      setAuthed(true)
      setStoredPassword(pw)
    } catch {
      setError('Failed to load responses')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchResponses(password)
  }

  const handleExport = async () => {
    try {
      const res = await fetch('/api/admin/export', {
        headers: { 'x-admin-password': storedPassword },
      })
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `thermometer-responses-${new Date().toISOString().slice(0, 10)}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('Failed to export')
    }
  }

  const avg = (key: string) => {
    const vals = responses
      .map(r => r[key as keyof ResponseRow] as number | null)
      .filter((v): v is number => v !== null)
    if (vals.length === 0) return '-'
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-[#282A30] mb-2">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mb-6">Enter the admin password to continue.</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border-2 border-[#E8EAF5] rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#3E4FE0] bg-white mb-4"
          />

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#3E4FE0] text-white rounded-2xl py-3 font-semibold text-sm hover:bg-[#3040C0] transition-colors disabled:opacity-40"
          >
            {loading ? 'Loading...' : 'Log in'}
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F8F9FC] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#282A30]">Team Thermometer Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">{responses.length} response{responses.length !== 1 ? 's' : ''} collected</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fetchResponses(storedPassword)}
              className="bg-white border-2 border-[#E8EAF5] text-[#282A30] rounded-2xl px-5 py-2.5 text-sm font-semibold hover:bg-[#E8EAF5] transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={handleExport}
              className="bg-[#3E4FE0] text-white rounded-2xl px-5 py-2.5 text-sm font-semibold hover:bg-[#3040C0] transition-colors"
            >
              Export XLSX
            </button>
          </div>
        </div>

        {/* Averages */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 mb-8">
          {DIMENSION_KEYS.map(d => (
            <div key={d.key} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-[#E8EAF5]">
              <p className="text-xs text-gray-500 mb-1">{d.label}</p>
              <p className="text-2xl font-bold text-[#3E4FE0]">{avg(d.key)}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAF5] overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8EAF5]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Team</th>
                {DIMENSION_KEYS.map(d => (
                  <th key={d.key} className="px-3 py-3 text-center text-xs font-semibold text-gray-500 uppercase">{d.label}</th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Feedback</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Concern</th>
              </tr>
            </thead>
            <tbody>
              {responses.map(r => {
                const hasConcern = !!r.concern_name
                return (
                  <tr
                    key={r.id}
                    className={`border-b border-[#F0F1F5] hover:bg-[#F8F9FC] transition-colors ${hasConcern ? 'bg-amber-50' : ''}`}
                  >
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3 text-[#282A30] font-medium">{r.custom_team || r.team}</td>
                    {DIMENSION_KEYS.map(d => (
                      <td key={d.key} className="px-3 py-3 text-center text-[#282A30]">
                        {r[d.key as keyof ResponseRow] ?? '-'}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate" title={r.open_feedback || ''}>
                      {r.open_feedback || '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {hasConcern ? (
                        <span
                          className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full cursor-help"
                          title={`${r.concern_name}: ${r.concern_text}`}
                        >
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                )
              })}
              {responses.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-4 py-12 text-center text-gray-400">
                    No responses yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
