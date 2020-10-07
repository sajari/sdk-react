import { AriaButtonProps } from '@react-types/button';
import { PropsWithAs } from '../types/component-as';

export type ButtonAppearance = 'default' | 'primary' | 'link' | 'subtle-link' | 'none';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonSpacing = 'compact' | 'default' | 'none';

interface Props {
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
  /** Whether the button should be rounded */
  rounded?: boolean;
  /** Set the z-index */
  zIndex?: boolean | 0 | 10 | 20 | 30 | 40 | 50;
  /** Far left button in a button group */
  isFirst?: boolean;
  /** Far right button in a button group */
  isLast?: boolean;
  /** Are the buttons attached inside a button group */
  attached?: boolean;
  /** Are the buttons inline in a button group */
  inline?: boolean;
}

export interface ButtonProps extends PropsWithAs<Props>, AriaButtonProps {}
