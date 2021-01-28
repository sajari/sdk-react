export interface FocusLockProps {
  /** `ref` of the element to receive focus initially */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** `ref` of the element to return focus to when `FocusLock` unmounts */
  finalFocusRef?: React.RefObject<HTMLElement>;
  /** The `ref` of the wrapper for which the focus-lock wraps */
  contentRef?: React.RefObject<HTMLElement>;
  /** If `true`, focus will be restored to the element that triggered the `FocusLock` once it unmounts */
  restoreFocus?: boolean;
  /** The component to render */
  children: React.ReactNode;
  /** If `true`, focus trapping will be disabled */
  disabled?: boolean;
  /** If `true`, the first focuable element within the `children` will ne auto-focused once `FocusLock` mounts */
  autoFocus?: boolean;
}
