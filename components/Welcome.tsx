'use client'
import ThermometerHero from './ThermometerHero'

interface Props {
  onStart: () => void
}

export default function Welcome({ onStart }: Props) {
  return (
    <div className="animate-slide-up flex flex-col items-center text-center max-w-lg mx-auto px-4 py-6 relative">
      {/* Background decorative blobs */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#E8EAF5] opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-16 w-32 h-32 rounded-full bg-[#E0ED80] opacity-25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-24 h-24 rounded-full bg-[#BDC3F6] opacity-30 blur-2xl pointer-events-none" />

      <img
        src="/logo-yuno-blue.svg"
        alt="Yuno"
        className="h-7 mb-4 opacity-80"
      />

      <ThermometerHero />

      <h1 className="text-4xl font-extrabold text-[#282A30] mb-3 leading-tight mt-1">
        Team Thermometer
      </h1>
      <p className="text-lg text-[#92959B] mb-5 font-medium">
        How&apos;s your team really doing?
      </p>

      <p className="text-[#92959B] leading-relaxed mb-7 text-sm max-w-sm">
        A monthly pulse check across 9 key dimensions of team health.
        Results help us understand how teams are doing and where we can
        improve together.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {[
          { icon: '🔒', label: 'Anonymous' },
          { icon: '⚡', label: '5 minutes' },
          { icon: '📊', label: 'Monthly' },
        ].map(pill => (
          <span key={pill.label} className="pill">
            {pill.icon} {pill.label}
          </span>
        ))}
      </div>

      <button onClick={onStart} className="btn-primary text-lg px-14 py-4">
        Let&apos;s go →
      </button>

      <p className="mt-10 text-xs text-[#BDC3F6] font-medium">People Team · Yuno</p>
    </div>
  )
}
