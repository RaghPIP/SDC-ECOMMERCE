const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const featuredProduct = {
  id: 'aurora-headphones-001',
  brand: 'Aurora Audio',
  name: 'Aurora Pulse Wireless Headphones',
  subtitle: 'Adaptive noise cancellation, studio-grade sound, 40-hour battery',
  price: 129.99,
  originalPrice: 179.99,
  currency: 'USD',
  rating: 4.6,
  reviewCount: 184,
  badges: ['Bestseller', '2-year warranty included', 'Free express shipping'],
  description:
    "Crafted for creators and music lovers alike, the Aurora Pulse headphones deliver detailed sound with a rich low end and crystal-clear highs. Soft-touch ear cushions and adaptive headband engineering offer all-day comfort, while the Aurora companion app lets you tailor EQ presets to your taste.",
  highlights: [
    'Hybrid active noise cancellation with transparency mode',
    '40-hour battery life with USB-C fast charging',
    'Multipoint Bluetooth pairing for seamless device switching',
    'Built-in beamforming microphones for crisp call quality',
  ],
  includedItems: [
    'Aurora Pulse wireless headphones',
    'USB-C fast charging cable',
    '3.5 mm audio cable with inline mic',
    'Magnetic travel case with cable pouch',
    'Quick-start guide and warranty card',
  ],
  shipping: 'Free 2-day shipping within the contiguous US. International delivery in 5-7 business days.',
  returns: '30-day hassle-free returns. 2-year limited warranty with optional accidental coverage add-on.',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Aurora Pulse wireless headphones on a desk',
    },
    {
      src: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1200&q=80',
      alt: 'Close-up of Aurora Pulse ear cushions',
    },
    {
      src: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Aurora Pulse headphones folded inside travel case',
    },
    {
      src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
      alt: 'Aurora Pulse headphones lifestyle photo by window',
    },
  ],
  variants: [
    {
      id: 'variant-midnight',
      label: 'Midnight Black',
      swatch: '#111827',
      stockStatus: 'In stock - ships today',
    },
    {
      id: 'variant-aurora-blue',
      label: 'Aurora Blue',
      swatch: '#1f4b99',
      stockStatus: 'Low stock - only 6 left',
    },
    {
      id: 'variant-starlight',
      label: 'Starlight Silver',
      swatch: '#d1d5db',
      stockStatus: 'Pre-order - ships in 2 weeks',
    },
  ],
  reviews: [
    {
      id: 'review-001',
      author: 'Alex Rivera',
      rating: 5,
      title: 'Exactly what I needed for remote work',
      body: 'These headphones block out my noisy apartment and the mic quality is surprisingly good. Battery easily lasts through back-to-back meetings and editing sessions.',
      date: 'February 04, 2025',
    },
    {
      id: 'review-002',
      author: 'Priya Mehta',
      rating: 4,
      title: 'Great sound, cozy fit',
      body: 'Love the sound signature right out of the box. The app presets are handy. Took off one star because touch controls take a day or two to get used to.',
      date: 'January 22, 2025',
    },
    {
      id: 'review-003',
      author: 'Noah Patterson',
      rating: 5,
      title: 'Worth the upgrade',
      body: 'I switched from an older pair of over-ear headphones and the difference is night and day. Build quality feels premium and the travel case is genuinely useful.',
      date: 'December 18, 2024',
    },
  ],
  updatedAt: '2025-02-01T09:00:00.000Z',
}

