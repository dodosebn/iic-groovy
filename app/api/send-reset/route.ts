import { nanoid } from 'nanoid'
import nodemailer from 'nodemailer'
import { supabase } from '@/app/store/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const email = body?.email

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const host = req.headers.get('host')
  const protocol = host?.includes('localhost') ? 'http://' : 'https://'
  const baseUrl = `${protocol}${host}`

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !user) {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 })
  }

  const token = nanoid(32)
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30) // 30 mins

  const { error: insertError } = await supabase.from('password_resets').insert({
    email,
    token,
    expires_at: expiresAt.toISOString(),
  })

  if (insertError) {
    return NextResponse.json({ error: 'Could not save token' }, { status: 500 })
  }

  const resetLink = `${baseUrl}/admin/reset-password?token=${token}`
  const noreply = 'noreply@survey.com'

  try {
    await transporter.sendMail({
      from: `"IdeaIsCapital" <${noreply}>`,
      to: email,
      subject: 'Reset your password',
      html: `
        <p>You requested a password reset.</p>
        <p><a href="${resetLink}">Click here to reset your password</a></p>
        <p>This link will expire in 30 minutes.</p>
      `,
    })

    return NextResponse.json({ message: 'Reset link sent' })
  } catch (mailError) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
