import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Inquiry() {
  const { recordInquiry } = useApp()
  const [searchParams] = useSearchParams()
  const prefillProduct = searchParams.get('product') || ''

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    product: prefillProduct,
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !/^[6-9]\d{9}$/.test(form.mobile)) {
      setError('Please enter your name and a valid 10-digit mobile number.')
      return
    }
    setError('')
    // Saved to the admin panel (details land in the admin panel as required).
    recordInquiry(form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-maroon mb-3">Thank you, {form.name}!</h1>
        <p className="text-ink/70">
          Your inquiry has been received. Our team will reach out to you on {form.mobile} shortly.
          You can also reach us directly on WhatsApp for a faster response.
        </p>
        <a
          href={`https://wa.me/919426855654?text=${encodeURIComponent(
            `Hi, I just submitted an inquiry about "${form.product || 'your collection'}".`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-6"
        >
          Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <p className="eyebrow text-center">Get in Touch</p>
      <h1 className="text-3xl text-center mt-1 mb-8">Send an Inquiry</h1>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-sm card-shadow border border-gold/10">
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full h-11 px-3 border border-gold/40 rounded-sm outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <div className="flex items-center border border-gold/40 rounded-sm overflow-hidden">
            <span className="px-3 text-ink/60 bg-gold/10 h-11 flex items-center">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={form.mobile}
              onChange={(e) => update('mobile', e.target.value.replace(/\D/g, ''))}
              className="flex-1 h-11 px-3 outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Product / Category (optional)</label>
          <input
            type="text"
            value={form.product}
            onChange={(e) => update('product', e.target.value)}
            placeholder="e.g. Bridal Lehenga Choli"
            className="w-full h-11 px-3 border border-gold/40 rounded-sm outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gold/40 rounded-sm outline-none"
            placeholder="Tell us what you're looking for..."
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-primary w-full">
          Submit Inquiry
        </button>
      </form>
    </div>
  )
}
