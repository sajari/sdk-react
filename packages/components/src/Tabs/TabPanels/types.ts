import { HTMLAttributes } from 'react';

import { BoxProps } from '../../Box';

export interface TabPanelsProps extends BoxProps, Omit<HTMLAttributes<HTMLDivElement>, 'tabIndex'> {}
