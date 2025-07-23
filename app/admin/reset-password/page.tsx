// app/admin/reset-password/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    if (!token) {
      setMessage('Invalid token');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/confirm-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setMessage('Password reset successful');
      router.push('/admin'); // or login page
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md bg-white mb-5 mx-auto p-6 ">
      <h1 className="text-xl font-semibold mb-4">Reset Your Password</h1>
      {message && <p className="mb-2 text-red-500">{message}</p>}
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full mb-3 px-4 py-2 border rounded"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      <button
        onClick={handleReset}
        disabled={loading}
        className="w-full bg-[#54cbca] text-white py-2 rounded hover:bg-[#66ecea]"
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
    </div>
  );
}
