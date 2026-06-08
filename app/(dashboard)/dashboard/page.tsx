'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function DashboardPage() {
  const [assessments, setAssessments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchAssessments() {
      const { data } = await supabase
        .from('assessments')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) {
        setAssessments(data)
      }
      setLoading(false)
    }

    fetchAssessments()
  }, [supabase])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Compliance Compass</h2>
        <p className="text-gray-600 mb-8">
          Take comprehensive compliance assessments to evaluate your organization's adherence to industry standards.
        </p>

        <div className="bg-white rounded-lg shadow p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h3>
          <p className="text-gray-600 mb-4">
            Take a new 50-question compliance assessment to evaluate your organization across key compliance domains.
          </p>
          <Link
            href="/assessment"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Start New Assessment
          </Link>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Recent Assessments</h3>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : assessments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No assessments yet. Start your first assessment to get insights into your compliance status.</p>
            <Link
              href="/assessment"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Start Assessment
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessments.map((assessment) => (
              <Link
                key={assessment.id}
                href={`/results/${assessment.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <h4 className="font-bold text-gray-900 mb-2">{assessment.title || 'Untitled Assessment'}</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Completed on {new Date(assessment.created_at).toLocaleDateString()}
                </p>
                <div className="text-lg font-bold text-blue-600">
                  {assessment.score || 0}%
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
