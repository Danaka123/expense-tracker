export default function StatsCard({ label, value, sub }) {
  return (
    <div className="card p-4 flex flex-col gap-1">
      <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-display font-medium text-stone-800 leading-tight">{value}</p>
      {sub && <p className="text-xs text-stone-400">{sub}</p>}
    </div>
  )
}
