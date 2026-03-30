import InnerPageLayout from './InnerPageLayout'

export default function Contact() {
  return (
    <InnerPageLayout
      title="Contact Us"
      subtitle="Questions, partnerships, or feedback? Reach out to the NullOps team."
    >
      <form className="mx-auto grid max-w-2xl gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-slate-200 outline-none transition focus:border-cyan-300/50"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-slate-200 outline-none transition focus:border-cyan-300/50"
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-slate-200 outline-none transition focus:border-cyan-300/50"
        />
        <button type="button" disabled className="btn-primary mt-2 cursor-not-allowed px-6 py-3 opacity-60">
          Send (Coming Soon)
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Or email us at{' '}
        <a href="mailto:hello@nullops.com" className="text-cyan-300 underline">
          hello@nullops.com
        </a>
      </p>
    </InnerPageLayout>
  )
}
