
    import { NextResponse } from 'next/server'; 
import { supabaseAdmin } from '@/app/store/lib/supabase-admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { surveyId, answers } = body;

    if (!surveyId || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('survey_responses')
      .insert([{ survey_id: surveyId,  answers }]); 

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    console.error('Insert error:', error.message);
    return NextResponse.json({ error: error.message || 'Unexpected error' }, { status: 500 });
  }
}
