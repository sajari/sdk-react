import type { Token } from '@sajari/react-hooks';
import { PropsWithAs } from '@sajari/react-sdk-utils';

import { ResultValues } from '../../types';
import { UseProductStatusOutput } from '../../useProductStatus';
import { UseRenderPriceOutput } from '../../useRenderPrice';
import { TemplateResultsProps } from '../TemplateResults/types';

type ExtraValues = {
  productStatus: UseProductStatusOutput;
  productPrice: UseRenderPriceOutput;
  variantIndex: number;
};

interface Props extends Pick<TemplateResultsProps, 'showVariantImage'> {
  result: { values: ResultValues; token?: Token };
  render: (v: ResultValues & ExtraValues) => string;
}

export type TemplateResultProps = PropsWithAs<Props, 'div'>;
