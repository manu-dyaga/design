import React from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function Toast() {
  const { toast } = useApp()

  if (!toast) return null

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] px-4 w-full max-w-sm pointer-events-none">
      <div
        key={toast.id}
        className="pointer-events-auto bg-maroon text-cream rounded-sm px-5 py-3 card-shadow flex items-center gap-3 animate-toast-in"
      >
        <span className="text-gold-light text-lg leading-none">✓</span>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  )
}
