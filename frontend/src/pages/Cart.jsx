import { useState } from 'react'
import { useCart } from '../state/CartContext.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? ''

export default function Cart() {
  const { items, subtotal, increment, decrement, remove, clear } = useCart()
  const [status, setStatus] = useState('idle')
  const [orderId, setOrderId] = useState(null)
  const tax = +(subtotal * 0.08).toFixed(2)
  const total = +(subtotal + tax).toFixed(2)

  const checkout = async () => {
    try {
      setStatus('loading')
      if (API_BASE_URL) {
        const res = await fetch(`${API_BASE_URL}/api/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        })
        if (!res.ok) throw new Error('Checkout failed')
        const data = await res.json()
        setOrderId(data.orderId)
        clear()
        setStatus('success')
      } else {
        // Simulate checkout in frontend-only mode
        await new Promise((r) => setTimeout(r, 300))
        const fakeOrderId = `ORDER-${Date.now()}`
        setOrderId(fakeOrderId)
        clear()
        setStatus('success')
      }
    } catch (e) {
      setStatus('error')
    }
  }

  if (!items.length && status !== 'success') {
    return <p className="text-slate-600">Your cart is empty.</p>
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <section className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
            <div className="flex flex-1 items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{item.name}</h3>
                <p className="text-sm text-slate-600">${item.price.toFixed(2)}</p>
                <div className="mt-2 inline-flex items-center rounded-xl border border-slate-200">
                  <button className="h-8 w-8" onClick={() => decrement(item.id)}>-</button>
                  <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                  <button className="h-8 w-8" onClick={() => increment(item.id)}>+</button>
                </div>
              </div>
              <div className="text-right">
                <button className="text-sm text-rose-600" onClick={() => remove(item.id)}>Remove</button>
                <div className="mt-6 font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}

        {status === 'success' ? (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800">
            Order placed! ID: {orderId}
          </div>
        ) : null}
        {status === 'error' ? (
          <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-rose-800">
            Checkout failed. Please try again.
          </div>
        ) : null}
      </section>

      <aside className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t pt-3 text-base font-semibold text-slate-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={checkout}
          disabled={!items.length || status === 'loading'}
          className="mt-2 w-full rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Processing...' : 'Checkout'}
        </button>
      </aside>
    </div>
  )
}


