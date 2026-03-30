import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Terms', href: '/terms' },
]

export default function InnerPageLayout({ title, subtitle, children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#04050b] text-slate-200">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.17),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.16),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(6,182,212,0.12),transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 cyber-grid opacity-40" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/nullops.jpg"
              alt="NullOps Logo"
              className="size-8 rounded-lg border border-cyan-400/40 object-cover shadow-[0_0_24px_rgba(34,211,238,0.5)]"
            />
            <span className="text-base font-semibold tracking-wide text-white">NullOps Defense</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-slate-300 transition hover:text-cyan-300">
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="/#home" className="btn-primary px-5 py-2 text-sm">
              Back to Home
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
          <div className="border-t border-white/10 bg-black/60 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-slate-300"
                >
                  {item.label}
                </a>
              ))}
              <a href="/" onClick={() => setMobileOpen(false)} className="btn-primary mt-2 w-full px-4 py-2 text-center text-sm">
                Back to Home
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-400/10 px-4 py-1 text-xs tracking-[0.16em] text-cyan-200">
            NULLOPS DEFENSE
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">{title}</h1>
          {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-slate-300">{subtitle}</p> : null}
        </section>

        <section className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8">
          {children}
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} NullOps Defense</p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/about" className="text-slate-400 transition hover:text-cyan-200">About</Link>
            <Link to="/contact" className="text-slate-400 transition hover:text-cyan-200">Contact</Link>
            <Link to="/terms" className="text-slate-400 transition hover:text-cyan-200">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
