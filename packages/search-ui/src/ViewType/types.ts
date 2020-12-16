import { BoxProps } from '@sajari/react-components';

import { ViewOptionProps } from '../ViewOption';

export interface ViewTypeProps
  extends Omit<BoxProps, 'className'>,
    Pick<ViewOptionProps, 'label' | 'size' | 'inline'> {}
