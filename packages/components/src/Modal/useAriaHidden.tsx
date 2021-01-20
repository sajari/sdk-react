import React from 'react';
import { hideOthers, Undo } from 'aria-hidden';

/**
 * Modal hook to polyfill `aria-modal`.
 *
 * It applies `aria-hidden` to elements behind the modal
 * to indicate that they're `inert`.
 *
 * @param ref React ref of the node
 * @param shouldHide whether `aria-hidden` should be applied
 */
export function useAriaHidden(ref: React.RefObject<HTMLElement>, shouldHide: boolean) {
  React.useEffect(() => {
      if (!ref.current) return;

    let undo: Undo | null = null;

    if (shouldHide && ref.current) {
      undo = hideOthers(ref.current);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (shouldHide) {
        undo?.();
      }
    };
  }, [shouldHide, ref]);
}
