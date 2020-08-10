export const createFooter = (): HTMLElement => {
  const footer: HTMLElement = document.createElement('footer');
  const INNER: HTMLElement = document.createElement('section');

  footer.setAttribute('style', 'z-index: 10000;');
  INNER.setAttribute(
    'style',
    `position: absolute; background: white; bottom: 0; right: 0;
        padding: 0.25rem; border: 1px solid #E6E6E6; display: inline; font-size: 0.6rem`
  );
  INNER.innerHTML = `
  Powered by
  <a
    style="color: #1a4270; text-decoration: none; font-weight: bold;"
    href="https://energenious.eu/">
    energenious
  </a>`;

  footer.appendChild(INNER);

  return footer;
};
