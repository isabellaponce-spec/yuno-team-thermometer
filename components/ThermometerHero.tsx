'use client'
import { useEffect, useState } from 'react'

export default function ThermometerHero() {
  const [mounted, setMounted] = useState(false)
  const [fillLevel, setFillLevel] = useState(0)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setFillLevel(72), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative w-72 h-80 mx-auto transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-48 h-48 rounded-full blur-[80px] animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, rgba(62,79,224,0.25) 0%, rgba(189,195,246,0.15) 50%, transparent 100%)' }}
        />
      </div>

      {/* Orbiting dots */}
      {mounted && (
        <>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
            <div className="w-3 h-3 rounded-full bg-[#3E4FE0]" style={{ animation: 'orbit 8s linear infinite', '--orbit-radius': '100px' } as React.CSSProperties} />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E0ED80]" style={{ animation: 'orbit 12s linear infinite reverse', '--orbit-radius': '85px' } as React.CSSProperties} />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
            <div className="w-2 h-2 rounded-full bg-[#BDC3F6]" style={{ animation: 'orbit 10s linear infinite', '--orbit-radius': '115px' } as React.CSSProperties} />
          </div>
        </>
      )}

      {/* Floating particles */}
      {mounted && (
        <>
          <Particle delay={0} x={12} y={55} size={6} color="#3E4FE0" duration={3.5} />
          <Particle delay={0.5} x={82} y={35} size={5} color="#E0ED80" duration={4} />
          <Particle delay={1} x={88} y={68} size={8} color="#BDC3F6" duration={3.2} />
          <Particle delay={1.5} x={8} y={25} size={4} color="#E0ED80" duration={4.5} />
          <Particle delay={0.8} x={65} y={15} size={5} color="#E8EAF5" duration={3.8} />
          <Particle delay={2} x={35} y={82} size={4} color="#5967E4" duration={4.2} />
          <Particle delay={0.3} x={92} y={48} size={6} color="#7C89EF" duration={3.6} />
          <Particle delay={1.2} x={5} y={78} size={5} color="#BDC3F6" duration={3.4} />
        </>
      )}

      {/* Main thermometer SVG */}
      <svg
        viewBox="0 0 200 320"
        className="relative z-10 w-full h-full"
        style={{ filter: 'drop-shadow(0 12px 40px rgba(62,79,224,0.18))' }}
      >
        <defs>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>

          <linearGradient id="fillGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#1726A6" />
            <stop offset="40%" stopColor="#3E4FE0" />
            <stop offset="70%" stopColor="#5967E4" />
            <stop offset="100%" stopColor="#7C89EF" />
          </linearGradient>

          <radialGradient id="bulbGrad" cx="0.45" cy="0.45" r="0.55">
            <stop offset="0%" stopColor="#7C89EF" />
            <stop offset="50%" stopColor="#3E4FE0" />
            <stop offset="100%" stopColor="#1726A6" />
          </radialGradient>

          <linearGradient id="greenAccent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E0ED80" />
            <stop offset="100%" stopColor="#d4e060" />
          </linearGradient>

          <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <clipPath id="thermoClip">
            <rect x="75" y="30" width="50" height="200" rx="25" />
            <circle cx="100" cy="255" r="42" />
          </clipPath>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#3E4FE0" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Outer body */}
        <g filter="url(#softShadow)">
          <rect x="75" y="30" width="50" height="200" rx="25"
            fill="rgba(232,234,245,0.5)" stroke="rgba(62,79,224,0.15)" strokeWidth="1.5" />
          <circle cx="100" cy="255" r="42"
            fill="rgba(232,234,245,0.5)" stroke="rgba(62,79,224,0.15)" strokeWidth="1.5" />
        </g>

        {/* Inner track */}
        <rect x="85" y="40" width="30" height="185" rx="15"
          fill="rgba(232,234,245,0.25)" />

        {/* Fill */}
        <g clipPath="url(#thermoClip)">
          <circle cx="100" cy="255" r="38" fill="url(#bulbGrad)">
            <animate attributeName="r" values="36;38;36" dur="2.5s" repeatCount="indefinite" />
          </circle>

          <rect
            x="87"
            width="26"
            rx="13"
            fill="url(#fillGrad)"
            filter="url(#glow)"
            y={mounted ? `${220 - (fillLevel / 100) * 180}` : '220'}
            height={mounted ? `${(fillLevel / 100) * 180 + 35}` : '35'}
            style={{ transition: 'y 2s cubic-bezier(0.34, 1.56, 0.64, 1), height 2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          />

          {/* Bubbles */}
          <circle cx="95" cy="220" r="3" fill="rgba(255,255,255,0.3)">
            <animate attributeName="cy" values="250;160;80" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.6;0" dur="3s" repeatCount="indefinite" />
            <animate attributeName="r" values="2;3;1" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="105" cy="240" r="2" fill="rgba(255,255,255,0.25)">
            <animate attributeName="cy" values="260;180;100" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.5;0" dur="4s" repeatCount="indefinite" />
            <animate attributeName="r" values="1.5;2.5;0.5" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="98" cy="230" r="2.5" fill="rgba(255,255,255,0.2)">
            <animate attributeName="cy" values="255;170;90" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.4;0" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Glass shine */}
        <rect x="88" y="40" width="8" height="180" rx="4" fill="url(#shine)" opacity="0.6" />
        <ellipse cx="100" cy="250" rx="12" ry="8" fill="rgba(255,255,255,0.1)" />

        {/* Scale marks */}
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i} opacity={0.35}>
            <line
              x1="128" y1={195 - i * 40} x2="140" y2={195 - i * 40}
              stroke="#5967E4" strokeWidth="2" strokeLinecap="round"
            />
            {i > 0 && (
              <line
                x1="128" y1={195 - i * 40 + 20} x2="134" y2={195 - i * 40 + 20}
                stroke="#5967E4" strokeWidth="1" strokeLinecap="round" opacity="0.5"
              />
            )}
          </g>
        ))}

        {/* Label badge */}
        <g className="animate-fade-in" style={{ animationDelay: '2s', animationFillMode: 'both' }}>
          <rect x="136" y="84" width="56" height="30" rx="15" fill="url(#greenAccent)" />
          <text x="164" y="104" textAnchor="middle" fill="#282A30" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            72%
          </text>
        </g>

        {/* Top cap */}
        <rect x="85" y="26" width="30" height="12" rx="6" fill="rgba(62,79,224,0.12)" />
      </svg>

      {/* Bottom reflection */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-6 rounded-full blur-xl"
        style={{ background: 'rgba(62,79,224,0.2)' }}
      />
    </div>
  )
}

function Particle({ delay, x, y, size, color, duration }: {
  delay: number; x: number; y: number; size: number; color: string; duration: number
}) {
  return (
    <div
      className="absolute rounded-full animate-float"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        opacity: 0.5,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  )
}
