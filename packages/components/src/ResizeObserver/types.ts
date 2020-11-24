import { ReactNode } from 'react';

import { BoxProps } from '../Box';

export interface ResizeObserverProps extends BoxProps {
  onReady?: (element: HTMLDivElement) => void;
  onResize?: (rect: DOMRectReadOnly, entries: ResizeObserverEntry[], element: HTMLDivElement | null) => void;
  children?: ReactNode;
}
