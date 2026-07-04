import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-maroon-dark text-cream mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/images/hastmelap-mark.png"
              alt="Hastmelap"
              className="h-12 w-12 object-contain logo-hover"
            />
            <h3 className="font-display text-2xl">Hastmelap</h3>
          </div>
          <p className="text-cream/70 text-sm">A Designer Destination · Since 1985</p>
          <p className="text-cream/70 text-sm mt-4">
            Bhavnagar's No. 1 Women's Clothing Showroom — Saree, Lehenga Choli, Gown, Croptop,
            Indowestern, Kurti Pant &amp; Dress Material.
          </p>
        </div>

        <div>
          <h4 className="eyebrow text-gold-light mb-3">Visit Us</h4>
          <p className="text-sm text-cream/80 leading-relaxed">
            📍 1st Floor, Shoppers Plaza, Parimal Chowk,
            <br /> Waghawadi Road, Bhavnagar.
          </p>
        </div>

        <div>
          <h4 className="eyebrow text-gold-light mb-3">Order &amp; Contact</h4>
          <ul className="text-sm text-cream/80 space-y-1">
            <li>
              📞{' '}
              <a href="tel:9428497454" className="hover:text-gold-light">
                9428497454
              </a>
            </li>
            <li>
              💬{' '}
              <a
                href="https://wa.me/919426855654"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold-light"
              >
                9426855654 (WhatsApp)
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/hastmelap_"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold-light"
              >
                @hastmelap_ on Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="divider-motif opacity-40" />
      <p className="text-center text-xs text-cream/50 py-4">
        © {new Date().getFullYear()} Hastmelap. All rights reserved.
      </p>
    </footer>
  )
}
