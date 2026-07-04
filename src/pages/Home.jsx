import React from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import GoogleReviews from '../components/GoogleReviews.jsx'
import InstagramFeed from '../components/InstagramFeed.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Home() {
  const featured = products.slice(0, 8)
  const bestSellers = products.filter((p) => p.bestSeller)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-maroon text-cream">
        <div className="absolute inset-0 bg-paisley" />

        {/* Soft decorative glow behind the hero art */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-float" />

        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in-up">
            <p className="eyebrow text-gold-light">Bhavnagar's No. 1 Women's Clothing Showroom</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight mt-3">
              Hastmelap <span className="shimmer-text">— A Designer Destination</span>
            </h1>
            <p className="mt-4 text-cream/80 max-w-md">
              Saree, Lehenga Choli, Gown, Croptop, Indowestern, Kurti Pant &amp; Dress Material —
              curated for every celebration since 1985.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/products" className="btn-primary bg-gold text-ink hover:bg-gold-dark hover:scale-105 transition-transform">
                Shop the Collection
              </Link>
              <Link to="/inquiry" className="btn-outline !border-cream !text-cream hover:!bg-cream hover:!text-maroon hover:scale-105 transition-transform">
                Send an Inquiry
              </Link>
            </div>
          </div>

          {/* Brand art: the Hastmelap handshake mark, gently animated */}
          <div className="relative flex items-center justify-center animate-scale-in delay-200">
            <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-gold/30 animate-spin-slow" />
            <div className="absolute w-48 h-48 md:w-60 md:h-60 rounded-full border border-gold-light/20" />
            <div className="relative bg-cream/95 rounded-full p-8 md:p-10 card-shadow animate-float">
              <img
                src="/images/hastmelap-mark.png"
                alt="Hastmelap — hand painted wedding motif"
                className="w-40 h-40 md:w-52 md:h-52 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="relative flex justify-center pb-10">
          <img
            src="/images/hastmelap-logo.png"
            alt="Hastmelap · A Designer Destination"
            className="h-16 md:h-20 object-contain opacity-90 animate-fade-in delay-300"
          />
        </div>
      </section>

      {/* Category strip */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <Reveal>
          <p className="eyebrow text-center">Our Variety</p>
          <h2 className="text-3xl text-center mt-1 mb-8">Shop by Category</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((c, i) => (
            <Reveal key={c} delay={i * 60} direction="up">
              <Link
                to={`/products?category=${encodeURIComponent(c)}`}
                className="block text-center border border-gold/30 rounded-sm py-4 px-2 bg-white hover:border-gold hover:bg-gold/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-sm font-medium text-maroon">{c}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-maroon-dark/[0.03] py-14">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
              <div>
                <p className="eyebrow text-gold-dark">Customer Favourites</p>
                <h2 className="text-3xl mt-1 flex items-center gap-2">
                  Best Sellers <span className="animate-float text-2xl">🔥</span>
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {bestSellers.map((p, i) => (
              <Reveal key={p.id} delay={i * 100} direction="up">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow">Fresh Arrivals</p>
              <h2 className="text-3xl mt-1">Featured Pieces</h2>
            </div>
            <Link to="/products" className="text-maroon underline underline-offset-4 text-sm hidden md:block">
              View all products →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 100} direction="up">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <GoogleReviews />
      <InstagramFeed />

      {/* Since 1985 strip */}
      <section className="bg-gold/10 border-y border-gold/30 py-12 relative overflow-hidden">
        <img
          src="/images/hastmelap-mark.png"
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute -left-10 top-1/2 -translate-y-1/2 w-40 opacity-10 animate-float-slow"
        />
        <img
          src="/images/hastmelap-mark.png"
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute -right-10 top-1/2 -translate-y-1/2 w-40 opacity-10 animate-float"
        />
        <Reveal direction="scale" className="max-w-4xl mx-auto px-4 text-center relative">
          <p className="eyebrow">Our Heritage</p>
          <h2 className="text-3xl mt-2">Dressing Bhavnagar's Women Since 1985</h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            Four decades of trust, craftsmanship, and the finest ethnic and fusion wear —
            handpicked for every occasion in your life.
          </p>
        </Reveal>
      </section>
    </div>
  )
}
