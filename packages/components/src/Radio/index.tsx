/* eslint-disable jsx-a11y/role-supports-aria-props */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@react-aria/utils';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import React from 'react';

import Box from '../Box';
import Label from '../Label';
import useRadioStyles from './styles';
import { RadioProps } from './types';

const Radio = React.forwardRef((props: RadioProps, ref?: React.Ref<HTMLInputElement>) => {
  const {
    id = `checkbox-${useId()}`,
    name,
    value,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    color,
    defaultChecked,
    checked,
    disabled,
    invalid,
    readOnly,
    onChange,
    onBlur,
    onFocus,
    children,
    labelClassName,
    styles: stylesProp,
    disableDefaultStyles = false,
    ...rest
  } = props;

  const { styles: radioStyles, focusProps } = useRadioStyles(props);
  const styles = getStylesObject(radioStyles, disableDefaultStyles);

  const comp = (
    <Box css={[styles.componentWrapper, !children && stylesProp]} {...(!children ? rest : {})}>
      &#8203;
      <Box as="span" css={styles.inputWrapper}>
        <input
          ref={ref}
          type="radio"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          defaultChecked={defaultChecked}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-invalid={invalid}
          css={styles.input}
          {...focusProps}
        />
      </Box>
    </Box>
  );

  if (!children) {
    return comp;
  }

  return (
    <Box css={[styles.container, stylesProp]} {...rest}>
      {comp}

      <Label htmlFor={id} css={styles.label} className={labelClassName}>
        {children}
      </Label>
    </Box>
  );
});

if (__DEV__) {
  Radio.displayName = 'Radio';
}

export default Radio;
export type { RadioProps };
