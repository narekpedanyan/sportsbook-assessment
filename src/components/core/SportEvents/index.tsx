'use client'

import { useQuery } from '@tanstack/react-query'
import EventRowWrapper from './EventRowWrapper'

import { EVENT_STATUS } from '@/lib/constants'

import type { SportEventsResponse } from '@/types'

const pollingInterval = 2000

interface SportEventsProps {
  slug: string
  initialData: SportEventsResponse
}

async function fetchSportEvents(slug: string): Promise<SportEventsResponse> {
  const res = await fetch(`/api/events/${slug}`)
  if (!res.ok) throw new Error('Failed to fetch events')
  return res.json()
}

const SportEvents = ({ slug, initialData }: SportEventsProps) => {
  const { data } = useQuery({
    queryKey: ['events', slug],
    queryFn: () => fetchSportEvents(slug),
    initialData,
    refetchInterval: (query) => {
      const hasLive = query.state.data?.groups.some((g) =>
        g.events.some((e) => e.status === EVENT_STATUS.LIVE),
      )
      return hasLive ? pollingInterval : false
    },
  })

  return (
    <div className="space-y-8">
      {data.groups.map(({ competition, events }) => {
        const liveCount = events.filter((e) => e.status === EVENT_STATUS.LIVE).length

        return (
          <section key={competition.id}>
            <div className="mb-3 flex items-center gap-2 border-b pb-2">
              <h2 className="font-semibold">{competition.name}</h2>
              <span className="text-muted-foreground text-xs">{competition.country}</span>
              {liveCount > 0 && (
                <span className="ml-auto text-xs font-medium text-green-500">{liveCount} live</span>
              )}
            </div>
            <div className="space-y-2">
              {events.map((event) => (
                <EventRowWrapper key={event.id} event={event} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default SportEvents
