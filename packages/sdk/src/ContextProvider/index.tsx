import * as React from 'react';
import { ThemeProvider } from '@sajari/react-components';

const ContextProvider: React.FC = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

export default ContextProvider;
