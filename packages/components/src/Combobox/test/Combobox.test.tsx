import userEvent from '@testing-library/user-event';
import * as React from 'react';

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

  it('Should apply the suggestion in typeahead mode - using Tab key', async () => {
    const { getByTestId } = render(<Combobox mode="typeahead" completion="apple mac studio" />);
    const element = getByTestId('combobox-input') as HTMLInputElement;
    element.focus();
    await userEvent.keyboard('app{Tab}');

    expect(element.value).toBe('apple mac studio');
  });

  it('Should apply the suggestion in typeahead mode - using ArrowRight key', async () => {
    const { getByTestId } = render(<Combobox mode="typeahead" completion="apple mac studio" />);
    const element = getByTestId('combobox-input') as HTMLInputElement;
    element.focus();
    await userEvent.keyboard('app{ArrowRight}');

    expect(element.value).toBe('apple mac studio');
  });

  it('Should not apply the suggestion if nothing was typed', async () => {
    const { getByTestId } = render(<Combobox mode="typeahead" completion="apple mac studio" />);
    const element = getByTestId('combobox-input') as HTMLInputElement;
    element.focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(element.value).toBe('');
  });

  it('Resume default behavior of Tab key after completing the suggestion', async () => {
    if (!document.getSelection) {
      // so we don't get `getSelection is not defined` error
      document.getSelection = () => null;
    }
    const { getByTestId } = render(<Combobox mode="typeahead" completion="apple mac studio" />);
    const element = getByTestId('combobox-input') as HTMLInputElement;
    element.focus();
    await userEvent.keyboard('app{Tab}{Tab}');

    expect(element).not.toHaveFocus();
  });
});
