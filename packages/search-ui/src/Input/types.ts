import { ComboboxProps } from '@sajari/react-components';

interface Props<T>
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
    | 'name'
  > {
  mode?: ComboboxProps<T>['mode'] | 'instant';
  /* Sets how many autocomplete suggestions are shown in the box below the search input */
  maxSuggestions?: number;
  /* Keep filters when a user performs a new search */
  retainFilters?: boolean;
  /** The number of characters needed to trigger a search */
  minimumCharacters?: number;
  /** Do not follow redirects. Used on result and instant pages to avoid unexpected navigation  */
  disableRedirects?: boolean;
}

type HtmlAttributes<T> = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof Props<T>>;

export interface InputProps<T = unknown> extends Props<T>, HtmlAttributes<T> {}
