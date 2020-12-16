/* eslint-disable no-confusing-arrow */

import { useSwitch } from '@react-aria/switch';
import { useToggleState } from '@react-stately/toggle';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import ColorClass from 'color';
import React, { useCallback, useMemo } from 'react';
import tw, { styled } from 'twin.macro';

import { IconCheck } from '../assets/icons';
import Box from '../Box';
import { colors } from './colors';
import { useSwatchContext } from './context';
import useColorStyles from './styles';
import { ColorProps } from './types';

const StyledLabel = styled.label<{
  textColor: ColorProps['color'];
  bg: ColorProps['bg'];
  border: ColorProps['border'];
}>`
  color: ${({ textColor }) => textColor};
  background-color: ${({ bg }) => bg};
  border-color: ${({ border }) => border};
`;

const FunctionalColor = React.memo(
  ({
    id,
    bg,
    border = new ColorClass(bg).darken(0.1).string(),
    color = new ColorClass(bg).isLight()
      ? new ColorClass(bg).lightness(25).string()
      : new ColorClass(bg).lightness(85).string(),
    rounded = 'md',
    className,
    checkedClassName = '',
    checked,
    toggle,
    disableDefaultStyles = false,
  }: ColorProps & { checked: boolean; toggle: () => void }) => {
    const ref = React.useRef<HTMLInputElement>(null);
    const toggleState = useToggleState();
    const { inputProps } = useSwitch(
      {
        value: String(checked),
        'aria-label': id,
        name: id,
      },
      toggleState,
      ref,
    );
    // const { focusProps, focusRingStyles } = useFocusRingStyles({ color: border.toString() });
    const { styles: colorStyles, focusProps } = useColorStyles({ border, checked, rounded });
    const styles = getStylesObject(colorStyles, disableDefaultStyles);

    return (
      <StyledLabel
        bg={bg}
        border={border}
        textColor={color}
        css={styles.container}
        className={classnames(className, { [checkedClassName]: checked })}
      >
        <Box as="span" css={tw`sr-only`}>
          {id}
        </Box>
        <Box
          as="input"
          css={tw`sr-only`}
          {...inputProps}
          {...focusProps}
          ref={ref}
          aria-checked={checked}
          onClick={toggle}
        />
        <IconCheck css={styles.iconCheck} />
      </StyledLabel>
    );
  },
);

export const Color = (props: ColorProps) => {
  const { id } = props;
  const { state, setState, disableDefaultStyles = false } = useSwatchContext();
  const checked = useMemo(() => state.includes(id), [state, id]);
  const toggle = useCallback(() => setState(id), [setState, id]);
  return <FunctionalColor {...props} disableDefaultStyles={disableDefaultStyles} toggle={toggle} checked={checked} />;
};

if (__DEV__) {
  Color.displayName = 'Swatch.Color';
}

/** We're doing it manually rather a for loop because this enables code completion */

/** */
Color.White = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[0], ...overridingProps });

Color.Silver = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[1], ...overridingProps });

Color.Black = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[2], ...overridingProps });

Color.Pink = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[3], ...overridingProps });

Color.Magenta = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[4], ...overridingProps });

Color.Red = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[5], ...overridingProps });

Color.Beige = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[6], ...overridingProps });

Color.Orange = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[7], ...overridingProps });

Color.Brown = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[8], ...overridingProps });

Color.Yellow = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[9], ...overridingProps });

Color.Green = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[10], ...overridingProps });

Color.Azure = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[11], ...overridingProps });

Color.Aqua = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[12], ...overridingProps });

Color.Teal = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[13], ...overridingProps });

Color.Turquoise = (overridingProps: Partial<ColorProps> = {}) =>
  Color.call(null, { ...colors[14], ...overridingProps });

Color.Blue = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[15], ...overridingProps });

Color.ElectricBlue = (overridingProps: Partial<ColorProps> = {}) =>
  Color.call(null, { ...colors[16], ...overridingProps });

Color.Lilac = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[17], ...overridingProps });

Color.Purple = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[18], ...overridingProps });

Color.Violet = (overridingProps: Partial<ColorProps> = {}) => Color.call(null, { ...colors[19], ...overridingProps });

export default Color;
export type { ColorProps };
