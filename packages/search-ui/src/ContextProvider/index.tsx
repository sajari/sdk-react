import { SearchProvider } from '@sajari/react-hooks';
import { createContext, ThemeProvider } from '@sajari/react-sdk-utils';
import React, { useEffect, useState } from 'react';
import { LiveAnnouncer } from 'react-aria-live';
import { I18nextProvider } from 'react-i18next';

import i18n from '../i18n';
import { ContextProviderValues, ResultViewType, SearchUIContextProviderValues } from './types';

const [Provider, useSearchUIContext] = createContext<Required<SearchUIContextProviderValues> & { language?: string }>({
  strict: true,
  name: 'PipelineContext',
});

const ContextProvider: React.FC<ContextProviderValues> = ({
  children,
  search,
  autocomplete,
  defaultFilter,
  searchOnLoad,
  initialResponse,
  ratingMax = 5,
  currency = 'USD',
  theme,
  importantStyles,
  disableDefaultStyles = false,
  customClassNames = {},
  viewType: viewTypeProp = 'list',
  shadowRoot = null,
}) => {
  const [language, setLanguage] = useState(i18n.language);
  const [viewType, setViewType] = useState<ResultViewType>(viewTypeProp);

  useEffect(() => {
    const event = 'languageChanged';
    i18n.on(event, setLanguage);

    return () => {
      i18n.off(event);
    };
  }, []);

  useEffect(() => {
    setViewType(viewTypeProp);
  }, [viewTypeProp]);

  return (
    <Provider
      value={{
        tracking: search.pipeline.getTracking(),
        disableDefaultStyles,
        currency,
        customClassNames,
        language,
        ratingMax,
        viewType,
        setViewType,
        shadowRoot,
      }}
    >
      <SearchProvider
        search={search}
        autocomplete={autocomplete}
        defaultFilter={defaultFilter}
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
};

export default ContextProvider;
export { useSearchUIContext };
export type { ContextProviderValues, ResultViewType };
