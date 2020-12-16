import { ThemeProvider } from '@sajari/react-sdk-utils';
import { render } from '@testing-library/react';
import React from 'react';

import Button from '../../Button';
import ButtonGroup from '..';

describe('ButtonGroup', () => {
  it('attached and inline', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <ButtonGroup attached>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>
        ,
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('attached and not inline', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <ButtonGroup attached>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>
        ,
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('not attached and inline', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <ButtonGroup>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>
        ,
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('not attached and not inline', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <ButtonGroup inline={false}>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonGroup>
        ,
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
