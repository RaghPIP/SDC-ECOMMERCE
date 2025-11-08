import { useEffect, useMemo, useRef, useState } from 'react'
import RatingStars from './RatingStars.jsx'
import ProductHighlights from './ProductHighlights.jsx'

const formatCurrency = (value, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)

export default function ProductSection({ product, onAddToCart }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id ?? null)
  const [quantity, setQuantity] = useState(1)
  const [feedback, setFeedback] = useState('')
  const feedbackTimeoutRef = useRef(null)

  useEffect(() => {
    setSelectedImageIndex(0)
    setSelectedVariantId(product.variants?.[0]?.id ?? null)
    setQuantity(1)
    setFeedback('')
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current)
      feedbackTimeoutRef.current = null
    }
  }, [product])

  useEffect(
    () => () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current)
      }
    },
    [],
  )

  const selectedVariant = useMemo(
    () => product.variants?.find((variant) => variant.id === selectedVariantId) ?? null,
    [product.variants, selectedVariantId],
  )

  const discountPercentage = useMemo(() => {
    if (!product.originalPrice || product.originalPrice <= product.price) return null
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  }, [product.originalPrice, product.price])

  const handleAddToCart = () => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current)
    }
    onAddToCart?.()
    setFeedback(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart`)
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('')
      feedbackTimeoutRef.current = null
    }, 2000)
  }

  const handleQuantityChange = (delta) => {
    setQuantity((current) => Math.max(1, current + delta))
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
      <section className="space-y-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <img
            src={product.images[selectedImageIndex]?.src}
            alt={product.images[selectedImageIndex]?.alt ?? product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {product.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setSelectedImageIndex(index)}
              className={`relative h-20 w-20 overflow-hidden rounded-2xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                selectedImageIndex === index
                  ? 'border-indigo-500 ring-2 ring-indigo-200'
                  : 'border-transparent hover:border-indigo-200'
              }`}
            >
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Why you'll love it</h3>
          <ProductHighlights highlights={product.highlights} />
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">{product.brand}</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">{product.subtitle}</p>
        </div>

        <RatingStars value={product.rating} count={product.reviewCount} />

        <div className="flex flex-wrap items-end gap-3">
          <span className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            {formatCurrency(product.price, product.currency)}
          </span>
          {product.originalPrice ? (
            <span className="text-lg text-slate-400 line-through">
              {formatCurrency(product.originalPrice, product.currency)}
            </span>
          ) : null}
          {discountPercentage ? (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
              Save {discountPercentage}%
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {product.badges?.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700"
            >
              {badge}
            </span>
          ))}
        </div>

        {product.variants?.length ? (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Select color</h3>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    selectedVariantId === variant.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200'
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: variant.swatch }}
                    aria-hidden="true"
                  />
                  {variant.label}
                </button>
              ))}
            </div>
            {selectedVariant?.stockStatus ? (
              <p className="text-sm text-emerald-600">{selectedVariant.stockStatus}</p>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              className="h-11 w-11 text-lg font-semibold transition hover:text-indigo-600"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-12 text-center text-base font-semibold">{quantity}</span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              className="h-11 w-11 text-lg font-semibold transition hover:text-indigo-600"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Add to cart
          </button>
        </div>

        {feedback ? <p className="text-sm font-medium text-emerald-600">{feedback}</p> : null}

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Product details</h2>
          <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">What's included</h3>
            <ul className="mt-2 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {product.includedItems?.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Shipping & returns</h3>
            <p className="mt-1 text-sm text-slate-600">{product.shipping}</p>
            <p className="mt-1 text-sm text-slate-600">{product.returns}</p>
          </div>
        </div>
      </section>
    </div>
  )
}


