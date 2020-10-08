import React, { HTMLAttributes } from 'react';

export interface TabListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'display'> {
  onKeyDown?: React.KeyboardEventHandler;
  onClick?: React.MouseEventHandler;
}
