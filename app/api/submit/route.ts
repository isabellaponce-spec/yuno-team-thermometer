import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const supabase = getSupabaseClient()

    const row = {
      team: body.team,
      custom_team: body.customTeam || null,
      direction: body.responses?.direction ?? null,
      accountability: body.responses?.accountability ?? null,
      motivation: body.responses?.motivation ?? null,
      external_orientation: body.responses?.externalOrientation ?? null,
      innovation_learning: body.responses?.innovationLearning ?? null,
      team_dynamics_trust: body.responses?.teamDynamicsTrust ?? null,
      leadership: body.responses?.leadership ?? null,
      mentorship: body.responses?.mentorship ?? null,
      apprenticeship: body.responses?.apprenticeship ?? null,
      open_feedback: body.openFeedback || null,
      concern_name: body.concernName || null,
      concern_text: body.concernText || null,
    }

    const { error } = await supabase.from('thermometer_responses').insert(row as any)

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save response' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
