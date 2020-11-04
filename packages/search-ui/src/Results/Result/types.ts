import React from 'react';

import { ResultsProps, ResultValues } from '../types';

interface Props extends Omit<ResultValues, '_id'>, ResultsProps {}

export interface ResultProps extends Props, Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {}
