import Link from 'next/link'
import { CheckCircle, Shield, BarChart3, Users, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Compliance Compass</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Sign In</Link>
              <Link href="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Navigate Compliance with<span className="text-blue-600"> Confidence</span></h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">Streamline your compliance assessments, track regulatory requirements, and maintain audit-ready documentation all in one powerful platform.</p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg flex items-center space-x-2 shadow-lg"><span>Start Free Trial</span><ArrowRight className="h-5 w-5" /></Link>
            <Link href="/login" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-semibold text-lg">Sign In</Link>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard icon={<CheckCircle className="h-8 w-8 text-blue-600" />} title="Smart Assessments" description="Automated compliance assessments tailored to your industry and regulatory requirements." />
          <FeatureCard icon={<Shield className="h-8 w-8 text-blue-600" />} title="Risk Management" description="Identify, track, and mitigate compliance risks before they become critical issues." />
          <FeatureCard icon={<BarChart3 className="h-8 w-8 text-blue-600" />} title="Real-time Analytics" description="Visual dashboards and reports that give you instant insights into your compliance status." />
          <FeatureCard icon={<Users className="h-8 w-8 text-blue-600" />} title="Team Collaboration" description="Seamless collaboration tools to keep your entire compliance team aligned and productive." />
        </div>
      </section>
      <section className="bg-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard number="500+" label="Organizations Trust Us" />
            <StatCard number="99.9%" label="Uptime Guarantee" />
            <StatCard number="24/7" label="Expert Support" />
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Compliance?</h2>
          <p className="text-xl mb-8 text-blue-100">Join hundreds of organizations managing compliance with confidence.</p>
          <Link href="/signup" className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg inline-flex items-center space-x-2 shadow-lg"><span>Get Started Free</span><ArrowRight className="h-5 w-5" /></Link>
        </div>
      </section>
      <footer className="border-t bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600"><p>&copy; {new Date().getFullYear()} Compliance Compass. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  )
}