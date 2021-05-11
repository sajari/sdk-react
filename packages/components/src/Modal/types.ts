import { BoxProps } from '../Box';

export type ModalSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'screen-sm'
  | 'screen-md'
  | 'screen-lg'
  | 'screen-xl'
  | 'screen-2xl'
  | 'full';

export interface ModalProps extends BoxProps {
  /** Control if the modal is open or not. */
  open: boolean;
  /** Is the modal closable when user press esc key. Default to true. */
  closeOnEsc?: boolean;
  /** Is the modal closable when user click on overlay. Default to true. */
  closeOnOverlayClick?: boolean;
  /** Whether to block scrolling when dialog is open. Default to true. */
  blockScroll?: boolean;
  /**  When the modal is open, trap focus within it. Default to true. */
  trapFocus?: boolean;
  /** If `true`, the modal content will be centered @default true */
  center?: boolean;
  /** If `true`, the modal will autofocus the first enabled and interative element within the `ModalContent` @default true */
  autoFocus?: boolean;
  /** The `ref` of element to receive focus when the modal opens. */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** The `ref` of element to receive focus when the modal closes. */
  finalFocusRef?: React.RefObject<HTMLElement>;
  /** If `true`, the modal will return focus to the element that triggered it when it closes. @default true */
  returnFocusOnClose?: boolean;
  /**
   * You can specify a container prop which should be of type `Element`.
   * The portal will be rendered inside that element.
   * The default behavior will create a div node and render it at the at the end of document.body.
   */
  container?: Element | null;
  /** ARIA role for modal. Default to 'dialog'. */
  role?: string;
  /** ARIA label for modal */
  ariaLabelledby?: string;
  /** ARIA description for modal */
  ariaDescribedby?: string;
  /** The Width for the modal content */
  size?: ModalSize;
  /** * id attribute for modal */
  modalId?: string;
  /**
   * A11y: If `true`, the siblings of the `modal` will have `aria-hidden`
   * set to `true` so that screen readers can only see the `modal`.
   * This is commonly known as making the other elements **inert**
   *  @default true
   */
  useInert?: boolean;
  /** Callback fired when the Modal is requested to be closed by a click on the overlay or when user press esc key */
  onClose: () => void;
  /** Callback fired when the escape key is pressed. */
  onEscKeyDown?: (event: KeyboardEvent) => void;
  /** Callback fired when the overlay is clicked. */
  onOverlayClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** Callback fired when the Modal has exited and the animation is finished. */
  onAnimationEnd?: () => void;
  /** classNames to style the modal. */
  rootClassName?: string;
  overlayClassName?: string;
  overlayOpenClassName?: string;
  modalContainerClassName?: string;
  modalClassName?: string;
  modalOpenClassName?: string;
  /** Animation duration (ms). Default to 300 */
  animationDuration?: number;
  /** CSS keyframe for overlay animation in. */
  overlayAnimationIn?: string;
  /** CSS keyframe for overlay animation out. */
  overlayAnimationOut?: string;
  /** CSS keyframe for modal animation in. */
  modalAnimationIn?: string;
  /** CSS keyframe for modal animation out. */
  modalAnimationOut?: string;
  /** Set the width of the content full screen */
  fullwidth?: boolean;
  /** Set the height of the content full screen */
  fullheight?: boolean;
}
