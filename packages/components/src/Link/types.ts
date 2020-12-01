import React from 'react';

import { BoxProps } from '../Box';

export interface LinkProps extends BoxProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {}
