import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('jar turns on one axis, resumes after dragging and stops with motion disabled', async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const control = page.locator('.jar-control');
  await expect(control).toBeVisible({ timeout: 30000 });
  await control.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1700);
  await page.addStyleTag({ content: '.jar-control:focus-visible { outline: none; }' });
  const initial = await control.screenshot();
  await page.waitForTimeout(500);
  expect((await control.screenshot()).equals(initial)).toBe(false);

  await control.focus();
  await page.keyboard.press('Home');
  const reset = await control.screenshot();
  await page.keyboard.press('ArrowRight');
  expect((await control.screenshot()).equals(reset)).toBe(false);
  await page.keyboard.press('Home');
  const beforeDrag = await control.screenshot();
  if (!isMobile) {
    const box = (await control.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await expect(control).toHaveAttribute('data-dragging', '');
    const held = await control.screenshot();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 20, { steps: 5 });
    await page.waitForTimeout(200);
    expect((await control.screenshot()).equals(held)).toBe(true);
    await page.mouse.move(box.x + box.width / 2 + 75, box.y + box.height / 2 + 20, { steps: 10 });
    const dragged = await control.screenshot();
    expect(dragged.equals(held)).toBe(false);
    await page.waitForTimeout(200);
    expect((await control.screenshot()).equals(dragged)).toBe(true);
    await page.mouse.up();
    await expect(control).not.toHaveAttribute('data-dragging');
    expect((await control.screenshot()).equals(beforeDrag)).toBe(false);
  }
  const resting = await control.screenshot();
  await page.waitForTimeout(500);
  expect((await control.screenshot()).equals(resting)).toBe(false);
  await page.locator('.motion-button').click();
  await expect(control).toBeHidden();
  await expect(page.locator('#scene canvas')).toHaveCount(0);
  await page.locator('.motion-button').click();
  await expect(control).toBeVisible({ timeout: 30000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(control).toBeHidden();
  await expect(page.locator('#scene canvas')).toHaveCount(0);
});

test('hover returns smoothly, keyboard focus responds and motion preferences win', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Touch devices intentionally do not receive hover motion.');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.route('**/*.glb', route => route.abort());
  await page.goto('/');
  const arrow = page.locator('.button-primary > span');
  await page.locator('.button-primary').hover();
  await expect(arrow).not.toHaveCSS('transform', 'none');
  await page.mouse.move(0, 0);
  await expect(arrow).toHaveCSS('transform', 'none');

  const product = page.locator('.product-image-link').first();
  const image = product.locator('img');
  await page.keyboard.press('Tab');
  await product.focus();
  await expect(image).not.toHaveCSS('transform', 'none');
  await page.keyboard.press('Tab');
  await expect(image).toHaveCSS('transform', 'none');

  await page.locator('.motion-button').click();
  await product.hover();
  await expect(image).toHaveCSS('transform', 'none');
  await expect(image).toHaveCSS('transition-duration', '0s');
  await page.locator('.motion-button').click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await product.hover();
  await expect(image).toHaveCSS('transform', 'none');
  await expect(image).toHaveCSS('transition-duration', '0s');
});

test('PL/EN, modal focus and contact navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('.brand')).toHaveText('REIL.');
  await expect(page.locator('.footer-wordmark')).toHaveText('REIL.');
  await expect(page.locator('.jar-label b')).toHaveText('REIL.');
  const link = page.locator('.product-heading a').first();
  await link.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Rzepakowy' })).toBeVisible();
  await expect(dialog.locator('a')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(link).toBeFocused();
  await page.locator('.ask-link').first().click();
  await expect(page).toHaveURL(/#kontakt$/);
  await expect(page.locator('#kontakt')).toBeInViewport();
  await page.locator('.languages a[lang="en"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle(/Beekeeping Workshop/);
  await expect(page.locator('.product-card')).toHaveCount(5);
});

test('redesigned modal updates each honey and keeps close reachable after scrolling', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'no-preference', colorScheme: 'light' });
  await page.route('**/*.glb', route => route.abort());
  for (const path of ['/', '/en/']) {
    await page.goto(path);
    const cards = page.locator('.product-card');
    const dialog = page.getByRole('dialog');
    for (let i = 0; i < await cards.count(); i++) {
      const card = cards.nth(i);
      await card.locator('.product-heading a').click();
      await expect(dialog).toBeVisible();
      await expect(dialog.locator('#dialog-title')).toHaveText(await card.locator('h3').innerText());
      await expect(dialog.locator('#dialog-season')).toHaveText(await card.locator('.harvest-season').innerText());
      await expect(dialog.locator('#dialog-note')).toHaveText(await card.locator('.product-note').innerText());
      expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      if (path === '/' && i === 1) await page.screenshot({ path: testInfo.outputPath('modal.png'), animations: 'disabled', scale: 'css' });
      await dialog.evaluate(el => { el.scrollTop = el.scrollHeight; });
      await expect(dialog.locator('.dialog-close')).toBeInViewport();
      await dialog.locator('.dialog-close').click();
      await expect(dialog).toBeHidden();
      await expect(card.locator('.product-heading a')).toBeFocused();
    }
  }
});

