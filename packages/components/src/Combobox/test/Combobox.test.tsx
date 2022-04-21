import { render } from '../../test/utils';
import Combobox from '..';

describe('Combobox', () => {
  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(<Combobox data-testid="combobox" data-active="false" />);
    const combobox = getByTestId('combobox');
    expect(combobox).toBeVisible();
    expect(combobox.tagName).toBe('INPUT');
    expect(combobox).toHaveAttribute('data-active', 'false');
  });
});
