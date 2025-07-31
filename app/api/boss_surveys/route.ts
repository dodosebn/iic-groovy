import { NextResponse } from 'next/server'
import { supabase } from '@/app/store/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, description, tag, questions } = body

    if (!title || !tag || !questions) {
      return NextResponse.json(
        { error: 'Missing required fields: title, tag, or questions' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.from('surveys').insert([
      {
        title,
        description: description || '',
        tag,
        questions,
      },
    ]).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, survey: data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}
