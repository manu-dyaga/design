import React, { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function MobileLoginModal({ open, onClose }) {
  const { recordLogin } = useApp()
  const [step, setStep] = useState('mobile') // 'mobile' | 'otp' | 'done'
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const DEMO_MOBILE = '9876543210'
  const DEMO_OTP = '1234'

  if (!open) return null

  function fillDemoDetails() {
    setMobile(DEMO_MOBILE)
    setError('')
  }

  function handleMobileSubmit(e) {
    e.preventDefault()
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    setError('')
    // In production, trigger a real SMS OTP send here (e.g. via an SMS gateway/API).
    setStep('otp')
  }

  function handleOtpSubmit(e) {
    e.preventDefault()
    if (otp.trim().length !== 4 && otp.trim().length !== 6) {
      setError('Enter the OTP sent to your mobile.')
      return
    }
    setError('')
    recordLogin(mobile)
    setStep('done')
  }

  function reset() {
    setStep('mobile')
    setMobile('')
    setOtp('')
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4">
      <div className="bg-cream w-full max-w-sm rounded-sm p-6 relative card-shadow">
        <button
          onClick={reset}
          className="absolute top-3 right-3 text-ink/50 hover:text-ink"
          aria-label="Close login"
        >
          ✕
        </button>

        <h3 className="font-display text-2xl text-maroon mb-1">
          {step === 'done' ? 'Welcome!' : 'Login with Mobile'}
        </h3>
        <p className="text-sm text-ink/60 mb-5">
          {step === 'mobile' && 'We will send a one-time code to verify your number.'}
          {step === 'otp' && `Enter the OTP sent to +91 ${mobile}`}
          {step === 'done' && 'You are logged in.'}
        </p>

        {step === 'mobile' && (
          <form onSubmit={handleMobileSubmit} className="space-y-4">
            <div className="flex items-center border border-gold/40 rounded-sm overflow-hidden">
              <span className="px-3 text-ink/60 bg-gold/10 h-11 flex items-center">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                className="flex-1 h-11 px-3 bg-white outline-none"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="btn-primary w-full">
              Send OTP
            </button>
            <div className="bg-gold/10 border border-gold/30 rounded-sm px-3 py-2 text-xs text-ink/70 flex items-center justify-between gap-2">
              <span>
                Demo mode — mobile <strong>{DEMO_MOBILE}</strong>, OTP <strong>{DEMO_OTP}</strong>
              </span>
              <button
                type="button"
                onClick={fillDemoDetails}
                className="text-maroon underline underline-offset-2 whitespace-nowrap"
              >
                Autofill
              </button>
            </div>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full h-11 px-3 border border-gold/40 rounded-sm bg-white outline-none tracking-widest text-center"
              required
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="btn-primary w-full">
              Verify &amp; Login
            </button>
            <button
              type="button"
              onClick={() => setStep('mobile')}
              className="text-sm text-maroon underline underline-offset-2 w-full text-center"
            >
              Change number
            </button>
            <div className="bg-gold/10 border border-gold/30 rounded-sm px-3 py-2 text-xs text-ink/70 flex items-center justify-between gap-2">
              <span>
                Demo mode — enter any code, e.g. <strong>{DEMO_OTP}</strong>
              </span>
              <button
                type="button"
                onClick={() => setOtp(DEMO_OTP)}
                className="text-maroon underline underline-offset-2 whitespace-nowrap"
              >
                Autofill
              </button>
            </div>
          </form>
        )}

        {step === 'done' && (
          <button onClick={reset} className="btn-primary w-full">
            Continue Shopping
          </button>
        )}
      </div>
    </div>
  )
}
