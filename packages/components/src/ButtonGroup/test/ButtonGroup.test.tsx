import React from 'react';

import Button from '../../Button';
import { render } from '../../test/utils';
import ButtonGroup from '..';

describe('ButtonGroup', () => {
  it('attached and inline', () => {
    const { asFragment } = render(
      <ButtonGroup attached>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('attached and not inline', () => {
    const { asFragment } = render(
      <ButtonGroup attached>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('not attached and inline', () => {
    const { asFragment } = render(
      <ButtonGroup>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('not attached and not inline', () => {
    const { asFragment } = render(
      <ButtonGroup inline={false}>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(
      <ButtonGroup data-testid="button-group" data-active="false">
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>,
    );

    const buttonGroup = getByTestId('button-group');
    expect(buttonGroup).toBeVisible();
    expect(buttonGroup).toHaveAttribute('data-active', 'false');
  });
});
