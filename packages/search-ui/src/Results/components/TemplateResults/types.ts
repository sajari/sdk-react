import { SerializedStyles } from '@emotion/core';
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
  banners: Banner[];
  numberOfCols: ColumnValue;
  containerStyle?: SerializedStyles;
}

export type TemplateResultsProps = Props;
