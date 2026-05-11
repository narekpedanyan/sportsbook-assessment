import { memo } from 'react'

import type { Dispatch, SetStateAction } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface PlaceBetConfirmationModalProps {
  confirmOpen: boolean
  setConfirmOpen: Dispatch<SetStateAction<boolean>>
  onConfirm: () => void
  currencySymbol: string
  selectionCount: number
  potentialReturn: string
  stake: string
}

const PlaceBetConfirmationModal = memo(
  ({
    confirmOpen,
    setConfirmOpen,
    onConfirm,
    currencySymbol,
    selectionCount,
    potentialReturn,
    stake,
  }: PlaceBetConfirmationModalProps) => {
    return (
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Place your bet?</AlertDialogTitle>
            <AlertDialogDescription>
              Stake{' '}
              <strong>
                {currencySymbol}
                {stake}
              </strong>{' '}
              across {selectionCount} selection{selectionCount !== 1 ? 's' : ''} for a potential
              return of{' '}
              <strong>
                {currencySymbol}
                {potentialReturn}
              </strong>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm} className="cursor-pointer">
              Confirm bet
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
)

PlaceBetConfirmationModal.displayName = 'PlaceBetConfirmationModal'

export default PlaceBetConfirmationModal
