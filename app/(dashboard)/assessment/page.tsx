'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, ArrowRight, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const DOMAINS = [
  { value: 'e-invoicing', label: 'E-Invoicing' },
  { value: 'dpdp', label: 'DPDP' },
  { value: 'ai-governance', label: 'AI Governance' },
  { value: 'vendor-due-diligence', label: 'Vendor Due Diligence' },
]

const JURISDICTIONS = [
  { value: 'uae', label: 'United Arab Emirates', supported: ['e-invoicing', 'dpdp'] },
  { value: 'oman', label: 'Oman', supported: ['e-invoicing'] },
  { value: 'ksa', label: 'Saudi Arabia (KSA)', supported: ['e-invoicing'] },
  { value: 'bahrain', label: 'Bahrain', supported: [] },
  { value: 'qatar', label: 'Qatar', supported: [] },
  { value: 'kuwait', label: 'Kuwait', supported: [] },
  { value: 'india', label: 'India', supported: ['e-invoicing', 'dpdp'] },
  { value: 'malaysia', label: 'Malaysia', supported: ['e-invoicing'] },
  { value: 'germany', label: 'Germany', supported: ['e-invoicing', 'ai-governance'] },
  { value: 'france', label: 'France', supported: ['e-invoicing'] },
  { value: 'netherlands', label: 'Netherlands', supported: [] },
  { value: 'singapore', label: 'Singapore', supported: ['dpdp'] },
  { value: 'egypt', label: 'Egypt', supported: [] },
  { value: 'turkey', label: 'Turkey', supported: [] },
]

export default function AssessmentPage() {
  const router = useRouter()
  const [selectedDomain, setSelectedDomain] = useState('e-invoicing')
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('uae')

  const isSupported = () => {
    const jurisdiction = JURISDICTIONS.find(j => j.value === selectedJurisdiction)
    return jurisdiction?.supported.includes(selectedDomain)
  }

  const handleStartAssessment = () => {
    if (isSupported()) {
      router.push('/dashboard/results')
    }
  }

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
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">Dashboard</Link>
              <Link href="#" className="text-blue-600 font-medium text-sm">Assessments</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Reports</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">Settings</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Start Your Compliance Assessment</h1>
          <p className="text-xl text-gray-600">Select your domain and jurisdiction to begin</p>
        </div>

        <div className="bg-white rounded-lg border p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              {DOMAINS.map(domain => (
                <option key={domain.value} value={domain.value}>{domain.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction</label>
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              {JURISDICTIONS.map(jurisdiction => (
                <option key={jurisdiction.value} value={jurisdiction.value}>{jurisdiction.label}</option>
              ))}
            </select>
          </div>

          {isSupported() ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {DOMAINS.find(d => d.value === selectedDomain)?.label} - {JURISDICTIONS.find(j => j.value === selectedJurisdiction)?.label}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Assessment available for this combination</p>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Duration:</strong> ~18 minutes</p>
                    <p><strong>Questions:</strong> ~50</p>
                    <p><strong>Deliverable:</strong> Readiness score (0-100) + gap analysis</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleStartAssessment}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <span>Start Free Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View Sample Report
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">This combination is not yet available</h3>
              <p className="text-gray-600 mb-4 text-sm">We're continuously expanding our coverage. Get notified when this assessment becomes available.</p>
              <button className="flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-400 transition-colors font-medium">
                <span>Notify me when available</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
