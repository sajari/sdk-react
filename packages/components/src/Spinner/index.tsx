/* eslint-disable jsx-a11y/anchor-has-content */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';

import { IconSpinner } from '../assets/icons';
import { SpinnerProps } from './types';

const Spinner = (props: SpinnerProps) => <IconSpinner {...props} />;

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}

export default Spinner;
export type { SpinnerProps };
