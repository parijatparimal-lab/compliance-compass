'use client'

import Link from 'next/link'
import { Shield, TrendingUp, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Compliance Compass</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-blue-600 font-medium text-sm">Dashboard</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Assessments</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Reports</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Settings</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Assessments</h1>
          <p className="text-gray-600">Track your compliance readiness across all domains</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <AssessmentCard
            domain="E-Invoicing"
            jurisdiction="United Arab Emirates"
            score={67}
            band="Band 4 of 5"
            status="In Progress"
            criticalGaps={3}
            href="/dashboard/assessment"
          />
          <AssessmentCard
            domain="DPDP"
            jurisdiction="India"
            score={82}
            band="Band 2 of 5"
            status="Completed"
            criticalGaps={1}
            href="/dashboard/assessment"
          />
          <AssessmentCard
            domain="AI Governance"
            jurisdiction="European Union"
            score={45}
            band="Band 5 of 5"
            status="Not Started"
            criticalGaps={7}
            href="/dashboard/assessment"
          />
        </div>

        <div className="bg-white rounded-lg border p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start a New Assessment</h2>
          <p className="text-gray-600 mb-6">Begin measuring your compliance readiness in a new domain or jurisdiction</p>
          <Link
            href="/dashboard/assessment"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <span>Start Free Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

interface AssessmentCardProps {
  domain: string
  jurisdiction: string
  score: number
  band: string
  status: string
  criticalGaps: number
  href: string
}

function AssessmentCard({ domain, jurisdiction, score, band, status, criticalGaps, href }: AssessmentCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'bg-green-100 text-green-800'
    if (status === 'In Progress') return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-lg border hover:border-blue-300 transition-colors p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{domain}</h3>
            <p className="text-sm text-gray-600">{jurisdiction}</p>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full \${getStatusColor(status)}`}>
            {status}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline space-x-2 mb-1">
            <span className={`text-4xl font-bold \${getScoreColor(score)}`}>{score}</span>
            <span className="text-gray-500 text-sm">/100</span>
          </div>
          <p className="text-sm text-gray-600">{band}</p>
        </div>

        {criticalGaps > 0 && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>{criticalGaps} critical gap{criticalGaps > 1 ? 's' : ''} require attention</span>
          </div>
        )}

        {criticalGaps === 0 && status === 'Completed' && (
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>All requirements met</span>
          </div>
        )}
      </div>
    </Link>
  )
}
