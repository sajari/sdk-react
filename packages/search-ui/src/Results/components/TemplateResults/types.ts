import type { ResultValues, Token } from '@sajari/react-hooks';
import { Banner } from '@sajari/sdk-js';

import type { ResultsProps, ResultTemplate } from '../../types';

export type Result = {
  values: ResultValues;
  tokens?: Token;
};

interface Props extends Pick<ResultsProps, 'resultContainerTemplateElement' | 'showVariantImage'> {
  resultTemplate: ResultTemplate;
  results: Array<Result>;
  banners: Banner[];
}

export type TemplateResultsProps = Props;
