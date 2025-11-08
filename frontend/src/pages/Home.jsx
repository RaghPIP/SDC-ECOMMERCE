import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import sampleProducts from '../data/products'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? ''

export default function Home() {
  const [status, setStatus] = useState('idle')
  const [products, setProducts] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      try {
        setStatus('loading')
        if (API_BASE_URL) {
          const res = await fetch(`${API_BASE_URL}/api/products`, { signal: controller.signal })
          if (!res.ok) throw new Error('Failed to load products')
          setProducts(await res.json())
        } else {
          // Use bundled sample data when no backend URL is provided
          setProducts(sampleProducts)
        }
        setStatus('success')
      } catch (e) {
        if (e.name === 'AbortError') return
        setStatus('error')
      }
    }
    run()
    return () => controller.abort()
  }, [])

  if (status !== 'success') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="h-44 w-full rounded-xl bg-slate-200/70 animate-pulse" />
            <div className="mt-4 h-6 w-2/3 rounded bg-slate-200/70 animate-pulse" />
            <div className="mt-2 h-5 w-1/2 rounded bg-slate-200/70 animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Latest products</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md"
          >
            <div className="overflow-hidden rounded-xl">
              <img src={p.images?.[0]?.src} alt={p.images?.[0]?.alt || p.name} className="h-44 w-full object-cover transition group-hover:scale-105" />
            </div>
            <div className="mt-4">
              <p className="text-sm uppercase tracking-wide text-slate-500">{p.brand}</p>
              <h3 className="mt-1 line-clamp-1 text-base font-semibold text-slate-900">{p.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{p.subtitle}</p>
              <div className="mt-2 text-lg font-semibold text-slate-900">
                ${p.price.toFixed(2)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


