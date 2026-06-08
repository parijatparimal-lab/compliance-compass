'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const COMPLIANCE_QUESTIONS = [
  // Data Security & Privacy (Q1-Q10)
  { id: 1, category: 'Data Security', question: 'Do you have a documented data classification policy?', domain: 'Data Management' },
  { id: 2, category: 'Data Security', question: 'Are all databases encrypted at rest?', domain: 'Encryption' },
  { id: 3, category: 'Data Security', question: 'Do you use encryption for data in transit?', domain: 'Encryption' },
  { id: 4, category: 'Data Security', question: 'Is there a documented incident response plan?', domain: 'Incident Management' },
  { id: 5, category: 'Data Security', question: 'Are security incidents logged and monitored?', domain: 'Monitoring' },
  { id: 6, category: 'Data Security', question: 'Do you conduct regular security audits?', domain: 'Auditing' },
  { id: 7, category: 'Data Security', question: 'Is there a data retention and deletion policy?', domain: 'Data Management' },
  { id: 8, category: 'Data Security', question: 'Are access logs maintained for sensitive data?', domain: 'Access Control' },
  { id: 9, category: 'Data Security', question: 'Do you perform regular penetration testing?', domain: 'Security Testing' },
  { id: 10, category: 'Data Security', question: 'Is multi-factor authentication implemented?', domain: 'Authentication' },

  // Access Control (Q11-Q20)
  { id: 11, category: 'Access Control', question: 'Do you have role-based access control (RBAC)?', domain: 'Access Management' },
  { id: 12, category: 'Access Control', question: 'Are access rights reviewed regularly?', domain: 'Access Review' },
  { id: 13, category: 'Access Control', question: 'Is there a formal user provisioning process?', domain: 'User Management' },
  { id: 14, category: 'Access Control', question: 'Are inactive accounts automatically disabled?', domain: 'Account Management' },
  { id: 15, category: 'Access Control', question: 'Do you maintain an inventory of system administrators?', domain: 'Admin Management' },
  { id: 16, category: 'Access Control', question: 'Are elevated privileges logged and monitored?', domain: 'Privilege Management' },
  { id: 17, category: 'Access Control', question: 'Is there separation of duties in critical functions?', domain: 'Segregation' },
  { id: 18, category: 'Access Control', question: 'Are password policies enforced and documented?', domain: 'Authentication' },
  { id: 19, category: 'Access Control', question: 'Is there a system for tracking user access changes?', domain: 'Change Management' },
  { id: 20, category: 'Access Control', question: 'Do you conduct access reviews for third parties?', domain: 'Third Party Access' },

  // Compliance & Governance (Q21-Q30)
  { id: 21, category: 'Compliance', question: 'Is there a documented compliance program?', domain: 'Governance' },
  { id: 22, category: 'Compliance', question: 'Are compliance responsibilities clearly assigned?', domain: 'Governance' },
  { id: 23, category: 'Compliance', question: 'Is there a process for compliance monitoring?', domain: 'Monitoring' },
  { id: 24, category: 'Compliance', question: 'Are compliance violations reported to management?', domain: 'Reporting' },
  { id: 25, category: 'Compliance', question: 'Do you maintain compliance training records?', domain: 'Training' },
  { id: 26, category: 'Compliance', question: 'Is regular compliance training provided to staff?', domain: 'Training' },
  { id: 27, category: 'Compliance', question: 'Is there a privacy policy that is communicated to users?', domain: 'Privacy' },
  { id: 28, category: 'Compliance', question: 'Are contracts with vendors reviewed for compliance?', domain: 'Vendor Management' },
  { id: 29, category: 'Compliance', question: 'Do you have a data breach notification procedure?', domain: 'Incident Response' },
  { id: 30, category: 'Compliance', question: 'Are compliance audit findings tracked to resolution?', domain: 'Remediation' },

  // Business Continuity (Q31-Q40)
  { id: 31, category: 'Business Continuity', question: 'Is there a documented business continuity plan?', domain: 'Planning' },
  { id: 32, category: 'Business Continuity', question: 'Is there a tested disaster recovery plan?', domain: 'DR Planning' },
  { id: 33, category: 'Business Continuity', question: 'Are critical business functions identified?', domain: 'Planning' },
  { id: 34, category: 'Business Continuity', question: 'Is there a backup strategy for critical data?', domain: 'Backup & Recovery' },
  { id: 35, category: 'Business Continuity', question: 'Are backups tested regularly?', domain: 'Backup & Recovery' },
  { id: 36, category: 'Business Continuity', question: 'Is there a documented recovery time objective (RTO)?', domain: 'Planning' },
  { id: 37, category: 'Business Continuity', question: 'Is there a documented recovery point objective (RPO)?', domain: 'Planning' },
  { id: 38, category: 'Business Continuity', question: 'Are business continuity plans tested annually?', domain: 'Testing' },
  { id: 39, category: 'Business Continuity', question: 'Is there a crisis communication plan?', domain: 'Communication' },
  { id: 40, category: 'Business Continuity', question: 'Are vendors subject to continuity requirements?', domain: 'Vendor Management' },

  // Change Management & Configuration (Q41-Q50)
  { id: 41, category: 'Change Management', question: 'Is there a change management process?', domain: 'Change Control' },
  { id: 42, category: 'Change Management', question: 'Are all changes documented before implementation?', domain: 'Documentation' },
  { id: 43, category: 'Change Management', question: 'Is there a change review and approval process?', domain: 'Approval' },
  { id: 44, category: 'Change Management', question: 'Are test environments separate from production?', domain: 'Environment Control' },
  { id: 45, category: 'Change Management', question: 'Are rollback procedures documented?', domain: 'Disaster Recovery' },
  { id: 46, category: 'Change Management', question: 'Is configuration management performed?', domain: 'Configuration Control' },
  { id: 47, category: 'Change Management', question: 'Are emergency changes tracked separately?', domain: 'Change Control' },
  { id: 48, category: 'Change Management', question: 'Is there software patch management process?', domain: 'Patch Management' },
  { id: 49, category: 'Change Management', question: 'Are system configurations baseline documented?', domain: 'Configuration Control' },
  { id: 50, category: 'Change Management', question: 'Are all system changes logged and auditable?', domain: 'Audit Trail' },
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const goNext = () => {
    if (currentQuestion < COMPLIANCE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Calculate score
      const yesCount = Object.values(answers).filter(v => v === 'yes').length
      const score = (yesCount / COMPLIANCE_QUESTIONS.length) * 100

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Save assessment
      const { data, error } = await supabase
        .from('assessments')
        .insert([
          {
            user_id: user.id,
            title: 'Compliance Assessment',
            score: Math.round(score),
            answers: answers,
            created_at: new Date().toISOString(),
          }
        ])
        .select()

      if (error) throw error

      if (data && data[0]) {
        router.push(`/results/${data[0].id}`)
      }
    } catch (error) {
      console.error('Error saving assessment:', error)
    } finally {
      setLoading(false)
    }
  }

  const question = COMPLIANCE_QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / COMPLIANCE_QUESTIONS.length) * 100
  const answered = Object.keys(answers).length

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Compliance Assessment</h2>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Question {currentQuestion + 1} of {COMPLIANCE_QUESTIONS.length}</span>
          <span>{answered} answered</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase">{question.category}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase ml-2">{question.domain}</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{question.question}</h3>
      </div>

      <div className="mb-8 space-y-3">
        <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
          <input
            type="radio"
            name="answer"
            value="yes"
            checked={answers[question.id] === 'yes'}
            onChange={() => handleAnswer(question.id, 'yes')}
            className="w-4 h-4 text-blue-600"
          />
          <span className="ml-3 text-lg text-gray-900">Yes</span>
        </label>

        <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
          <input
            type="radio"
            name="answer"
            value="partial"
            checked={answers[question.id] === 'partial'}
            onChange={() => handleAnswer(question.id, 'partial')}
            className="w-4 h-4 text-yellow-600"
          />
          <span className="ml-3 text-lg text-gray-900">Partially</span>
        </label>

        <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
          <input
            type="radio"
            name="answer"
            value="no"
            checked={answers[question.id] === 'no'}
            onChange={() => handleAnswer(question.id, 'no')}
            className="w-4 h-4 text-red-600"
          />
          <span className="ml-3 text-lg text-gray-900">No</span>
        </label>

        <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
          <input
            type="radio"
            name="answer"
            value="unknown"
            checked={answers[question.id] === 'unknown'}
            onChange={() => handleAnswer(question.id, 'unknown')}
            className="w-4 h-4 text-gray-600"
          />
          <span className="ml-3 text-lg text-gray-900">Unknown</span>
        </label>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={goPrev}
          disabled={currentQuestion === 0}
          className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {currentQuestion === COMPLIANCE_QUESTIONS.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Assessment'}
          </button>
        ) : (
          <button
            onClick={goNext}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
