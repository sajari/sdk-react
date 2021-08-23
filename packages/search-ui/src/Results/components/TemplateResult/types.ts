import { PropsWithAs } from '@sajari/react-sdk-utils';

import { ResultValues } from '../../types';
import { UseProductStatusesOutput } from '../../useProductStatuses';
import { UseRenderPriceOutput } from '../../useRenderPrice';
import { TemplateResultsProps } from '../TemplateResults/types';

type ExtraValues = {
  productStatuses: UseProductStatusesOutput;
  renderPriceData: UseRenderPriceOutput;
};

interface Props extends Pick<TemplateResultsProps, 'showVariantImage'> {
  values: ResultValues;
  render: (v: ResultValues & ExtraValues) => string;
}

export type TemplateResultProps = PropsWithAs<Props, 'div'>;
