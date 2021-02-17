import { css, keyframes } from '@emotion/core';
import { mapStyles } from '@sajari/react-sdk-utils';
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
  } = props;

  const sizeStyle = getModalSize(size);

  const styles = {
    overlay: [
      tw`fixed inset-0 z-50 transition-opacity backdrop-blur-1 `,
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
      tw`fixed inset-0 z-50 flex p-10 items-start`,
      open
        ? css`
            animation: ${modalAnimationIn ?? animateModalIn} ${animationDuration}ms ease-in;
          `
        : css`
            animation: ${modalAnimationOut ?? animateModalOut} ${animationDuration}ms ease-out;
          `,
    ],
    content: [
      tw`relative z-50 flex flex-col flex-1 w-full overflow-auto scrolling-touch transition-all transform bg-white`,
      tw`max-h-(screen-20) outline-none rounded-xl shadow-lg`,
      center ? tw`m-auto` : tw`mx-auto`,
      sizeStyle,
    ],
  };

  return mapStyles(styles);
}
