import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: process.env.CHROMIUM_PATH ? ['--no-sandbox'] : [] });
try {
 const page = await browser.newPage({ viewport: { width: 1100, height: 850 } });
 const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/tests/index.html');
 await page.getByRole('button', {name:'Switch theme'}).waitFor();
 const css = (selector, prop) => page.locator(selector).first().evaluate((el,p)=>getComputedStyle(el)[p],prop);
 for (const dark of [false,true]) {
  assert.equal(await css('.Button_size_s','height'),'36px');
  assert.equal(await css('.Button_size_s','borderRadius'),'999px');
  assert.equal(await css('.Button_form_brick','borderRadius'),'0px');
  assert.equal(await css('.Button_size_s','paddingLeft'),'16px');
  assert.equal(await css('.Button_size_s','lineHeight'),'21px');
  assert.equal(await css('.TextField-InputContainer','height'),'36px');
  assert.equal(await css('.TextField-InputContainer','borderRadius'),'12px');
  await expect(page.locator('.TextField-InputContainer')).toHaveCSS('background-color',dark?'rgb(25, 35, 46)':'rgb(255, 255, 255)');
  assert.equal(await css('.Select-Control','height'),'36px');
  assert.equal(await css('.Select-Control','borderRadius'),'12px');
  assert.equal(await css('h1','fontSize'),'24px');
  assert.equal(await css('h1','lineHeight'),'36px');
  assert.equal(await css('h1','fontWeight'),'500');
  assert.equal(await css('.DsPromptBadge','height'),'24px');
  assert.equal(await css('.DsPromptBadge','fontSize'),'12px');
  await expect(page.locator('.ChoiceGroup-Label_checked')).toHaveCSS('background-color',dark?'rgb(23, 61, 89)':'rgb(223, 241, 255)');
  await page.locator('.Select-Control').click();
  await page.getByRole('listbox').waitFor();
  await expect(page.getByRole('listbox')).toHaveCSS('opacity','1');
  assert.equal(await css('.SelectDropdown','borderRadius'),'20px');
  assert.equal(await css('.SelectDropdown','backgroundColor'),dark?'rgb(32, 45, 59)':'rgb(255, 255, 255)');
  assert.match(await css('.SelectDropdown','boxShadow'),dark?/12px 32px/:/8px 28px/);
  await page.screenshot({fullPage:true,path:`/tmp/assistent-theme-${dark?'dark':'light'}.png`});
  await page.getByRole('option').last().click();
  await page.getByRole('listbox').waitFor({state:'hidden'});
  await page.getByRole('button',{name:'Switch theme'}).click();
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: real Consta components, both themes, portaled dropdown, explicit forms, typography, badge and selection.');
} finally { await browser.close(); }
