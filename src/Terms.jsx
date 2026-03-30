import InnerPageLayout from './InnerPageLayout'

export default function Terms() {
  return (
    <InnerPageLayout
      title="Terms & Conditions"
      subtitle="Clear and simple guidelines for safe, ethical learning on NullOps."
    >
      <div className="space-y-4 text-slate-300">
        <p>By using NullOps, you agree to responsible and ethical usage of all training environments.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use the platform for legal, educational, and defensive security purposes only.</li>
          <li>All labs and challenge environments are simulated and must not be abused.</li>
          <li>Respect community members and maintain professional conduct.</li>
          <li>Terms may evolve as platform capabilities grow.</li>
        </ul>
        <p className="text-sm text-slate-400">
          Need clarification? Reach out via <a href="/contact" className="text-cyan-300 underline">Contact</a>.
        </p>
      </div>
    </InnerPageLayout>
  )
}
