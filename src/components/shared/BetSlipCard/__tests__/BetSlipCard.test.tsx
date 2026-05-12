import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { BetSlipSelection } from '@/types'

import BetSlipCard from '../index'

const selection: BetSlipSelection = {
  selectionId: 'sel-1',
  selectionName: 'Home Win',
  label: '1',
  odds: 2.5,
  eventId: 'evt-1',
  eventName: 'Team A vs Team B',
  marketId: 'mkt-1',
  marketName: 'Match Winner',
}

describe('BetSlipCard', () => {
  it('renders event name', () => {
    render(<BetSlipCard selection={selection} onRemove={vi.fn()} />)
    expect(screen.getByText('Team A vs Team B')).toBeInTheDocument()
  })

  it('renders market name', () => {
    render(<BetSlipCard selection={selection} onRemove={vi.fn()} />)
    expect(screen.getByText('Match Winner')).toBeInTheDocument()
  })

  it('renders selection name', () => {
    render(<BetSlipCard selection={selection} onRemove={vi.fn()} />)
    expect(screen.getByText('Home Win')).toBeInTheDocument()
  })

  it('renders odds formatted to 2 decimal places', () => {
    render(<BetSlipCard selection={selection} onRemove={vi.fn()} />)
    expect(screen.getByText(/2\.50/)).toBeInTheDocument()
  })

  it('renders odds with label prefix', () => {
    render(<BetSlipCard selection={selection} onRemove={vi.fn()} />)
    expect(screen.getByText('1 @ 2.50')).toBeInTheDocument()
  })

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<BetSlipCard selection={selection} onRemove={onRemove} />)
    await user.click(screen.getByRole('button', { name: /remove selection/i }))
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it('remove button has accessible label', () => {
    render(<BetSlipCard selection={selection} onRemove={vi.fn()} />)
    expect(screen.getByRole('button', { name: /remove selection/i })).toBeInTheDocument()
  })

  it('remove button is type=button to avoid accidental form submit', () => {
    render(<BetSlipCard selection={selection} onRemove={vi.fn()} />)
    expect(screen.getByRole('button', { name: /remove selection/i })).toHaveAttribute(
      'type',
      'button',
    )
  })
})