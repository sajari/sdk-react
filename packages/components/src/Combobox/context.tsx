import { PropGetters } from 'downshift';
import { createContext } from 'sajari-react-sdk-utils';

interface ComboboxContextProps {
  inputValue: string;
  open: boolean;
  items: Array<string>;
  getItemProps: PropGetters<any>['getItemProps'];
  highlightedIndex: number;
  selectedItem: any;
}

const [ComboboxContextProvider, useComboboxContext] = createContext<ComboboxContextProps>({
  strict: true,
  name: 'ComboboxContext',
});

export default ComboboxContextProvider;
export { useComboboxContext };
