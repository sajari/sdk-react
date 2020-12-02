/** @jsx jsx */
import { jsx } from '@emotion/core';
import { __DEV__, cleanChildren, getStylesObject } from '@sajari/react-sdk-utils';
import { cloneElement } from 'react';
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
  styles: stylesProp,
  disableDefaultStyles = false,
  colorCheckedClassName = '',
  colorClassName = '',
  ...rest
}: SwatchProps) => {
  const styles = getStylesObject({ container: tw`flex flex-wrap -mt-2 -ml-2` }, disableDefaultStyles);
  const validChildren = cleanChildren(children);

  return (
    <SwatchContextProvider value={{ state: checkedColors, setState: onChange, disableDefaultStyles }}>
      <Box css={[styles.container, stylesProp]} {...rest}>
        {validChildren.map((child) =>
          cloneElement(child, { className: colorClassName, checkedClassName: colorCheckedClassName, ...child.props }),
        )}
      </Box>
    </SwatchContextProvider>
  );
};

if (__DEV__) {
  Swatch.displayName = 'Swatch';
}

Swatch.Color = Color;
Swatch.colorKeys = colorKeys;
export default Swatch;
export type { SwatchProps };
