import { NextResponse } from 'next/server'
import { supabase } from '@/app/store/lib/supabase'

export async function POST(req: Request) {
  try {
    console.log('Receiving password reset request...')

    const contentType = req.headers.get('content-type')
    console.log('Content-Type:', contentType)

    const bodyText = await req.text()
    console.log('Raw body:', bodyText)

    let body
    try {
      body = JSON.parse(bodyText)
    } catch (err) {
      console.error('Failed to parse JSON body:', err)
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 })
    }

    const { token, newPassword } = body
    console.log('Received token:', token)
    console.log('Received password:', newPassword)

    if (!token || !newPassword) {
      console.log('Missing token or password')
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      )
    }

    // Look up reset token
    const { data: resetEntry, error: resetError } = await supabase
      .from('password_resets')
      .select('*')
      .eq('token', token)
      .single()

    if (resetError || !resetEntry) {
      console.error('Invalid or expired token', resetError)
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
    }

    const now = new Date()
    const expiresAt = new Date(resetEntry.expires_at)

    if (expiresAt < now) {
      console.log('Token has expired')
      return NextResponse.json({ error: 'Reset token expired' }, { status: 410 })
    }

    // Update password directly in users table
    const { error: updateError } = await supabase
      .from('users')
      .update({ password: newPassword })
      .eq('email', resetEntry.email)

    if (updateError) {
      console.error('Password update failed:', updateError)
      return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
    }

    // Cleanup token
    const { error: deleteError } = await supabase
      .from('password_resets')
      .delete()
      .eq('token', token)

    if (deleteError) {
      console.error('Token cleanup failed:', deleteError)
    }

    console.log('Password reset successful for:', resetEntry.email)
    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 })

  } catch (err: any) {
    console.error('Reset error:', err)
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 })
  }
}
