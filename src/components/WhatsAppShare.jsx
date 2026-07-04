import React from 'react'

export default function WhatsAppShare({ product }) {
  const message = encodeURIComponent(
    `Hi Hastmelap! I'm interested in "${product.name}" (₹${product.price}). Is it available? ${window.location.origin}/products/${product.id}`
  )
  const shareUrl = `https://wa.me/919426855654?text=${message}`

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
      aria-label={`Share ${product.name} on WhatsApp`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18a7.9 7.9 0 01-4.03-1.1l-.29-.17-3 .79.8-2.93-.19-.3A7.93 7.93 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.4-5.6c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
      </svg>
      Share on WhatsApp
    </a>
  )
}
