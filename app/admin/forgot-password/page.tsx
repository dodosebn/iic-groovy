'use client'

import { useState } from 'react'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage('Please enter your email.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/send-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Reset link sent. Check your email.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Forgot Password</h2>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1
             focus:ring-[#66ecea]"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {status === 'loading' && (
          <p className="text-sm text-blue-500">Sending reset link...</p>
        )}
        {status === 'success' && (
          <p className="text-sm text-green-600">{message}</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-500">{message}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#54cbca] text-white font-medium py-2 rounded-md transition disabled:opacity-60"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
