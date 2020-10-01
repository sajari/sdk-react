import { mapTruncateValue } from "../../utils/style-props";

import { css } from "@emotion/core";
import tw from "twin.macro";
import { TextElements } from "./types";

export default function useTextStyles(
  as: TextElements,
  truncate: boolean | 2 | 3 | 4 | 5 = false
) {
  const props = [mapTruncateValue(truncate)];

  switch (as) {
    case "small":
      props.push(tw`text-sm`);
      break;

    case "pre":
    case "code":
      props.push(tw`font-mono`);
      props.push(tw`text-code-inline`);
      props.push(tw`font-normal`);
      break;

    case "mark":
      props.push(tw`bg-yellow-100`);
      props.push(tw`text-gray-800`);
      props.push(tw`px-1`);
      break;

    default:
      break;
  }

  if (as === "code") {
    props.push(tw`text-red-500`);
  }

  return css(props);
}
