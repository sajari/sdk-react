import { css } from "@emotion/core";
import tw from "twin.macro";

export interface UseInputStyleProps {
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  indeterminate?: boolean;
  block?: boolean;
  type: "text" | "select" | "radio" | "checkbox";
}

export default function useInputStyle(props: UseInputStyleProps) {
  const { block, disabled, indeterminate, invalid, readOnly, type } = props;

  const styleProps = [
    tw`text-gray-700 border-gray-300 border border-solid focus:shadow-outline-blue rounded-full bg-white outline-none px-3 py-2 text-base leading-normal pl-10`
  ];

  if (block) {
    styleProps.push(tw`block w-full`);
  }

  if (disabled || readOnly) {
    styleProps.push(tw`cursor-not-allowed`);
  }

  if (disabled) {
    styleProps.push(
      tw`text-gray-400 bg-gray-100 border-gray-200 focus:border-gray-200 focus:shadow-none`
    );

    if (["radio", "checkbox"].includes(type)) {
      styleProps.push(tw`checked:bg-gray-400 checked:border-gray-400`);
    }
  }

  if (invalid) {
    styleProps.push(
      tw`border-red-500 focus:border-red-500 focus:shadow-outline-red`
    );

    if (["radio", "checkbox"].includes(type)) {
      styleProps.push(tw`bg-red-100 checked:bg-red-500`);
    }
  }

  if (["radio", "checkbox"].includes(type)) {
    styleProps.push(tw`h-4 w-4  text-blue-500`);
  } else {
    styleProps.push(tw`transition-shadow duration-200 ease-in-out`);
  }

  if (type === "checkbox" && indeterminate) {
    styleProps.push(tw`bg-blue-500 border-transparent`);
  }

  return css(styleProps);
}
