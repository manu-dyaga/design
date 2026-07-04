import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Cart() {
  const { cart, removeFromCart, updateCartQty, clearCart, cartTotal, cartCount } = useApp()

  const checkoutMessage = encodeURIComponent(
    `Hi Hastmelap! I'd like to order:\n${cart
      .map((item) => `• ${item.name} x${item.qty} — ₹${(item.price * item.qty).toLocaleString('en-IN')}`)
      .join('\n')}\n\nTotal: ₹${cartTotal.toLocaleString('en-IN')}`
  )
  const whatsappCheckoutUrl = `https://wa.me/919426855654?text=${checkoutMessage}`

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <Reveal direction="scale">
          <div className="text-6xl mb-4 animate-float">🛍️</div>
          <h1 className="font-display text-2xl text-maroon mb-2">Your cart is empty</h1>
          <p className="text-ink/60 mb-6">Browse the collection and add a few favourites to your cart.</p>
          <Link to="/products" className="btn-primary">
            Shop the Collection
          </Link>
        </Reveal>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Reveal>
        <p className="eyebrow">Your Selection</p>
        <h1 className="text-3xl mt-1 mb-8">Shopping Cart ({cartCount})</h1>
      </Reveal>

      <div className="space-y-4">
        {cart.map((item, i) => (
          <Reveal key={item.id} delay={i * 80} direction="up">
            <div className="flex items-center gap-4 bg-white p-4 rounded-sm card-shadow border border-gold/10 transition-shadow hover:shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-cover rounded-sm flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="eyebrow">{item.category}</p>
                <h3 className="font-display text-lg text-ink truncate">{item.name}</h3>
                <p className="text-maroon font-semibold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
              </div>

              <div className="flex items-center border border-gold/40 rounded-sm">
                <button
                  onClick={() => updateCartQty(item.id, item.qty - 1)}
                  className="w-8 h-8 flex items-center justify-center text-maroon hover:bg-gold/10 transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{item.qty}</span>
                <button
                  onClick={() => updateCartQty(item.id, item.qty + 1)}
                  className="w-8 h-8 flex items-center justify-center text-maroon hover:bg-gold/10 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-ink/40 hover:text-red-600 transition-colors p-2"
                aria-label={`Remove ${item.name}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                </svg>
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={150} direction="up">
        <div className="mt-8 bg-white p-6 rounded-sm card-shadow border border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-ink/60">Estimated Total</p>
            <p className="text-2xl font-semibold text-maroon">₹{cartTotal.toLocaleString('en-IN')}</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => confirm('Clear your entire cart?') && clearCart()}
              className="btn-outline"
            >
              Clear Cart
            </button>
            <a
              href={whatsappCheckoutUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary hover:scale-105 transition-transform"
            >
              Checkout on WhatsApp
            </a>
          </div>
        </div>
      </Reveal>

      <p className="text-xs text-ink/50 mt-4 text-center">
        This is a demo cart — checkout sends your order summary to Hastmelap on WhatsApp for confirmation.
        For real-time online payments, connect a gateway like Razorpay or Stripe.
      </p>
    </div>
  )
}
