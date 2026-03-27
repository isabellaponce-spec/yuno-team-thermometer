'use client'
import { useEffect, useState } from 'react'

export default function ThermometerHero() {
  const [mounted, setMounted] = useState(false)
  const [fillLevel, setFillLevel] = useState(0)

  useEffect(() => {
    setMounted(true)
    // Animate fill from 0 to 72% over 2 seconds
    const timer = setTimeout(() => setFillLevel(72), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative w-64 h-80 mx-auto transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-40 h-40 rounded-full blur-[80px] animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, rgba(62,79,224,0.3) 0%, rgba(224,237,128,0.15) 60%, transparent 100%)' }}
        />
      </div>

      {/* Floating particles */}
      {mounted && (
        <>
          <Particle delay={0} x={20} y={60} size={4} color="#3E4FE0" duration={3} />
          <Particle delay={0.5} x={75} y={40} size={3} color="#E0ED80" duration={4} />
          <Particle delay={1} x={85} y={70} size={5} color="#3E4FE0" duration={3.5} />
          <Particle delay={1.5} x={15} y={30} size={3} color="#E0ED80" duration={4.5} />
          <Particle delay={0.8} x={60} y={20} size={4} color="#E8EAF5" duration={3.2} />
          <Particle delay={2} x={40} y={80} size={3} color="#3E4FE0" duration={3.8} />
          <Particle delay={0.3} x={90} y={50} size={4} color="#E0ED80" duration={4.2} />
          <Particle delay={1.2} x={10} y={75} size={3} color="#E8EAF5" duration={3.6} />
        </>
      )}

      {/* Main thermometer SVG */}
      <svg
        viewBox="0 0 200 320"
        className="relative z-10 w-full h-full drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 8px 32px rgba(62,79,224,0.2))' }}
      >
        <defs>
          {/* Glass gradient for the tube */}
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
          </linearGradient>

          {/* Fill gradient - Yuno blue to green */}
          <linearGradient id="fillGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#3E4FE0" />
            <stop offset="50%" stopColor="#5B6BF0" />
            <stop offset="100%" stopColor="#7B8FF8" />
          </linearGradient>

          {/* Bulb radial gradient */}
          <radialGradient id="bulbGrad" cx="0.45" cy="0.45" r="0.55">
            <stop offset="0%" stopColor="#7B8FF8" />
            <stop offset="60%" stopColor="#3E4FE0" />
            <stop offset="100%" stopColor="#2A3BC0" />
          </radialGradient>

          {/* Glass shine */}
          <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Clip path for the thermometer shape */}
          <clipPath id="thermoClip">
            {/* Tube */}
            <rect x="75" y="30" width="50" height="200" rx="25" />
            {/* Bulb */}
            <circle cx="100" cy="255" r="42" />
          </clipPath>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer body - glass look */}
        <g>
          {/* Thermometer outline */}
          <rect x="75" y="30" width="50" height="200" rx="25"
            fill="rgba(232,234,245,0.4)" stroke="rgba(62,79,224,0.2)" strokeWidth="2" />
          <circle cx="100" cy="255" r="42"
            fill="rgba(232,234,245,0.4)" stroke="rgba(62,79,224,0.2)" strokeWidth="2" />

          {/* Inner tube track */}
          <rect x="85" y="40" width="30" height="185" rx="15"
            fill="rgba(232,234,245,0.3)" />
        </g>

        {/* Mercury / Fill - animated */}
        <g clipPath="url(#thermoClip)">
          {/* Bulb fill - always full */}
          <circle cx="100" cy="255" r="38" fill="url(#bulbGrad)">
            {/* Subtle pulse */}
            <animate attributeName="r" values="36;38;36" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Column fill - animated height */}
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

          {/* Bubble rising animation */}
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

        {/* Glass reflection / shine */}
        <rect x="88" y="40" width="8" height="180" rx="4" fill="url(#shine)" opacity="0.6" />
        <ellipse cx="100" cy="250" rx="12" ry="8" fill="rgba(255,255,255,0.1)" />

        {/* Scale marks */}
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i} opacity={0.4}>
            <line
              x1="128" y1={195 - i * 40} x2="140" y2={195 - i * 40}
              stroke="#3E4FE0" strokeWidth="2" strokeLinecap="round"
            />
            {i > 0 && (
              <line
                x1="128" y1={195 - i * 40 + 20} x2="134" y2={195 - i * 40 + 20}
                stroke="#3E4FE0" strokeWidth="1" strokeLinecap="round" opacity="0.5"
              />
            )}
          </g>
        ))}

        {/* Temperature label with animation */}
        <g className="animate-fade-in" style={{ animationDelay: '2s', animationFillMode: 'both' }}>
          <rect x="138" y="88" width="52" height="26" rx="13" fill="rgba(62,79,224,0.1)" />
          <text x="164" y="106" textAnchor="middle" fill="#3E4FE0" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            72%
          </text>
        </g>

        {/* Top cap */}
        <rect x="85" y="26" width="30" height="12" rx="6" fill="rgba(62,79,224,0.15)" />
      </svg>

      {/* Bottom glow reflection */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-8 rounded-full blur-xl"
        style={{ background: 'rgba(62,79,224,0.25)' }}
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
