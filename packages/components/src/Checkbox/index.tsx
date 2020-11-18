/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { __DEV__, useTheme } from '@sajari/react-sdk-utils';
import React from 'react';
import tw from 'twin.macro';

import Box from '../Box';
import useInputStyle, { UseInputStyleProps } from '../hooks/useInputStyles';
import Label from '../Label';
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
    ...rest
  } = props;
  const theme = useTheme();

  // TODO: Should return all required styles
  const { styles, focusRingStyles, focusProps } = useInputStyle({
    type: 'checkbox',
    indeterminate,
    ...props,
  } as UseInputStyleProps);

  const comp = (
    <Box css={tw`relative inline-flex items-center`} {...(!children ? rest : {})}>
      &#8203;
      <Box as="span" css={[tw`relative flex`, focusRingStyles]}>
        {indeterminate && (
          <Box css={tw`absolute inset-0 flex items-center justify-center`}>
            <Box css={[tw`m-auto w-1/2 h-0.5 rounded-sm`, { backgroundColor: theme.color.primary.text }]} />
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
          css={[tw`form-checkbox`, styles]}
          {...focusProps}
        />
      </Box>
    </Box>
  );

  if (!children) {
    return comp;
  }

  return (
    <Box css={tw`flex items-center`} {...rest}>
      {comp}

      <Label htmlFor={id} css={[tw`ml-2`, invalid ? tw`text-red-500` : []]}>
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
