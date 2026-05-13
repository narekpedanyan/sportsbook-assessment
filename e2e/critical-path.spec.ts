import { expect, test } from '@playwright/test'

/**
 * Critical path: lobby → sport → add selection → enter stake → place bet → confirmation → success toast
 *
 * Runs against Desktop Chrome (viewport 1280×720) so the sidebar bet slip is visible.
 */
test('full bet placement flow', async ({ page }) => {
  // 1. Open the lobby
  await page.goto('/')
  await expect(page).toHaveTitle(/sportsbook/i)

  // 2. Sports grid is rendered — at least one SportCard visible
  const sportCards = page.locator('a[href^="/sport/"]')
  await expect(sportCards.first()).toBeVisible()

  // 3. Navigate to football via the card link
  await page.click('a[href="/sport/football"]')
  await expect(page).toHaveURL('/sport/football')

  // 4. At least one OddsButton is visible (enabled, not suspended)
  const oddsButton = page
    .locator('button[aria-pressed]')
    .filter({ hasNot: page.locator('[aria-label="Market suspended"]') })
    .first()
  await expect(oddsButton).toBeVisible()

  // 5. Click the odds button — it should become selected (aria-pressed="true")
  await oddsButton.click()
  await expect(oddsButton).toHaveAttribute('aria-pressed', 'true')

  // 6. Bet slip sidebar should show 1 selection (desktop layout)
  const betSlipSidebar = page.locator('aside').first()
  await expect(betSlipSidebar).toBeVisible()
  await expect(betSlipSidebar.locator('button[aria-label="Remove selection"]')).toBeVisible()

  // 7. Enter a valid stake
  const stakeInput = betSlipSidebar.locator('input[type="number"]')
  await expect(stakeInput).toBeVisible()
  await stakeInput.fill('10')

  // 8. Click "Place Bet"
  const placeBetBtn = betSlipSidebar.locator('button', { hasText: /place bet/i })
  await expect(placeBetBtn).toBeEnabled()
  await placeBetBtn.click()

  // 9. Confirmation dialog appears
  const dialog = page.locator('[role="alertdialog"]')
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('Place your bet?')
  await expect(dialog).toContainText('€10.00')

  // 10. Confirm the bet
  await dialog.locator('button', { hasText: /confirm bet/i }).click()

  // 11. Success toast is shown
  await expect(page.locator('[data-sonner-toast]')).toBeVisible()
  await expect(page.locator('[data-sonner-toast]')).toContainText('Bet placed')

  // 12. Bet slip is cleared after confirmation
  await expect(betSlipSidebar.locator('input[type="number"]')).not.toBeVisible()
})

test('validation prevents placing bet with invalid stake', async ({ page }) => {
  await page.goto('/sport/football')

  // Add a selection
  const oddsButton = page
    .locator('button[aria-pressed]')
    .filter({ hasNot: page.locator('[aria-label="Market suspended"]') })
    .first()
  await oddsButton.click()

  const betSlipSidebar = page.locator('aside').first()
  const stakeInput = betSlipSidebar.locator('input[type="number"]')

  // Enter stake below minimum (€0.50)
  await stakeInput.fill('0.10')
  await betSlipSidebar.locator('button', { hasText: /place bet/i }).click()

  // No confirmation dialog should open
  await expect(page.locator('[role="alertdialog"]')).not.toBeVisible()

  // Validation error message is shown
  await expect(betSlipSidebar.locator('text=/minimum stake/i')).toBeVisible()
})