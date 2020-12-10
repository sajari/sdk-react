import { render } from '@testing-library/react';
import React from 'react';

import Heading from '..';

describe('Heading', () => {
  it('render default correctly', () => {
    const { container } = render(<Heading>Test text</Heading>);
    const element = container.firstChild;

    expect(element).toHaveProperty('textContent', 'Test text');
    expect(element).toHaveProperty('tagName', 'H1');
    expect(element).toHaveStyleRule('font-size', '1.5rem');
  });

  test.each([
    ['h1', '1.5rem'],
    ['h2', '1.25rem'],
    ['h3', '1.125rem'],
    ['h4', '1rem'],
    ['h5', '0.875rem'],
    ['h6', '0.75rem'],
  ])('<Heading as={%s}/> should have font-size %s', (asProp, expected) => {
    const { container } = render(<Heading as={asProp as React.ElementType<any>} />);

    expect(container.firstChild).toHaveStyleRule('font-size', expected);
  });

  it('truncate', () => {
    const { container } = render(<Heading truncate>Test Heading</Heading>);
    const element = container.firstChild;

    expect(element).toHaveStyleRule('text-overflow', 'ellipsis');
  });
});
