import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import {
  ShieldCheck,
  Crosshair,
  Trophy,
  Radar,
  Menu,
  X,
  CheckCircle2,
} from 'lucide-react'

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Stats', href: '#stats' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Community', href: '#community' },
]

const features = [
  {
    title: 'Blue Team Labs',
    text: 'Hands-on SOC simulations for incident triage, log analysis, and containment workflows.',
    icon: ShieldCheck,
  },
  {
    title: 'Real-World Challenges',
    text: 'Practice on attack chains inspired by real breaches with realistic telemetry and detections.',
    icon: Crosshair,
  },
  {
    title: 'CTF Competitions',
    text: 'Compete in team-based defensive CTF events and prove your response speed under pressure.',
    icon: Trophy,
  },
  {
    title: 'Threat Detection Training',
    text: 'Build SIEM rules, tune alerts, and hunt adversary behavior using modern blue-team techniques.',
    icon: Radar,
  },
]

const stats = [
  { label: 'Detection Rules Authored', value: 1872, suffix: '' },
  { label: 'SOC Playbooks Shared', value: 312, suffix: '' },
  { label: 'Incident Reports Published', value: 154, suffix: '' },
]

const testimonials = [
  {
    quote: 'Blue teamers: the only people who get excited about logs and sad about alerts.',
    name: 'SOC Wisdom',
    role: 'Blue Team Philosopher',
  },
  {
    quote: 'Remember: attackers only have to be lucky once. Defenders have to be lucky every day before coffee.',
    name: 'Incident Humor',
    role: 'Defensive Standup',
  },
  {
    quote: 'If you can’t sleep at night, you might be a blue teamer... or you left a firewall rule open.',
    name: 'SIEM Jester',
    role: 'Log Whisperer',
  },
]

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

