import React from "react";
import tw, { styled } from "twin.macro";
import { Color } from "./color";
import { SwatchProvider } from "./context";
import { SwatchProps } from "./types";

const StyledContainer = styled.div`
  ${tw`grid grid-cols-7 gap-3`};
`;

const Swatch = ({
  children,
  checkedColors = [],
  onChange = () => {}
}: SwatchProps) => {
  return (
    <SwatchProvider checkedColors={checkedColors} onChange={onChange}>
      <StyledContainer>{children}</StyledContainer>
    </SwatchProvider>
  );
};

Swatch.Color = Color;
export default Swatch;
