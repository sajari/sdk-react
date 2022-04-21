import { render } from '../../test/utils';
import Link from '..';

describe('Link', () => {
  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(<Link data-testid="link" data-active="false" href="/" />);
    const link = getByTestId('link');
    expect(link).toBeVisible();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('data-active', 'false');
  });
});
