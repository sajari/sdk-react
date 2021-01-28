import React from 'react';
import { hideOthers, Undo } from 'aria-hidden';

/**
 * Modal component to polyfill `aria-modal`.
 *
 * It applies `aria-hidden` to elements behind the modal
 * to indicate that they're `inert`.
 *
 * @param refModal React ref of the node
 * @param shouldHide whether `aria-hidden` should be applied
 */
export function AriaHidden({ refModal, shouldHide }: { refModal: React.RefObject<HTMLElement>; shouldHide: boolean }) {
  React.useEffect(() => {
    if (!refModal.current) return;

    let undo: Undo | null = null;

    if (shouldHide && refModal.current) {
      undo = hideOthers(refModal.current);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (shouldHide) {
        undo?.();
      }
    };
  }, [shouldHide, refModal]);

  return null;
}
