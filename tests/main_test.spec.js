// @ts-check
const { test, expect } = require('@playwright/test');

test('check price', async ({ page }) => {
  test.setTimeout(80000);
  await page.goto('https://www.reg.ru/web-sites/website-builder/');
  await page.locator('.b-plans-pillar__item_type_infinite').click();
  await page.getByPlaceholder('Введите имя домена').fill('HelloFromTagil');
  await page.locator('.choice-item').filter({hasText: "ru"}).locator('.domain-select-item__price').click();

  await page.waitForTimeout(3000);

  const total_price = getPrice(await page.locator('.order-footer-price__total')
    .locator('span.order-footer-price__price').textContent());

  const domain_price = getPrice(await page.locator('.domain-in-order-price__final').textContent());
  
  const infinity_tariff_price = getPrice(await page.locator('.choice-item_state_active')
    .locator('.site-builder-plans__tariff-price')
    .textContent());

  expect(parseInt(total_price)).toEqual((parseInt(infinity_tariff_price) + parseInt(domain_price)));
});

/**
 * @param {string | null} value
 */
function getPrice(value) {
  let result = '0';
  if (value != null) {
    result = value.replace(/[^0-9]/g, '');
  }
  return result;
}