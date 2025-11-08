export default function ProductHighlights({ highlights = [] }) {
  if (!highlights.length) return null
  return (
    <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
      {highlights.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}


