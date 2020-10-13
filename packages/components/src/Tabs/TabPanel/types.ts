import React, { HTMLAttributes } from 'react';

export interface TabPanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'tabIndex' | 'hidden' | 'id' | 'outline'> {
  selected?: boolean;
  selectedPanelRef?: React.Ref<HTMLElement>;
  id?: string;
}
