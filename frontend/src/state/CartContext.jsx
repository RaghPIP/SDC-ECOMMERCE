import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: [], // { id, name, price, image, quantity }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT': {
      return action.payload
    }
    case 'ADD': {
      const { id, name, price, image } = action.payload
      const existing = state.items.find((i) => i.id === id)
      const items = existing
        ? state.items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...state.items, { id, name, price, image, quantity: 1 }]
      return { ...state, items }
    }
    case 'REMOVE': {
      return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) }
    }
    case 'INCREMENT': {
      const items = state.items.map((i) => (i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i))
      return { ...state, items }
    }
    case 'DECREMENT': {
      const items = state.items
        .map((i) => (i.id === action.payload.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))
        .filter((i) => i.quantity > 0)
      return { ...state, items }
    }
    case 'CLEAR': {
      return { ...state, items: [] }
    }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart-state')
      if (raw) dispatch({ type: 'INIT', payload: JSON.parse(raw) })
    } catch {}
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart-state', JSON.stringify(state))
    } catch {}
  }, [state])

  const api = useMemo(() => {
    const totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return {
      items: state.items,
      totalQuantity,
      subtotal,
      add: (item) => dispatch({ type: 'ADD', payload: item }),
      remove: (id) => dispatch({ type: 'REMOVE', payload: { id } }),
      increment: (id) => dispatch({ type: 'INCREMENT', payload: { id } }),
      decrement: (id) => dispatch({ type: 'DECREMENT', payload: { id } }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