test('FAQ and remembered theme, no horizontal overflow', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Ciemny motyw' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const faq = page.locator('.faq-list details').first();
  await faq.locator('summary').click();
  await expect(faq).toHaveAttribute('open', '');
  await expect(faq.locator('p')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('reduced motion never fetches the models and respects changes', async ({ page }) => {
  const models: string[] = [];
  page.on('request', request => { if (request.url().endsWith('.glb')) models.push(request.url()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.locator('.motion-button')).toBeDisabled();
  await expect(page.locator('.static-jar')).toHaveCSS('opacity', '1');
  await page.waitForTimeout(700);
  await expect(page.locator('.jar-control')).toBeHidden();
  expect(models).toEqual([]);
});

test('GLB failure keeps the usable static page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.route('**/*.glb', route => route.abort());
  await page.goto('/');
  await expect(page.locator('#scene')).toHaveAttribute('data-state', 'fallback', { timeout: 15000 });
  await expect(page.locator('.static-jar')).toHaveCSS('opacity', '1');
  await page.locator('.product-heading a').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('real 3D loads and the motion switch disposes it', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('#scene')).toHaveAttribute('data-state', 'ready', { timeout: 30000 });
  await expect(page.locator('#scene canvas')).toHaveCount(1);
  await page.waitForTimeout(1600);
  for (const image of await page.locator('.product-image img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.screenshot({ path: testInfo.outputPath('landing.png'), fullPage: true });
  await page.locator('#pracownia').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: testInfo.outputPath('story.png') });
  await page.locator('.theme-button').click();
  await page.screenshot({ path: testInfo.outputPath('dark.png') });
  await page.locator('.motion-button').click();
  await expect(page.locator('#scene canvas')).toHaveCount(0);
  await expect(page.locator('.static-jar')).toHaveCSS('opacity', '1');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  expect(errors).toEqual([]);
});

test('missing WebGL keeps the fallback and does not break controls', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value(type: string, ...args: unknown[]) {
        if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') return null;
        return Reflect.apply(original, this, [type, ...args]);
      },
    });
  });
  await page.goto('/');
  await expect(page.locator('#scene')).toHaveAttribute('data-state', 'fallback', { timeout: 15000 });
  await expect(page.locator('.static-jar')).toHaveCSS('opacity', '1');
  await page.locator('.theme-button').click();
  await expect(page.locator('.theme-button')).toHaveAttribute('aria-pressed', 'true');
});

test('SEO metadata and content are present in the initial HTML', async ({ request }) => {
  for (const path of ['/', '/en/']) {
    const response = await request.get(path);
    const html = await response.text();
    expect(response.ok()).toBe(true);
    expect(html).toContain('name="description"');
    expect(html).toContain('property="og:title"');
    expect(html).toContain('id="faq"');
    expect(html).toContain('data-detail="wrzos"');
    expect(html).not.toMatch(/href="(?:tel:|mailto:)"/);
  }
  expect((await request.get('/robots.txt')).ok()).toBe(true);
  expect((await request.get('/sitemap.xml')).ok()).toBe(true);
});

test('content, product details and FAQ work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  for (const path of ['/', '/en/']) {
    await page.goto(path);
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faq = schemas.map(text => JSON.parse(text)).find(data => data['@type'] === 'FAQPage');
    const questions = await page.locator('.faq-list h3').allTextContents();
    const answers = await page.locator('.faq-list details > p').allTextContents();
    expect(questions).toHaveLength(11);
    expect(faq.inLanguage).toBe(path === '/' ? 'pl' : 'en');
    expect(faq.mainEntity).toEqual(questions.map((name, i) => ({
      '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text: answers[i] },
    })));
    await expect(page.locator('.faq-number').nth(9)).toHaveText('10');
    await page.locator('.faq-list summary').nth(2).click();
    await expect(page.locator('.faq-list details').nth(2).locator('p')).toBeVisible();
  }
  await expect(page.locator('.product-card')).toHaveCount(5);
  const details = page.locator('.product-fallback').first();
  await details.locator('summary').click();
  await expect(details.locator('.detail-intro')).toBeVisible();
  await page.locator('.faq-list summary').first().click();
  await expect(page.locator('.faq-list details').first().locator('p')).toBeVisible();
  await context.close();
});

test('accessible page and dialog in both themes and languages', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
  for (const path of ['/', '/en/']) {
    await page.goto(path);
    for (const theme of ['light', 'dark']) {
      if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('.theme-button').click();
      const scan = () => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
      expect((await scan()).violations).toEqual([]);
      await page.locator('.product-heading a').first().click();
      expect((await scan()).violations).toEqual([]);
      await page.keyboard.press('Escape');
    }
  }
});
