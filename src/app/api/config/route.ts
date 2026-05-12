import { NextResponse } from 'next/server'

import { mockData } from '@/mock'

export async function GET() {
  return NextResponse.json({
    betSlipConfig: mockData.betSlipConfig,
    responsibleGambling: mockData.responsibleGambling,
  })
}
