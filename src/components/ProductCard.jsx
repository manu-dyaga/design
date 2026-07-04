import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import WhatsAppShare from './WhatsAppShare.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useApp()
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div className="group relative bg-white rounded-sm overflow-hidden card-shadow border border-gold/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      {product.bestSeller && (
        <span className="absolute top-3 left-3 z-10 bg-maroon text-gold-light text-[10px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full animate-ribbon-glow">
          🔥 Bestseller
        </span>
      )}

      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-4">
        <p className="eyebrow">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-display text-lg mt-1 text-ink hover:text-maroon transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-maroon font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
          <WhatsAppShare product={product} />
        </div>

        <button
          onClick={handleAddToCart}
          className={`mt-3 w-full inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
            added
              ? 'bg-green-700 text-cream'
              : 'bg-gold text-ink hover:bg-gold-dark hover:scale-[1.02]'
          }`}
        >
          {added ? (
            <>
              <span className="animate-scale-in">✓</span> Added to Cart
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}
