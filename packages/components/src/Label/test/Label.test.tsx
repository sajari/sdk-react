import { render } from '../../test/utils';
import Label from '..';

describe('Label', () => {
  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(<Label data-testid="label" data-active="false" htmlFor="el" />);
    const label = getByTestId('label');
    expect(label).toBeVisible();
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('data-active', 'false');
  });
});
