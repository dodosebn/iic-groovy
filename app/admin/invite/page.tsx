// app/admin/invite/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react'

const DELIVERY_FEEDBACK_MS = 5000

type Status = 'idle' | 'sending' | 'in_flight' | 'delivered' | 'error'

const InviteAdmin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const isMounted = useRef(true)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const resetMessages = () => {
    setMessage('')
    setErrorMsg('')
  }

  const handleInvite = async () => {
    if (!email.trim()) {
      setStatus('error')
      setErrorMsg('Please enter an email.')
      return
    }

    resetMessages()
    setStatus('sending')
    setMessage('Sending invitation…')

    try {
      const res = await fetch('/api/invite-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await res.json().catch(() => ({}))

      if (!isMounted.current) return

      if (res.ok) {
        setStatus('in_flight')
        setMessage('Invitation is on the way…')

        window.setTimeout(() => {
          if (!isMounted.current) return
          setStatus('delivered')
          setMessage(`Invitation sent to ${email.trim()}. Check your inbox (and spam folder).`)
        }, DELIVERY_FEEDBACK_MS)
      } else {
        setStatus('error')
        setErrorMsg(data?.error || 'Something went wrong. Please try again.')
      }
    } catch (err: any) {
      if (!isMounted.current) return
      setStatus('error')
      setErrorMsg(err?.message || 'Network error. Please try again.')
    }
  }

  const isLoading = status === 'sending'

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Invite Admin</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Admin email"
        className="w-full border px-3 py-2 rounded mb-4"
        disabled={isLoading}
      />

      <button
        onClick={handleInvite}
        disabled={isLoading}
        className="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded w-full"
      >
        {isLoading ? 'Inviting…' : 'Send Invite'}
      </button>

      <div
        className="mt-4 text-center text-sm"
        role="status"
        aria-live="polite"
      >
        {message && (
          <p className="text-gray-700">{message}</p>
        )}
        {errorMsg && (
          <p className="text-red-600 mt-2">{errorMsg}</p>
        )}
      </div>
    </div>
  )
}

export default InviteAdmin
