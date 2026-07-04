import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById, products } from '../data/products.js'
import WhatsAppShare from '../components/WhatsAppShare.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart } = useApp()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl mb-4">Product not found</h1>
        <Link to="/products" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const inquiryMailto = `/inquiry?product=${encodeURIComponent(product.name)}`

  function handleAddToCart() {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <Reveal direction="scale" as="div" className="relative">
          {product.bestSeller && (
            <span className="absolute top-4 left-4 z-10 bg-maroon text-gold-light text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full animate-ribbon-glow">
              🔥 Bestseller
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-sm object-cover card-shadow transition-transform duration-700 hover:scale-[1.03]"
          />
        </Reveal>
        <Reveal direction="up" delay={150}>
          <p className="eyebrow">{product.category}</p>
          <h1 className="font-display text-3xl mt-1">{product.name}</h1>
          <p className="text-2xl text-maroon font-semibold mt-3">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="text-ink/70 mt-5 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm font-medium text-ink/70">Quantity</span>
            <div className="flex items-center border border-gold/40 rounded-sm">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-maroon hover:bg-gold/10 transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center text-maroon hover:bg-gold/10 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm font-medium tracking-wide transition-all duration-300 ${
                added ? 'bg-green-700 text-cream' : 'bg-gold text-ink hover:bg-gold-dark hover:scale-105'
              }`}
            >
              {added ? (
                <>
                  <span className="animate-scale-in">✓</span> Added to Cart
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
            <Link to={inquiryMailto} className="btn-outline hover:scale-105 transition-transform">
              Enquire About This
            </Link>
            <WhatsAppShare product={product} />
          </div>

          <div className="mt-8 border-t border-gold/20 pt-6 text-sm text-ink/60 space-y-1">
            <p>📞 Call to order: 9428497454</p>
            <p>💬 WhatsApp: 9426855654</p>
            <p>📍 1st Floor, Shoppers Plaza, Parimal Chowk, Waghawadi Road, Bhavnagar.</p>
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <Reveal>
            <h2 className="text-2xl mb-6">You may also like</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 100} direction="up">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
