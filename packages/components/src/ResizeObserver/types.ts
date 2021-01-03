import { ReactNode } from 'react';

import { BoxProps } from '../Box';

export interface ResizeObserverProps extends BoxProps {
  onReady?: (element: HTMLDivElement) => void;
  onResize?: (rect: DOMRectReadOnly, element: HTMLDivElement) => void;
  children?: ReactNode;
}
