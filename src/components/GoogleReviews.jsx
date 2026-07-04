import React from 'react'
import Reveal from './Reveal.jsx'

const sampleReviews = [
  { name: 'Priya S.', text: 'Beautiful collection and very helpful staff. My go-to shop for every wedding season!', rating: 5 },
  { name: 'Foram R.', text: 'Best variety of lehengas in Bhavnagar. Quality is excellent and prices are fair.', rating: 5 },
  { name: 'Khushi M.', text: 'Loved the indowestern collection. Got so many compliments at the function.', rating: 4 },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function GoogleReviews() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <Reveal>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="eyebrow">What customers say</p>
            <h2 className="text-3xl mt-1">Google Reviews</h2>
          </div>
          <a
            href="https://www.google.com/search?q=hastmelap+bhavnagar+reviews"
            target="_blank"
            rel="noreferrer"
            className="btn-outline !px-5 !py-2.5 text-sm hover:scale-105 transition-transform"
          >
            View all reviews on Google
          </a>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6">
        {sampleReviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 120} direction="up">
            <div className="bg-white p-6 rounded-sm card-shadow border border-gold/10 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <Stars count={r.rating} />
              <p className="text-sm text-ink/80 mt-3 leading-relaxed">"{r.text}"</p>
              <p className="text-sm font-medium text-maroon mt-4">— {r.name}, Google review</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="text-xs text-ink/50 mt-4">
        Sample reviews shown for layout — connect the Google Places API with your business listing ID to pull live reviews.
      </p>
    </section>
  )
}
