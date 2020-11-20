import { Token } from '@sajari/react-hooks';
import React from 'react';

import { ResultsProps, ResultValues } from '../../types';

interface Props extends Omit<ResultValues, '_id'>, ResultsProps {
  /** The token used for tracking/analytics */
  token?: Token;
}

export interface ResultProps extends Props, Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {}
export interface ResultViewProps extends ResultProps {
  onClick?: () => void;
}
