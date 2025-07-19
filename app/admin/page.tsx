'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      if (username === 'ideaiscap001' && password === 'survsurvey_10-10') {
        localStorage.setItem('isLoggedIn', 'true')
        router.push('/admin/dashboard')
      } else {
        setError('Invalid credentials')
        setIsLoading(false)
      }
    }, 1000) // Simulate a short delay
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
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          disabled={isLoading}
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
