'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/app/store/lib/supabase'

export default function Onboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('Setting up your session...')

  useEffect(() => {
    const access_token = searchParams.get('access_token')
    const refresh_token = searchParams.get('refresh_token')

    if (!access_token || !refresh_token) {
      setMessage('Missing tokens. Please use the link from your email.')
      return
    }

    const handleSession = async () => {
      try {
        // First clear any existing session
        await supabase.auth.signOut()

        // Set the new session
        const { error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token
        })

        if (sessionError) {
          console.error('Session Error:', sessionError.message)
          setMessage('Failed to set session. Try logging in again.')
          return
        }

        // Verify session
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
          console.error('User retrieval failed:', userError?.message)
          setMessage('Session not valid. Try clicking the email link again.')
          return
        }

        // All good — go to create-password page
        setMessage('Welcome! Redirecting to password setup...')
        router.replace('/create-password')

      } catch (err: any) {
        console.error('Unexpected error:', err)
        setMessage('Unexpected error occurred. Please retry.')
      }
    }

    handleSession()
  }, [searchParams, router])

  return (
    <div className="flex justify-center items-center h-screen px-4 text-center">
      <p className="text-lg">{message}</p>
    </div>
  )
}
