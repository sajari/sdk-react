import React from 'react';

interface Props {
  /** Reference to corresponding element ID */
  htmlFor: string;
  /** Visually hidden label */
  visuallyHidden?: boolean;
}

export interface LabelProps extends Props, React.HTMLAttributes<Omit<HTMLLabelElement, 'htmlFor'>> {}
