import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Compliance Compass</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">E-Invoicing</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">DPDP</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">AI Governance</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Sign In</Link>
              <Link href="/signup" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">Start Free →</Link>
            </div>
          </div>
        </div>
      </nav>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-3 text-sm font-medium text-cyan-600 mb-6">
              <span className="px-3 py-1 bg-cyan-100 rounded-full">E-INVOICING</span>
              <span className="px-3 py-1 bg-cyan-100 rounded-full">DPDP</span>
              <span className="px-3 py-1 bg-cyan-100 rounded-full">AI GOVERNANCE</span>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">Regulatory Readiness,<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Precisely Measured</span></h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Know exactly where you stand. Get your compliance score in 18 minutes—not 3-5 weeks.</p>
            <div className="flex items-center justify-center space-x-4">
              <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl">Start Free Assessment →</Link>
              <Link href="#" className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-300 transition-colors font-semibold text-lg">View Sample Report</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 border-y">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <StatItem number="1 Jan 2027" label="Real UAE mandate deadline" />
            <StatItem number="9 dimensions" label="Weighted across every gap area" />
            <StatItem number="18 minutes" label="vs 3-5 weeks consultant time" />
            <StatItem number="2,400+ criteria" label="From 26 enterprise RFPs" />
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">From Question to Report</h2>
            <p className="text-xl text-gray-600">Four steps. 18 minutes. Total clarity.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <ProcessStep number="1" title="Answer" description="50 questions" />
            <ProcessStep number="2" title="Score" description="0–100 readiness" />
            <ProcessStep number="3" title="Analyse" description="Gap heat map" />
            <ProcessStep number="4" title="Act" description="Prioritised plan" />
            </div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to measure your readiness?</h2>
          <p className="text-xl text-blue-100 mb-8">Start your free assessment now. No credit card required.</p>
          <Link href="/signup" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg shadow-xl">Start Free →</Link>
        </div>
      </section>
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center text-sm text-gray-500">© {new Date().getFullYear()} Compliance Compass. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-900 mb-2">{number}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">{number}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
