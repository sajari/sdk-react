/** @jsx jsx */
import { jsx } from '@emotion/core';
import { __DEV__ } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import Box from '../Box';
import { Color } from './color';
import { colorKeys } from './colors';
import SwatchContextProvider from './context';
import { SwatchProps } from './types';

const Swatch = ({
  children,
  checkedColors = [],
  onChange = () => {},
  disableDefaultStyles = false,
  styles: stylesProp,
  ...rest
}: SwatchProps) => (
  <SwatchContextProvider value={{ state: checkedColors, setState: onChange, disableDefaultStyles }}>
    <Box css={[tw`flex flex-wrap -mt-2 -ml-2`, stylesProp]} {...rest}>
      {children}
    </Box>
  </SwatchContextProvider>
);

if (__DEV__) {
  Swatch.displayName = 'Swatch';
}

Swatch.Color = Color;
Swatch.colorKeys = colorKeys;
export default Swatch;
export type { SwatchProps };
