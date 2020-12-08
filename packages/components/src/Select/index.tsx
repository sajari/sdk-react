/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@react-aria/utils';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import React from 'react';

import Box from '../Box';
import Label from '../Label';
import { useSelectStyles } from './styles';
import { SelectProps } from './types';

const Select = React.forwardRef((props: SelectProps, ref?: React.Ref<HTMLSelectElement>) => {
  const {
    id = `select-${useId()}`,
    children,
    disabled,
    invalid,
    placeholder,
    label,
    size,
    styles: stylesProp,
    disableDefaultStyles = false,
    ...rest
  } = props;

  const { styles: selectStyles, focusProps } = useSelectStyles(props);
  const styles = getStylesObject(selectStyles, disableDefaultStyles);

  return (
    <Box css={[styles.container, stylesProp]}>
      {label && (
        <Label visuallyHidden htmlFor={id}>
          {label}
        </Label>
      )}

      <Box
        as="select"
        ref={ref}
        id={id}
        dir="auto"
        disabled={disabled}
        aria-invalid={invalid}
        css={styles.select}
        {...focusProps}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </Box>
    </Box>
  );
});

if (__DEV__) {
  Select.displayName = 'Select';
}

export default Select;
export type { SelectProps };
