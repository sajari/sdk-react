import * as React from 'react';

import { render } from '../../test/utils';
import Radio from '..';

describe('Radio', () => {
  it('Should call the onChange handler', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Radio value="suggestions" onChange={onChange}>
        Suggestions
      </Radio>,
    );
    const element = getByText('Suggestions');
    element.click();
    expect(onChange).toHaveBeenCalled();
  });

  it('Should toggle the radio', () => {
    const { getByText, container } = render(
      <>
        <Radio value="m">Male</Radio>
        <Radio value="f">Female</Radio>
      </>,
    );

    const maleRadioLabel = getByText('Male');
    maleRadioLabel.click();
    const maleForId = maleRadioLabel.getAttribute('for');
    const maleRadio = container.querySelector(`input#${maleForId}`) as HTMLInputElement;
    expect(maleRadio.checked).toBeTruthy();

    const femaleRadioLabel = getByText('Female');
    femaleRadioLabel.click();
    const femaleForId = femaleRadioLabel.getAttribute('for');
    const femaleRadio = container.querySelector(`input#${femaleForId}`) as HTMLInputElement;
    expect(femaleRadio.checked).toBeTruthy();
  });

  it('Should not be able to select disabled option', () => {
    const { getByText, container } = render(
      <>
        <Radio value="1">Option 1</Radio>
        <Radio disabled value="2">
          Option 2
        </Radio>
      </>,
    );

    const radioLabel = getByText('Option 2');
    radioLabel.click();
    const forId = radioLabel.getAttribute('for');
    const radio = container.querySelector(`input#${forId}`) as HTMLInputElement;
    expect(radio.checked).toBeFalsy();
    expect(radio.disabled).toBeTruthy();
  });

  it('Should have proper aria attribute when invalid', () => {
    const { container } = render(
      <Radio id="invalid-radio" invalid>
        Invalid
      </Radio>,
    );
    const element = container.querySelector('input#invalid-radio');
    expect(element).not.toBeNull();
    expect(element?.getAttribute('aria-invalid')).toBe('true');
  });
});
