import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import { IconSmallCheck } from '../../../assets/icons';
import Box from '../../../Box';
import { useSelectContext } from '../../context';
import { Item } from '../../types';
import { useOptionStyles } from './styles';
import { OptionProps } from './types';

const Option = (props: OptionProps) => {
  const { children, value, disabled, label } = props;
  const {
    getItemProps,
    highlightedIndex,
    items,
    size,
    selectedItems,
    disableDefaultStyles,
    customClassNames,
  } = useSelectContext();
  const [item, index] = React.useMemo(() => {
    const i = items.find(({ value: v }) => v === value) as Item;
    const idx = items.findIndex(({ value: v }) => v === value);
    return [i, idx];
  }, [value, JSON.stringify(items)]);
  const selected = typeof value !== 'undefined' && selectedItems.includes(value.toString());
  const highlighted = index === highlightedIndex;
  const { styles: optionStyles } = useOptionStyles({ ...props, highlighted, selected, size });
  const styles = getStylesObject(optionStyles, disableDefaultStyles);

  return (
    <Box
      as="li"
      key={value}
      css={styles.option}
      {...getItemProps({
        item,
        index,
        disabled,
      })}
      className={customClassNames.optionClassName}
    >
      {selected && <IconSmallCheck />}

      <Box as="span" css={styles.children}>
        {children}
      </Box>

      {label && (
        <Box as="span" css={styles.label}>
          {label}
        </Box>
      )}
    </Box>
  );
};

export default Option;
export type { OptionProps };
