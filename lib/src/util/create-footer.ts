export const createFooter = (): HTMLElement => {
  const footer: HTMLElement = document.createElement('footer');
  const INNER: HTMLElement = document.createElement('section');

  footer.setAttribute('style', 'z-index: 10000;');
  INNER.setAttribute(
    'style',
    `
      position: absolute;
      background: white;
      font-family: sans-serif;
      bottom: 0;
      right: 0;
      padding: 0.25rem;
      border: 1px solid rgba(0,0,0,0.1);
      border-bottom: 0;
      border-right: 0;
      border-top-left-radius: 2px;
      font-size: 0.6rem;
    `
  );
  INNER.innerHTML = `
  Powered by
  <a
    style="color: #1a4270; text-decoration: none; font-weight: bold; font-size: 0.7rem;"
    href="https://energenious.eu/">
    energenious
  </a>`;

  footer.appendChild(INNER);

  return footer;
};
