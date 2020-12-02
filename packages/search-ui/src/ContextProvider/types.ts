import { SearchProviderValues } from '@sajari/react-hooks';
import { ThemeProviderProps } from '@sajari/react-sdk-utils';

export interface SearchUIContextProviderValues {
  ratingMax?: number;
  disableDefaultStyles?: boolean;
  customClassNames?: {
    results?: {
      container?: string;
      item?: string;
      heading?: string;
      price?: string;
      subTitle?: string;
      rating?: string;
      description?: string;
      searchingMessage?: string;
      emptyMessage?: string;
      errorMessage?: string;
    };
    sorting?: {
      container?: string;
      label?: string;
      select?: string;
    };
    pagination?: {
      container?: string;
      button?: string;
      active?: string;
      next?: string;
      prev?: string;
      spacerEllipsis?: string;
    };
    viewType?: {
      container?: string;
      label?: string;
      buttonGroup?: string;
    };
    resultsPerPage?: {
      container?: string;
      label?: string;
      select?: string;
    };
    input?: {
      container?: string;
      inputContainer?: string;
      input?: string;
      voiceInput?: string;
      dropdown?: string;
      dropdownItem?: string;
      dropdownSelectedItem?: string;
      dropdownHighlightItem?: string;
      dropdownList?: string;
      dropdownFooter?: string;
      result?: string;
      resultImageContainer?: string;
      resultTextContainer?: string;
      selectedResult?: string;
      typeahead?: string;
    };
  };
}

export interface ContextProviderValues
  extends SearchProviderValues,
    ThemeProviderProps,
    SearchUIContextProviderValues {}
