interface MaxPayoutExceedsWarningProps {
  maxPayoutWithCurrency: string
}

const MaxPayoutExceedsWarningMessage = ({
  maxPayoutWithCurrency,
}: MaxPayoutExceedsWarningProps) => {
  return (
    <p className="text-destructive text-xs">
      Potential return exceeds the maximum payout of{' '}
      <span className="font-semibold">{maxPayoutWithCurrency}</span>. Reduce your stake.
    </p>
  )
}

export default MaxPayoutExceedsWarningMessage
