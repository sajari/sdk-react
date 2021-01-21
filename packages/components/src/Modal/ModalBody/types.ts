import { BoxProps } from '../../Box';

export interface ModalBodyProps extends Omit<BoxProps, 'as' | 'disableDefaultStyles'> {
  /** Whether content should be padded */
  padded?: boolean;
}
