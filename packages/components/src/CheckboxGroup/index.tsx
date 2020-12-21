import { useId } from '@react-aria/utils';
import { cleanChildren, getStylesObject } from '@sajari/react-sdk-utils';
import React, { cloneElement, useRef, useState } from 'react';
import tw from 'twin.macro';

import Box from '../Box';
import Text from '../Text';
import { useCheckboxGroupStyles } from './styles';
import { CheckboxGroupProps } from './types';

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const {
    onChange,
    name,
    label = name,
    defaultValue,
    value: valueProp,
    children,
    styles: stylesProp,
    disableDefaultStyles = false,
    'aria-labelledby': ariaLabelledBy,
    ...rest
  } = props;

  const [values, setValues] = useState(defaultValue || []);
  const { current: isControlled } = useRef(valueProp != null);
  const internalValues = (isControlled ? valueProp : values) || [];
  const styles = getStylesObject(useCheckboxGroupStyles(props), disableDefaultStyles);

  const internalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    let newValues: Array<any>;

    if (checked) {
      newValues = [...internalValues, value];
    } else {
      newValues = internalValues.filter((v) => v !== value);
    }
    if (!isControlled) {
      setValues(newValues);
    }
    if (onChange) {
      onChange(newValues);
    }
  };

  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `checkbox-${useId()}`;
  const internalName = name || fallbackName;
  const validChildren = cleanChildren(children);

  const clones = validChildren.map((child, index) => {
    const checked = internalValues.includes(child.props.value);

    // TODO: Handle if the child isn't a Checkbox since this assumes it will be
    return cloneElement(child, {
      key: `${internalName}-${index}`,
      name: `${internalName}-${index}`,
      onChange: internalChange,
      checked,
      disableDefaultStyles,
    });
  });

  const labelId = `group-label-${useId()}`;

  return (
    <Box {...rest} role="group" aria-labelledby={ariaLabelledBy ?? labelId} css={[styles.container, stylesProp]}>
      {label && !ariaLabelledBy && (
        <Text id={labelId} css={tw`sr-only`}>
          {label}
        </Text>
      )}

      {clones}
    </Box>
  );
};

export default CheckboxGroup;
export type { CheckboxGroupProps };
