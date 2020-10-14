import React from 'react';

interface Props {
  /** Visually hidden label */
  visuallyHidden?: boolean;
  /** The ID of the input associated to the label */
  htmlFor: string;
}

export interface LabelProps extends Props, React.HTMLAttributes<HTMLLabelElement> {}
