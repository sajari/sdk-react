import { createContext } from '@sajari/react-sdk-utils';
import { PropGetters } from 'downshift';

import { Item, SelectCustomClassNames, SelectProps } from './types';

interface SelectContextProps
  extends Required<
    Pick<SelectProps, 'disabled' | 'disableDefaultStyles' | 'id' | 'invalid' | 'multiple' | 'size' | 'autofocus'>
  > {
  text: SelectProps['text'];
  open: boolean;
  items: Array<Item>;
  highlightedIndex: number;
  selectedItems: Array<string>;
  itemToString: (item: Item) => string;
  getToggleButtonProps: PropGetters<Item>['getToggleButtonProps'];
  getMenuProps: PropGetters<Item>['getMenuProps'];
  getItemProps: PropGetters<Item>['getItemProps'];
  customClassNames: SelectCustomClassNames;
}

const [SelectContextProvider, useSelectContext] = createContext<SelectContextProps>({
  strict: true,
  name: 'SelectContext',
});

export default SelectContextProvider;
export { useSelectContext };
