import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';
import { ModalProps, ModalSize } from './types';
import { keyframes, css } from '@emotion/core';

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
    case '4xl':
      return tw`max-w-4xl`;
    case '6xl':
      return tw`max-w-6xl`;
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
    size = 'md',
  } = props;

  const sizeStyle = getModalSize(size);

  const styles = {
    overlay: [
      tw`fixed inset-0 z-50 backdrop-blur-1 transition-opacity `,
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
      tw`fixed inset-0 z-50 flex p-10`,
      open
        ? css`
            animation: ${modalAnimationIn ?? animateModalIn} ${animationDuration}ms ease-in;
          `
        : css`
            animation: ${modalAnimationOut ?? animateModalOut} ${animationDuration}ms ease-out;
          `,
    ],
    content: [
      tw`relative z-50 flex-1 flex overflow-auto scrolling-touch flex-col w-full bg-white transition-all transform`,
      tw`m-auto max-h-(screen-20) outline-none rounded-xl shadow-lg`,
      sizeStyle,
    ],
  };

  return mapStyles(styles);
}
