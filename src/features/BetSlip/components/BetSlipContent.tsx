'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useForm, FormProvider, useWatch } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useBetSlipStore } from '@/stores/betSlipStore'
import BetSlipCard from '@/components/shared/BetSlipCard'

import type { BetType, StakeForm } from '../types'
import type { ReactNode } from 'react'

import { createStakeSchema, getPlaceBetLabel } from '../helpers'

import BetSlipEmpty from './BetSlipEmpty'
import BetSlipStakeForm from './BetSlipStakeForm'
import BetSlipSelectionDetails from './BetSlipSelectionDetails'
import PlaceBetConfirmationModal from './PlaceBetConfirmationModal'
import MaxPayoutExceedsWarningMessage from './MaxPayoutExceedsWarningMessage'
import BetTypesTab from './BetTypesTab'

import { BET_TYPE_IDS } from '../constants'

interface BetSlipContentProps {
  minStake: number
  maxStake: number
  maxPayout: number
  currencySymbol: string
  onSuccess?: () => void
  header?: ReactNode
}

const BetSlipContent = ({
  minStake,
  maxStake,
  maxPayout,
  currencySymbol,
  onSuccess,
  header,
}: BetSlipContentProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [betType, setBetType] = useState<BetType>(BET_TYPE_IDS.SINGLE)

  const selections = useBetSlipStore((s) => s.selections)
  const clearSlip = useBetSlipStore((s) => s.clearSlip)
  const removeSelection = useBetSlipStore((s) => s.removeSelection)

  useEffect(() => {
    if (selections.length < 2) setBetType(BET_TYPE_IDS.SINGLE)
  }, [selections.length])

  const stakeSchema = useMemo(
    () => createStakeSchema({ minStake, maxStake, currencySymbol }),
    [minStake, maxStake, currencySymbol],
  )

  const form = useForm<StakeForm>({
    resolver: standardSchemaResolver(stakeSchema),
    defaultValues: { stake: '' },
  })

  const stake = useWatch({ control: form.control, name: 'stake', defaultValue: '0' })
  const stakeValue = Number(stake)

  const combinedOdds = useMemo(() => selections.reduce((acc, s) => acc * s.odds, 1), [selections])

  const potentialReturn = useMemo(() => {
    if (stakeValue <= 0) return '0.00'
    if (betType === BET_TYPE_IDS.SINGLE) {
      return selections.reduce((acc, s) => acc + stakeValue * s.odds, 0).toFixed(2)
    }
    return (stakeValue * combinedOdds).toFixed(2)
  }, [stakeValue, betType, selections, combinedOdds])

  const totalStake = useMemo(() => {
    if (stakeValue <= 0) return '0.00'
    return betType === BET_TYPE_IDS.SINGLE
      ? (stakeValue * selections.length).toFixed(2)
      : stakeValue.toFixed(2)
  }, [stakeValue, betType, selections.length])

  const exceedsMaxPayout = useMemo(
    () => stakeValue > 0 && Number(potentialReturn) > maxPayout,
    [stakeValue, potentialReturn, maxPayout],
  )

  const handlePlaceBet = useCallback(() => {
    form.handleSubmit(() => setConfirmOpen(true))()
  }, [form])

  const handleConfirm = useCallback(() => {
    clearSlip()
    form.reset()
    setConfirmOpen(false)
    onSuccess?.()
    toast.success('Bet placed!', {
      description: `Potential return: ${currencySymbol}${potentialReturn}`,
    })
  }, [clearSlip, form, onSuccess, currencySymbol, potentialReturn])

  const isEmpty = selections.length === 0

  return (
    <div className="flex h-full flex-col">
      {header}
      {isEmpty ? (
        <BetSlipEmpty />
      ) : (
        <>
          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            {selections.map((sel) => (
              <BetSlipCard
                key={sel.selectionId}
                selection={sel}
                onRemove={() => removeSelection(sel.selectionId)}
              />
            ))}
          </div>

          <FormProvider {...form}>
            <div className="border-border space-y-3 border-t p-4">
              {selections.length >= 2 && <BetTypesTab betType={betType} setBetType={setBetType} />}

              <BetSlipStakeForm
                minStake={minStake}
                maxStake={maxStake}
                currencySymbol={currencySymbol}
              />

              <BetSlipSelectionDetails
                betType={betType}
                combinedOdds={combinedOdds.toFixed(2)}
                currencySymbol={currencySymbol}
                potentialReturn={potentialReturn}
                totalStake={totalStake}
                selectionCount={selections.length}
              />

              {exceedsMaxPayout && (
                <MaxPayoutExceedsWarningMessage
                  maxPayoutWithCurrency={`${currencySymbol}${maxPayout.toLocaleString()}`}
                />
              )}

              <Button
                onClick={handlePlaceBet}
                disabled={exceedsMaxPayout}
                className="w-full cursor-pointer disabled:cursor-not-allowed"
              >
                {getPlaceBetLabel(selections.length)}
              </Button>
            </div>
          </FormProvider>

          <PlaceBetConfirmationModal
            confirmOpen={confirmOpen}
            setConfirmOpen={setConfirmOpen}
            onConfirm={handleConfirm}
            currencySymbol={currencySymbol}
            selectionCount={selections.length}
            potentialReturn={potentialReturn}
            stake={totalStake}
          />
        </>
      )}
    </div>
  )
}

export default BetSlipContent
