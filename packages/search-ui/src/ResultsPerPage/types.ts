import { BoxProps } from '@sajari/react-components';

import { ViewOptionProps } from '../ViewOption';

export interface ResultsPerPageProps
  extends Omit<BoxProps, 'className'>,
    Pick<ViewOptionProps, 'label' | 'size' | 'inline'> {
  options?: number[];
}
