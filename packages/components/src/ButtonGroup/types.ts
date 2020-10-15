import React from 'react';

import { PropsWithAs } from '../types/component-as';

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
