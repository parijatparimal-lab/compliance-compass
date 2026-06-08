'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Assessment {
  id: string
  title: string
  score: number
  answers: Record<string, string>
  created_at: string
}

const DOMAIN_SCORES = {
  'Data Management': [1, 7],
  'Encryption': [2, 3],
  'Incident Management': [4],
  'Monitoring': [5, 23],
  'Auditing': [6, 30],
  'Access Control': [8],
  'Security Testing': [9],
  'Authentication': [10, 18],
  'Access Management': [11],
  'Access Review': [12],
  'User Management': [13],
  'Account Management': [14],
  'Admin Management': [15],
  'Privilege Management': [16],
  'Segregation': [17],
  'Change Management': [19],
  'Third Party Access': [20],
  'Governance': [21, 22],
  'Reporting': [24],
  'Training': [25, 26],
  'Privacy': [27],
  'Vendor Management': [28, 40],
  'Incident Response': [29],
  'Remediation': [30],
  'Planning': [31, 33, 36, 37],
  'DR Planning': [32],
  'Backup & Recovery': [34, 35],
  'Testing': [38],
  'Communication': [39],
  'Change Control': [41, 47],
  'Documentation': [42],
  'Approval': [43],
  'Environment Control': [44],
  'Disaster Recovery': [45],
  'Configuration Control': [46, 49],
  'Patch Management': [48],
  'Audit Trail': [50],
}

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [loading, setLoading] = useState(true)
  const [domainScores, setDomainScores] = useState<Record<string, number>>({})
  const supabase = createClient()

  useEffect(() => {
    async function fetchAssessment() {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error || !data) {
        router.push('/dashboard')
        return
      }

      setAssessment(data as Assessment)

      // Calculate domain scores
      const scores: Record<string, number> = {}
      Object.entries(DOMAIN_SCORES).forEach(([domain, questionIds]) => {
        const domainAnswers = questionIds.map(id => data.answers[id])
        const yesCount = domainAnswers.filter(a => a === 'yes').length
        scores[domain] = (yesCount / questionIds.length) * 100
      })
      setDomainScores(scores)
      setLoading(false)
    }

    fetchAssessment()
  }, [params.id, router, supabase])

  if (loading) {
    return <div className="text-center py-8">Loading assessment results...</div>
  }

  if (!assessment) {
    return null
  }

  const getRiskLevel = (score: number): string => {
    if (score >= 80) return 'Low'
    if (score >= 60) return 'Medium'
    if (score >= 40) return 'High'
    return 'Critical'
  }

  const getRiskColor = (score: number): string => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-50'
    if (score >= 60) return 'bg-yellow-50'
    if (score >= 40) return 'bg-orange-50'
    return 'bg-red-50'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{assessment.title}</h1>
            <p className="text-gray-600">
              {new Date(assessment.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-6xl font-bold ${getRiskColor(assessment.score)}`}>
              {assessment.score}%
            </div>
            <div className={`text-lg font-semibold ${getRiskColor(assessment.score)}`}>
              {getRiskLevel(assessment.score)} Risk
            </div>
          </div>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="text-sm font-semibold text-blue-600 uppercase">Total Questions</div>
          <div className="text-3xl font-bold text-blue-900">50</div>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="text-sm font-semibold text-green-600 uppercase">Yes Answers</div>
          <div className="text-3xl font-bold text-green-900">
            {Object.values(assessment.answers).filter(a => a === 'yes').length}
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <div className="text-sm font-semibold text-red-600 uppercase">No Answers</div>
          <div className="text-3xl font-bold text-red-900">
            {Object.values(assessment.answers).filter(a => a === 'no').length}
          </div>
        </div>
      </div>

      {/* Domain Scores */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Compliance by Domain</h2>
        <div className="space-y-4">
          {Object.entries(domainScores)
            .sort((a, b) => a[1] - b[1])
            .map(([domain, score]) => (
              <div key={domain}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-900">{domain}</span>
                  <span className={`font-bold ${getRiskColor(score)}`}>{Math.round(score)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      score >= 80 ? 'bg-green-500' :
                      score >= 60 ? 'bg-yellow-500' :
                      score >= 40 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h2>
        <div className="space-y-4">
          {assessment.score < 80 && (
            <div className={`${getBgColor(assessment.score)} border-l-4 ${
              assessment.score >= 60 ? 'border-yellow-500' :
              assessment.score >= 40 ? 'border-orange-500' :
              'border-red-500'
            } p-6 rounded`}>
              <h3 className="font-bold text-gray-900 mb-2">Immediate Actions Required</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Identify critical gaps in your compliance framework</li>
                <li>Develop an action plan to address high-risk areas</li>
                <li>Allocate resources to remediate non-compliance issues</li>
                <li>Consider engaging compliance consultants for specialized areas</li>
              </ul>
            </div>
          )}

          {assessment.score >= 80 && (
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-2">Maintain Compliance</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Continue regular compliance audits</li>
                <li>Keep compliance documentation up to date</li>
                <li>Train staff on compliance policies</li>
                <li>Review and update policies annually</li>
              </ul>
            </div>
          )}

          {Object.entries(domainScores)
            .filter(([_, score]) => score < 60)
            .slice(0, 3)
            .map(([domain, _]) => (
              <div key={domain} className="border border-gray-300 p-4 rounded">
                <h4 className="font-semibold text-gray-900">{domain}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Focus on improving controls and processes in this compliance domain.
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link
          href="/assessment"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors"
        >
          Start New Assessment
        </Link>
        <Link
          href="/dashboard"
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 px-6 rounded-lg text-center transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
