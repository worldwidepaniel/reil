const root = document.documentElement;
const themeButton = document.querySelector<HTMLButtonElement>('.theme-button')!;
const motionButton = document.querySelector<HTMLButtonElement>('.motion-button')!;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const darkTheme = matchMedia('(prefers-color-scheme: dark)');
const read = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const save = (key: string, value: string) => { try { localStorage.setItem(key, value); } catch { /* Storage may be unavailable in private browsing. */ } };

function updateTheme(theme: string) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#28261f' : '#f6f2e9');
}
themeButton.hidden = false;
updateTheme(root.dataset.theme || (darkTheme.matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  save('reil-theme', next);
  updateTheme(next);
});
darkTheme.addEventListener('change', () => {
  if (!read('reil-theme')) updateTheme(darkTheme.matches ? 'dark' : 'light');
});

const dialog = document.querySelector<HTMLDialogElement>('#product-dialog')!;
let dialogOpener: HTMLElement | null = null;
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll<HTMLDetailsElement>('.product-fallback').forEach(details => { details.hidden = true; });
  document.querySelectorAll<HTMLAnchorElement>('[data-product]').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      event.preventDefault();
      const card = link.closest('.product-card')!;
      const source = card.querySelector<HTMLElement>('.product-detail-content')!;
      const photo = card.querySelector<HTMLImageElement>('.product-image img')!;
      const target = document.querySelector<HTMLImageElement>('#dialog-image')!;
      target.src = photo.src;
      target.alt = photo.alt;
      document.querySelector('#dialog-title')!.textContent = card.querySelector('h3')!.textContent;
      document.querySelector('#dialog-content')!.replaceChildren(source.cloneNode(true));
      dialogOpener = link;
      dialog.showModal();
      dialog.querySelector<HTMLButtonElement>('.dialog-close')!.focus();
    });
  });
  dialog.querySelector('.dialog-close')!.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => dialogOpener?.focus({ preventScroll: true }));
}

const host = document.querySelector<HTMLElement>('#scene')!;
let sceneAbort: AbortController | undefined;
let destroyScene: (() => void) | undefined;
let idleHandle: number | undefined;

function stopScene() {
  if (idleHandle !== undefined) window.clearTimeout(idleHandle);
  sceneAbort?.abort();
  destroyScene?.();
  destroyScene = undefined;
  root.classList.remove('scene-ready');
}

function syncMotion() {
  stopScene();
  const enabled = !reducedMotion.matches && read('reil-motion') !== 'off';
  root.dataset.motion = enabled ? 'on' : 'off';
  motionButton.setAttribute('aria-pressed', String(enabled));
  motionButton.disabled = reducedMotion.matches;
  if (!enabled) return;
  const controller = new AbortController();
  sceneAbort = controller;
  // Let the text and local fonts paint before decoding the decorative models.
  idleHandle = window.setTimeout(async () => {
    try {
      const { createScene } = await import('./scene');
      if (controller.signal.aborted) return;
      const cleanup = await createScene(host, controller.signal);
      if (controller.signal.aborted) cleanup();
      else destroyScene = cleanup;
    } catch (error) {
      if (!controller.signal.aborted) {
        host.dataset.state = 'fallback';
        console.warn('REIL: static artwork retained because 3D is unavailable.', error);
      }
    }
  }, 350);
}
motionButton.hidden = false;
motionButton.addEventListener('click', () => {
  save('reil-motion', root.dataset.motion === 'on' ? 'off' : 'on');
  syncMotion();
});
reducedMotion.addEventListener('change', syncMotion);
window.addEventListener('pagehide', stopScene);
window.addEventListener('pageshow', event => { if (event.persisted) syncMotion(); });
syncMotion();
