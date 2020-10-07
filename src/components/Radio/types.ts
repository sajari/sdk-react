import React from 'react';

interface Props {
  /** The state when entering an invalid input */
  invalid?: boolean;
}

export interface RadioProps extends Props, React.InputHTMLAttributes<HTMLInputElement> {}
