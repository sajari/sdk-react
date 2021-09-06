import type { ResultValues, Token } from '@sajari/react-hooks';

import type { ResultsProps, ResultTemplate } from '../../types';

interface Props extends Pick<ResultsProps, 'resultContainerTemplateElement' | 'showVariantImage'> {
  resultTemplate: ResultTemplate;
  results: { values: ResultValues; token?: Token }[];
}

export type TemplateResultsProps = Props;
