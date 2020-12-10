import { ThemeProvider } from '@sajari/react-sdk-utils';
import { render } from '@testing-library/react';
import React from 'react';

import Swatch from '..';

describe('Swatch', () => {
  it('Should render correctly', () => {
    const { getAllByRole } = render(
      <ThemeProvider>
        <Swatch checkedColors={['Silver']}>
          <Swatch.Color.White />
          <Swatch.Color.Silver />
          <Swatch.Color.Black />
        </Swatch>
      </ThemeProvider>,
    );
    const colors = getAllByRole('switch');
    expect(colors).toHaveLength(3);
    expect(colors[1].getAttribute('aria-checked')).toBe('true');
    expect(colors[0].getAttribute('aria-checked')).toBe('false');
    expect(colors[2].getAttribute('aria-checked')).toBe('false');
  });

  it('Should call the onChange handler', () => {
    const handler = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <Swatch checkedColors={['Silver']} onChange={handler}>
          <Swatch.Color.White />
          <Swatch.Color.Silver />
          <Swatch.Color.Black />
        </Swatch>
      </ThemeProvider>,
    );
    const color = getByText('Black');
    color.parentElement?.click();
    expect(handler).toHaveBeenCalledWith(['Silver', 'Black']);
  });

  it('Should call the onChange handler (with custom color and id)', () => {
    const handler = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <Swatch checkedColors={[]} onChange={handler}>
          <Swatch.Color id="hex" bg="#f56565" />
          <Swatch.Color id="rgb" bg="rgb(45, 100, 219)" />
        </Swatch>
      </ThemeProvider>,
    );
    const color = getByText('hex');
    color.parentElement?.click();
    expect(handler).toHaveBeenCalledWith(['hex']);
  });

  it('Should call the onChange handler (with overriding props)', () => {
    const handler = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <Swatch checkedColors={['definitely-not-red']} onChange={handler}>
          <Swatch.Color.Aqua id="definitely-not-red" />
        </Swatch>
      </ThemeProvider>,
    );
    const color = getByText('definitely-not-red');
    color.parentElement?.click();
    expect(handler).toHaveBeenCalledWith([]);
  });
});
