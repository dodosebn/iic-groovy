'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/store/lib/supabase';
import SurveyResponses from '../surveyResponse'
import Link from 'next/link';

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
    <div className="p-4">
      <button
        onClick={handleLogout}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
         <Link
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        href={'/admin/boss_survey'}
      >
        create a survey
      </Link>
      <SurveyResponses />
    </div>
  )
}

export default Page
