const MatchClockSkeleton = () => (
  <div className="flex items-center gap-1.5">
    <div className="bg-muted size-2 animate-pulse rounded-full" />
    <div className="bg-muted h-3 w-14 animate-pulse rounded" />
  </div>
)

const OddsButtonSkeleton = () => (
  <div className="bg-muted min-w-16 animate-pulse rounded-md py-2">
    <div className="flex flex-col items-center gap-0.5 px-3">
      <div className="bg-muted-foreground/20 h-[10px] w-4 rounded" />
      <div className="bg-muted-foreground/20 h-3.5 w-8 rounded" />
    </div>
  </div>
)

const EventRowSkeleton = () => (
  <div className="border-border bg-card rounded-xl border p-3">
    <div className="mb-2 flex items-center justify-between gap-2">
      <MatchClockSkeleton />
    </div>
    <div className="flex items-center gap-3">
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="bg-muted h-4 w-28 animate-pulse rounded" />
          <div className="bg-muted h-4 w-4 animate-pulse rounded" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="bg-muted h-4 w-24 animate-pulse rounded" />
          <div className="bg-muted h-4 w-4 animate-pulse rounded" />
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap justify-end gap-1">
        <OddsButtonSkeleton />
        <OddsButtonSkeleton />
        <OddsButtonSkeleton />
      </div>
    </div>
  </div>
)

const CompetitionSkeleton = () => (
  <section>
    <div className="mb-3 flex items-center gap-2 border-b pb-2">
      <div className="bg-muted h-4 w-40 animate-pulse rounded" />
      <div className="bg-muted h-3 w-16 animate-pulse rounded" />
    </div>
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <EventRowSkeleton key={i} />
      ))}
    </div>
  </section>
)

const SportPageLoading = () => (
  <main className="container mx-auto px-4 py-8">
    <div className="bg-muted mb-6 h-4 w-20 animate-pulse rounded" />
    <div className="mb-8 flex items-center gap-4">
      <div className="bg-muted size-10 animate-pulse rounded" />
      <div className="flex flex-col gap-2">
        <div className="bg-muted h-7 w-40 animate-pulse rounded" />
        <div className="bg-muted h-4 w-28 animate-pulse rounded" />
      </div>
    </div>
    <div className="space-y-8">
      {Array.from({ length: 2 }).map((_, i) => (
        <CompetitionSkeleton key={i} />
      ))}
    </div>
  </main>
)

export default SportPageLoading
