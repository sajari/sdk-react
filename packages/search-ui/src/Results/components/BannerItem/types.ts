import { Banner } from '@sajari/sdk-js';

import { ColumnValue } from '../../types';

export interface BannerItemProps {
  templateMode?: boolean;
  banner: Banner;
  numberOfCols?: ColumnValue;
}
