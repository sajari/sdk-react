import { ThemeProvider } from '@sajari/react-sdk-utils';
import { render } from '@testing-library/react';
import * as React from 'react';

import Radio from '..';

describe('Radio', () => {
  it('Should call the onChange handler', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <Radio value="suggestions" onChange={onChange}>
          Suggestions
        </Radio>
      </ThemeProvider>,
    );
    const element = getByText('Suggestions');
    element.click();
    expect(onChange).toHaveBeenCalled();
  });

  it('Should toggle the radio', () => {
    const { getByText, container } = render(
      <ThemeProvider>
        <Radio value="m">Male</Radio>
        <Radio value="f">Female</Radio>
      </ThemeProvider>,
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
      <ThemeProvider>
        <Radio value="1">Option 1</Radio>
        <Radio disabled value="2">
          Option 2
        </Radio>
      </ThemeProvider>,
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
      <ThemeProvider>
        <Radio id="invalid-radio" invalid>
          Invalid
        </Radio>
      </ThemeProvider>,
    );
    const element = container.querySelector('input#invalid-radio');
    expect(element).not.toBeNull();
    expect(element?.getAttribute('aria-invalid')).toBe('true');
  });
});
