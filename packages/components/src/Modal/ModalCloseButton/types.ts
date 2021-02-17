import { HTMLAttributes } from 'react';

import { BoxProps } from '../../Box';

export interface ModalCloseButtonProps
  extends Omit<BoxProps, 'disableDefaultStyles'>,
    HTMLAttributes<HTMLButtonElement> {
  label?: string;
}
