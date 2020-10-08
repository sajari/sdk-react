/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import React, { cloneElement, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import tw from 'twin.macro';
import useSpacing from '../hooks/use-spacing';
import { cleanChildren } from '../utils/react-helpers';
import { RadioGroupProps } from './types';

const RadioGroup = forwardRef(
  (
    {
      onChange,
      name,
      defaultValue,
      inline = false,
      value: valueProp,
      spacing = inline ? '4' : '2',
      children,
      ...rest
    }: RadioGroupProps,
    ref,
  ) => {
    const { current: isControlled } = useRef(valueProp != null);
    const [value, setValue] = useState(defaultValue || null);
    const internalValue = isControlled ? valueProp : value;
    const spacingStyles = useSpacing({ spacing, inline });
    const rootRef = useRef<HTMLDivElement | null>(null);

    const internalOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setValue(event.target.value);
      }
      if (onChange) {
        onChange(event, event.target.value);
      }
    };

    // If no name is passed, we'll generate a random, unique name
    const fallbackName = `radio-${useId()}`;
    const internalName = name || fallbackName;
    const validChildren = cleanChildren(children);

    const clones = validChildren.map((child) =>
      cloneElement(child, {
        name: internalName,
        onChange: internalOnChange,
        checked: child.props.value === internalValue,
      }),
    );

    // Calling focus() on the radiogroup should focus on the selected option or first enabled option
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          let input = rootRef?.current?.querySelector<HTMLDivElement>('input:not(:disabled):checked');

          if (!input) {
            input = rootRef?.current?.querySelector('input:not(:disabled)');
          }

          if (input) {
            input.focus();
          }
        },
      }),
      [],
    );

    return (
      <div {...rest} ref={rootRef} role="radiogroup" css={[inline ? tw`flex-row` : tw`flex-col`, spacingStyles]}>
        {clones}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
export type { RadioGroupProps };
