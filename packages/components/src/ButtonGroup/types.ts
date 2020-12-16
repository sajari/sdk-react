import { PropsWithAs } from '@sajari/react-sdk-utils';
import * as React from 'react';

import { BoxProps } from '../Box';

export interface Props extends BoxProps {
  /** Should the children be attached to each other */
  attached?: boolean;
  /** Make children fullWidth */
  fullWidth?: boolean;
  /** Display children horizontally */
  inline?: boolean;
  /** Children */
  children: React.ReactNode;
}

export type UseButtonGroupStylesParams = Pick<Props, 'attached' | 'inline'>;

export type ButtonGroupProps = PropsWithAs<Props>;
