import type { Environment } from 'downshift';

// https://github.com/downshift-js/downshift#environment
// https://gist.github.com/Rendez/1dd55882e9b850dd3990feefc9d6e177
export function createDownshiftEnvironment(context: ShadowRoot | HTMLIFrameElement): Environment {
  const doc = context.ownerDocument;
  const properties = {
    document: doc,
    addEventListener: doc.addEventListener.bind(context),
    removeEventListener: doc.removeEventListener.bind(context),
  };

  return (new Proxy(context, {
    get: (_, prop) => properties[prop],
  }) as unknown) as Environment;
}
