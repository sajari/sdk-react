import { fireEvent } from '@testing-library/react';
import * as React from 'react';

import { render } from '../../test/utils';
import Button from '..';

describe('Button', () => {
  test('Should match snapshot', () => {
    const { asFragment } = render(<Button>test</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should trigger click event', () => {
    const onClickSpy = jest.fn();
    const { getByRole } = render(<Button onClick={onClickSpy}>Click me</Button>);
    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('Should not response if disabled', () => {
    const onClickSpy = jest.fn();
    const { getByRole } = render(
      <Button onClick={onClickSpy} disabled>
        Click me
      </Button>,
    );
    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClickSpy).not.toHaveBeenCalled();
  });

  it('Can have elementType=a with an href', () => {
    const onClickSpy = jest.fn();
    const { getByRole } = render(
      <Button onClick={onClickSpy} href="sajari.com" as="a">
        Click me
      </Button>,
    );

    const button = getByRole('button');
    expect(button).toHaveAttribute('tabindex', '0');
    expect(button).toHaveAttribute('href', 'sajari.com');
    fireEvent.click(button);
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(
      <Button data-testid="button" data-active="false">
        Click me
      </Button>,
    );

    const button = getByTestId('button');
    expect(button).toBeVisible();
    expect(button).toHaveAttribute('data-active', 'false');
  });
});
