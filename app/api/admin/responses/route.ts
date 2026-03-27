import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(request: Request) {
  const password = request.headers.get('x-admin-password')

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createServiceClient()

    const { data, error } = await supabase
      .from('thermometer_responses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch responses' }, { status: 500 })
    }

    return NextResponse.json({ responses: data })
  } catch (err) {
    console.error('Admin responses error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
