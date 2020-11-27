import { Token } from '@sajari/react-hooks';
import React from 'react';

import { ResultsProps, ResultValues } from '../../types';

interface Props extends Omit<ResultsProps, 'columns'> {
  values: Omit<ResultValues, '_id'>;
  /** The token used for tracking/analytics */
  token?: Token;
  /** Handle clicking a result */
  onClick?: (url: string) => void;
  /** Force an image placeholder */
  forceImage?: boolean;
}

type HTMLAttributes = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;

export interface ResultProps extends Props, HTMLAttributes {}
