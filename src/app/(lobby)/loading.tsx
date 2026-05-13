const SportCardSkeleton = () => (
  <div className="border-border bg-card rounded-xl border">
    <div className="flex items-center gap-4 p-4">
      <div className="bg-muted h-12 w-12 shrink-0 animate-pulse rounded-full" />
      <div className="flex flex-col gap-1">
        <div className="bg-muted h-[18px] w-32 animate-pulse rounded" />
        <div className="flex gap-2">
          <div className="bg-muted h-5 w-14 animate-pulse rounded-full" />
          <div className="bg-muted h-5 w-20 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  </div>
)

const LobbyLoading = () => (
  <main className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SportCardSkeleton key={i} />
      ))}
    </div>
  </main>
)

export default LobbyLoading
