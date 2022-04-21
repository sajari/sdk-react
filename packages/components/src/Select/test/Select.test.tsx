import { render } from '../../test/utils';
import Select from '..';

describe('Select', () => {
  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(<Select data-testid="select" data-active="false" />);
    const select = getByTestId('select');
    expect(select).toBeVisible();
    expect(select).toHaveAttribute('data-active', 'false');
  });
});
