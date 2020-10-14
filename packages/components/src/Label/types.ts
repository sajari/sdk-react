import React from 'react';

interface Props {
  /** Visually hidden label */
  visuallyHidden?: boolean;
}

export interface LabelProps extends Props, React.HTMLAttributes<HTMLLabelElement> {}
