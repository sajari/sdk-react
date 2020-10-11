/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { cloneElement } from 'react';
import tw, { styled } from 'twin.macro';
import { __DEV__ } from '../../utils/assertion';
import { cleanChildren } from '../../utils/react-helpers';
import Box from '../Box';

import { ButtonGroupProps } from './types';
import { useButtonGroupStyles } from './useButtonGroupStyles';

// TODO: remove "any"
const StyledBox = styled<any>(Box)<Pick<ButtonGroupProps, 'attached' | 'inline'>>`
  & > * {
    :first-child {
      ${(props) =>
        props.attached ? (props.inline ? tw`rounded-none rounded-l-md` : tw`rounded-none rounded-t-md`) : tw``}
    }

    :last-child {
      ${(props) =>
        props.attached ? (props.inline ? tw`rounded-none rounded-r-md` : tw`rounded-none rounded-b-md`) : tw``}
    }

    :not(:last-child):not(:first-child) {
      ${(props) => (props.attached ? tw`rounded-none focus:rounded-none` : tw``)};
    }

    ${tw`focus:z-10`};
  }
`;

const ButtonGroup = React.forwardRef((props: ButtonGroupProps, ref?: React.Ref<HTMLDivElement>) => {
  const { attached, fullWidth, inline = true, children, as = 'div', ...rest } = props;
  const buttonGroupStyles = useButtonGroupStyles(inline);
  const validChildren = cleanChildren(children);

  const clones = validChildren.map((child, index) => {
    // TODO: handle case where child is Tooltip

    return cloneElement(child, {
      fullWidth,
      ...child.props,
    });
  });

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
