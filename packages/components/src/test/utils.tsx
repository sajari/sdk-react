import '@testing-library/jest-dom/extend-expect';

import { ThemeProvider } from '@sajari/react-sdk-utils';
import { render as RtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import React from 'react';

/**
 * Custom render for @testing-library/react
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 * @param component the component under test
 * @param options customized test options
 */
export const render = (component: React.ReactNode, options: RenderOptions = {}): RenderResult =>
  RtlRender(<ThemeProvider>{component}</ThemeProvider>, options);
