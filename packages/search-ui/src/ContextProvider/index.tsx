import { Pipeline, SearchContextProvider, Variables } from '@sajari/react-hooks';
import { createContext, ThemeProvider } from '@sajari/react-sdk-utils';
import * as React from 'react';
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
  importantStyles,
  instant,
  searchOnLoad,
  theme,
  ratingMax = 5,
}) => (
  <Provider value={{ ratingMax }}>
    <SearchContextProvider search={search} instant={instant} searchOnLoad={searchOnLoad}>
      <ThemeProvider theme={theme} importantStyles={importantStyles}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </ThemeProvider>
    </SearchContextProvider>
  </Provider>
);

export default ContextProvider;
export { Pipeline, useSearchUIContext, Variables };
export type { ContextProviderValues };
