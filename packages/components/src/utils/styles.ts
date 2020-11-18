import { isNumber } from '@sajari/react-sdk-utils';
import tw, { TwStyle } from 'twin.macro';

export function mapTruncateValue(truncate: boolean | 2 | 3 | 4 | 5): TwStyle {
  if (truncate === true) {
    return tw`truncate`;
  }

  if (isNumber(truncate)) {
    switch (truncate) {
      case 2:
        return tw`truncate-2-lines`;

      case 3:
        return tw`truncate-3-lines`;

      case 4:
        return tw`truncate-4-lines`;

      case 5:
        return tw`truncate-5-lines`;

      default:
        return tw``;
    }
  }

  return tw``;
}
