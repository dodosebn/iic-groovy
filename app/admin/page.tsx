'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/app/store/lib/supabase'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Page = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

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

    localStorage.setItem('isLoggedIn', 'true')
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 w-full max-w-sm"
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

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2 pr-10"
            disabled={isLoading}
            required
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <div className="text-right mb-4">
          <Link href="/admin/forgot-password" className="text-sm text-[#000] hover:underline">
            Forgot password?
          </Link>
        </div>

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
