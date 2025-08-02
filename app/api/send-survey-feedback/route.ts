import { NextResponse } from 'next/server';
import { supabase } from '@/app/store/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .select(`
        id,
        survey_id,
        answers,
        created_at,
        surveys (
          title,
          questions
        )
      `);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const formatted = data.map((item: any) => ({
      id: item.id,
      survey_id: item.survey_id, // ✅ included so frontend doesn't break
      answers: item.answers ?? {},
      created_at: item.created_at,
      surveyTitle: item.surveys?.title ?? 'Untitled Survey',
      questions: item.surveys?.questions ?? [] // ✅ make sure this is a valid array
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
