'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/store/lib/supabase'

const Page = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Check users table manually
    const { data, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single()

    if (fetchError || !data) {
      setError('Invalid credentials or user not found.')
      setIsLoading(false)
      return
    }

    // Save login status and navigate
    localStorage.setItem('isLoggedIn', 'true')
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        {isLoading && <p className="text-blue-500 mb-2 text-center">Logging in...</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          disabled={isLoading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          className={`w-full py-2 rounded text-md font-semibold text-black transition ${
            isLoading ? 'bg-[#54cbca] cursor-not-allowed' : 'bg-[#66ecea]'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Please wait...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Page
