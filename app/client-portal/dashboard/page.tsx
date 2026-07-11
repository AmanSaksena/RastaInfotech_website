'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface Deliverable {
  _id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  dueDate?: string
}

interface Project {
  _id: string
  title: string
  description: string
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold'
  progress: number
  startDate: string
  deadline: string
  deliverables: Deliverable[]
  techStack: string[]
}

interface Ticket {
  _id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  createdAt: string
}

type Tab = 'overview' | 'projects' | 'tickets' | 'leave' | 'holidays' | 'separation'

const statusColors: Record<string, string> = {
  planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  in_progress: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  review: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  on_hold: 'bg-red-500/20 text-red-400 border-red-500/30',
  open: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
  closed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  pending: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const priorityColors: Record<string, string> = {
  low: 'text-gray-400',
  medium: 'text-blue-400',
  high: 'text-orange-400',
  urgent: 'text-red-400',
}

// ── Leave data ──────────────────────────────────────────────
const LEAVE_TYPES = [
  { code: 'AL', name: 'Annual Leave', desc: 'Paid annual leave entitlement', balance: 18, used: 5, color: 'from-[#0066FF] to-[#3385FF]' },
  { code: 'SL', name: 'Sick / Health Leave', desc: 'Medical and health related leave', balance: 12, used: 2, color: 'from-[#00C896] to-[#00A87A]' },
  { code: 'PH', name: 'Public Holiday', desc: 'Government declared public holidays', balance: 14, used: 0, color: 'from-[#7C3AED] to-[#0066FF]' },
  { code: 'SPL', name: 'Special Leave', desc: 'Maternity, paternity, bereavement etc.', balance: 5, used: 0, color: 'from-[#F59E0B] to-[#EF4444]' },
  { code: 'TOWP', name: 'Time Off Without Pay', desc: 'Unpaid leave with prior approval', balance: 0, used: 0, color: 'from-[#6B7280] to-[#4B5563]' },
]

// ── India / Bangalore 2026 holidays ─────────────────────────
const HOLIDAYS_2026: Record<string, string> = {
  '2026-01-01': "New Year's Day",
  '2026-01-14': 'Makar Sankranti',
  '2026-01-26': 'Republic Day',
  '2026-03-03': 'Maha Shivaratri',
  '2026-03-14': 'Holi',
  '2026-04-03': 'Good Friday',
  '2026-04-14': 'Dr. Ambedkar Jayanti',
  '2026-05-01': 'Labour Day',
  '2026-06-17': 'Eid ul-Adha',
  '2026-08-15': 'Independence Day',
  '2026-09-17': 'Milad-un-Nabi',
  '2026-10-02': 'Gandhi Jayanti',
  '2026-10-08': 'Dussehra',
  '2026-10-28': 'Diwali',
  '2026-11-15': 'Guru Nanak Jayanti',
  '2026-12-25': 'Christmas Day',
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAY_ABBR = ['Su','Mo','Tu','We','Th','Fr','Sa']

const ACKNOWLEDGEMENTS = [
  'I confirm that the reason for my resignation has been provided accurately and to the best of my knowledge.',
  'I acknowledge and agree to comply with the organisation notice period policy and will serve the stipulated timeline unless an exception is formally approved.',
  'I agree to review and complete all activities outlined in the separation management checklist prior to my last working day (LWD).',
  'I acknowledge that any recoveries or dues applicable will be settled before or during the exit process, in accordance with the organisation\'s policy.',
  'I confirm that my contact details (email and phone number) are accurate and understand that any errors may result in delays in processing my separation.',
]

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function statusLabel(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// ── Holiday descriptions ─────────────────────────────────────
const HOLIDAY_DESCRIPTIONS: Record<string, string> = {
  "New Year's Day": "The first day of the Gregorian calendar year, celebrated worldwide to mark the beginning of a new year with hope and fresh starts.",
  "Makar Sankranti": "A harvest festival marking the sun's transition into Capricorn (Makara). Celebrated with kite flying, bonfires, and special sweets like til-gul across India.",
  "Republic Day": "Commemorates the date on which the Constitution of India came into effect on 26 January 1950, replacing the Government of India Act as the governing document.",
  "Maha Shivaratri": "The great night of Lord Shiva. Devotees observe fasts and all-night vigils, offering bilva leaves, milk, and prayers at Shiva temples.",
  "Holi": "The festival of colours celebrating the arrival of spring and the triumph of good over evil. People celebrate by playing with coloured powder, water, and sweets.",
  "Good Friday": "Observed by Christians to commemorate the crucifixion of Jesus Christ and his death at Calvary. A solemn day of prayer, fasting, and reflection.",
  "Dr. Ambedkar Jayanti": "Birth anniversary of Dr. B.R. Ambedkar — the chief architect of the Indian Constitution and a champion of social justice, equality, and human rights.",
  "Labour Day": "International Workers' Day honouring the contributions of workers and the labour movement in securing fair working conditions worldwide.",
  "Eid ul-Adha": "The Festival of Sacrifice marking the willingness of Ibrahim to sacrifice his son as an act of obedience to God. Muslims offer prayers, sacrifice animals, and share food with family and the needy.",
  "Independence Day": "Commemorates India's independence from British colonial rule on 15 August 1947. Celebrated with flag hoisting, parades, and patriotic events across the nation.",
  "Milad-un-Nabi": "Celebrates the birth anniversary of the Prophet Muhammad (PBUH). Observed with special prayers, processions, and recitations of the Quran.",
  "Gandhi Jayanti": "Birth anniversary of Mahatma Gandhi — the Father of the Nation and the leader of India's non-violent independence movement (Satyagraha).",
  "Dussehra": "Celebrates the victory of Lord Rama over the demon king Ravana, symbolising the eternal triumph of good over evil. Marked by burning effigies of Ravana.",
  "Diwali": "The Festival of Lights symbolising the victory of light over darkness and knowledge over ignorance. Celebrated with oil lamps, fireworks, sweets, and family gatherings.",
  "Guru Nanak Jayanti": "Celebrates the birth of Guru Nanak Dev Ji, the founder of Sikhism. Observed with prayers, kirtan, langar, and processions across gurdwaras.",
  "Christmas Day": "Commemorates the birth of Jesus Christ. Celebrated worldwide with church services, gift-giving, festive meals, and family gatherings.",
}

// ── Mini calendar for one month ──────────────────────────────
function CalendarMonth({
  year,
  month,
  onExpand,
  onHolidayClick,
  large = false,
}: {
  year: number
  month: number
  onExpand?: () => void
  onHolidayClick?: (date: string, name: string) => void
  large?: boolean
}) {
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  function holidayKey(day: number) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }
  function holidayName(day: number) {
    return HOLIDAYS_2026[holidayKey(day)]
  }
  function isWeekend(day: number) {
    const dow = new Date(year, month, day).getDay()
    return dow === 0 || dow === 6
  }

  return (
    <div className={`bg-white/5 border border-white/10 rounded-2xl ${large ? 'p-6' : 'p-4 hover:border-[#0066FF]/40 cursor-pointer'} transition-all`}
      onClick={!large && onExpand ? onExpand : undefined}>
      <div className="flex items-center justify-between mb-3">
        <p className={`text-white font-bold ${large ? 'text-lg' : 'text-sm'}`}>{MONTH_NAMES[month]}</p>
        {!large && <span className="text-[10px] text-[#8892A4] opacity-0 group-hover:opacity-100">tap to expand</span>}
      </div>
      <div className={`grid grid-cols-7 ${large ? 'gap-1' : 'gap-0.5'}`}>
        {DAY_ABBR.map((d) => (
          <div key={d} className={`text-center font-semibold text-[#8892A4] pb-1 ${large ? 'text-xs' : 'text-[10px]'}`}>{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const hol = holidayName(day)
          const wknd = isWeekend(day)
          return (
            <div
              key={`d-${day}`}
              onClick={hol && onHolidayClick ? (e) => { e.stopPropagation(); onHolidayClick(holidayKey(day), hol) } : undefined}
              className={`text-center rounded font-medium flex items-center justify-center
                ${large ? 'h-9 text-sm' : 'py-0.5 text-[11px]'}
                ${hol
                  ? `bg-[#00C896] text-[#0A1628] font-black ${large ? 'cursor-pointer hover:bg-[#00E0A8] hover:scale-110 transition-all' : ''}`
                  : wknd
                  ? 'text-[#8892A4]'
                  : 'text-white/70'}
              `}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')
  const [projects, setProjects] = useState<Project[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [clientName, setClientName] = useState('')

  // ticket form
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [ticketState, setTicketState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [ticketError, setTicketError] = useState('')

  // leave apply modal
  const [showLeaveForm, setShowLeaveForm] = useState(false)
  const [leaveState, setLeaveState] = useState<'idle' | 'submitting' | 'success'>('idle')

  // separation form
  const [sepState, setSepState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [acks, setAcks] = useState<boolean[]>(Array(ACKNOWLEDGEMENTS.length).fill(false))
  const allAcked = acks.every(Boolean)

  // holiday calendar
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null)
  const [selectedHoliday, setSelectedHoliday] = useState<{ date: string; name: string } | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [pRes, tRes] = await Promise.all([
          fetch('/api/client/projects'),
          fetch('/api/client/tickets'),
        ])
        if (pRes.status === 401 || tRes.status === 401) {
          router.push('/client-portal/login')
          return
        }
        const pData = await pRes.json()
        const tData = await tRes.json()
        setProjects(pData.projects || [])
        setTickets(tData.tickets || [])
        const nameCookie = document.cookie.split('; ').find(row => row.startsWith('client_name='))
        if (nameCookie) setClientName(decodeURIComponent(nameCookie.split('=')[1]))
      } catch {
        router.push('/client-portal/login')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [router])

  async function handleLogout() {
    await fetch('/api/client/auth/logout', { method: 'POST' })
    router.push('/client-portal/login')
  }

  async function handleTicketSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTicketState('submitting')
    setTicketError('')
    const form = e.currentTarget
    const title = (form.elements.namedItem('title') as HTMLInputElement).value
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value
    const priority = (form.elements.namedItem('priority') as HTMLSelectElement).value
    const category = (form.elements.namedItem('category') as HTMLSelectElement).value
    const projectId = (form.elements.namedItem('projectId') as HTMLSelectElement).value
    try {
      const res = await fetch('/api/client/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority, category, projectId: projectId || undefined }),
      })
      const data = await res.json()
      if (!res.ok) { setTicketError(data.error || 'Failed to submit ticket.'); setTicketState('error'); return }
      setTickets((prev) => [data.ticket, ...prev])
      setTicketState('success')
      setTimeout(() => { setShowTicketForm(false); setTicketState('idle'); setTab('tickets') }, 1500)
    } catch {
      setTicketError('Network error. Please try again.')
      setTicketState('error')
    }
  }

  async function handleLeaveSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLeaveState('submitting')
    await new Promise((r) => setTimeout(r, 1200))
    setLeaveState('success')
    setTimeout(() => { setShowLeaveForm(false); setLeaveState('idle') }, 2000)
  }

  async function handleSeparationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!allAcked) return
    setSepState('submitting')
    const form = e.currentTarget
    const body = {
      resignationDate: (form.elements.namedItem('resignationDate') as HTMLInputElement).value,
      lastWorkingDay: (form.elements.namedItem('lastWorkingDay') as HTMLInputElement).value,
      noticePeriod: (form.elements.namedItem('noticePeriod') as HTMLSelectElement).value,
      reason: (form.elements.namedItem('reason') as HTMLSelectElement).value,
      comments: (form.elements.namedItem('comments') as HTMLTextAreaElement).value,
    }
    try {
      await fetch('/api/client/separation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    } catch { /* silently handle */ }
    setSepState('success')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin mx-auto mb-4" />
          <p className="text-[#8892A4]">Loading your portal...</p>
        </div>
      </div>
    )
  }

  const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'in_progress').length
  const activeProjects = projects.filter((p) => p.status === 'in_progress' || p.status === 'review').length
  const completedProjects = projects.filter((p) => p.status === 'completed').length

  const TABS: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'projects', label: 'Projects' },
    { key: 'tickets', label: 'Tickets' },
    { key: 'leave', label: 'Leave' },
    { key: 'holidays', label: 'Holidays' },
    { key: 'separation', label: 'Separation' },
  ]

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Top Nav */}
      <nav className="border-b border-white/10 bg-[#0A1628]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00C896] flex items-center justify-center">
              <span className="text-white font-black text-xs">RI</span>
            </div>
            <span className="text-white font-bold hidden sm:block">Rasta Infotech</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              {clientName && <p className="text-white text-sm font-semibold">{clientName}</p>}
              <p className="text-[#8892A4] text-xs">Company Portal</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm font-semibold transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-black text-white mb-1">
            {clientName ? `Welcome back, ${clientName.split(' ')[0]}` : 'Welcome back'}
          </h1>
          <p className="text-[#8892A4]">Here is an overview of your projects, tickets and HR tools.</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Projects', value: projects.length, icon: '📁', color: 'from-[#0066FF] to-[#3385FF]' },
            { label: 'Active Projects', value: activeProjects, icon: '⚡', color: 'from-[#7C3AED] to-[#0066FF]' },
            { label: 'Completed', value: completedProjects, icon: '✅', color: 'from-[#00C896] to-[#0066FF]' },
            { label: 'Open Tickets', value: openTickets, icon: '🎫', color: 'from-[#DC2626] to-[#7C3AED]' },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all">
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>{stat.value}</div>
              <div className="text-[#8892A4] text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tabs — horizontally scrollable on mobile */}
        <div className="overflow-x-auto pb-1 mb-6">
          <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit min-w-full sm:min-w-0">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  tab === t.key
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white shadow-md'
                    : 'text-[#8892A4] hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ── Overview ── */}
          {tab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }} className="space-y-6">
              {projects.length === 0 ? (
                <div className="text-center py-16 border border-white/10 rounded-3xl">
                  <div className="text-5xl mb-4">📁</div>
                  <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
                  <p className="text-[#8892A4]">Your projects will appear here once our team sets them up.</p>
                </div>
              ) : (
                projects.slice(0, 3).map((project) => <ProjectCard key={project._id} project={project} />)
              )}
              {tickets.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-white mb-4">Recent Tickets</h2>
                  <div className="space-y-3">
                    {tickets.slice(0, 3).map((ticket) => <TicketRow key={ticket._id} ticket={ticket} />)}
                  </div>
                </div>
              )}
              <button
                onClick={() => setShowTicketForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Raise a Support Ticket
              </button>
            </motion.div>
          )}

          {/* ── Projects ── */}
          {tab === 'projects' && (
            <motion.div key="projects" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }} className="space-y-6">
              {projects.length === 0 ? (
                <div className="text-center py-16 border border-white/10 rounded-3xl">
                  <div className="text-5xl mb-4">📁</div>
                  <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
                  <p className="text-[#8892A4]">Your projects will appear here once our team sets them up.</p>
                </div>
              ) : (
                projects.map((project) => <ProjectCard key={project._id} project={project} expanded />)
              )}
            </motion.div>
          )}

          {/* ── Tickets ── */}
          {tab === 'tickets' && (
            <motion.div key="tickets" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Support Tickets</h2>
                <button
                  onClick={() => setShowTicketForm(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white font-semibold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  New Ticket
                </button>
              </div>
              {tickets.length === 0 ? (
                <div className="text-center py-16 border border-white/10 rounded-3xl">
                  <div className="text-5xl mb-4">🎫</div>
                  <h3 className="text-xl font-bold text-white mb-2">No tickets yet</h3>
                  <p className="text-[#8892A4] mb-6">Having an issue or a question? Raise a support ticket.</p>
                  <button onClick={() => setShowTicketForm(true)} className="px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all">Raise Ticket</button>
                </div>
              ) : (
                <div className="space-y-3">{tickets.map((ticket) => <TicketRow key={ticket._id} ticket={ticket} detailed />)}</div>
              )}
            </motion.div>
          )}

          {/* ── Leave Management ── */}
          {tab === 'leave' && (
            <motion.div key="leave" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black text-white">Leave Management</h2>
                  <p className="text-[#8892A4] text-sm mt-0.5">Your leave balances and absence types — CY 2026</p>
                </div>
                <button
                  onClick={() => setShowLeaveForm(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white font-semibold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Apply for Leave
                </button>
              </div>

              {/* Leave balance summary */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Available', value: LEAVE_TYPES.reduce((a, l) => a + l.balance, 0), color: 'from-[#0066FF] to-[#3385FF]' },
                  { label: 'Used This Year', value: LEAVE_TYPES.reduce((a, l) => a + l.used, 0), color: 'from-[#EF4444] to-[#7C3AED]' },
                  { label: 'Remaining', value: LEAVE_TYPES.reduce((a, l) => a + (l.balance - l.used), 0), color: 'from-[#00C896] to-[#0066FF]' },
                  { label: 'Pending Requests', value: 0, color: 'from-[#F59E0B] to-[#EF4444]' },
                ].map((s) => (
                  <div key={s.label} className="p-5 rounded-2xl border border-white/10 bg-white/5">
                    <div className={`text-3xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-1`}>{s.value}</div>
                    <div className="text-[#8892A4] text-sm">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Leave types table */}
              <div className="border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10 bg-white/5">
                  <h3 className="text-white font-bold">Absence / Leave Types</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {/* Header */}
                  <div className="hidden md:grid grid-cols-5 px-5 py-3 text-xs font-semibold text-[#8892A4] uppercase tracking-wider">
                    <span>Code</span><span>Leave Type</span><span>Description</span><span>Balance</span><span>Used</span>
                  </div>
                  {LEAVE_TYPES.map((lt) => (
                    <div key={lt.code} className="px-5 py-4 md:grid md:grid-cols-5 md:items-center flex flex-col gap-2 hover:bg-white/5 transition-colors">
                      <span className={`inline-flex items-center justify-center w-12 h-7 rounded-lg text-xs font-black text-white bg-gradient-to-r ${lt.color}`}>{lt.code}</span>
                      <span className="text-white font-semibold text-sm">{lt.name}</span>
                      <span className="text-[#8892A4] text-sm">{lt.desc}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-bold text-sm">{lt.balance - lt.used}</span>
                          <span className="text-[#8892A4] text-xs">/ {lt.balance} days</span>
                        </div>
                        {lt.balance > 0 && (
                          <div className="h-1.5 bg-white/10 rounded-full w-24">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${lt.color}`}
                              style={{ width: `${((lt.balance - lt.used) / lt.balance) * 100}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <span className="text-[#8892A4] text-sm">{lt.used} days</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leave policy note */}
              <div className="mt-4 p-4 rounded-2xl border border-[#0066FF]/20 bg-[#0066FF]/5 flex gap-3">
                <svg className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-[#8892A4] text-sm">Leave applications must be submitted at least <span className="text-white font-semibold">2 working days</span> in advance. Emergency leave requests are subject to manager approval. Unused annual leave can be carried forward up to a maximum of 5 days.</p>
              </div>
            </motion.div>
          )}

          {/* ── Holiday Calendar ── */}
          {tab === 'holidays' && (
            <motion.div key="holidays" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black text-white">Holiday Calendar</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#00C896]/20 text-[#00C896] border border-[#00C896]/30">Bangalore, India</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-[#8892A4] border border-white/10">CY 2026</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8892A4]">
                  <span className="w-3 h-3 rounded bg-[#00C896] inline-block" /> Holiday
                </div>
              </div>

              {/* 12-month grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {Array.from({ length: 12 }, (_, m) => (
                  <CalendarMonth
                    key={m}
                    year={2026}
                    month={m}
                    onExpand={() => setExpandedMonth(m)}
                    onHolidayClick={(date, name) => setSelectedHoliday({ date, name })}
                  />
                ))}
              </div>

              {/* Holiday list */}
              <div className="border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10 bg-white/5">
                  <h3 className="text-white font-bold">Public Holidays — {Object.keys(HOLIDAYS_2026).length} days</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {Object.entries(HOLIDAYS_2026).map(([date, name]) => {
                    const d = new Date(date)
                    const dow = d.toLocaleDateString('en-IN', { weekday: 'long' })
                    return (
                      <div key={date} className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#00C896]/10 border border-[#00C896]/20 flex flex-col items-center justify-center shrink-0">
                            <span className="text-[#00C896] text-xs font-black leading-none">{d.toLocaleDateString('en-IN', { day: '2-digit' })}</span>
                            <span className="text-[#00C896]/70 text-[9px] uppercase leading-none">{d.toLocaleDateString('en-IN', { month: 'short' })}</span>
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm">{name}</p>
                            <p className="text-[#8892A4] text-xs">{dow}</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20">Public Holiday</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Separation ── */}
          {tab === 'separation' && (
            <motion.div key="separation" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <div className="mb-6">
                <h2 className="text-xl font-black text-white">Separation Management</h2>
                <p className="text-[#8892A4] text-sm mt-0.5">Submit your resignation and initiate the separation process.</p>
              </div>

              {sepState === 'success' ? (
                <div className="text-center py-20 border border-white/10 rounded-3xl">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">Separation Request Submitted</h3>
                  <p className="text-[#8892A4] max-w-md mx-auto">Your resignation has been recorded. HR will review your request and contact you within 2 working days to guide you through the exit process.</p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Form */}
                  <div className="lg:col-span-2">
                    <form onSubmit={handleSeparationSubmit} className="space-y-5">
                      <div className="p-6 border border-white/10 rounded-2xl bg-white/5 space-y-5">
                        <h3 className="text-white font-bold border-b border-white/10 pb-3">Separation Details &amp; Notice Period</h3>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-white/70 mb-2">Resignation Date *</label>
                            <input name="resignationDate" type="date" required
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors [color-scheme:dark]" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-white/70 mb-2">Last Working Day *</label>
                            <input name="lastWorkingDay" type="date" required
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors [color-scheme:dark]" />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-white/70 mb-2">Notice Period</label>
                            <select name="noticePeriod" defaultValue="30"
                              className="w-full px-4 py-3 rounded-xl bg-[#0D1F3C] border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors">
                              <option value="30">30 Days</option>
                              <option value="60">60 Days</option>
                              <option value="90">90 Days</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-white/70 mb-2">Reason for Leaving *</label>
                            <select name="reason" required
                              className="w-full px-4 py-3 rounded-xl bg-[#0D1F3C] border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors">
                              <option value="">Select reason</option>
                              <option value="personal">Personal Reasons</option>
                              <option value="better_opportunity">Better Opportunity</option>
                              <option value="higher_education">Higher Education</option>
                              <option value="health">Health Reasons</option>
                              <option value="relocation">Relocation</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/70 mb-2">Additional Comments</label>
                          <textarea name="comments" rows={4} placeholder="Any additional information you would like to share..."
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-colors resize-none" />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/70 mb-2">Supporting Document</label>
                          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-[#0066FF]/50 hover:bg-[#0066FF]/5 transition-all">
                            <svg className="w-6 h-6 text-[#8892A4] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                            <span className="text-[#8892A4] text-sm">Click to upload or drag &amp; drop</span>
                            <span className="text-[#8892A4] text-xs mt-1">PDF, DOC up to 5MB</span>
                            <input type="file" name="document" accept=".pdf,.doc,.docx" className="hidden" />
                          </label>
                        </div>
                      </div>

                      {/* Acknowledgements */}
                      <div className="p-6 border border-white/10 rounded-2xl bg-white/5 space-y-4">
                        <h3 className="text-white font-bold border-b border-white/10 pb-3">Acknowledgements</h3>
                        <p className="text-[#8892A4] text-sm">Please read and confirm all points below before submitting.</p>
                        {ACKNOWLEDGEMENTS.map((text, i) => (
                          <label key={i} className="flex items-start gap-3 cursor-pointer group">
                            <div className={`mt-0.5 w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center transition-all ${acks[i] ? 'bg-[#00C896] border-[#00C896]' : 'border-white/30 group-hover:border-white/60'}`}
                              onClick={() => setAcks((prev) => prev.map((v, j) => (j === i ? !v : v)))}>
                              {acks[i] && <svg className="w-3 h-3 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <span className={`text-sm transition-colors ${acks[i] ? 'text-white' : 'text-[#8892A4]'}`}>{text}</span>
                          </label>
                        ))}
                      </div>

                      {!allAcked && (
                        <p className="text-amber-400 text-sm flex items-center gap-2">
                          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                          Please acknowledge all {ACKNOWLEDGEMENTS.length} points to proceed.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={!allAcked || sepState === 'submitting'}
                        className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {sepState === 'submitting' ? (
                          <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Submitting...</>
                        ) : 'Submit Separation Request'}
                      </button>
                    </form>
                  </div>

                  {/* Info panel */}
                  <div className="space-y-4">
                    <div className="p-5 border border-white/10 rounded-2xl bg-white/5 space-y-4">
                      <h4 className="text-white font-bold">Separation Process</h4>
                      {[
                        { step: '01', title: 'Submit Request', desc: 'Fill and submit this separation form with required details.' },
                        { step: '02', title: 'HR Review', desc: 'HR reviews your request and contacts you within 2 working days.' },
                        { step: '03', title: 'Notice Period', desc: 'Serve your notice period as per your employment terms.' },
                        { step: '04', title: 'Exit Clearance', desc: 'Complete exit checklist: assets return, handover, clearances.' },
                        { step: '05', title: 'Final Settlement', desc: 'Receive your full & final settlement and relieving letter.' },
                      ].map((s) => (
                        <div key={s.step} className="flex gap-3">
                          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00C896] flex items-center justify-center text-white text-xs font-black shrink-0">{s.step}</span>
                          <div>
                            <p className="text-white font-semibold text-sm">{s.title}</p>
                            <p className="text-[#8892A4] text-xs">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 border border-amber-500/20 rounded-2xl bg-amber-500/5">
                      <p className="text-amber-400 font-semibold text-sm mb-1">Important Note</p>
                      <p className="text-[#8892A4] text-xs">Submitting this form does not constitute immediate release. You are required to serve the complete notice period unless waived by your manager and HR.</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Expanded Month Modal ── */}
      <AnimatePresence>
        {expandedMonth !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setExpandedMonth(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="w-full max-w-sm bg-[#0D1F3C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-white text-lg font-black">{MONTH_NAMES[expandedMonth]} 2026</h2>
                <button onClick={() => setExpandedMonth(null)} className="text-white/40 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-5">
                <CalendarMonth
                  year={2026}
                  month={expandedMonth}
                  large
                  onHolidayClick={(date, name) => setSelectedHoliday({ date, name })}
                />
                <p className="text-[#8892A4] text-xs text-center mt-4">Tap a highlighted date to see the holiday</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Holiday Info Modal ── */}
      <AnimatePresence>
        {selectedHoliday && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setSelectedHoliday(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-[#0D1F3C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00C896]/20 border border-[#00C896]/30 flex items-center justify-center shrink-0">
                    <span className="text-[#00C896] text-lg">🎉</span>
                  </div>
                  <div>
                    <p className="text-white font-black text-base leading-tight">{selectedHoliday.name}</p>
                    <p className="text-[#8892A4] text-xs mt-0.5">
                      {new Date(selectedHoliday.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelectedHoliday(null)} className="text-white/40 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-5">
                <p className="text-[#8892A4] text-sm leading-relaxed">
                  {HOLIDAY_DESCRIPTIONS[selectedHoliday.name] ?? 'A public holiday observed in Bangalore, India.'}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20">Public Holiday</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#8892A4] border border-white/10">Bangalore, India</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── New Ticket Modal ── */}
      <AnimatePresence>
        {showTicketForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowTicketForm(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-[#0D1F3C] border border-white/10 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-white text-xl font-black">Raise a Support Ticket</h2>
                <button onClick={() => { setShowTicketForm(false); setTicketState('idle') }} className="text-white/40 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6">
                {ticketState === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">Ticket Raised!</h3>
                    <p className="text-[#8892A4]">Our support team will respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-2">Title *</label>
                      <input name="title" required placeholder="Brief description of the issue"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/70 mb-2">Priority</label>
                        <select name="priority" defaultValue="medium" className="w-full px-4 py-3 rounded-xl bg-[#0D1F3C] border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors">
                          <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/70 mb-2">Category</label>
                        <select name="category" className="w-full px-4 py-3 rounded-xl bg-[#0D1F3C] border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors">
                          <option value="general">General</option><option value="bug">Bug / Issue</option><option value="feature_request">Feature Request</option><option value="billing">Billing</option><option value="access">Access</option>
                        </select>
                      </div>
                    </div>
                    {projects.length > 0 && (
                      <div>
                        <label className="block text-sm font-semibold text-white/70 mb-2">Related Project</label>
                        <select name="projectId" className="w-full px-4 py-3 rounded-xl bg-[#0D1F3C] border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors">
                          <option value="">Not project-specific</option>
                          {projects.map((p) => <option key={p._id} value={p._id}>{p.title}</option>)}
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-2">Description *</label>
                      <textarea name="description" required rows={4} placeholder="Describe the issue in detail..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-colors resize-none" />
                    </div>
                    {ticketState === 'error' && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{ticketError}</div>
                    )}
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setShowTicketForm(false)} className="flex-1 py-3 rounded-xl border border-white/20 text-white/60 hover:text-white transition-all font-semibold">Cancel</button>
                      <button type="submit" disabled={ticketState === 'submitting'}
                        className="flex-1 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                        {ticketState === 'submitting' ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Submitting...</>) : 'Submit Ticket'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Apply for Leave Modal ── */}
      <AnimatePresence>
        {showLeaveForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowLeaveForm(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-[#0D1F3C] border border-white/10 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-white text-xl font-black">Apply for Leave</h2>
                <button onClick={() => { setShowLeaveForm(false); setLeaveState('idle') }} className="text-white/40 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6">
                {leaveState === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">Leave Requested!</h3>
                    <p className="text-[#8892A4]">Your leave application has been submitted for approval.</p>
                  </div>
                ) : (
                  <form onSubmit={handleLeaveSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-2">Leave Type *</label>
                      <select name="leaveType" required className="w-full px-4 py-3 rounded-xl bg-[#0D1F3C] border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors">
                        {LEAVE_TYPES.filter(l => l.balance > 0).map((l) => (
                          <option key={l.code} value={l.code}>{l.name} ({l.balance - l.used} days left)</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/70 mb-2">From *</label>
                        <input name="from" type="date" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors [color-scheme:dark]" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/70 mb-2">To *</label>
                        <input name="to" type="date" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors [color-scheme:dark]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-2">Reason *</label>
                      <textarea name="reason" required rows={3} placeholder="Briefly describe the reason for leave..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-colors resize-none" />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setShowLeaveForm(false)} className="flex-1 py-3 rounded-xl border border-white/20 text-white/60 hover:text-white transition-all font-semibold">Cancel</button>
                      <button type="submit" disabled={leaveState === 'submitting'}
                        className="flex-1 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                        {leaveState === 'submitting' ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Submitting...</>) : 'Submit Request'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectCard({ project, expanded = false }: { project: Project; expanded?: boolean }) {
  const [open, setOpen] = useState(expanded)
  return (
    <div className="border border-white/10 rounded-2xl bg-white/5 hover:border-white/20 transition-all overflow-hidden">
      <div className="p-5 cursor-pointer flex items-start justify-between gap-4" onClick={() => setOpen(!open)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-white font-black text-lg">{project.title}</h3>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusColors[project.status] || ''}`}>{statusLabel(project.status)}</span>
          </div>
          <p className="text-[#8892A4] text-sm line-clamp-1">{project.description}</p>
        </div>
        <svg className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-[#8892A4]">Progress</span>
          <span className="text-xs font-bold text-white">{project.progress}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-[#0066FF] to-[#00C896] rounded-full" />
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-5 pb-5 border-t border-white/10 pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-[#8892A4] mb-0.5">Start Date</p><p className="text-white font-semibold">{formatDate(project.startDate)}</p></div>
                <div><p className="text-[#8892A4] mb-0.5">Deadline</p><p className="text-white font-semibold">{formatDate(project.deadline)}</p></div>
              </div>
              {project.techStack.length > 0 && (
                <div>
                  <p className="text-[#8892A4] text-sm mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((t) => <span key={t} className="px-2.5 py-1 rounded-lg text-xs border border-white/10 text-[#8892A4] bg-white/5">{t}</span>)}
                  </div>
                </div>
              )}
              {project.deliverables.length > 0 && (
                <div>
                  <p className="text-[#8892A4] text-sm mb-3">Deliverables</p>
                  <div className="space-y-2">
                    {project.deliverables.map((d) => (
                      <div key={d._id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${d.status === 'completed' ? 'border-[#00C896] bg-[#00C896]' : d.status === 'in_progress' ? 'border-[#0066FF]' : 'border-white/30'}`}>
                          {d.status === 'completed' && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">{d.title}</p>
                          <p className="text-[#8892A4] text-xs">{d.description}</p>
                        </div>
                        <span className={`ml-auto shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusColors[d.status] || ''}`}>{statusLabel(d.status)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TicketRow({ ticket, detailed = false }: { ticket: Ticket; detailed?: boolean }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all">
      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${ticket.status === 'open' ? 'bg-blue-400' : ticket.status === 'in_progress' ? 'bg-yellow-400' : ticket.status === 'resolved' ? 'bg-green-400' : 'bg-gray-400'}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <p className="text-white font-semibold text-sm">{ticket.title}</p>
          <span className={`text-xs font-bold capitalize ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
        </div>
        {detailed && <p className="text-[#8892A4] text-xs line-clamp-1 mb-1">{ticket.description}</p>}
        <p className="text-[#8892A4] text-xs">{formatDate(ticket.createdAt)} · {ticket.category.replace(/_/g, ' ')}</p>
      </div>
      <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusColors[ticket.status] || ''}`}>{statusLabel(ticket.status)}</span>
    </div>
  )
}
