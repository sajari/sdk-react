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
}>`
  ${tw`flex items-center justify-center rounded-full w-8 h-8 border border-solid cursor-pointer focus-within:shadow-outline`};
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
  const { checkedColors, onChange } = useSwatch();
  const checked = checkedColors.includes(id);
  return (
    <StyledLabel bg={bg} border={border} color={color} htmlFor={id}>
      <StyledSpan>{id}</StyledSpan>
      <StyledInput
        key={id}
        id={id}
        checked={checked}
        type="checkbox"
        value={id}
        onChange={onChange}
      />
      <StyledCheck css={tw`fill-current`} checked={checked} />
    </StyledLabel>
  );
};

/** We're doing it manually rather a for loop because this enables code completion */
Color.White = Color.bind(null, colors[0]);
Color.Silver = Color.bind(null, colors[1]);
Color.Black = Color.bind(null, colors[2]);
Color.Pink = Color.bind(null, colors[3]);
Color.Magenta = Color.bind(null, colors[4]);
Color.Red = Color.bind(null, colors[5]);
Color.Beige = Color.bind(null, colors[6]);
Color.Orange = Color.bind(null, colors[7]);
Color.Brown = Color.bind(null, colors[8]);
Color.Yellow = Color.bind(null, colors[9]);
Color.Green = Color.bind(null, colors[10]);
Color.Azure = Color.bind(null, colors[11]);
Color.Aqua = Color.bind(null, colors[12]);
Color.Teal = Color.bind(null, colors[13]);
Color.Turquoise = Color.bind(null, colors[14]);
Color.Blue = Color.bind(null, colors[15]);
Color.ElectricBlue = Color.bind(null, colors[16]);
Color.Lilac = Color.bind(null, colors[17]);
Color.Purple = Color.bind(null, colors[18]);
Color.Violet = Color.bind(null, colors[19]);

export default Color;
