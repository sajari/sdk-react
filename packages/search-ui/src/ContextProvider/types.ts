import { SearchProviderValues } from '@sajari/react-hooks';
import { ThemeProviderProps } from '@sajari/react-sdk-utils';

export interface SearchUIContextProviderValues {
  ratingMax?: number;
}

export interface ContextProviderValues
  extends SearchProviderValues,
    ThemeProviderProps,
    SearchUIContextProviderValues {}
