import * as React from 'react';

import { render } from '../../test/utils';
import Swatch from '..';

describe('Swatch', () => {
  it('Should render correctly', () => {
    const { getAllByRole } = render(
      <Swatch checkedColors={['Silver']}>
        <Swatch.Color.White />
        <Swatch.Color.Silver />
        <Swatch.Color.Black />
      </Swatch>,
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
      <Swatch checkedColors={['Silver']} onChange={handler}>
        <Swatch.Color.White />
        <Swatch.Color.Silver />
        <Swatch.Color.Black />
      </Swatch>,
    );
    const color = getByText('Black');
    color.parentElement?.click();
    expect(handler).toHaveBeenCalledWith(['Silver', 'Black']);
  });

  it('Should call the onChange handler (with custom color and id)', () => {
    const handler = jest.fn();
    const { getByText } = render(
      <Swatch checkedColors={[]} onChange={handler}>
        <Swatch.Color id="hex" bg="#f56565" />
        <Swatch.Color id="rgb" bg="rgb(45, 100, 219)" />
      </Swatch>,
    );
    const color = getByText('hex');
    color.parentElement?.click();
    expect(handler).toHaveBeenCalledWith(['hex']);
  });

  it('Should call the onChange handler (with overriding props)', () => {
    const handler = jest.fn();
    const { getByText } = render(
      <Swatch checkedColors={['definitely-not-red']} onChange={handler}>
        <Swatch.Color.Aqua id="definitely-not-red" />
      </Swatch>,
    );
    const color = getByText('definitely-not-red');
    color.parentElement?.click();
    expect(handler).toHaveBeenCalledWith([]);
  });
});
