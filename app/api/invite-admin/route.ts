import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const protocol = req.headers.get('x-forwarded-proto') || 'https';
const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
const baseUrl = `${protocol}://${host}`;


  const redirectTo = `${baseUrl}/admin/create-password?email=${encodeURIComponent(email)}`;

  try {
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo,
      data: { role: 'admin' },
    });

    if (error) throw error;

    return NextResponse.json(
      {
        message: 'Admin invitation sent',
        user: data?.user,
        redirectUrl: redirectTo,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || 'Failed to send invitation',
        details: {
          attemptedRedirect: redirectTo,
          host,
          protocol,
        },
      },
      { status: 500 }
    );
  }
}
