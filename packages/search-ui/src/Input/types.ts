import { ComboboxProps } from '@sajari/react-components';

export interface InputProps<T>
  extends Pick<ComboboxProps<T>, 'placeholder' | 'onSelect' | 'onChange' | 'inputElement'> {
  mode?: ComboboxProps<T>['mode'] | 'instant';
  maxSuggestions?: number;
}
