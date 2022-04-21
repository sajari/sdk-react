import { render } from '@testing-library/react';
import * as React from 'react';

import Text from '..';

describe('Text', () => {
  it('render default correctly', () => {
    const { container } = render(<Text>Test Text</Text>);
    const element = container.firstChild;

    expect(element).toHaveProperty('textContent', 'Test Text');
    expect(element).toHaveProperty('tagName', 'P');
  });

  it('render as small', () => {
    const { container } = render(<Text as="small">Another test text</Text>);
    const element = container.firstChild;

    expect(element).toHaveProperty('textContent', 'Another test text');
    expect(element).toHaveProperty('tagName', 'SMALL');
    expect(element).toHaveStyleRule('font-size', '0.875em');
  });

  it('truncate', () => {
    const { container } = render(<Text truncate>Test Text</Text>);
    const element = container.firstChild;

    expect(element).toHaveStyleRule('text-overflow', 'ellipsis');
  });

  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(<Text data-testid="text" data-active="false" />);
    const text = getByTestId('text');
    expect(text).toBeVisible();
    expect(text).toHaveAttribute('data-active', 'false');
  });
});
