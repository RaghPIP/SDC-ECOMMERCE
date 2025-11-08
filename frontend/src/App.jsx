import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useCart } from './state/CartContext.jsx'

function App() {
  const navigate = useNavigate()
  const { totalQuantity } = useCart()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div className="flex items-baseline gap-6">
            <Link to="/" className="text-xl font-semibold text-slate-900">
              Nova Commerce
            </Link>
            <nav className="hidden gap-6 text-sm text-slate-600 sm:flex">
              <Link to="/" className="hover:text-indigo-600">Home</Link>
            </nav>
          </div>
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="relative rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Cart
            {totalQuantity > 0 ? (
              <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-500 px-1 text-xs">
                {totalQuantity}
              </span>
            ) : null}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-sm text-slate-500">
          <span>Free worldwide shipping over $50</span>
          <span>Need help? support@novacommerce.com</span>
        </div>
      </footer>
    </div>
  )
}

export default App
