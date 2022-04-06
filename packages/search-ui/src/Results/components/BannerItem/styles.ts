import { mapStyles } from '@sajari/react-sdk-utils';
import { Banner, TextPosition } from '@sajari/sdk-js';
import tw from 'twin.macro';

interface Props {
  banner: Banner;
  isOnItsOwnRow: boolean;
}

export const useBannerStyle = ({ banner, isOnItsOwnRow = false }: Props) => {
  const { textPosition, height = 1 } = banner;
  const styles = {
    container: [tw`relative flex justify-center overflow-hidden rounded-lg`],
    textContainer: [tw`absolute top-0 left-0 flex flex-col w-full h-full p-6`],
    link: [tw`w-full`],
    imageContainer: [tw`w-full h-full`],
    image: [tw`flex w-full h-full object-cover rounded-lg`],
    heading: [tw`max-w-md text-2xl`],
    description: [tw`max-w-md text-sm`],
  };

  // We add absolute positioning to adjust the banner size to the row's item height
  // but only when there is at least 1 item on the same row as the banner otherwise
  // the banner will collapse with zero height because of absolute
  if (!isOnItsOwnRow) {
    styles.imageContainer.push(tw`absolute`);
  }

  if (height > 1) {
    styles.container.push(tw`items-center`);
    styles.link.push(tw`h-full`);
  } else {
    styles.container.push(tw`items-start`);
    styles.link.push(tw`max-h-0`);
  }

  switch (textPosition) {
    case TextPosition.TopLeft:
      styles.textContainer.push(tw`justify-start items-start text-left`);
      break;
    case TextPosition.BottomLeft:
      styles.textContainer.push(tw`justify-end items-start text-left`);
      break;
    case TextPosition.TopRight:
      styles.textContainer.push(tw`justify-start items-end text-right`);
      break;
    case TextPosition.BottomRight:
      styles.textContainer.push(tw`justify-end items-end text-right`);
      break;
    case TextPosition.Center:
    default:
      styles.textContainer.push(tw`justify-center items-center text-center`);
      break;
  }

  return mapStyles(styles);
};
