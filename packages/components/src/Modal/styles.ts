import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';
import { ModalProps } from './types';
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
        transform: translateY(100px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const animateModalOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0px);
    }
    to {
        opacity: 0;
        transform: translateY(100px);
    }
`;

export function useModalStyles(props: ModalProps) {
  const { open } = props;
  const styles = {
    overlay: [
      tw`fixed inset-0 z-50 backdrop-blur-1 transition-opacity `,
      open
        ? css`
            animation: ${animateOverlayIn} 0.3s;
          `
        : css`
            animation: ${animateOverlayOut} 0.3s;
          `,
    ],
    overlayInner: [tw`absolute inset-0 bg-gray-700 opacity-75`],
    container: [
      tw`fixed inset-0 z-50 flex`,
      open
        ? css`
            animation: ${animateModalIn} 0.3s;
          `
        : css`
            animation: ${animateModalOut} 0.3s;
          `,
    ],
    content: [
      tw`relative z-50 flex-1 flex overflow-auto scrolling-touch flex-col w-full max-w-xs bg-white transition-all transform`,
      tw`m-auto max-h-(screen-20) outline-none rounded-xl shadow-lg`,
    ],
  };

  return mapStyles(styles);
}
