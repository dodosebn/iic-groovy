'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/app/store/lib/supabase'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export default function CreatePassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

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

    const { error: updateError } = await supabase
      .from('users')
      .update({ password })
      .eq('id', user.id)

    if (updateError) {
      setError('Failed to save password')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="max-w-sm bg-white mx-auto mb-6 p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Create a Password</h2>
      <form onSubmit={handleSetPassword} className="space-y-4">
        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded pr-10"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-3 py-2 border rounded pr-10"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowConfirm((prev) => !prev)}
          >
            {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#54cbca] text-white py-2 rounded"
        >
          {loading ? 'Saving...' : 'Save Password'}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  )
}
