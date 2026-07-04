import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All'
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  function setCategory(cat) {
    if (cat === 'All') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', cat)
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <p className="eyebrow">Full Collection</p>
      <h1 className="text-3xl mt-1 mb-8">Shop All Products</h1>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
        <div className="flex flex-wrap gap-2">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                activeCategory === c
                  ? 'bg-maroon text-cream border-maroon'
                  : 'border-gold/40 text-ink/70 hover:border-gold'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gold/40 rounded-sm px-4 py-2 bg-white outline-none w-full md:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink/60">No products match your search.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 8) * 60} direction="up">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
