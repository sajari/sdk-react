import { render } from '@testing-library/react';
import * as React from 'react';

import Heading from '..';

describe('Heading', () => {
  it('render default correctly', () => {
    const { container } = render(<Heading>Test text</Heading>);
    const element = container.firstChild;

    expect(element).toHaveProperty('textContent', 'Test text');
    expect(element).toHaveProperty('tagName', 'H1');
    expect(element).toHaveStyleRule('font-size', '1.5em');
  });

  test.each([
    ['h1', '1.5em'],
    ['h2', '1.25em'],
    ['h3', '1.125em'],
    ['h4', '1em'],
    ['h5', '0.875em'],
    ['h6', '0.75em'],
  ])('<Heading as={%s}/> should have font-size %s', (asProp, expected) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { container } = render(<Heading as={asProp as React.ElementType<any>} />);

    expect(container.firstChild).toHaveStyleRule('font-size', expected);
  });

  it('truncate', () => {
    const { container } = render(<Heading truncate>Test Heading</Heading>);
    const element = container.firstChild;

    expect(element).toHaveStyleRule('text-overflow', 'ellipsis');
  });

  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(<Heading as="h1" data-testid="heading" data-active="false" />);
    const heading = getByTestId('heading');
    expect(heading).toBeVisible();
    expect(heading).toHaveAttribute('data-active', 'false');
  });
});
