import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import ExcelJS from 'exceljs'

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
      console.error('Export fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch responses' }, { status: 500 })
    }

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Responses')

    sheet.columns = [
      { header: 'Date', key: 'created_at', width: 22 },
      { header: 'Team', key: 'team', width: 20 },
      { header: 'Custom Team', key: 'custom_team', width: 20 },
      { header: 'Direction', key: 'direction', width: 12 },
      { header: 'Accountability', key: 'accountability', width: 14 },
      { header: 'Motivation', key: 'motivation', width: 12 },
      { header: 'External Orientation', key: 'external_orientation', width: 20 },
      { header: 'Innovation & Learning', key: 'innovation_learning', width: 20 },
      { header: 'Team Dynamics & Trust', key: 'team_dynamics_trust', width: 20 },
      { header: 'Leadership', key: 'leadership', width: 12 },
      { header: 'Mentorship', key: 'mentorship', width: 12 },
      { header: 'Apprenticeship', key: 'apprenticeship', width: 14 },
      { header: 'Open Feedback', key: 'open_feedback', width: 40 },
      { header: 'Concern Name', key: 'concern_name', width: 20 },
      { header: 'Concern Text', key: 'concern_text', width: 40 },
    ]

    // Style header row
    sheet.getRow(1).font = { bold: true }
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF3E4FE0' },
    }
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }

    for (const row of (data || []) as Record<string, any>[]) {
      sheet.addRow({
        created_at: row.created_at ? new Date(row.created_at).toLocaleString() : '',
        team: row.team,
        custom_team: row.custom_team || '',
        direction: row.direction,
        accountability: row.accountability,
        motivation: row.motivation,
        external_orientation: row.external_orientation,
        innovation_learning: row.innovation_learning,
        team_dynamics_trust: row.team_dynamics_trust,
        leadership: row.leadership,
        mentorship: row.mentorship,
        apprenticeship: row.apprenticeship,
        open_feedback: row.open_feedback || '',
        concern_name: row.concern_name || '',
        concern_text: row.concern_text || '',
      })
    }

    const buffer = await workbook.xlsx.writeBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="thermometer-responses-${new Date().toISOString().slice(0, 10)}.xlsx"`,
      },
    })
  } catch (err) {
    console.error('Export error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
