'use client'

import { useState, useCallback } from 'react'

import { useBetSlipStore } from '@/stores/betSlipStore'

import { cn } from '@/lib/utils'

import BetSlipContent from './components/BetSlipContent'
import BetSlipHeaderDesktop from './components/BetSlipHeaderDesktop'
import BetSlipHeaderMobile from './components/BetSlipHeaderMobile'

import { BET_SLIP_LABELS } from './constants'

import type { BetSlipConfig } from './types'

interface BetSlipProps {
  config: BetSlipConfig
}

const BetSlip = ({ config }: BetSlipProps) => {
  const { minStake, maxStake, maxPayout, currencySymbol } = config

  const selectionCount = useBetSlipStore((s) => s.selections.length)

  const [mobileOpened, setMobileOpened] = useState(false)

  const handleMobileBetSlipToggle = useCallback(() => {
    setMobileOpened((v) => !v)
  }, [])

  const handleMobileSuccess = useCallback(() => setMobileOpened(false), [])

  return (
    <>
      <aside
        role="region"
        aria-label="Bet Slip"
        className="border-border sticky top-(--sticky-top,3.5rem) hidden h-[calc(100vh-var(--sticky-top,3.5rem))] w-80 shrink-0 flex-col overflow-hidden border-l lg:flex"
      >
        <BetSlipContent
          minStake={minStake}
          maxStake={maxStake}
          maxPayout={maxPayout}
          currencySymbol={currencySymbol}
          header={
            <BetSlipHeaderDesktop selectionCount={selectionCount} label={BET_SLIP_LABELS.betSlip} />
          }
        />
      </aside>

      <div
        role="region"
        aria-label="Bet Slip"
        className={cn(
          'border-border bg-background fixed right-0 bottom-0 left-0 z-100 border-t lg:hidden',
          mobileOpened &&
            'shadow-[0_-8px_32px_rgba(0,0,0,0.18)] dark:shadow-[0_-8px_32px_rgba(255,255,255,0.07)]',
        )}
      >
        <BetSlipHeaderMobile
          onToggleBetSlip={handleMobileBetSlipToggle}
          betSlipOpened={mobileOpened}
          selectionCount={selectionCount}
          label={BET_SLIP_LABELS.betSlip}
        />
        {mobileOpened && (
          <div className="border-border h-[65vh] border-t">
            <BetSlipContent
              minStake={minStake}
              maxStake={maxStake}
              maxPayout={maxPayout}
              currencySymbol={currencySymbol}
              onSuccess={handleMobileSuccess}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default BetSlip
