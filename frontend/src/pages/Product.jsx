import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../state/CartContext.jsx'
import ProductSection from '../sections/ProductSection.jsx'
import ReviewsGrid from '../sections/ReviewsGrid.jsx'
import sampleProducts from '../data/products'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? ''

export default function Product() {
  const { id } = useParams()
  const [status, setStatus] = useState('idle')
  const [product, setProduct] = useState(null)
  const { add } = useCart()

  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      try {
        setStatus('loading')
        if (API_BASE_URL) {
          const res = await fetch(`${API_BASE_URL}/api/products/${id}`, { signal: controller.signal })
          if (!res.ok) throw new Error('Not found')
          setProduct(await res.json())
        } else {
          // Find the product from local sample data
          const local = sampleProducts.find((p) => p.id === id)
          if (!local) throw new Error('Not found')
          setProduct(local)
        }
        setStatus('success')
      } catch (e) {
        if (e.name === 'AbortError') return
        setStatus('error')
      }
    }
    run()
    return () => controller.abort()
  }, [id])

  if (status !== 'success' || !product) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-24 rounded bg-slate-200/70 animate-pulse" />
        <div className="h-[520px] rounded-3xl bg-slate-200/70 animate-pulse" />
      </div>
    )
  }

  return (
    <div>
      <ProductSection product={product} onAddToCart={() => add({ id: product.id, name: product.name, price: product.price, image: product.images?.[0]?.src })} />
      <ReviewsGrid reviews={product.reviews} />
    </div>
  )
}


