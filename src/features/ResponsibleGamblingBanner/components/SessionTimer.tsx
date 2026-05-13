'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

import { formatDuration } from '../helpers'

const SessionTimer = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="flex items-center gap-1 text-amber-700 tabular-nums dark:text-amber-400">
      <Clock className="size-3.5" />
      {formatDuration(seconds)}
    </span>
  )
}

export default SessionTimer
