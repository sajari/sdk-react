import { SSRProvider, SSRProviderProps as CoreSSProviderProps } from '@react-aria/ssr';
import * as React from 'react';

type SSRProviderProps = CoreSSProviderProps;

export default (props: SSRProviderProps) => <SSRProvider {...props} />;

export type { SSRProviderProps };
