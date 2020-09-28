import { useFocusRing } from "@react-aria/focus";
import { useSwitch } from "@react-aria/switch";
import { useToggleState } from "@react-stately/toggle";
import React from "react";
import tw, { styled } from "twin.macro";
import { useSwatch } from "./context";
import { Check } from "./icons";
import { ColorProps } from "./types";

const StyledSpan = styled.span`
  ${tw`sr-only`};
`;

const StyledInput = styled.input`
  ${tw`sr-only`};
`;

const StyledCheck = styled(Check)<{ checked: boolean }>(({ checked }) => ({
  opacity: checked ? 1 : 0
}));

const StyledLabel = styled.label<{
  color: string;
  bg: string;
  border: string;
  focus: boolean;
}>`
  ${tw`flex items-center justify-center rounded-full w-8 h-8 border border-solid`};
  box-shadow: ${({ focus }) =>
    focus ? "0 0 0 3px rgba(66, 153, 225, 0.5)" : "none"};
  color: ${({ color }) => color};
  background-color: ${({ bg }) => bg};
  border-color: ${({ border }) => border};
`;

const colors: ColorProps[] = [
  { id: "White", bg: "white", color: "#718096", border: "#E2E8F0" },
  { id: "Silver", bg: "#E2E8F0", color: "#4A5568", border: "#CBD5E0" },
  { id: "Black", bg: "black", color: "white", border: "black" },
  { id: "Pink", bg: "#F687B3", color: "#FFF5F7", border: "#ED64A6" },
  { id: "Magenta", bg: "#D53F8C", color: "#FFF5F7", border: "#B83280" },
  { id: "Red", bg: "#FC8181", color: "#9B2C2C", border: "#F56565" },
  { id: "Beige", bg: "#FEEBC8 ", color: "#DD6B20", border: "#FBD38D" },
  { id: "Orange", bg: "#F6AD55", color: "#9C4221", border: "#ED8936" },
  { id: "Brown", bg: "#C05621", color: "#FFFAF0", border: "#9C4221" },
  { id: "Yellow", bg: "#FAF089", color: "#D69E2E", border: "#F6E05E" },
  { id: "Green", bg: "#68D391", color: "#F0FFF4", border: "#48BB78" },
  { id: "Azure", bg: "#E6FFFA", color: "#38B2AC", border: "#B2F5EA" },
  { id: "Aqua", bg: "#81E6D9", color: "#2C7A7B", border: "#4FD1C5" },
  { id: "Teal", bg: "#4FD1C5", color: "#E6FFFA", border: "#38B2AC" },
  { id: "Turquoise", bg: "#38B2AC", color: "#E6FFFA", border: "#319795" },
  { id: "Blue", bg: "#63B3ED", color: "#2C5282", border: "#4299E1" },
  { id: "ElectricBlue", bg: "#3182CE", color: "#EBF8FF", border: "#2B6CB0" },
  { id: "Lilac", bg: "#D6BCFA", color: "#6B46C1", border: "#B794F4" },
  { id: "Purple", bg: "#B794F4", color: "#553C9A", border: "#9F7AEA" },
  { id: "Violet", bg: "#805AD5", color: "#FAF5FF", border: "#6B46C1" }
];

export const Color = ({ id, bg, color, border = bg }: ColorProps) => {
  const { state, setState } = useSwatch();
  const tempState = useToggleState({
    isSelected: state.includes(id),
    onChange: isSelected => {
      const newState = isSelected
        ? [...state, id]
        : state.filter(i => i !== id);
      setState(newState);
    }
  });
  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps } = useSwitch(
    {
      isSelected: tempState.isSelected,
      value: String(tempState.isSelected),
      "aria-label": id,
      name: id
    },
    tempState,
    ref
  );
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <StyledLabel focus={isFocusVisible} bg={bg} border={border} color={color}>
      <StyledSpan>{id}</StyledSpan>
      <StyledInput {...inputProps} {...focusProps} ref={ref} />
      <StyledCheck css={tw`fill-current`} checked={tempState.isSelected} />
    </StyledLabel>
  );
};

/** We're doing it manually rather a for loop because this enables code completion */
Color.White = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[0], ...overridingProps });

Color.Silver = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[1], ...overridingProps });

Color.Black = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[2], ...overridingProps });

Color.Pink = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[3], ...overridingProps });

Color.Magenta = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[4], ...overridingProps });

Color.Red = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[5], ...overridingProps });

Color.Beige = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[6], ...overridingProps });

Color.Orange = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[7], ...overridingProps });

Color.Brown = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[8], ...overridingProps });

Color.Yellow = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[9], ...overridingProps });

Color.Green = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[10], ...overridingProps });

Color.Azure = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[11], ...overridingProps });

Color.Aqua = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[12], ...overridingProps });

Color.Teal = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[13], ...overridingProps });

Color.Turquoise = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[14], ...overridingProps });

Color.Blue = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[15], ...overridingProps });

Color.ElectricBlue = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[16], ...overridingProps });

Color.Lilac = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[17], ...overridingProps });

Color.Purple = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[18], ...overridingProps });

Color.Violet = (overridingProps: ColorProps) =>
  Color.call(null, { ...colors[19], ...overridingProps });

export default Color;
