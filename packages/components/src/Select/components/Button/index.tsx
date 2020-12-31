import { mergeProps } from '@react-aria/utils';
import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import Box from '../../../Box';
import { useSelectContext } from '../../context';
import { useButtonStyles } from './styles';

const Button = () => {
  const {
    disabled,
    getToggleButtonProps,
    id,
    invalid,
    items,
    selectedItems,
    autofocus,
    size,
    text,
    disableDefaultStyles,
    customClassNames,
  } = useSelectContext();
  const { styles: buttonStyles, focusRingProps, focusRingStyles } = useButtonStyles({ size, disabled, invalid });
  const styles = getStylesObject(buttonStyles, disableDefaultStyles);
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (autofocus && ref?.current) {
      ref.current.focus();
    }
  }, []);

  const children: React.ReactNode = React.useMemo(() => {
    if (typeof text === 'function') {
      const selected = items.filter(([v]) => selectedItems.includes(v.toString())).map(([, label]) => label);
      return text(selected);
    }

    if (typeof text !== 'undefined') {
      return text;
    }

    if (selectedItems.length === 1) {
      const [selectedItem] = selectedItems;
      const item = items.find(([v]) => selectedItem === v.toString());

      if (item) {
        const [, t] = item;
        return t;
      }
    }

    if (selectedItems.length > 1) {
      return `${selectedItems.length} selected`;
    }

    return 'Select an option';
  }, [JSON.stringify(selectedItems), text]);

  return (
    <Box
      as="button"
      type="button"
      css={[styles.container, focusRingStyles]}
      className={customClassNames.buttonClassName}
      {...mergeProps(focusRingProps, getToggleButtonProps({ disabled, ref }), { id })}
    >
      {children}
    </Box>
  );
};

export default Button;
