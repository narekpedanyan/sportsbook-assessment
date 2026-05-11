import { NextResponse } from 'next/server'

import { mockData } from '@/mock'

export async function GET() {
  const sports = [...mockData.sports].sort((a, b) => a.order - b.order)
  return NextResponse.json(sports)
}
