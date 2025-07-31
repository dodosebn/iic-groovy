// app/api/surveys/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/app/store/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('surveys').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
