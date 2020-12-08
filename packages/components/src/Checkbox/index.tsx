/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@react-aria/utils';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import React from 'react';

import Box from '../Box';
import Label from '../Label';
import { useCheckboxStyles } from './styles';
import { CheckboxProps } from './types';

const Checkbox = React.forwardRef((props: CheckboxProps, ref?: React.Ref<HTMLInputElement>) => {
  const {
    id = `checkbox-${useId()}`,
    name,
    value,
    defaultChecked,
    checked,
    indeterminate,
    disabled,
    invalid,
    readOnly,
    onChange,
    onBlur,
    onFocus,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    labelClassName,
    styles: stylesProp,
    disableDefaultStyles = false,
    ...rest
  } = props;

  const { styles: checkboxStyles, focusProps } = useCheckboxStyles(props);
  const styles = getStylesObject(checkboxStyles, disableDefaultStyles);

  const comp = (
    <Box css={[styles.componentWrapper, !children && stylesProp]} {...(!children ? rest : {})}>
      &#8203;
      <Box as="span" css={styles.inputWrapper}>
        {indeterminate && (
          <Box css={styles.indeterminate}>
            <Box css={styles.indeterminateInner} />
          </Box>
        )}
        <input
          ref={ref}
          type="checkbox"
          id={id}
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-invalid={invalid}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
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
  Checkbox.displayName = 'Checkbox';
}

export default Checkbox;
export type { CheckboxProps };
