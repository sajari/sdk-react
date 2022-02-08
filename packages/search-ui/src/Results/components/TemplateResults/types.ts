import type { ResultValues, Token } from '@sajari/react-hooks';
import { Banner } from '@sajari/sdk-js';

import type { ColumnValue, ResultsProps, ResultTemplate } from '../../types';

export type Result = {
  values: ResultValues;
  tokens?: Token;
};

interface Props extends Pick<ResultsProps, 'resultContainerTemplateElement' | 'showVariantImage'> {
  resultTemplate: ResultTemplate;
  results: Array<Result>;
  bannersExpanded: Array<Banner | undefined>;
  numberOfCols: ColumnValue;
}

export type TemplateResultsProps = Props;
