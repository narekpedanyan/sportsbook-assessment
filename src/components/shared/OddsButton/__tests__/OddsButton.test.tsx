import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import OddsButton from '../index'

describe('OddsButton', () => {
  const baseProps = {
    id: 'sel-1',
    odds: 2.5,
    label: '1',
    suspended: false,
  }

  it('renders the label and odds', () => {
    render(<OddsButton {...baseProps} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2.50')).toBeInTheDocument()
  })

  it('is enabled when not suspended', () => {
    render(<OddsButton {...baseProps} />)
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('is disabled when suspended', () => {
    render(<OddsButton {...baseProps} suspended />)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
  })

  it('shows lock icon and hides label/odds text when suspended', () => {
    render(<OddsButton {...baseProps} suspended />)
    // label and odds spans get invisible class
    const spans = document.querySelectorAll('.invisible')
    expect(spans.length).toBeGreaterThanOrEqual(2)
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<OddsButton {...baseProps} onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when suspended (button is disabled)', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<OddsButton {...baseProps} suspended onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('sets aria-pressed when not suspended', () => {
    render(<OddsButton {...baseProps} selected />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('omits aria-pressed when suspended', () => {
    render(<OddsButton {...baseProps} suspended selected />)
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed')
  })

  it('applies selected styles when selected', () => {
    render(<OddsButton {...baseProps} selected />)
    // selected variant adds bg-primary class
    expect(screen.getByRole('button').className).toContain('bg-primary')
  })

  it('does not apply selected styles when not selected', () => {
    render(<OddsButton {...baseProps} selected={false} />)
    expect(screen.getByRole('button').className).not.toContain('bg-primary')
  })

  it('shows drift flash span when odds increase', async () => {
    vi.useFakeTimers()
    const { rerender } = render(<OddsButton {...baseProps} odds={2.0} />)
    act(() => {
      rerender(<OddsButton {...baseProps} odds={2.5} />)
    })
    // flash span should be present immediately after re-render
    expect(document.querySelector('.animate-odds-drift')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(700))
    expect(document.querySelector('.animate-odds-drift')).not.toBeInTheDocument()
    vi.useRealTimers()
  })

  it('shows shorten flash span when odds decrease', async () => {
    vi.useFakeTimers()
    const { rerender } = render(<OddsButton {...baseProps} odds={3.0} />)
    act(() => {
      rerender(<OddsButton {...baseProps} odds={2.0} />)
    })
    expect(document.querySelector('.animate-odds-shorten')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(700))
    expect(document.querySelector('.animate-odds-shorten')).not.toBeInTheDocument()
    vi.useRealTimers()
  })

  it('suppresses flash animation when selected', () => {
    vi.useFakeTimers()
    const { rerender } = render(<OddsButton {...baseProps} odds={2.0} selected />)
    act(() => {
      rerender(<OddsButton {...baseProps} odds={2.5} selected />)
    })
    expect(document.querySelector('.animate-odds-drift')).not.toBeInTheDocument()
    vi.useRealTimers()
  })

  it('suppresses flash animation when suspended', () => {
    vi.useFakeTimers()
    const { rerender } = render(<OddsButton {...baseProps} odds={2.0} suspended />)
    act(() => {
      rerender(<OddsButton {...baseProps} odds={2.5} suspended />)
    })
    expect(document.querySelector('.animate-odds-drift')).not.toBeInTheDocument()
    vi.useRealTimers()
  })
})