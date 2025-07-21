// app/admin/invite/page.tsx
'use client'
import { useState } from 'react'

const InviteAdmin = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInvite = async () => {
    setLoading(true)
    setMessage('')

    const res = await fetch('/api/invite-admin', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage(`Invitation sent to ${email}`)
    } else {
      setMessage(data.error || 'Something went wrong')
    }

    setLoading(false)
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Invite Admin</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Admin email"
        className="w-full border px-3 py-2 rounded mb-4"
      />
      <button
        onClick={handleInvite}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        {loading ? 'Inviting...' : 'Send Invite'}
      </button>
      {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
    </div>
  )
}

export default InviteAdmin;
