import { ClickTracking, PosNegTracking, SearchProviderValues } from '@sajari/react-hooks';
import { ThemeProviderProps } from '@sajari/react-sdk-utils';

export type ResultViewType = 'grid' | 'list';

export interface SearchUIContextProviderValues {
  /** The tracking instance */
  tracking?: ClickTracking | PosNegTracking;
  /** Maximum possible rating value */
  ratingMax?: number;
  /** Currency code to use for any price display */
  currency?: string;
  /** View mode of the results */
  viewType?: ResultViewType;
  setViewType: (type: ResultViewType) => void;
  disableDefaultStyles?: boolean;
  customClassNames?: {
    results?: {
      container?: string;
      item?: string;
      heading?: string;
      price?: string;
      originalPrice?: string;
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
      status: string;
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
    filter?: {
      box?: string;
      header?: string;
      title?: string;
      resetButton?: string;
      rating?: {
        container?: string;
        activeRatingItem?: string;
        activeHalfRatingItem?: string;
      };
      color?: {
        container?: string;
        itemChecked?: string;
        item?: string;
      };
      tabs?: {
        container?: string;
        list?: string;
        tab?: string;
        selectedTab?: string;
      };
      list?: {
        container?: string;
        searchFilter?: string;
        checkboxGroup?: string;
        radioGroup?: string;
        toggleButton?: string;
      };
      range?: {
        container?: string;
        handle?: string;
        fill?: string;
        track?: string;
        input?: string;
        handleActive?: string;
      };
      select?: {
        container?: string;
        button?: string;
        dropdown?: string;
        option?: string;
      };
    };
  };
}

export interface ContextProviderValues
  extends SearchProviderValues,
    ThemeProviderProps,
    Omit<SearchUIContextProviderValues, 'setViewType'> {}
