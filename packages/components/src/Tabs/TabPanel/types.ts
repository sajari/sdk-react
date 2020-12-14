import React, { HTMLAttributes } from 'react';

import { BoxProps } from '../../Box';

export interface TabPanelProps
  extends BoxProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'tabIndex' | 'hidden' | 'id' | 'outline'> {
  selected?: boolean;
  selectedPanelRef?: React.Ref<HTMLElement>;
  id?: string;
}
