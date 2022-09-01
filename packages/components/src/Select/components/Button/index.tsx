import { mergeProps } from '@react-aria/utils';
import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';
import tw from 'twin.macro';

import { IconChevronUpDown } from '../../../assets/icons';
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
      const selected = items
        .filter(({ value: v }) => selectedItems.includes(v.toString()))
        .map(({ children: label }) => label);
      return text(selected);
    }

    if (typeof text !== 'undefined') {
      return text;
    }

    if (selectedItems.length === 1) {
      const [selectedItem] = selectedItems;
      const selected = items.find(({ value: v }) => selectedItem === v.toString());

      if (selected) {
        return selected.children;
      }
    }

    if (selectedItems.length > 1) {
      return `${selectedItems.length} selected`;
    }

    return 'Select an option';
  }, [JSON.stringify(selectedItems), text]);

  let iconSize = tw`w-6 h-6`;
  if (size === 'sm') {
    iconSize = tw`w-5 h-5`;
  } else if (size === 'lg') {
    iconSize = tw`w-7 h-7`;
  }

  return (
    <Box
      as="button"
      type="button"
      css={[styles.container, focusRingStyles]}
      className={customClassNames.buttonClassName}
      {...mergeProps(focusRingProps, getToggleButtonProps({ disabled, ref }), { id })}
    >
      <span css={[tw`flex items-center`, invalid && tw`text-red-500`]}>{children}</span>
      <span css={[tw`absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none`]}>
        <IconChevronUpDown css={[iconSize, invalid ? tw`text-red-400` : tw`text-gray-400`]} aria-hidden="true" />
      </span>
    </Box>
  );
};

export default Button;
