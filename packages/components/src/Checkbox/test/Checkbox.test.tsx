import * as React from 'react';

import { render } from '../../test/utils';
import Checkbox from '..';

describe('Checkbox', () => {
  it('Should call the onChange handler', () => {
    const onChange = jest.fn();
    const { getByText } = render(<Checkbox onChange={onChange}>Suggestions</Checkbox>);
    const element = getByText('Suggestions');
    element.click();
    expect(onChange).toHaveBeenCalled();
  });

  it('Should toggle the checkbox', () => {
    const { getByText, container } = render(
      <>
        <Checkbox>Male</Checkbox>
        <Checkbox defaultChecked>Female</Checkbox>
      </>,
    );

    const maleCheckboxLabel = getByText('Male');
    maleCheckboxLabel.click();
    const maleForId = maleCheckboxLabel.getAttribute('for');
    const maleCheckbox = container.querySelector(`input#${maleForId}`) as HTMLInputElement;
    expect(maleCheckbox.checked).toBeTruthy();

    const femaleCheckboxLabel = getByText('Female');
    femaleCheckboxLabel.click();
    const femaleForId = femaleCheckboxLabel.getAttribute('for');
    const femaleCheckbox = container.querySelector(`input#${femaleForId}`) as HTMLInputElement;
    expect(femaleCheckbox.checked).toBeFalsy();
  });

  it('Should have proper aria attribute when invalid', () => {
    const { container } = render(
      <Checkbox id="invalid-checkbox" invalid>
        Invalid
      </Checkbox>,
    );
    const element = container.querySelector('input#invalid-checkbox');
    expect(element).not.toBeNull();
    expect(element?.getAttribute('aria-invalid')).toBe('true');
  });

  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(<Checkbox data-testid="checkbox" data-active="false" />);
    const checkbox = getByTestId('checkbox');
    expect(checkbox).toBeVisible();
    expect(checkbox).toHaveAttribute('data-active', 'false');
  });
});
