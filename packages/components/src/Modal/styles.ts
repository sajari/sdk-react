import { css, keyframes } from '@emotion/core';
import { isNumber, mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { ModalProps, ModalSize } from './types';

const animateOverlayIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const animateOverlayOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const animateModalIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const animateModalOut = keyframes`
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.95);
    }
`;

const zIndexOrDefault = (index?: number) => {
  return isNumber(index)
    ? css`
        z-index: ${index};
      `
    : tw`z-max`;
};

function getModalSize(size: ModalSize) {
  switch (size) {
    case 'xs':
      return tw`max-w-xs`;
    case 'sm':
      return tw`max-w-sm`;
    case 'md':
      return tw`max-w-md`;
    case 'lg':
      return tw`max-w-lg`;
    case 'xl':
      return tw`max-w-xl`;
    case '2xl':
      return tw`max-w-2xl`;
    case '3xl':
      return tw`max-w-3xl`;
    case '4xl':
      return tw`max-w-4xl`;
    case '5xl':
      return tw`max-w-5xl`;
    case '6xl':
      return tw`max-w-6xl`;
    case '7xl':
      return tw`max-w-7xl`;
    case 'screen-sm':
      return tw`max-w-screen-sm`;
    case 'screen-md':
      return tw`max-w-screen-md`;
    case 'screen-lg':
      return tw`max-w-screen-lg`;
    case 'screen-xl':
      return tw`max-w-screen-xl`;
    case 'screen-2xl':
      return tw`max-w-screen-2xl`;
    default:
      return tw`max-w-full`;
  }
}

export function useModalStyles(props: ModalProps) {
  const {
    open,
    animationDuration = 300,
    modalAnimationIn,
    modalAnimationOut,
    overlayAnimationIn,
    overlayAnimationOut,
    center = true,
    size = 'md',
    fullWidth = false,
    fullHeight = false,
    zIndex,
  } = props;

  const sizeStyle = getModalSize(size);
  const zOrDefault = zIndexOrDefault(zIndex);

  const styles = {
    overlay: [
      zOrDefault,
      tw`fixed inset-0 transition-opacity backdrop-blur-1 `,
      open
        ? css`
            animation: ${overlayAnimationIn ?? animateOverlayIn} ${animationDuration}ms ease-in;
          `
        : css`
            animation: ${overlayAnimationOut ?? animateOverlayOut} ${animationDuration}ms ease-out;
          `,
    ],
    overlayInner: [tw`absolute inset-0 bg-gray-700 opacity-75`],
    container: [
      zOrDefault,
      tw`fixed inset-0 flex items-start`,
      fullWidth ? tw`p-0` : tw`p-10`,
      open
        ? css`
            animation: ${modalAnimationIn ?? animateModalIn} ${animationDuration}ms ease-in;
          `
        : css`
            animation: ${modalAnimationOut ?? animateModalOut} ${animationDuration}ms ease-out;
          `,
    ],
    content: [
      zOrDefault,
      tw`relative flex flex-col flex-1 w-full overflow-auto scrolling-touch transition-all transform bg-white`,
      tw`shadow-lg outline-none`,
      center ? tw`m-auto` : tw`mx-auto`,
      fullWidth ? tw`max-w-full` : sizeStyle,
      fullWidth ? tw`rounded-none` : tw`rounded-xl`,
      fullHeight ? tw`h-full` : tw`max-h-(full-12)`,
    ],
  };

  return mapStyles(styles);
}
