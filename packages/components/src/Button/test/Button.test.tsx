import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Button from '..';

describe('Button', () => {
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
});
