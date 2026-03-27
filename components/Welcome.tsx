'use client'
import ThermometerHero from './ThermometerHero'

interface Props {
  onStart: () => void
}

export default function Welcome({ onStart }: Props) {
  return (
    <div className="animate-slide-up flex flex-col items-center text-center max-w-lg mx-auto px-4 py-8">
      <img
        src="https://yuno-all-hands-survey.vercel.app/logo-yuno-white.svg"
        alt="Yuno"
        className="h-8 mb-6 invert"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />

      <ThermometerHero />

      <h1 className="text-4xl font-bold text-[#282A30] mb-3 leading-tight mt-2">
        Team Thermometer
      </h1>
      <p className="text-xl text-gray-500 mb-5 font-medium">
        How&apos;s your team really doing?
      </p>

      <p className="text-gray-500 leading-relaxed mb-7 text-base">
        A monthly pulse check across 9 key dimensions of team health.
        Results help us understand how teams are doing and where we can
        improve together — every month, so we can track progress over time.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {['🔒 Anonymous', '⚡ 5 minutes', '📊 Monthly'].map(pill => (
          <span key={pill} className="bg-[#E8EAF5] text-[#3E4FE0] text-sm font-semibold px-4 py-2 rounded-full">
            {pill}
          </span>
        ))}
      </div>

      <button onClick={onStart} className="btn-primary text-lg px-12 py-4">
        Let&apos;s go →
      </button>

      <p className="mt-10 text-xs text-gray-400">People Team · Yuno · Team Thermometer</p>
    </div>
  )
}
