import InnerPageLayout from './InnerPageLayout'

export default function About() {
  return (
    <InnerPageLayout
      title="About NullOps"
      subtitle="A modern platform built for defenders who want real-world blue-team skills."
    >
      <div className="space-y-4 text-slate-300">
        <p>
          NullOps is a next-generation defensive security training platform designed for SOC analysts,
          incident responders, and detection engineers.
        </p>
        <p>
          We focus on practical blue-team outcomes: triage, investigation, hunting, and response—not
          just theory. Every lab is built to feel like real operations with realistic telemetry and
          workflows.
        </p>
        <p>
          Our mission is simple: help defenders build confidence under pressure and become truly
          job-ready.
        </p>
      </div>
    </InnerPageLayout>
  )
}
