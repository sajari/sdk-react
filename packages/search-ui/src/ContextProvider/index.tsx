import { Pipeline, SearchContextProvider, Variables } from '@sajari/react-hooks';
import * as React from 'react';
import { ThemeProvider } from 'sajari-react-sdk-styles';

import { ContextProviderValues } from './types';

const ContextProvider: React.FC<ContextProviderValues> = ({
  children,
  search,
  importantStyles,
  instant,
  searchOnLoad,
  theme,
}) => (
  <SearchContextProvider search={search} instant={instant} searchOnLoad={searchOnLoad}>
    <ThemeProvider theme={theme} importantStyles={importantStyles}>
      {children}
    </ThemeProvider>
  </SearchContextProvider>
);

export default ContextProvider;
export { Pipeline, Variables };
export type { ContextProviderValues };
