import React, { createContext, useContext, useEffect, useMemo, useState, useRef } from 'react'

const AppContext = createContext(null)

const LOGINS_KEY = 'hastmelap_logins'
const INQUIRIES_KEY = 'hastmelap_inquiries'
const SESSION_KEY = 'hastmelap_session'
const CART_KEY = 'hastmelap_cart'

function readStore(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function AppProvider({ children }) {
  const [logins, setLogins] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [session, setSession] = useState(null)
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => {
    setLogins(readStore(LOGINS_KEY))
    setInquiries(readStore(INQUIRIES_KEY))
    setCart(readStore(CART_KEY))
    const s = localStorage.getItem(SESSION_KEY)
    if (s) setSession(JSON.parse(s))
  }, [])

  // Records every mobile-number login/OTP attempt so it shows up in the admin panel.
  function recordLogin(mobile) {
    const entry = {
      id: crypto.randomUUID(),
      mobile,
      timestamp: new Date().toISOString(),
    }
    const next = [entry, ...logins]
    setLogins(next)
    writeStore(LOGINS_KEY, next)
    setSession(entry)
    localStorage.setItem(SESSION_KEY, JSON.stringify(entry))
    return entry
  }

  function logout() {
    setSession(null)
    localStorage.removeItem(SESSION_KEY)
  }

  // Records every inquiry-form submission so it shows up in the admin panel.
  function recordInquiry(data) {
    const entry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...data,
    }
    const next = [entry, ...inquiries]
    setInquiries(next)
    writeStore(INQUIRIES_KEY, next)
    return entry
  }

  function clearAdminData() {
    setLogins([])
    setInquiries([])
    writeStore(LOGINS_KEY, [])
    writeStore(INQUIRIES_KEY, [])
  }

  // ---- Toast notifications ----
  function showToast(message) {
    setToast({ id: Date.now(), message })
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }

  // ---- Cart ----
  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      let next
      if (existing) {
        next = prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        )
      } else {
        next = [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            qty,
          },
        ]
      }
      writeStore(CART_KEY, next)
      return next
    })
    showToast(`Added "${product.name}" to cart`)
  }

  function removeFromCart(id) {
    setCart((prev) => {
      const next = prev.filter((item) => item.id !== id)
      writeStore(CART_KEY, next)
      return next
    })
  }

  function updateCartQty(id, qty) {
    setCart((prev) => {
      const next = prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(1, qty) } : item))
        .filter((item) => item.qty > 0)
      writeStore(CART_KEY, next)
      return next
    })
  }

  function clearCart() {
    setCart([])
    writeStore(CART_KEY, [])
  }

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart])
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.qty * item.price, 0), [cart])

  return (
    <AppContext.Provider
      value={{
        logins,
        inquiries,
        session,
        recordLogin,
        recordInquiry,
        logout,
        clearAdminData,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartCount,
        cartTotal,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
