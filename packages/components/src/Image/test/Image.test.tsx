import { render } from '../../test/utils';
import Image from '..';

describe('Image', () => {
  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(<Image data-testid="image" data-active="false" src="/a.jpeg" />);
    const image = getByTestId('image');
    expect(image.tagName).toBe('IMG');
    expect(image).toHaveAttribute('data-active', 'false');
  });
});
