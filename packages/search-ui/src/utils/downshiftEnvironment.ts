import type { Environment } from 'downshift';

// https://gist.github.com/Rendez/1dd55882e9b850dd3990feefc9d6e177
export function createProxyEnvironment(shadowRoot: ShadowRoot): Environment {
  const doc = shadowRoot.ownerDocument;
  const properties = {
    document: doc,
    addEventListener: doc.addEventListener.bind(shadowRoot),
    removeEventListener: doc.removeEventListener.bind(shadowRoot),
  };

  return (new Proxy(shadowRoot, {
    get: (_, prop) => properties[prop],
  }) as unknown) as Environment;
}
