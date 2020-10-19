/* eslint-disable no-confusing-arrow */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useFocusRing } from '@react-aria/focus';
import { useSwitch } from '@react-aria/switch';
import { useToggleState } from '@react-stately/toggle';
import React from 'react';
import { __DEV__ } from 'sajari-react-sdk-utils';
import tw, { styled } from 'twin.macro';

import { Check } from '../assets/icons';
import Box from '../Box';
import { colors } from './colors';
import { useSwatchContext } from './context';
import { ColorProps } from './types';

const mapBorderRadius = (rounded: ColorProps['rounded']) => {
  switch (rounded) {
    case 'none':
      return tw`rounded-none`;
    case 'sm':
      return tw`rounded-sm`;
    case 'lg':
      return tw`rounded-lg`;
    case 'full':
      return tw`rounded-full`;
    default:
    case 'md':
      return tw`rounded-md`;
  }
};

const StyledLabel = styled.label<{
  textColor: ColorProps['color'];
  bg: ColorProps['bg'];
  border: ColorProps['border'];
  rounded: ColorProps['rounded'];
  focus: boolean;
}>`
  ${tw`flex items-center justify-center mt-2 ml-2 border border-solid cursor-pointer w-7 h-7`}
  ${({ rounded }) => mapBorderRadius(rounded)}
  ${({ focus }) => (focus ? tw`shadow-outline` : tw`shadow-none`)};
  color: ${({ textColor }) => textColor};
  background-color: ${({ bg }) => bg};
  border-color: ${({ border }) => border};
`;

export const Color = ({ id, bg, color, border = bg, rounded = 'md' }: ColorProps) => {
  const { state, setState } = useSwatchContext();
  const tempState = useToggleState({
    isSelected: state.includes(id),
    onChange: (isSelected) => {
      const newState = isSelected ? [...state, id] : state.filter((i) => i !== id);
      setState(newState);
    },
  });
  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps } = useSwitch(
    {
      isSelected: tempState.isSelected,
      value: String(tempState.isSelected),
      'aria-label': id,
      name: id,
    },
    tempState,
    ref,
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <StyledLabel focus={isFocusVisible} bg={bg} border={border} textColor={color} rounded={rounded}>
      <Box as="span" css={tw`sr-only`}>
        {id}
      </Box>
      <Box as="input" css={tw`sr-only`} {...inputProps} {...focusProps} ref={ref} />
      <Check css={tempState.isSelected ? tw`opacity-100 fill-current` : tw`opacity-0 fill-current`} />
    </StyledLabel>
  );
};

if (__DEV__) {
  Color.displayName = 'Swatch.Color';
}

/** We're doing it manually rather a for loop because this enables code completion */
Color.White = (overridingProps: ColorProps) => Color.call(null, { ...colors[0], ...overridingProps });

Color.Silver = (overridingProps: ColorProps) => Color.call(null, { ...colors[1], ...overridingProps });

Color.Black = (overridingProps: ColorProps) => Color.call(null, { ...colors[2], ...overridingProps });

Color.Pink = (overridingProps: ColorProps) => Color.call(null, { ...colors[3], ...overridingProps });

Color.Magenta = (overridingProps: ColorProps) => Color.call(null, { ...colors[4], ...overridingProps });

Color.Red = (overridingProps: ColorProps) => Color.call(null, { ...colors[5], ...overridingProps });

Color.Beige = (overridingProps: ColorProps) => Color.call(null, { ...colors[6], ...overridingProps });

Color.Orange = (overridingProps: ColorProps) => Color.call(null, { ...colors[7], ...overridingProps });

Color.Brown = (overridingProps: ColorProps) => Color.call(null, { ...colors[8], ...overridingProps });

Color.Yellow = (overridingProps: ColorProps) => Color.call(null, { ...colors[9], ...overridingProps });

Color.Green = (overridingProps: ColorProps) => Color.call(null, { ...colors[10], ...overridingProps });

Color.Azure = (overridingProps: ColorProps) => Color.call(null, { ...colors[11], ...overridingProps });

Color.Aqua = (overridingProps: ColorProps) => Color.call(null, { ...colors[12], ...overridingProps });

Color.Teal = (overridingProps: ColorProps) => Color.call(null, { ...colors[13], ...overridingProps });

Color.Turquoise = (overridingProps: ColorProps) => Color.call(null, { ...colors[14], ...overridingProps });

Color.Blue = (overridingProps: ColorProps) => Color.call(null, { ...colors[15], ...overridingProps });

Color.ElectricBlue = (overridingProps: ColorProps) => Color.call(null, { ...colors[16], ...overridingProps });

Color.Lilac = (overridingProps: ColorProps) => Color.call(null, { ...colors[17], ...overridingProps });

Color.Purple = (overridingProps: ColorProps) => Color.call(null, { ...colors[18], ...overridingProps });

Color.Violet = (overridingProps: ColorProps) => Color.call(null, { ...colors[19], ...overridingProps });

export default Color;
export type { ColorProps };
