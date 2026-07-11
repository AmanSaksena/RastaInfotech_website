'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'

type SaveState = 'idle' | 'saving' | 'success' | 'error'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  const [profileState, setProfileState] = useState<SaveState>('idle')
  const [profileError, setProfileError] = useState('')

  const [passwordState, setPasswordState] = useState<SaveState>('idle')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => { if (r.status === 401) { router.push('/admin/login'); return null } return r.json() })
      .then((d) => { if (d) { setName(d.admin.name); setEmail(d.admin.email) } })
      .finally(() => setLoading(false))
  }, [router])

  async function handleProfileSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setProfileState('saving')
    setProfileError('')

    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    const data = await res.json()

    if (!res.ok) {
      setProfileError(data.error || 'Failed to update profile.')
      setProfileState('error')
      return
    }

    setName(data.admin.name)
    setEmail(data.admin.email)
    setProfileState('success')
    setTimeout(() => setProfileState('idle'), 3000)
  }

  async function handlePasswordSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPasswordState('saving')
    setPasswordError('')

    const form = e.currentTarget
    const currentPassword = (form.elements.namedItem('currentPassword') as HTMLInputElement).value
    const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.')
      setPasswordState('error')
      return
    }

    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
    const data = await res.json()

    if (!res.ok) {
      setPasswordError(data.error || 'Failed to update password.')
      setPasswordState('error')
      return
    }

    setPasswordState('success')
    form.reset()
    setTimeout(() => setPasswordState('idle'), 3000)
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin" />
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell adminName={name}>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Settings</h1>
        <p className="text-[#8892A4]">Manage your admin account</p>
      </div>

      <div className="max-w-xl space-y-6">

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl border border-white/10 bg-white/5"
        >
          <h2 className="text-white font-bold text-lg mb-1">Profile</h2>
          <p className="text-[#8892A4] text-sm mb-6">Update your name and email address</p>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-2">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/60 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/60 transition-all"
              />
            </div>

            {profileState === 'error' && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{profileError}</div>
            )}
            {profileState === 'success' && (
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">Profile updated successfully.</div>
            )}

            <button
              type="submit"
              disabled={profileState === 'saving'}
              className="px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {profileState === 'saving' ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving...</>
              ) : 'Save Profile'}
            </button>
          </form>
        </motion.div>

        {/* Password Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl border border-white/10 bg-white/5"
        >
          <h2 className="text-white font-bold text-lg mb-1">Change Password</h2>
          <p className="text-[#8892A4] text-sm mb-6">You must enter your current password to set a new one</p>

          <form onSubmit={handlePasswordSave} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-2">Current Password</label>
              <input
                name="currentPassword"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/60 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-2">New Password <span className="text-white/40 font-normal">(min 8 characters)</span></label>
              <input
                name="newPassword"
                type="password"
                required
                minLength={8}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/60 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-2">Confirm New Password</label>
              <input
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/60 transition-all"
              />
            </div>

            {passwordState === 'error' && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{passwordError}</div>
            )}
            {passwordState === 'success' && (
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">Password changed successfully.</div>
            )}

            <button
              type="submit"
              disabled={passwordState === 'saving'}
              className="px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {passwordState === 'saving' ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving...</>
              ) : 'Change Password'}
            </button>
          </form>
        </motion.div>

      </div>
    </AdminShell>
  )
}
