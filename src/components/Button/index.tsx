import React, { HTMLAttributes } from "react";
import tw, { styled } from "twin.macro";

const StyledButton = styled.button`
  ${tw`px-5 py-2 border-none text-white`};
  background-color: ${({ theme }) => theme.color.primary};
`;

const Button = (props: HTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props} />;
};

export default Button;
