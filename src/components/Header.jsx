import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import MobileLoginModal from './MobileLoginModal.jsx'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/inquiry', label: 'Inquiry' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const { session, logout, cartCount } = useApp()
  const [bump, setBump] = useState(false)

  useEffect(() => {
    if (cartCount === 0) return
    setBump(true)
    const t = setTimeout(() => setBump(false), 500)
    return () => clearTimeout(t)
  }, [cartCount])

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-gold/30">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 leading-none animate-fade-in">
          <img
            src="/images/hastmelap-mark.png"
            alt="Hastmelap"
            className="h-12 w-12 md:h-14 md:w-14 object-contain logo-hover"
          />
          <div className="flex flex-col">
            <span className="font-display text-2xl md:text-3xl text-maroon tracking-wide">Hastmelap</span>
            <span className="eyebrow text-[10px] md:text-xs mt-1">A Designer Destination · Since 1985</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `pb-1 border-b-2 transition-colors ${
                  isActive ? 'border-gold text-maroon' : 'border-transparent hover:text-maroon-light'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2 text-maroon hover:text-maroon-light transition-colors" aria-label="View cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className={`absolute -top-1 -right-1 bg-maroon text-cream text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center ${
                  bump ? 'animate-badge-bump' : ''
                }`}
              >
                {cartCount}
              </span>
            )}
          </Link>
          {session ? (
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <span className="text-ink/70">Hi, {session.mobile}</span>
              <button onClick={logout} className="text-maroon underline underline-offset-2">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => setLoginOpen(true)} className="btn-outline !px-4 !py-2 text-sm">
              Login
            </button>
          )}
          <button
            className="md:hidden p-2 text-maroon"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gold/30 bg-cream px-4 py-3 flex flex-col gap-3">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="py-1">
              {l.label}
            </NavLink>
          ))}
        </div>
      )}

      <MobileLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  )
}
