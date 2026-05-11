import { Ticket } from 'lucide-react'

const BetSlipEmpty = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <Ticket className="text-muted-foreground size-8 opacity-40" />
      <p className="text-muted-foreground text-sm">Select odds to add to your bet slip</p>
    </div>
  )
}

export default BetSlipEmpty
