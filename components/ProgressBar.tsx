interface Props {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-[#92959B]">
          Step {current} of {total}
        </span>
        <span className="text-xs font-bold text-[#3E4FE0]">{pct}%</span>
      </div>
      <div className="h-2 bg-[#E8EAF5] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #3E4FE0 0%, #5967E4 50%, #7C89EF 100%)',
          }}
        />
      </div>
    </div>
  )
}
