import { NextResponse } from 'next/server'

import { mockData } from '@/mock'

import type { AppConfig } from '@/types'

export async function GET() {
  const config: AppConfig = {
    betSlipConfig: mockData.betSlipConfig,
    responsibleGambling: mockData.responsibleGambling,
  }
  return NextResponse.json(config)
}
