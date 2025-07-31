import { NextResponse } from 'next/server';
import { supabase } from '@/app/store/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('id, survey_id, answers, created_at');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
