import { mapStyles } from '@sajari/react-sdk-utils';
import { Banner, TextPosition } from '@sajari/sdk-js';
import tw from 'twin.macro';

interface Props {
  banner: Banner;
}

export const useBannerStyle = ({ banner }: Props) => {
  const { textPosition } = banner;

  const styles = {
    container: [tw`relative flex justify-center items-center overflow-hidden rounded-lg`],
    textContainer: [tw`absolute top-0 left-0 flex flex-col w-full h-full p-6`],
    imageContainer: [tw`w-full h-full`],
    heading: [tw`max-w-md`],
    description: [tw`max-w-md text-sm`],
  };

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
