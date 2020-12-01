import { SearchProviderValues } from '@sajari/react-hooks';
import { ThemeProviderProps } from '@sajari/react-sdk-utils';

export interface SearchUIContextProviderValues {
  ratingMax?: number;
  disableDefaultStyles?: boolean;
  customClassNames?: {
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
  };
}

export interface ContextProviderValues
  extends SearchProviderValues,
    ThemeProviderProps,
    SearchUIContextProviderValues {}
