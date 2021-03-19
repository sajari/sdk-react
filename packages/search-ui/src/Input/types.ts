import { ComboboxProps } from '@sajari/react-components';

export interface InputProps<T>
  extends Pick<ComboboxProps<T>, 'placeholder' | 'onSelect' | 'onChange' | 'inputElement'> {
  mode?: ComboboxProps<T>['mode'] | 'instant';
  /* Sets how many autocomplete suggestions are shown in the box below the search input */
  maxSuggestions?: number;
}
