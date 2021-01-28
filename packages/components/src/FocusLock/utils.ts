const focusableElements = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'embed',
  'iframe',
  'input:not([disabled])',
  'object',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '*[tabindex]:not([aria-disabled])',
  '*[contenteditable]',
];

const focusableElSelector = focusableElements.join();

export function getFocusables(element: HTMLElement | null, keyboardOnly = false) {
  if (element === null) {
    return [];
  }

  let elements = Array.from(element.querySelectorAll(focusableElSelector));

  // Filter out elements with display: none
  elements = elements.filter((focusableEl) => window.getComputedStyle(focusableEl).display !== 'none');

  if (keyboardOnly === true) {
    elements = elements.filter((focusableEl) => focusableEl.getAttribute('tabindex') !== '-1');
  }

  return elements;
}
