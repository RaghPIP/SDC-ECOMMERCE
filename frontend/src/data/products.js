// Local sample product data to allow the frontend to run without the backend.
// Keep fields used by the UI: id, brand, name, subtitle, price, images, rating, reviewCount, badges, description, variants, reviews
const products = [
  {
    id: 'aurora-headphones-001',
    brand: 'Aurora Audio',
    name: 'Aurora Pulse Wireless Headphones',
    subtitle: 'Adaptive noise cancellation, studio-grade sound, 40-hour battery',
    price: 129.99,
    originalPrice: 179.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 184,
    badges: ['Bestseller', '2-year warranty included'],
    description:
      'Crafted for creators and music lovers alike, the Aurora Pulse headphones deliver detailed sound with a rich low end and crystal-clear highs.',
    images: [
      { src: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=1200&q=80', alt: 'Aurora Pulse wireless headphones' },
    ],
    variants: [
      { id: 'variant-midnight', label: 'Midnight Black', swatch: '#111827', stockStatus: 'In stock - ships today' },
      { id: 'variant-aurora-blue', label: 'Aurora Blue', swatch: '#1f4b99', stockStatus: 'Low stock - only 6 left' },
    ],
    reviews: [
      { id: 'r1', author: 'Alex', rating: 5, title: 'Great', body: 'Excellent sound', date: '2025-02-04' },
    ],
  },
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
    description: 'True wireless buds with immersive sound and clear calls.',
    images: [
      { src: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?auto=format&fit=crop&w=1200&q=80', alt: 'Solstice Air Buds Pro' },
    ],
    variants: [
      { id: 'variant-snow', label: 'Snow White', swatch: '#F3F4F6', stockStatus: 'In stock - ships today' },
    ],
    reviews: [],
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
    images: [
      { src: 'https://images.unsplash.com/photo-1518443895914-6a4a8c54a053?auto=format&fit=crop&w=1200&q=80', alt: 'Lumen Smart Speaker' },
    ],
    variants: [],
    reviews: [],
  },
  {
    id: 'zenbook-air-007',
    brand: 'ZenBook',
    name: 'ZenBook Air 14',
    subtitle: 'Ultra-thin laptop, 14" OLED, 12-core CPU, 16GB RAM',
    price: 999.99,
    originalPrice: 1199.99,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 342,
    badges: ['Editors choice', 'Lightweight'],
    description: 'The ZenBook Air balances performance and portability with an OLED display and long battery life—perfect for creators on the go.',
    images: [
      { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80', alt: 'ZenBook Air laptop' },
    ],
    variants: [
      { id: 'zen-sterling', label: 'Sterling Silver', swatch: '#E6E9F2', stockStatus: 'In stock' },
      { id: 'zen-midnight', label: 'Midnight Blue', swatch: '#0B2545', stockStatus: 'Pre-order' },
    ],
    reviews: [
      { id: 'r10', author: 'Sam', rating: 5, title: 'Fantastic ultrabook', body: 'Light, fast and beautiful display.', date: '2025-03-12' },
    ],
  },
  {
    id: 'kepler-keys-005',
    brand: 'Kepler',
    name: 'Kepler Lumen Keyboard',
    subtitle: 'Light-emitting mechanical keyboard, per-key RGB, hot-swap',
    price: 129.0,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 211,
    badges: ['Creator favorite'],
    description: 'Premium mechanical keyboard with per-key RGB, hot-swappable sockets and customizable firmware.',
    images: [
      { src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80', alt: 'Kepler mechanical keyboard' },
    ],
    variants: [
      { id: 'variant-linear', label: 'Linear switches', swatch: '#64748B', stockStatus: 'In stock - ships today' },
      { id: 'variant-tactile', label: 'Tactile switches', swatch: '#475569', stockStatus: 'Low stock - only 4 left' },
    ],
    reviews: [],
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
    images: [
      { src: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=1200&q=80', alt: 'Orion Neo Smartwatch' },
    ],
    variants: [
      { id: 'variant-onyx', label: 'Onyx', swatch: '#0F172A', stockStatus: 'In stock - ships today' },
      { id: 'variant-sage', label: 'Sage', swatch: '#94A3B8', stockStatus: 'In stock - ships today' },
    ],
    reviews: [],
  },
]

export default products

