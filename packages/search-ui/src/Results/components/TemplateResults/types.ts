import type { ResultValues, Token } from '@sajari/react-hooks';

import type { BannerByPosition, ColumnValue, ResultsProps, ResultTemplate } from '../../types';

export type Result = {
  values: ResultValues;
  tokens?: Token;
};

interface Props extends Pick<ResultsProps, 'resultContainerTemplateElement' | 'showVariantImage'> {
  resultTemplate: ResultTemplate;
  results: Array<Result>;
  bannersByPosition: BannerByPosition;
}

export type TemplateResultsProps = Props;
