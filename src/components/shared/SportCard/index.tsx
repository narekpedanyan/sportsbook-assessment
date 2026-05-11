import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'

import type { Sport } from '@/types'

interface SportCardProps {
  sport: Sport
}

const SportCard = ({ sport }: SportCardProps) => {
  const { name, slug, icon, liveEventCount, upcomingEventCount } = sport

  return (
    <Link href={`/sport/${slug}`}>
      <Card className="hover:border-primary hover:shadow-primary/10 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <CardContent className="flex items-center gap-4 p-4">
          <span className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl">
            {icon}
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold">{name}</h2>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                {liveEventCount} Live
              </span>
              <span className="bg-muted text-muted-foreground rounded-full px-2 py-1 text-xs font-medium">
                {upcomingEventCount} Upcoming
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default SportCard
