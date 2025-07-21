import { NextResponse } from 'next/server';
import { supabase } from '@/app/store/lib/supabase';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, full_name, role = 'admin' } = body; // Default to 'admin' if not provided

  if (!email || !full_name) {
    return NextResponse.json(
      { error: 'Email and full name are required' }, 
      { status: 400 }
    );
  }

  try {
    // 1. Send invite email
    const { data: user, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email);

    if (inviteError) {
      return NextResponse.json({ error: inviteError.message }, { status: 500 });
    }

    // 2. Insert into admins table
    const { error: insertError } = await supabase.from('admins').insert({
      id: user?.user?.id,
      email,
      full_name,
      role, // Use the role from request
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Admin invited successfully!',
      email,
      role 
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}