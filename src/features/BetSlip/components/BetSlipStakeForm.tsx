import { memo } from 'react'
import { useFormContext } from 'react-hook-form'

import type { StakeForm } from '../types'

interface BetSlipStakeFormProps {
  minStake: number
  maxStake: number
  currencySymbol: string
}

const BetSlipStakeForm = memo(({ minStake, maxStake, currencySymbol }: BetSlipStakeFormProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StakeForm>()

  return (
    <div>
      <label htmlFor="stake" className="mb-1 block text-sm font-medium">
        Stake ({currencySymbol})
      </label>
      <input
        id="stake"
        type="number"
        step="0.01"
        min={minStake}
        max={maxStake}
        placeholder="0.00"
        aria-describedby={errors.stake ? 'stake-error' : undefined}
        aria-invalid={!!errors.stake}
        className="border-input bg-background focus:ring-ring/30 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
        {...register('stake')}
      />
      {errors.stake && (
        <p id="stake-error" role="alert" className="text-destructive mt-1 text-xs">
          {errors.stake.message}
        </p>
      )}
    </div>
  )
})

BetSlipStakeForm.displayName = 'BetSlipStakeForm'

export default BetSlipStakeForm
