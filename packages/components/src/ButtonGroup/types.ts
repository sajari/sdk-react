import { PropsWithAs } from '@sajari/react-sdk-utils';
import React from 'react';

export interface Props {
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
