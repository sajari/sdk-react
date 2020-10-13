import React from 'react';

type HtmlAttributes = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof Props>;

interface Props {
  /** The state when entering an invalid input */
  invalid?: boolean;
  /** An aria-label, also used for the placeholder if not specified */
  label?: string;
}

export interface SelectProps extends Props, HtmlAttributes {}
