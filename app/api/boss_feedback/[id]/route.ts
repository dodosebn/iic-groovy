import { supabase } from '@/app/store/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: any }) {
  const id = params.id
  const updatedData = await req.json()

  const { error } = await supabase
    .from('surveys')
    .update(updatedData)
    .eq('id', id)

  if (error) {
    console.error('Update error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Updated successfully' }, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  const id = params.id

  const { error } = await supabase
    .from('surveys')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Delete error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 })
}