function StatCounter({ label, value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const controls = animate(0, value, {
      duration: 2.2,
      ease: 'easeOut',
      onUpdate: (latest) => setCount(Math.round(latest)),
    })

    return () => controls.stop()
  }, [inView, value])

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      <div className="text-3xl font-bold text-white sm:text-4xl">
        {count.toLocaleString()}
        <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          {suffix}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{label}</p>
    </div>
  )
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [notif, setNotif] = useState(false)
  const [liveStatsFade, setLiveStatsFade] = useState(1)
  const command = 'analyze --threat intel_feed --mode defense'

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 7 + Math.random() * 8,
        delay: Math.random() * 4,
      })),
    [],
  )

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setTyped(command.slice(0, index + 1))
      index += 1

      if (index >= command.length) clearInterval(timer)
    }, 40)

    return () => clearInterval(timer)
  }, [])

  // Glitch effect for notification
  const glitchText = (
    <span className="relative inline-block">
      <span className="absolute left-0 top-0 w-full text-cyan-400 opacity-70 animate-glitch1 select-none pointer-events-none">In Progress · Coming Soon</span>
      <span className="absolute left-0 top-0 w-full text-purple-400 opacity-70 animate-glitch2 select-none pointer-events-none">In Progress · Coming Soon</span>
      <span className="relative z-10">In Progress · Coming Soon</span>
    </span>
  )

  useEffect(() => {
    if (notif) {
      const t = setTimeout(() => setNotif(false), 2200)
      return () => clearTimeout(t)
    }
  }, [notif])

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0
      const nextOpacity = Math.max(0, 1 - y / 500)
      setLiveStatsFade(nextOpacity)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#04050b] text-slate-200">
            {/* Glitched Notification Popup */}
            {notif && (
              <div className="fixed left-1/2 top-8 z-[9999] -translate-x-1/2 rounded-xl border border-cyan-400/30 bg-black/80 px-6 py-4 text-center text-base font-bold text-cyan-100 shadow-2xl backdrop-blur-xl animate-fadein">
                {glitchText}
              </div>
            )}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.17),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.16),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(6,182,212,0.12),transparent_35%)]" />

      <div className="pointer-events-none fixed inset-0 cyber-grid opacity-40" />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute size-1 rounded-full bg-cyan-300/50"
            style={{ left: particle.left, top: particle.top }}
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: particle.duration,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-2">
            <img src="/nullops.jpg" alt="NullOps Logo" className="size-8 rounded-lg object-cover shadow-[0_0_24px_rgba(34,211,238,0.5)] border border-cyan-400/40" />
            <span className="text-base font-semibold tracking-wide text-white">
              NullOps Defense
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="#cta" className="btn-primary px-5 py-2 text-sm">
              Start Learning
            </a>
          </div>

          <button
            className="rounded-lg border border-white/15 p-2 text-slate-200 md:hidden"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 bg-black/60 px-4 py-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-slate-300"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-2 w-full px-4 py-2 text-center text-sm"
              >
                Start Learning
              </a>
            </div>
          </motion.div>
        )}
      </header>

      <main className="relative z-10">
        <section id="home" className="mx-auto max-w-7xl px-4 pb-20 pt-18 sm:px-6 lg:px-8 lg:pt-24">
          <Reveal className="mx-auto max-w-4xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-400/10 px-4 py-1 text-xs tracking-[0.16em] text-cyan-200"
            >
              DEFENSIVE SECURITY TRAINING PLATFORM
            </motion.p>

            <h1 className="text-balance text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Master Defensive Security
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-slate-300 sm:text-lg">
              Build job-ready blue-team skills through SOC scenarios, real-world threat simulations,
              and guided detection engineering labs designed for modern cyber defense teams.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                className="btn-primary w-full px-6 py-3 text-center text-sm sm:w-auto"
                onClick={() => setNotif(true)}
              >
                Start Learning
              </button>
              <button
                type="button"
                className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-center text-sm font-medium text-slate-100 transition hover:border-cyan-300/45 hover:bg-cyan-400/10 hover:text-cyan-100 sm:w-auto"
                onClick={() => setNotif(true)}
              >
                Explore Labs
              </button>
            </div>
          </Reveal>

          <Reveal className="mx-auto mt-10 max-w-3xl">
            <div className="rounded-2xl border border-white/10 bg-slate-900/55 p-5 shadow-[0_0_50px_rgba(59,130,246,0.18)] backdrop-blur-2xl">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">Live command feed</p>
              <div className="rounded-xl border border-slate-700/60 bg-[#02030a] p-4 font-mono text-sm text-cyan-300">
                <span className="text-cyan-500">$</span> {typed}
                <span className="ml-1 inline-block h-4 w-[8px] animate-pulse bg-cyan-300 align-middle" />
              </div>
            </div>
          </Reveal>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Platform Features</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Purpose-built experiences for blue-team analysts, defenders, and SOC operators.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Reveal key={feature.title} delay={idx * 0.06}>
                  <motion.article
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                  >
                    <div className="mb-4 inline-flex rounded-xl border border-cyan-300/40 bg-cyan-400/10 p-3 text-cyan-200 transition group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{feature.text}</p>
                  </motion.article>
                </Reveal>
              )
            })}
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">How It Works</h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {['Learn', 'Practice', 'Compete'].map((step, idx) => (
              <Reveal key={step} delay={idx * 0.08}>
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <span className="text-xs tracking-[0.24em] text-cyan-300">STEP 0{idx + 1}</span>
                  <h3 className="mt-2 text-xl font-semibold text-white">{step}</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {idx === 0 &&
                      'Follow structured paths for SOC operations, threat detection, and incident response.'}
                    {idx === 1 &&
                      'Use guided labs and real telemetry to practice investigations and defensive playbooks.'}
                    {idx === 2 &&
                      'Join defensive competitions to validate your skills and climb the leaderboard.'}
                  </p>
                  {idx < 2 && (
                    <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-cyan-400 md:block">
                      →
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="stats" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Trusted by Cyber Defenders</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </section>

        <section id="why-us" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Why Choose NullOps Defense</h2>
          </Reveal>

          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl">
              <div className="grid grid-cols-3 border-b border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-100">
                <div>Criteria</div>
                <div>Typical Platform</div>
                <div className="text-cyan-300">NullOps Defense</div>
              </div>
              {[
                ['Primary Focus', 'Broad cybersecurity topics', 'Defensive security & SOC mastery'],
                ['Lab Realism', 'Entry-level sandbox tasks', 'Real incident telemetry and modern tooling'],
                ['Skill Validation', 'Generic badges', 'Role-aligned blue-team challenge pathways'],
                ['Community', 'Mixed objective groups', 'Defense-first peer community and team events'],
              ].map(([label, a, b]) => (
                <div
                  key={label}
                  className="grid grid-cols-1 gap-2 border-b border-white/10 p-4 text-sm text-slate-300 sm:grid-cols-3 sm:gap-4"
                >
                  <div className="font-medium text-white">{label}</div>
                  <div>{a}</div>
                  <div className="flex items-start gap-2 text-cyan-100">
                    <CheckCircle2 size={16} className="mt-0.5 text-cyan-300" />
                    <span>{b}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="community" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Community Feedback</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item, idx) => (
              <Reveal key={item.name} delay={idx * 0.08}>
                <motion.blockquote
                  whileHover={{ y: -6 }}
                  className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <p className="text-sm leading-relaxed text-slate-300">“{item.quote}”</p>
                  <footer className="mt-5">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.role}</p>
                  </footer>
                </motion.blockquote>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="cta" className="mx-auto max-w-7xl px-4 pb-22 pt-10 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-blue-950/70 via-slate-900/70 to-purple-950/70 p-8 text-center shadow-[0_0_70px_rgba(34,211,238,0.22)] backdrop-blur-2xl sm:p-12">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Join the Future of Cyber Defense</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Start free, train with realistic defensive labs, and become the analyst every SOC team
                needs.
              </p>
              <button
                type="button"
                className="btn-primary mt-8 inline-flex px-7 py-3 text-sm"
                onClick={() => setNotif(true)}
              >
                Get Started Free
              </button>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} NullOps Defense</p>

          <div className="flex items-center gap-6 text-sm">
            <a href="/about" className="text-slate-400 transition hover:text-cyan-200">
              About
            </a>
            <a href="/contact" className="text-slate-400 transition hover:text-cyan-200">
              Contact
            </a>
            <a href="/terms" className="text-slate-400 transition hover:text-cyan-200">
              Terms
            </a>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <a
              href="https://instagram.com/nullops_official"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:text-cyan-200"
            >
              @nullops_official
            </a>
          </div>
        </div>
      </footer>

      <motion.div
        style={{ opacity: liveStatsFade }}
        className="pointer-events-none fixed bottom-20 right-6 z-[1] hidden rounded-xl border border-white/10 bg-black/45 p-3 backdrop-blur-xl xl:block"
      >
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="text-cyan-300">Coming Soon: Live SOC Stats</span>
        </div>
      </motion.div>
    </div>
  )
}

export default App
