'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

type PageState = 'loading' | 'available' | 'done' | 'submitting' | 'error' | 'success'

export default function AdminSetupPage() {
  const router = useRouter()
  const [state, setState] = useState<PageState>('loading')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetch('/api/admin/setup')
      .then((r) => r.json())
      .then((d) => setState(d.setupRequired ? 'available' : 'done'))
      .catch(() => setState('available'))
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setErrorMsg('')

    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const confirm = (form.elements.namedItem('confirm') as HTMLInputElement).value

    if (password !== confirm) {
      setErrorMsg('Passwords do not match.')
      setState('error')
      return
    }

    const res = await fetch('/api/admin/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setErrorMsg(data.error || 'Setup failed.')
      setState('error')
      return
    }

    setState('success')
    setTimeout(() => router.push('/admin/login'), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#00C896] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#0066FF]/30">
            <span className="text-white font-black text-lg">RI</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Admin Setup</h1>
          <p className="text-[#8892A4]">Create your administrator account to get started</p>
        </div>

        {state === 'loading' && (
          <div className="text-center py-12">
            <div className="w-10 h-10 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin mx-auto" />
          </div>
        )}

        {state === 'done' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-xl font-black text-white mb-3">Setup Already Complete</h2>
            <p className="text-[#8892A4] mb-6">An admin account already exists. This page is disabled for security.</p>
            <button
              onClick={() => router.push('/admin/login')}
              className="px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all"
            >
              Go to Login
            </button>
          </div>
        )}

        {state === 'success' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-black text-white mb-2">Admin Account Created!</h2>
            <p className="text-[#8892A4]">Redirecting you to login...</p>
          </div>
        )}

        {(state === 'available' || state === 'submitting' || state === 'error') && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="mb-6 p-4 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20">
              <p className="text-[#0066FF] text-sm font-semibold">One-time setup</p>
              <p className="text-[#8892A4] text-xs mt-1">This page will be permanently disabled after you create your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Full Name</label>
                <input
                  name="name"
                  required
                  placeholder="Admin Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/60 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="admin@rastainfotech.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/60 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Password <span className="text-white/40 font-normal">(min 8 characters)</span></label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/60 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Confirm Password</label>
                <input
                  name="confirm"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/60 transition-all"
                />
              </div>

              {state === 'error' && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={state === 'submitting'}
                className="w-full py-3.5 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {state === 'submitting' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Admin Account'
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  )
}
