import { ComboboxProps } from '@sajari/react-components';

export interface InputProps<T>
  extends Pick<
    ComboboxProps<T>,
    | 'placeholder'
    | 'onSelect'
    | 'onChange'
    | 'inputElement'
    | 'portalContainer'
    | 'enableVoice'
    | 'className'
    | 'showPoweredBy'
    | 'showDropdownTips'
    | 'variant'
    | 'size'
    | 'autoFocus'
  > {
  mode?: ComboboxProps<T>['mode'] | 'instant';
  /* Sets how many autocomplete suggestions are shown in the box below the search input */
  maxSuggestions?: number;
  /* Keep filters when a user performs a new search */
  retainFilters?: boolean;
  /** The number of characters needed to trigger a search */
  minimumCharacters?: number;
}
