import { useId } from '@react-aria/utils';
import { cleanChildren, getStylesObject } from '@sajari/react-sdk-utils';
import React, { cloneElement, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import tw from 'twin.macro';

import Box from '../Box';
import Text from '../Text';
import useRadioGroupStyles from './styles';
import { RadioGroupProps } from './types';

const RadioGroup = forwardRef((props: RadioGroupProps, ref) => {
  const {
    onChange,
    name,
    label = name,
    defaultValue,
    value: valueProp,
    inline,
    children,
    styles: stylesProp,
    disableDefaultStyles = false,
    'aria-labelledby': ariaLabelledBy,
    ...rest
  } = props;
  const { current: isControlled } = useRef(valueProp != null);
  const [value, setValue] = useState(defaultValue || null);
  const internalValue = isControlled ? valueProp : value;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const styles = getStylesObject(useRadioGroupStyles(props), disableDefaultStyles);

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

  const clones = validChildren.map((child, index) => {
    const checked = child.props.value === internalValue;

    // TODO: Handle if the child isn't a Radio since this assumes it will be
    return cloneElement(child, {
      key: `${internalName}-${index}`,
      name: internalName,
      onChange: internalOnChange,
      checked,
      disableDefaultStyles,
    });
  });

  const labelId = label ? `group-label-${useId()}` : undefined;

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
    <Box
      {...rest}
      ref={rootRef}
      role="radiogroup"
      aria-labelledby={ariaLabelledBy ?? labelId}
      css={[styles.container, stylesProp]}
    >
      {label && !ariaLabelledBy && (
        <Text id={labelId} css={tw`sr-only`}>
          {label}
        </Text>
      )}

      {clones}
    </Box>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
export type { RadioGroupProps };
