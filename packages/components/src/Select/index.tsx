import { useId } from '@react-aria/utils';
import { __DEV__, cleanChildren, getStylesObject, isArray, isString } from '@sajari/react-sdk-utils';
import { useSelect, UseSelectState, UseSelectStateChangeOptions } from 'downshift';
import * as React from 'react';

import Box from '../Box';
import Label from '../Label';
import Button from './components/Button';
import Dropdown from './components/Dropdown';
import { OptionProps } from './components/Option';
import SelectContextProvider from './context';
import { useSelectStyles } from './styles';
import { Item, SelectProps } from './types';

const Select = React.forwardRef((props: SelectProps, ref?: React.Ref<HTMLDivElement>) => {
  const {
    id = `select-${useId()}`,
    children,
    label,
    name,
    value,
    onChange,
    size = 'md',
    disabled = false,
    invalid = false,
    multiple = false,
    autofocus = false,
    text,
    disableDefaultStyles = false,
    styles: stylesProp,
    className,
    buttonClassName,
    dropdownClassName,
    optionClassName,
  } = props;

  const { styles: selectStyles } = useSelectStyles();
  const styles = getStylesObject(selectStyles, disableDefaultStyles);

  const stateReducer = (state: UseSelectState<Item>, actionAndChanges: UseSelectStateChangeOptions<Item>) => {
    const { changes, type } = actionAndChanges;

    switch (type) {
      case useSelect.stateChangeTypes.MenuKeyDownEnter:
      case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
      case useSelect.stateChangeTypes.ItemClick:
        return {
          ...changes,
          isOpen: multiple, // Keep menu open after selection for multiple
          highlightedIndex: state.highlightedIndex,
        };

      default:
        return changes;
    }
  };

  const itemToString = (item: Item): string => item?.value?.toString() ?? '';

  // Build items list from children
  const items: Array<Item> = React.useMemo(
    () =>
      cleanChildren(children).reduce(
        (out, { props: optionProps }: { props: OptionProps }) => [...out, optionProps],
        [] as Array<Item>,
      ),
    [children],
  );

  const mapValues = (input?: SelectProps['value']) => {
    if (typeof input === 'undefined') {
      return [];
    }

    // Determine initial values
    const values = isArray(input) ? input.map(String) : [input.toString()];

    return multiple ? values : values.slice(0, 1);
  };

  // If no `value` prop is set, get selected props from children
  const [selectedItems, setSelectedItems] = React.useState<Array<string>>(mapValues(value));

  // Fire onChange and set state
  const setSelected = (selected: Array<string>) => {
    setSelectedItems(selected);

    if (onChange) {
      const [first] = selected;
      onChange(multiple ? selected : first);
    }
  };

  React.useEffect(() => {
    setSelectedItems(mapValues(value));
  }, [value]);

  const {
    isOpen: open,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect<Item>({
    items,
    stateReducer,
    selectedItem: null,
    initialHighlightedIndex: items.findIndex(({ value: v }) => v.toString() === selectedItems[0]),
    itemToString,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        return;
      }

      const selectedValue = itemToString(selectedItem);

      if (!multiple) {
        setSelected([selectedValue]);
        return;
      }

      const index = selectedItems.findIndex((v) => v === selectedValue);

      if (index > 0) {
        setSelected([...selectedItems.slice(0, index), ...selectedItems.slice(index + 1)]);
      } else if (index === 0) {
        setSelected([...selectedItems.slice(1)]);
      } else {
        setSelected([...selectedItems, selectedValue]);
      }
    },
  });

  const context = {
    id,
    open,
    items,
    selectedItems,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    getToggleButtonProps,
    itemToString,
    multiple,
    disabled,
    invalid,
    autofocus,
    size,
    text,
    disableDefaultStyles,
    customClassNames: {
      buttonClassName,
      dropdownClassName,
      optionClassName,
    },
  };

  // Render hidden inputs for form submissions if name is set
  const renderInputs = isString(name) && !disabled;

  return (
    <SelectContextProvider value={context}>
      <Box css={[styles.container, stylesProp]} ref={ref} className={className}>
        {label && (
          <Label visuallyHidden {...getLabelProps()}>
            {label}
          </Label>
        )}

        <Button />

        <Dropdown />

        {renderInputs &&
          selectedItems.map((v) => <Box as="input" type="hidden" name={name} value={v} key={`${name}-${v}`} />)}
      </Box>
    </SelectContextProvider>
  );
});

if (__DEV__) {
  Select.displayName = 'Select';
}

export default Select;
export { default as Option } from './components/Option';
export * from './components/Option';
export type { SelectProps };
