import { TextProps } from '../../Text';

export type ModalTitleProps = Omit<TextProps, 'as' | 'truncate' | 'disableDefaultStyles'>;
