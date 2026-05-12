'use client'

import { memo, useEffect, useState } from 'react'
import { X, ShieldCheck } from 'lucide-react'

import type { ResponsibleGambling } from './types'

import { DISMISSED_KEY } from './constants'
import SessionTimer from './components/SessionTimer'

interface ResponsibleGamblingBannerProps {
  config: ResponsibleGambling
}

const ResponsibleGamblingBanner = memo(({ config }: ResponsibleGamblingBannerProps) => {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(DISMISSED_KEY) === 'true'
    if (!wasDismissed) setDismissed(false)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, 'true')
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div
      role="banner"
      className="flex items-center gap-3 border-b border-amber-200 bg-amber-50 px-4 py-2 text-sm dark:border-amber-900/60 dark:bg-amber-950/40"
    >
      <ShieldCheck className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />

      <p className="min-w-0 flex-1 truncate text-amber-800 dark:text-amber-300">
        {config.messages.banner}
      </p>

      <div className="flex shrink-0 items-center gap-3">
        {config.sessionTimerEnabled && <SessionTimer />}

        <a
          href={config.helplineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium whitespace-nowrap text-amber-700 underline-offset-2 hover:underline dark:text-amber-400"
        >
          Set Deposit Limit
        </a>

        <button
          onClick={dismiss}
          aria-label="Dismiss responsible gambling banner"
          className="cursor-pointer text-amber-600 transition-colors hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-200"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
})

ResponsibleGamblingBanner.displayName = 'ResponsibleGamblingBanner'

export default ResponsibleGamblingBanner
