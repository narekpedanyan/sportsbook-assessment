import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import SportEvents from '@/components/core/SportEvents'
import { getSportEvents } from '@/lib/api/events'
import { EVENT_STATUS } from '@/lib/constants'

export default async function SportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getSportEvents(slug)

  if (!data) notFound()

  const { sport, groups } = data
  const totalEvents = groups.reduce((sum, g) => sum + g.events.length, 0)
  const liveCount = groups.reduce(
    (sum, g) => sum + g.events.filter((e) => e.status === EVENT_STATUS.LIVE).length,
    0,
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground mb-6 flex w-fit items-center gap-1 text-sm transition-colors"
      >
        <ChevronLeft className="size-4" />
        All Sports
      </Link>

      <div className="mb-8 flex items-center gap-4">
        <span className="text-4xl">{sport.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{sport.name}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 font-medium text-green-500">
              <span className="size-1.5 rounded-full bg-green-500" />
              {liveCount} live
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{totalEvents - liveCount} upcoming</span>
          </div>
        </div>
      </div>

      <SportEvents slug={slug} initialData={data} />
    </main>
  )
}
