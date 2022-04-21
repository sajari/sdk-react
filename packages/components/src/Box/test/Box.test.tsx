import { render } from '../../test/utils';
import Box from '..';

describe('Box', () => {
  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(<Box data-testid="box" data-active="false" />);
    const box = getByTestId('box');
    expect(box).toBeVisible();
    expect(box).toHaveAttribute('data-active', 'false');
  });
});
