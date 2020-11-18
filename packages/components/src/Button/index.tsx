/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useButton } from '@react-aria/button';
import { useFocus, useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { mergeRefs } from '@sajari/react-sdk-utils';
import React, { useRef } from 'react';

import Box from '../Box';
import useButtonStyles from './styles';
import { ButtonProps } from './types';

const Button = React.forwardRef((props: ButtonProps, ref?: React.Ref<HTMLElement>) => {
  const {
    // TODO: handle the state later as we might need a Spinner/Icon component
    loading = false,
    as = 'button',
    appearance = 'default',
    size = 'md',
    spacing = 'default',
    disabled,
    fullWidth = false,
    onClick,
    children,
    ...rest
  } = props;

  const [focused, setFocused] = React.useState(false);
  const buttonRef = useRef<HTMLElement | null>(null);
  const ownRef = mergeRefs(buttonRef, ref);

  const { buttonProps, isPressed: pressed } = useButton(
    { ...rest, isDisabled: disabled, elementType: as, onPress: onClick },
    buttonRef,
  );
  const { hoverProps, isHovered: hovered } = useHover({
    isDisabled: disabled,
  });
  const { focusProps } = useFocus({
    isDisabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  });

  const { styles, focusRingProps } = useButtonStyles({
    pressed,
    appearance,
    disabled,
    fullWidth,
    loading,
    size,
    spacing,
    focused,
    hovered,
  });

  const customProps = mergeProps(buttonProps, focusProps, hoverProps, focusRingProps);

  // TODO: we want to toggle CSS classes based on the state change, for example
  // {'sj-button--hovered': hovered, 'sj-button--focused': focused}
  // but hold off since we're planning to put those classes in a upper ContextProvider
  return (
    <Box as={as} ref={ownRef} {...customProps} css={styles}>
      {children}
    </Box>
  );
});

export default Button;
export type { ButtonProps };
