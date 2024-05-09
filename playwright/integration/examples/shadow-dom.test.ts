import { test, expect } from '@playwright/test'

test.describe('shadow-dom example', () => {
  test.beforeEach(
    async ({ page }) =>
      await page.goto('http://localhost:3000/examples/shadow-dom')
  )

  test('renders slate editor inside nested shadow', async ({ page }) => {
    const outerShadow = page.locator('[data-cy="outer-shadow-root"]')
    const innerShadow = outerShadow.locator('> div')

    await expect(innerShadow.getByRole('textbox')).toHaveCount(1)
  })

  test('renders slate editor inside nested shadow and edits content', async ({
    page,
  }) => {
    const outerShadow = page.locator('[data-cy="outer-shadow-root"]')
    const innerShadow = outerShadow.locator('> div')
    const textbox = innerShadow.getByRole('textbox')

    // Ensure the textbox is present
    await expect(textbox).toHaveCount(1)

    // Clear any existing text and type new text into the textbox
    await textbox.fill('') // Clears the textbox
    await textbox.type('Hello, Playwright!')

    // Assert that the textbox contains the correct text
    await expect(textbox).toHaveValue('Hello, Playwright!')

    // Optionally, if you want to assert just the presence of text, not exact match
    await expect(textbox).toContainText('Hello, Playwright!')
  })
})
