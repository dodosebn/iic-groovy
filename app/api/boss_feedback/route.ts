import { NextResponse } from 'next/server'
import { supabase } from '@/app/store/lib/supabase';

export async function GET() {
  const { data, error } = await supabase.from('surveys').select('*')

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json(data)
}
