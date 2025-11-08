export default function RatingStars({ value = 0, count }) {
  const filledStars = Math.floor(value)
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            className={`h-5 w-5 ${index < filledStars ? 'text-yellow-400' : 'text-slate-200'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.631a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.084 2.24a1 1 0 00-.364 1.118l1.18 3.63c.3.922-.755 1.688-1.54 1.118l-3.084-2.239a1 1 0 00-1.176 0l-3.084 2.24c-.784.57-1.838-.197-1.539-1.118l1.18-3.631a1 1 0 00-.364-1.118l-3.084-2.24c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.18-3.631z" />
          </svg>
        ))}
      </div>
      <span className="font-medium text-slate-700">{value.toFixed(1)}</span>
      {typeof count === 'number' ? (
        <span className="text-slate-500">({count.toLocaleString()} reviews)</span>
      ) : null}
    </div>
  )
}


