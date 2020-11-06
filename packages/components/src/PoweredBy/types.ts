import React from 'react';

interface Props {
  /** Which logo to use */
  appearance?: 'color' | 'mono';
  /** Alignment of the contents */
  align?: 'left' | 'center' | 'right';
}

export interface PoweredByProps extends Props, React.HTMLAttributes<HTMLDivElement> {}
