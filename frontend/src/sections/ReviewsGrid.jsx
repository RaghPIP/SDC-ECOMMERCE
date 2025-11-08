import RatingStars from './RatingStars.jsx'

export default function ReviewsGrid({ reviews = [] }) {
  if (!reviews.length) return null
  return (
    <section className="mt-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Customer reviews</h2>
          <p className="text-sm text-slate-500">Real stories from people who bought this product</p>
        </div>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <RatingStars value={review.rating} />
            <div>
              <h3 className="text-base font-semibold text-slate-900">{review.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{review.author}</p>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{review.body}</p>
            <p className="mt-auto text-xs uppercase tracking-wide text-slate-400">{review.date}</p>
          </article>
        ))}
      </div>
    </section>
  )
}


