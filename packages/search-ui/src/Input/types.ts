import { ComboboxProps } from '@sajari/react-components';

export interface InputProps<T>
  extends Pick<
    ComboboxProps<T>,
    | 'placeholder'
    | 'onSelect'
    | 'onChange'
    | 'inputElement'
    | 'enableVoice'
    | 'className'
    | 'showPoweredBy'
    | 'showDropdownTips'
    | 'variant'
    | 'size'
  > {
  mode?: ComboboxProps<T>['mode'] | 'instant';
  /* Sets how many autocomplete suggestions are shown in the box below the search input */
  maxSuggestions?: number;
  /* Keep filters when a user performs a new search */
  retainFilters?: boolean;
}
