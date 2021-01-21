import { BoxProps } from '../../Box';
import { HTMLAttributes } from 'react';

export interface ModalCloseButtonProps
  extends Omit<BoxProps, 'disableDefaultStyles'>,
    HTMLAttributes<HTMLButtonElement> {
  label?: string;
}
