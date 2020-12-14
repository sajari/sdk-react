import { AriaButtonProps } from '@react-types/button';
import { PropsWithAs } from '@sajari/react-sdk-utils';

import { BoxProps } from '../Box';

export type ButtonAppearance = 'default' | 'primary' | 'link' | 'subtle-link' | 'none';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonSpacing = 'compact' | 'default' | 'none';

interface Props extends BoxProps {
  /** The base styling to apply to the button */
  appearance?: ButtonAppearance;
  /** Set how much spacing the button should have */
  spacing?: ButtonSpacing;
  /** The size to apply to the button */
  size?: ButtonSize;
  /** Provides a url for buttons being used as a link */
  loading?: boolean;
  /** Set if the button should be full width */
  fullWidth?: boolean;
  /** The classname for pressed button */
  pressedClassName?: string;
}

export interface ButtonProps extends PropsWithAs<Props>, AriaButtonProps {}
