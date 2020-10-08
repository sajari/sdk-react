import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Input from '../index';
import ThemeProvider from '../../styles/theming';

describe('Search', () => {
  test('Should handle onChange correctly', () => {
    const onChangeSpy = jest.fn();
    const { container } = render(
      <ThemeProvider>
        <Input value="" onChange={onChangeSpy} />
      </ThemeProvider>,
    );

    const input = container.querySelector('input');

    fireEvent.change(input!, { target: { value: 'hello' } });
    expect(onChangeSpy).toBeCalledTimes(1);
    expect(onChangeSpy).toHaveBeenLastCalledWith('hello');
  });
});
