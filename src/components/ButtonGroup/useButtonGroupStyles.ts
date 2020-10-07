import { css } from "@emotion/core";
import tw from "twin.macro";
import { UseButtonGroupStylesParams } from "./types";

export function useButtonGroupStyles(inline: UseButtonGroupStylesParams) {
  const styles = [tw`inline-flex`];
  styles.push(
    inline
      ? tw`space-x-4 -space-x-px flex-row`
      : tw`space-y-2 -space-y-px flex-col`
  );
  return css(styles);
}
