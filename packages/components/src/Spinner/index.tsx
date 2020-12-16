/* eslint-disable jsx-a11y/anchor-has-content */

import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';

import { IconSpinner } from '../assets/icons';
import { SpinnerProps } from './types';

const Spinner = ({ styles, disableDefaultStyles, ...props }: SpinnerProps) => <IconSpinner css={styles} {...props} />;

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}

export default Spinner;
export type { SpinnerProps };
