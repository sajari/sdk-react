/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, { cloneElement } from 'react';
import { __DEV__ } from '../../utils/assertion';
import {  cleanChildren } from '../../utils/react-helpers';
import Box from '../Box'

import { ButtonGroupProps } from './types';
import {useButtonGroupStyles} from './useButtonGroupStyles'

const ButtonGroup = React.forwardRef((props: ButtonGroupProps, ref?: React.Ref<HTMLDivElement>) => {
  const {
    attached,
    fullWidth,
    inline = true,
    children,
    as = "div",
    ...rest
  } = props;
  const buttonGroupStyles = useButtonGroupStyles(inline);
  const validChildren = cleanChildren(children);

  const clones = validChildren.map((child, index) => {
    const isFirst = index === 0;
    const isLast = index === validChildren.length - 1;

    // TODO: handle case where child is Tooltip

    return cloneElement(child, {  zIndex: 10, inline, fullWidth, isFirst, isLast, attached, ...child.props });
  });

  return (
    <Box
      as={as}
      ref={ref}
      css={buttonGroupStyles}
      {...rest}
    >
      {clones}
    </Box>
  );
});

if (__DEV__) {
  ButtonGroup.displayName = 'ButtonGroup';
}

export default ButtonGroup;
export type { ButtonGroupProps };
