import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const host = req.headers.get('host');
  const protocol = host?.includes('localhost') ? 'http://' : 'https://';
  const baseUrl = `${protocol}${host}`;
  const redirectTo = `${baseUrl}/admin/create-password?email=${encodeURIComponent(email)}`;

  try {
    // Create user in Supabase (without sending Supabase email)
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: false,
      user_metadata: { role: 'admin' },
    });

    if (error) throw error;

    // Send your own custom email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER!,
        pass: process.env.GMAIL_PASS!,
      },
    });
const noreply = 'noreply@survey.com';
    await transporter.sendMail({
      from: `"IdeaIsCapital" <${noreply}>`,
      to: email,
      subject: 'Admin Invitation',
      html: `
        <p>Hello,</p>
        <p>You’ve been invited to be an admin. Click below to set your password:</p>
        <a href="${redirectTo}">Set Your Password</a>
        <p>Best regards,<br/>IdeaIsCapital </p>
      `,
    });

    return NextResponse.json(
      {
        message: 'Admin created and email sent',
        user: data?.user,
        redirectUrl: redirectTo,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || 'Failed to create user or send email',
        details: { email, redirectTo },
      },
      { status: 500 }
    );
  }
}
