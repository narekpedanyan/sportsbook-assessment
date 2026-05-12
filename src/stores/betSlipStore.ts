import { create } from 'zustand'

import type { BetSlipSelection } from '@/types'

interface BetSlipStore {
  selections: BetSlipSelection[]
  addSelection: (selection: BetSlipSelection) => void
  removeSelection: (selectionId: string) => void
  updateOdds: (selectionId: string, odds: number) => void
  clearSlip: () => void
  hasSelection: (selectionId: string) => boolean
}

export const useBetSlipStore = create<BetSlipStore>((set, get) => ({
  selections: [],

  addSelection: (selection) =>
    set((state) => ({ selections: [...state.selections, selection] })),

  removeSelection: (selectionId) =>
    set((state) => ({
      selections: state.selections.filter((s) => s.selectionId !== selectionId),
    })),

  updateOdds: (selectionId, odds) =>
    set((state) => ({
      selections: state.selections.map((s) =>
        s.selectionId === selectionId ? { ...s, odds } : s,
      ),
    })),

  clearSlip: () => set({ selections: [] }),

  hasSelection: (selectionId) =>
    get().selections.some((s) => s.selectionId === selectionId),
}))
