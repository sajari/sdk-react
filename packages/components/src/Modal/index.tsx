import { __DEV__, getStylesObject, isSSR } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import Box from '../Box';
import FocusLock from '../FocusLock';
import { AriaHidden } from './AriaHidden';
import ModalContextProvider from './context';
import ModalBody, { ModalBodyProps } from './ModalBody';
import ModalCloseButton, { ModalCloseButtonProps } from './ModalCloseButton';
import ModalFooter, { ModalFooterProps } from './ModalFooter';
import ModalHeader, { ModalHeaderProps } from './ModalHeader';
import { modalManager, useModalManager } from './modalManager';
import ModalTitle, { ModalTitleProps } from './ModalTitle';
import Portal from './Portal';
import { useModalStyles } from './styles';
import { ModalProps } from './types';
import { useScrollLock } from './useScrollLock';

const Modal = (props: ModalProps) => {
  const {
    open,
    blockScroll = true,
    closeOnEsc = true,
    closeOnOverlayClick = true,
    container,
    role = 'dialog',
    ariaDescribedby,
    ariaLabelledby,
    modalId,
    onClose,
    onEscKeyDown,
    trapFocus = true,
    autoFocus = true,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose = true,
    onOverlayClick,
    onAnimationEnd,
    children,
    disableDefaultStyles = false,
    styles: stylesProp,
    modalClassName,
    modalContainerClassName,
    overlayClassName,
    overlayOpenClassName,
    modalOpenClassName,
    size = 'md',
    rootClassName,
    useInert = true,
  } = props;
  const refModal = useRef<HTMLDivElement>(null);
  const refShouldClose = useRef<boolean | null>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);
  const styles = getStylesObject(useModalStyles({ ...props, size }), disableDefaultStyles);

  // Lazily create the ref instance
  // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  if (refContainer.current === null && !isSSR()) {
    refContainer.current = document.createElement('div');
  }

  // The value should be false for srr, that way when the component is hydrated client side,
  // it will match the server rendered content
  const [showPortal, setShowPortal] = useState(false);

  // Hook used to manage multiple modals opened at the same time
  useModalManager(refModal, open);

  // Hook used to manage the scroll
  useScrollLock(refModal, open, showPortal, blockScroll);

  const handleKeydown = (event: KeyboardEvent) => {
    // Only the last modal need to be escaped when pressing the esc key
    if (event.keyCode !== 27 || !modalManager.isTopModal(refModal)) {
      return;
    }

    onEscKeyDown?.(event);

    if (closeOnEsc) {
      onClose();
    }
  };

  const handleOpen = () => {
    if (refContainer.current && !container && !document.body.contains(refContainer.current)) {
      document.body.appendChild(refContainer.current);
    }

    document.addEventListener('keydown', handleKeydown);
  };

  const handleClose = () => {
    if (refContainer.current && !container && document.body.contains(refContainer.current)) {
      document.body.removeChild(refContainer.current);
    }
    document.removeEventListener('keydown', handleKeydown);
  };

  useEffect(() => {
    return () => {
      if (showPortal) {
        // When the modal is closed or removed directly, cleanup the listeners
        handleClose();
      }
    };
  }, [showPortal]);

  useEffect(() => {
    // If the open prop is changing, we need to open the modal
    // This is also called on the first render if the open prop is true when the modal is created
    if (open && !showPortal) {
      setShowPortal(true);
      handleOpen();
    }
  }, [open]);

  const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (refShouldClose.current === null) {
      refShouldClose.current = true;
    }

    if (!refShouldClose.current) {
      refShouldClose.current = null;
      return;
    }

    onOverlayClick?.(event);

    if (closeOnOverlayClick) {
      onClose();
    }

    refShouldClose.current = null;
  };

  const handleModalEvent = () => {
    refShouldClose.current = false;
  };

  const handleAnimationEnd = () => {
    if (!open) {
      setShowPortal(false);
    }
    onAnimationEnd?.();
  };

  const containerModal = container || refContainer.current;

  const context = {
    titleId: ariaLabelledby,
    bodyId: ariaDescribedby,
    disableDefaultStyles,
    size,
    onClose,
    open,
  };

  return showPortal && containerModal ? (
    <Portal target={containerModal}>
      <ModalContextProvider value={context}>
        <FocusLock
          autoFocus={autoFocus}
          disabled={!trapFocus}
          contentRef={refModal}
          initialFocusRef={initialFocusRef}
          finalFocusRef={finalFocusRef}
          restoreFocus={returnFocusOnClose}
        >
          <Box className={rootClassName} css={stylesProp}>
            <Box
              className={classnames(overlayClassName, open ? overlayOpenClassName : '')}
              aria-hidden
              css={styles.overlay}
            >
              <Box css={styles.overlayInner} />
            </Box>
            <Box
              ref={refModal}
              className={modalContainerClassName}
              css={styles.container}
              data-testid="modal-container"
              onAnimationEnd={handleAnimationEnd}
              onClick={handleClickOverlay}
            >
              <Box
                data-testid="modal"
                className={classnames(modalClassName, open ? modalOpenClassName : '')}
                onMouseDown={handleModalEvent}
                onMouseUp={handleModalEvent}
                onClick={handleModalEvent}
                id={modalId}
                role={role}
                aria-modal="true"
                aria-labelledby={ariaLabelledby}
                aria-describedby={ariaDescribedby}
                css={styles.content}
              >
                {children}
              </Box>
            </Box>
          </Box>
          <AriaHidden refModal={refModal} shouldHide={open && useInert} />
        </FocusLock>
      </ModalContextProvider>
    </Portal>
  ) : null;
};

if (__DEV__) {
  Modal.displayName = 'Modal';
}

export default Modal;
export { ModalBody, ModalCloseButton, ModalFooter, ModalHeader, ModalTitle };
export type { ModalBodyProps, ModalCloseButtonProps, ModalFooterProps, ModalHeaderProps, ModalProps, ModalTitleProps };
