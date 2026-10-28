import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: process.env.CHROMIUM_PATH ? ['--no-sandbox'] : [] });
try {
  const page = await browser.newPage({ viewport: { width: 1100, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/tests/index.html');
  const cards = page.locator('.SnackBarItem');
  const colors = ['rgb(66, 106, 128)', 'rgb(36, 195, 142)', 'rgb(243, 139, 1)', 'rgb(254, 67, 67)'];
  for (const mode of ['light', 'dark']) {
    await expect(cards).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      const card = cards.nth(i);
      await expect(card).toHaveCSS('background-color', colors[i]);
      await expect(card.locator('.SnackBarItem-Message')).toHaveCSS('color', 'rgb(255, 255, 255)');
      await expect(card.locator('.Timer-Counter')).toHaveCSS('color', 'rgb(255, 255, 255)');
      const action = card.getByRole('button', { name: 'Undo' });
      await expect(action).toHaveCSS('color', 'rgb(255, 255, 255)');
      await expect(action).toHaveCSS('background-color', 'rgba(229, 237, 245, 0.2)');
      await expect(action).toHaveCSS('height', '36px');
      await action.hover();
      await expect(action).toHaveCSS('color', 'rgb(255, 255, 255)');
      await expect(action).toHaveCSS('background-color', 'rgba(229, 237, 245, 0.2)');
    }
    await cards.first().getByRole('button', { name: 'Undo' }).click();
    await expect(page.getByTestId('snack-action')).toHaveText('system');
    await page.screenshot({fullPage:true,path:`/tmp/assistent-snackbar-${mode}.png`});
    await page.getByRole('button', { name: 'Switch theme' }).click();
  }
  assert.deepEqual(errors, []);
  console.log('PASS: approved SnackBar backgrounds, nested buttons, hover, timers and actions in both themes.');
} finally { await browser.close(); }
