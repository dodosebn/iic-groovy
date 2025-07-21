'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/app/store/lib/supabase'

export default function CreatePassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') // Email passed in URL

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!email) {
      setError('Missing email in URL')
    }
  }, [email])

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Missing email in URL')
      return
    }

    if (password !== confirm) {
      setError("Passwords don't match")
      return
    }

    setLoading(true)

    // 1. Fetch user ID from custom users table using the email
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (fetchError || !user) {
      setError('User not found')
      setLoading(false)
      return
    }

    // 2. Update password in your custom users table
    const { error: updateError } = await supabase
      .from('users')
      .update({ password })
      .eq('id', user.id)

    if (updateError) {
      setError('Failed to save password')
      setLoading(false)
      return
    }

    // 3. Redirect to dashboard
    router.push('/admin/dashboard')
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Create a Password</h2>
      <form onSubmit={handleSetPassword} className="space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Confirm password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? 'Saving...' : 'Save Password'}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  )
}
