import React, { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

// Demo-only password gate. Replace with real authentication before going live.
const ADMIN_PASSWORD = 'hastmelap1985'

export default function Admin() {
  const { logins, inquiries, clearAdminData } = useApp()
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState('inquiries')

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto px-4 py-24">
        <h1 className="font-display text-2xl text-maroon mb-4 text-center">Admin Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (password === ADMIN_PASSWORD) setAuthed(true)
          }}
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 px-3 border border-gold/40 rounded-sm outline-none"
          />
          <button type="submit" className="btn-primary w-full">
            Enter
          </button>
        </form>
        <p className="text-xs text-ink/50 text-center mt-4">
          Demo password: hastmelap1985 — change this before deploying.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
        <h1 className="text-3xl">Admin Panel</h1>
        <button
          onClick={() => confirm('Clear all stored logins and inquiries?') && clearAdminData()}
          className="text-sm text-red-600 underline underline-offset-2"
        >
          Clear all data
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('inquiries')}
          className={`px-4 py-2 rounded-full text-sm border ${
            tab === 'inquiries' ? 'bg-maroon text-cream border-maroon' : 'border-gold/40'
          }`}
        >
          Inquiries ({inquiries.length})
        </button>
        <button
          onClick={() => setTab('logins')}
          className={`px-4 py-2 rounded-full text-sm border ${
            tab === 'logins' ? 'bg-maroon text-cream border-maroon' : 'border-gold/40'
          }`}
        >
          Mobile Logins ({logins.length})
        </button>
      </div>

      {tab === 'inquiries' && (
        <div className="overflow-x-auto bg-white rounded-sm card-shadow border border-gold/10">
          <table className="w-full text-sm">
            <thead className="bg-gold/10 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Product</th>
                <th className="p-3">Message</th>
                <th className="p-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-ink/50">
                    No inquiries yet.
                  </td>
                </tr>
              )}
              {inquiries.map((i) => (
                <tr key={i.id} className="border-t border-gold/10">
                  <td className="p-3">{i.name}</td>
                  <td className="p-3">{i.mobile}</td>
                  <td className="p-3">{i.product || '—'}</td>
                  <td className="p-3 max-w-xs truncate" title={i.message}>{i.message || '—'}</td>
                  <td className="p-3 whitespace-nowrap">{new Date(i.timestamp).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'logins' && (
        <div className="overflow-x-auto bg-white rounded-sm card-shadow border border-gold/10">
          <table className="w-full text-sm">
            <thead className="bg-gold/10 text-left">
              <tr>
                <th className="p-3">Mobile Number</th>
                <th className="p-3">Logged In At</th>
              </tr>
            </thead>
            <tbody>
              {logins.length === 0 && (
                <tr>
                  <td colSpan={2} className="p-4 text-center text-ink/50">
                    No logins yet.
                  </td>
                </tr>
              )}
              {logins.map((l) => (
                <tr key={l.id} className="border-t border-gold/10">
                  <td className="p-3">{l.mobile}</td>
                  <td className="p-3 whitespace-nowrap">{new Date(l.timestamp).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-ink/50 mt-6">
        This demo stores data in the browser's local storage, so it's visible only on this device/browser.
        For a real multi-device admin panel, connect this form to a backend (e.g. Firebase, Supabase, or a
        small Node/Express API) so every visitor's submission lands in one shared database.
      </p>
    </div>
  )
}
