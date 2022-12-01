import { SearchProvider } from '@sajari/react-hooks';
import { createContext, getSearchParams, ThemeProvider } from '@sajari/react-sdk-utils';
import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../i18n';
import { isViewType } from '../utils/queryParams';
import { ContextProviderValues, Language, ResultViewType, SearchUIContextProviderValues } from './types';

const [Provider, useSearchUIContext] = createContext<Required<SearchUIContextProviderValues> & Language>({
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
  viewType: defaultViewType = 'grid',
  downshiftEnvironment = null,
  syncURLState,
}) => {
  const params = getSearchParams();
  const [language, setLanguage] = useState(i18n.language);
  const [viewType, setViewType] = useState<ResultViewType>(
    isViewType(params.viewType) && syncURLState ? params.viewType : defaultViewType,
  );

  useEffect(() => {
    const event = 'languageChanged';
    i18n.on(event, setLanguage);

    return () => {
      i18n.off(event);
    };
  }, []);

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
        downshiftEnvironment,
      }}
    >
      <SearchProvider
        search={search}
        autocomplete={autocomplete}
        defaultFilter={defaultFilter}
        searchOnLoad={searchOnLoad}
        initialResponse={initialResponse}
        syncURLState={
          typeof syncURLState !== 'boolean' && typeof syncURLState !== 'undefined'
            ? {
                ...syncURLState,
                extendedParams: [
                  ...(syncURLState?.extendedParams || []),
                  {
                    key: 'viewType',
                    defaultValue: defaultViewType,
                    callback: (value) => {
                      setViewType(isViewType(value) ? value : defaultViewType);
                    },
                    value: viewType,
                  },
                ],
              }
            : syncURLState
        }
      >
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme} importantStyles={importantStyles}>
            {children}
          </ThemeProvider>
        </I18nextProvider>
      </SearchProvider>
    </Provider>
  );
};

export default ContextProvider;
export { useSearchUIContext };
export type { ContextProviderValues, ResultViewType };
