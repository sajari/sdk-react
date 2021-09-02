import { useMemo } from 'react';

import { useSearchUIContext } from '../ContextProvider';
import { createProxyEnvironment } from '../utils/downshiftEnvironment';

export const useDownshiftEnvironment = () => {
  const { shadowRoot } = useSearchUIContext();
  return useMemo(() => (shadowRoot ? createProxyEnvironment(shadowRoot) : undefined), [shadowRoot]);
};
