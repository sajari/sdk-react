import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { getStylesObject, mergeRefs } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
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
    className,
    styles: stylesProps,
    pressedClassName = '',
    disableDefaultStyles = false,
    ...rest
  } = props;

  const buttonRef = useRef<HTMLElement | null>(null);
  const ownRef = mergeRefs(buttonRef, ref);

  const { buttonProps, isPressed: pressed } = useButton(
    { ...rest, isDisabled: disabled, elementType: as, onPress: onClick },
    buttonRef,
  );
  const { hoverProps, isHovered: hovered } = useHover({
    isDisabled: disabled,
  });

  const { styles: containerStyles } = useButtonStyles({
    pressed,
    appearance,
    disabled,
    fullWidth,
    loading,
    size,
    spacing,
    hovered,
  });

  const customProps = mergeProps(buttonProps, hoverProps, rest);
  const styles = getStylesObject({ container: containerStyles }, disableDefaultStyles);

  return (
    <Box
      as={as}
      ref={ownRef}
      {...customProps}
      css={[styles.container, stylesProps]}
      className={classnames(className, {
        [pressedClassName]: pressed,
      })}
    >
      {children}
    </Box>
  );
});

export default Button;
export type { ButtonProps };
