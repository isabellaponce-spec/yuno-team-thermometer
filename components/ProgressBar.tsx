interface Props {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100)
  // Thermometer fill: map percentage to pixel height (max tube ~68px)
  const fillH = Math.round((pct / 100) * 68)

  return (
    <div className="w-full mb-8">
      <div className="flex items-center gap-4">
        {/* Mini thermometer */}
        <div className="flex-shrink-0 relative" style={{ width: 32, height: 100 }}>
          <svg viewBox="0 0 32 100" width="32" height="100" fill="none">
            <defs>
              <linearGradient id="progFill" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#1726A6" />
                <stop offset="50%" stopColor="#3E4FE0" />
                <stop offset="100%" stopColor="#7C89EF" />
              </linearGradient>
              <clipPath id="thermoMiniClip">
                <rect x="9" y="6" width="14" height="68" rx="7" />
                <circle cx="16" cy="84" r="12" />
              </clipPath>
            </defs>

            {/* Outer shell */}
            <rect x="9" y="6" width="14" height="68" rx="7"
              fill="#E8EAF5" stroke="#BDC3F6" strokeWidth="1" />
            <circle cx="16" cy="84" r="12"
              fill="#E8EAF5" stroke="#BDC3F6" strokeWidth="1" />

            {/* Fill */}
            <g clipPath="url(#thermoMiniClip)">
              {/* Bulb always filled */}
              <circle cx="16" cy="84" r="11" fill="url(#progFill)" />
              {/* Column fill - grows from bottom of tube */}
              <rect
                x="11" y={74 - fillH} width="10" rx="5"
                height={fillH + 2}
                fill="url(#progFill)"
                style={{ transition: 'y 0.7s ease-out, height 0.7s ease-out' }}
              />
            </g>

            {/* Glass shine */}
            <rect x="12" y="10" width="3" height="58" rx="1.5" fill="white" opacity="0.25" />

            {/* Top cap */}
            <rect x="11" y="4" width="10" height="5" rx="2.5" fill="#BDC3F6" />

            {/* Percentage label next to thermometer */}
            {pct === 100 && (
              <circle cx="16" cy="84" r="4" fill="#E0ED80">
                <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}
          </svg>
        </div>

        {/* Text info + bar */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-[#92959B]">
              Question {current} of {total}
            </span>
            <span className="text-xs font-bold text-[#3E4FE0]">{pct}%</span>
          </div>
          <div className="h-1.5 bg-[#E8EAF5] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(90deg, #3E4FE0 0%, #5967E4 50%, #7C89EF 100%)',
              }}
            />
          </div>
          {/* Dimension dots */}
          <div className="flex justify-between mt-2 px-0.5">
            {Array.from({ length: total }, (_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: 6,
                  height: 6,
                  background: i < current ? '#3E4FE0' : i === current ? '#E0ED80' : '#E8EAF5',
                  transform: i === current - 1 ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
