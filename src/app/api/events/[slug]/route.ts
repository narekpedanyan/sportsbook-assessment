import { NextResponse } from 'next/server'
import { mockData } from '@/mock'

import type { Event, SportEventsResponse } from '@/types'

import {
  applyLiveOddsSimulation,
  groupEventsByCompetition,
  sortGroupEventsLiveFirst,
} from './helpers'

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const sport = mockData.sports.find((s) => s.slug === slug)

  if (!sport) {
    return NextResponse.json({ error: 'Sport not found' }, { status: 404 })
  }

  const sportEvents = applyLiveOddsSimulation(
    mockData.events.filter((e) => e.sportId === sport.id) as Event[],
  )

  const groups = sortGroupEventsLiveFirst(
    groupEventsByCompetition(sportEvents, mockData.competitions),
  )

  const body: SportEventsResponse = { sport, groups }

  return NextResponse.json(body)
}
