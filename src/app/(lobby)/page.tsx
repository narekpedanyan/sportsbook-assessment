import SportCard from '@/components/shared/SportCard'
import { getSports } from '@/lib/api/sports'

export default async function LobbyPage() {
  const sports = await getSports()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sports.map((sport) => (
          <SportCard key={sport.id} sport={sport} />
        ))}
      </div>
    </main>
  )
}
