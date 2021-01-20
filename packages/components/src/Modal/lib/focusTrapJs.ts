/* eslint-disable @typescript-eslint/no-explicit-any */
// https://github.com/alexandrzavalii/focus-trap-js/blob/master/src/index.js v1.1.0

export const candidateSelectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
];

function isContentEditable(node: any) {
  return node.getAttribute('contentEditable');
}

function getTabindex(node: any) {
  const tabindexAttr = parseInt(node.getAttribute('tabindex') || '', 10);

  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(tabindexAttr)) return tabindexAttr;
  // Browsers do not return tabIndex correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.

  if (isContentEditable(node)) return 0;
  return node.tabIndex;
}

function isHidden(node: HTMLElement) {
  // offsetParent being null will allow detecting cases where an element is invisible or inside an invisible element,
  // as long as the element does not use position: fixed. For them, their visibility has to be checked directly as well.
  return node.offsetParent === null || getComputedStyle(node).visibility === 'hidden';
}

function getCheckedRadio(nodes: HTMLInputElement[], form: HTMLElement) {
  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
  return undefined;
}

function isNotRadioOrTabbableRadio(node: any) {
  if (node.tagName !== 'INPUT' || node.type !== 'radio' || !node.name) {
    return true;
  }
  const radioScope = node.form || node.ownerDocument;
  const radioSet = radioScope.querySelectorAll(`input[type="radio"][name="${node.name}"]`);
  const checked = getCheckedRadio(radioSet, node.form);
  return checked === node || (checked === undefined && radioSet[0] === node);
}

export function getAllTabbingElements(parentElem: any) {
  const currentActiveElement = document.activeElement;
  const tabbableNodes = parentElem.querySelectorAll(candidateSelectors.join(','));
  const onlyTabbable: any[] = [];
  for (let i = 0; i < tabbableNodes.length; i += 1) {
    const node = tabbableNodes[i];
    if (
      currentActiveElement === node ||
      (!node.disabled && getTabindex(node) > -1 && !isHidden(node) && isNotRadioOrTabbableRadio(node))
    ) {
      onlyTabbable.push(node);
    }
  }
  return onlyTabbable;
}

export function tabTrappingKey(event: any, parentElem: any) {
  // check if current event keyCode is tab
  if (!event || event.key !== 'Tab') {
    return false;
  }

  if (!parentElem || !parentElem.contains) {
    if (process && process.env.NODE_ENV === 'development') {
      console.warn('focus-trap-js: parent element is not defined');
    }
    return false;
  }

  if (!parentElem.contains(event.target)) {
    return false;
  }

  const allTabbingElements = getAllTabbingElements(parentElem);
  const firstFocusableElement = allTabbingElements[0];
  const lastFocusableElement = allTabbingElements[allTabbingElements.length - 1];

  if (event.shiftKey && event.target === firstFocusableElement) {
    lastFocusableElement.focus();
    event.preventDefault();
    return true;
  }
  if (!event.shiftKey && event.target === lastFocusableElement) {
    firstFocusableElement.focus();
    event.preventDefault();
    return true;
  }
  return false;
}
