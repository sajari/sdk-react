import React from 'react';

interface Props {
  /** Which logo to use */
  appearance?: 'color' | 'mono';
}

export interface PoweredByProps extends Props, React.HTMLAttributes<HTMLAnchorElement> {}
