import { ReactNode } from 'react';

import { BoxProps } from '../Box';

interface Size {
  height: number;
  width: number;
}

export interface ResizeObserverProps extends BoxProps {
  onResize?: (size: Size) => void;
  children?: ReactNode;
}
