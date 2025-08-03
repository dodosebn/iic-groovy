'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/store/lib/supabase'
import SurveyResponses from '../surveyResponse'
import Link from 'next/link'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/admin')
    }
  }, [])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      localStorage.removeItem('isLoggedIn')
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen  py-8 px-4">
      {/* <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6"> */}
        <div className="flex justify-between items-center px-2 flex-wrap gap-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Logout
          </button>

          <Link
            href="/admin/boss_survey"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            Create a Survey
          </Link>

          <Link
            href="/admin/manage_survey"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Manage Surveys
          </Link>
        </div>

        <div>
          <SurveyResponses />
        </div>
      {/* </div> */}
    </div>
  )
}

export default Page