// Additional sample products for listing
const products = [
  featuredProduct,
  {
    id: 'solstice-buds-002',
    brand: 'Solstice',
    name: 'Solstice Air Buds Pro',
    subtitle: 'Spatial audio, IP68, 36-hour case battery',
    price: 89.0,
    originalPrice: 119.0,
    currency: 'USD',
    rating: 4.4,
    reviewCount: 96,
    badges: ['Waterproof', 'Best value'],
    description:
      'True wireless buds with immersive sound and clear calls. Ultra-compact case and robust water resistance for daily carry.',
    highlights: [
      'Spatial audio with head tracking',
      'IP68 dust/water resistance',
      'Wireless charging case',
      'Low-latency gaming mode',
    ],
    includedItems: ['Left & Right earbuds', 'Charging case', 'USB-C cable', '3 pairs ear tips'],
    shipping: 'Free standard shipping. Express options available at checkout.',
    returns: '30-day returns. 1-year warranty.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?auto=format&fit=crop&w=1200&q=80',
        alt: 'Solstice Air Buds Pro on table',
      },
      {
        src: 'https://images.unsplash.com/photo-1518441902117-f26c71ab1f69?auto=format&fit=crop&w=1200&q=80',
        alt: 'Solstice case close up',
      },
    ],
    variants: [
      { id: 'variant-snow', label: 'Snow White', swatch: '#F3F4F6', stockStatus: 'In stock - ships today' },
      { id: 'variant-graphite', label: 'Graphite', swatch: '#4B5563', stockStatus: 'In stock - ships today' },
    ],
    reviews: [],
    updatedAt: '2025-02-01T09:00:00.000Z',
  },
  {
    id: 'lumen-speaker-003',
    brand: 'Lumen',
    name: 'Lumen Smart Speaker Mini',
    subtitle: 'Room-filling sound with voice assistant',
    price: 59.99,
    currency: 'USD',
    rating: 4.2,
    reviewCount: 142,
    badges: ['Smart Home'],
    description: 'Compact smart speaker with rich sound, far-field mics, and seamless smart home control.',
    highlights: ['Dual passive radiators', 'Multi-room audio', 'Wi‑Fi + Bluetooth'],
    includedItems: ['Speaker', 'Power adapter', 'Quick-start guide'],
    shipping: 'Ships in 1-2 business days.',
    returns: '30-day returns. 1-year warranty.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1518443895914-6a4a8c54a053?auto=format&fit=crop&w=1200&q=80',
        alt: 'Lumen Smart Speaker on shelf',
      },
    ],
    variants: [],
    reviews: [],
    updatedAt: '2025-02-01T09:00:00.000Z',
  },
  {
    id: 'orion-watch-004',
    brand: 'Orion',
    name: 'Orion Neo Smartwatch',
    subtitle: 'AMOLED display, GPS, 7-day battery',
    price: 149.99,
    originalPrice: 179.99,
    currency: 'USD',
    rating: 4.3,
    reviewCount: 88,
    badges: ['Fitness tracking'],
    description: 'Track your health and stay connected with a vibrant AMOLED display and built-in GPS.',
    highlights: ['Always-on AMOLED', 'Heart rate + SpO2', '5 ATM water resistance', 'GPS + GLONASS'],
    includedItems: ['Watch body', 'Silicone strap', 'Magnetic charger', 'Quick-start guide'],
    shipping: 'Ships in 1-2 business days.',
    returns: '30-day returns. 1-year warranty.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=1200&q=80',
        alt: 'Orion Neo Smartwatch on wrist',
      },
    ],
    variants: [
      { id: 'variant-onyx', label: 'Onyx', swatch: '#0F172A', stockStatus: 'In stock - ships today' },
      { id: 'variant-sage', label: 'Sage', swatch: '#94A3B8', stockStatus: 'In stock - ships today' },
    ],
    reviews: [],
    updatedAt: '2025-02-01T09:00:00.000Z',
  },
  {
    id: 'kepler-keys-005',
    brand: 'Kepler',
    name: 'Kepler TKL Mechanical Keyboard',
    subtitle: 'Hot-swappable, RGB, aluminum case',
    price: 129.0,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 211,
    badges: ['Creator favorite'],
    description: 'Premium tenkeyless board with gasket mount feel and per-key RGB lighting.',
    highlights: ['Hot-swappable sockets', 'South-facing LEDs', 'PBT keycaps', 'USB-C detachable cable'],
    includedItems: ['Keyboard', 'USB-C cable', 'Keycap puller', 'Switch puller'],
    shipping: 'Ships in 2-3 business days.',
    returns: '30-day returns. 1-year warranty.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
        alt: 'Kepler TKL Mechanical Keyboard on desk',
      },
    ],
    variants: [
      { id: 'variant-linear', label: 'Linear switches', swatch: '#64748B', stockStatus: 'In stock - ships today' },
      { id: 'variant-tactile', label: 'Tactile switches', swatch: '#475569', stockStatus: 'Low stock - only 4 left' },
    ],
    reviews: [],
    updatedAt: '2025-02-01T09:00:00.000Z',
  },
  {
    id: 'zenview-monitor-006',
    brand: 'ZenView',
    name: 'ZenView 27" 4K IPS Monitor',
    subtitle: '99% sRGB, HDR400, USB-C 65W',
    price: 329.99,
    originalPrice: 379.99,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 134,
    badges: ['Creator favorite'],
    description: 'Ultra-sharp 4K panel with excellent color accuracy and single-cable USB-C power.',
    highlights: ['3840x2160 60Hz', 'HDR400', 'USB-C 65W PD', 'Height/tilt/pivot stand'],
    includedItems: ['Monitor', 'Stand', 'USB-C cable', 'HDMI cable', 'Power cable'],
    shipping: 'Free standard shipping.',
    returns: '30-day returns. 3-year warranty.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
        alt: 'ZenView 4K IPS Monitor on desk',
      },
    ],
    variants: [],
    reviews: [],
    updatedAt: '2025-02-01T09:00:00.000Z',
  },
]

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Product list
app.get('/api/products', (_req, res) => {
  res.json(products.map(({ reviews, ...p }) => p))
})

// Single product by id
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id)
  if (!product) return res.status(404).json({ error: 'Product not found' })
  res.json(product)
})

// Back-compat for previous single product route
app.get('/api/product', (_req, res) => {
  res.json(featuredProduct)
})

// Trivial checkout endpoint
app.post('/api/checkout', (req, res) => {
  const { items } = req.body || {}
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' })
  }
  // In a real app you would validate inventory and process payment
  res.json({ ok: true, orderId: `ORDER-${Date.now()}` })
})

app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`)
})

