import { PropsWithAs } from '@sajari/react-sdk-utils';

import { ResultValues } from '../../types';
import { UseProductStatusesOutput } from '../../useProductStatuses';
import { UseRenderPriceOutput } from '../../useRenderPrice';

type ExtraValues = {
  productStatuses: UseProductStatusesOutput;
  renderPriceData: UseRenderPriceOutput;
};

interface Props {
  values: ResultValues;
  render: (v: ResultValues & ExtraValues) => string;
}

export type TemplateResultProps = PropsWithAs<Props, 'div'>;
