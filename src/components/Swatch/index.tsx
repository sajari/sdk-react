/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import tw from 'twin.macro';
import { __DEV__ } from '../../utils/assertion';
import Box from '../Box';
import { Color } from './color';
import { SwatchProvider } from './context';
import { SwatchProps } from './types';

const Swatch = ({ children, checkedColors = [], onChange = () => {} }: SwatchProps) => {
  return (
    <SwatchProvider checkedColors={checkedColors} onChange={onChange}>
      <Box css={tw`grid grid-cols-7 gap-3`}>{children}</Box>
    </SwatchProvider>
  );
};

if (__DEV__) {
  Swatch.displayName = 'Swatch';
}

Swatch.Color = Color;
export default Swatch;
export type { SwatchProps };
