import {
  ClickTracking,
  FieldDictionary,
  FilterBuilder,
  Pipeline,
  PosNegTracking,
  Range,
  RangeFilterBuilder,
  SearchProvider,
  SearchProviderValues,
  Variables,
} from '@sajari/react-hooks';
import { createContext, ThemeProvider } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { LiveAnnouncer } from 'react-aria-live';
import { I18nextProvider } from 'react-i18next';

import i18n from '../i18n';
import { ContextProviderValues, SearchUIContextProviderValues } from './types';

const [Provider, useSearchUIContext] = createContext<Required<SearchUIContextProviderValues>>({
  strict: true,
  name: 'PipelineContext',
});

const ContextProvider: React.FC<ContextProviderValues> = ({
  children,
  search,
  autocomplete,
  searchOnLoad,
  initialResponse,
  ratingMax = 5,
  currencyCode = 'USD',
  theme,
  importantStyles,
  disableDefaultStyles = false,
  customClassNames = {},
}) => (
  <Provider value={{ disableDefaultStyles, currencyCode, customClassNames, ratingMax }}>
    <SearchProvider
      search={search}
      autocomplete={autocomplete}
      searchOnLoad={searchOnLoad}
      initialResponse={initialResponse}
    >
      <LiveAnnouncer>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme} importantStyles={importantStyles}>
            {children}
          </ThemeProvider>
        </I18nextProvider>
      </LiveAnnouncer>
    </SearchProvider>
  </Provider>
);

export default ContextProvider;
export {
  ClickTracking,
  FieldDictionary,
  FilterBuilder,
  Pipeline,
  PosNegTracking,
  Range,
  RangeFilterBuilder,
  SearchProviderValues,
  useSearchUIContext,
  Variables,
};
export type { ContextProviderValues };
