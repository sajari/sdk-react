/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import React from 'react';
import tw from 'twin.macro';
import useInputStyle, { UseInputStyleProps } from '../hooks/use-input-styles';
import { __DEV__ } from '../utils/assersion';
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

  const inputStyles = useInputStyle({
    block: true,
    type: 'checkbox',
    indeterminate,
    ...props,
  } as UseInputStyleProps);

  const comp = (
    <div css={tw`relative inline-flex items-center`} {...(!children ? rest : {})}>
      &#8203;
      {indeterminate && (
        <div css={tw`absolute inset-0 flex items-center justify-center`}>
          <div css={tw`m-auto w-1/2 h-0.5 bg-white rounded-sm`} />
        </div>
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
        className="form-checkbox"
        css={inputStyles}
      />
    </div>
  );

  if (!children) {
    return comp;
  }

  return (
    <div css={tw`flex items-center`} {...rest}>
      {comp}

      <Label htmlFor={id} css={[tw`ml-2`, invalid ? tw`text-red-500` : []]}>
        {children}
      </Label>
    </div>
  );
});

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}

export default Checkbox;
export type { CheckboxProps };
