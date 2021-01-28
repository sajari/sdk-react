import React from 'react';
import ReactFocusLock from 'react-focus-lock';

import { FocusLockProps } from './types';
import { getFocusables } from './utils';

/**
 * React component to trap focus within an element or component.
 * Mostly used in Modals, Popovers, etc.
 */
function FocusLock(props: FocusLockProps) {
  const { initialFocusRef, finalFocusRef, contentRef, restoreFocus, children, disabled, autoFocus = true } = props;

  const onActivation = React.useCallback(() => {
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    } else {
      if (!contentRef?.current) {
        return;
      }
      const focusables = getFocusables(contentRef.current);
      if (contentRef.current && !focusables.length) {
        contentRef.current?.focus();
      }
    }
  }, [initialFocusRef, contentRef]);

  const onDeactivation = React.useCallback(() => {
    finalFocusRef?.current?.focus();
  }, [finalFocusRef]);

  const returnFocus = restoreFocus && !finalFocusRef;

  return (
    <ReactFocusLock
      autoFocus={autoFocus}
      disabled={disabled}
      onActivation={onActivation}
      onDeactivation={onDeactivation}
      returnFocus={returnFocus}
    >
      {children}
    </ReactFocusLock>
  );
}

export type { FocusLockProps };
export default FocusLock;
