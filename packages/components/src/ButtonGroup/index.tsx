/* eslint-disable no-nested-ternary */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { cloneElement } from 'react';
import tw, { styled } from 'twin.macro';

import Box from '../Box';
import { __DEV__ } from '../utils/assertion';
import { cleanChildren } from '../utils/react-helpers';
import { useButtonGroupStyles } from './styles';
import { ButtonGroupProps } from './types';

// TODO: remove "any"
const StyledBox = styled<any>(Box, { shouldForwardProp: (prop) => prop !== 'attached' && prop !== 'inline' })<
  Pick<ButtonGroupProps, 'attached' | 'inline'>
>`
  & > button {
    :first-of-type {
      ${(props) =>
        props.attached
          ? props.inline
            ? tw`rounded-none rounded-l-md after:(rounded-none rounded-l-lg)`
            : tw`rounded-none rounded-t-md after:(rounded-none rounded-t-lg)`
          : tw``}
    }

    :last-of-type {
      ${(props) =>
        props.attached
          ? props.inline
            ? tw`rounded-none rounded-r-md after:(rounded-none rounded-r-lg)`
            : tw`rounded-none rounded-b-md after:(rounded-none rounded-b-lg)`
          : tw``}
    }

    :not(:last-of-type):not(:first-of-type) {
      ${(props) => (props.attached ? tw`rounded-none  after:(rounded-none)` : tw``)};
    }

    ${tw`focus:z-10`};
  }
`;

const ButtonGroup = React.forwardRef((props: ButtonGroupProps, ref?: React.Ref<HTMLDivElement>) => {
  const { attached = false, fullWidth, inline = true, children, as = 'div', ...rest } = props;
  const buttonGroupStyles = useButtonGroupStyles({ attached, inline });
  const validChildren = cleanChildren(children);

  // TODO: handle case where child is Tooltip
  const clones = validChildren.map((child) =>
    cloneElement(child, {
      fullWidth,
      ...child.props,
    }),
  );

  return (
    <StyledBox attached={attached} inline={inline} as={as} ref={ref} css={buttonGroupStyles} {...rest}>
      {clones}
    </StyledBox>
  );
});

if (__DEV__) {
  ButtonGroup.displayName = 'ButtonGroup';
}

export default ButtonGroup;
export type { ButtonGroupProps };
