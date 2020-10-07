import React from 'react';

interface Props {
  /** The state when entering an invalid input */
  invalid?: boolean;
  /** Indeterminate state  */
  indeterminate?: boolean;
}

export interface CheckboxProps extends Props, React.InputHTMLAttributes<HTMLInputElement> {}
