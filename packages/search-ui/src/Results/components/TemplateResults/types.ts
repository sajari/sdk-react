import { ResultValues } from '@sajari/react-hooks';

import type { ResultsProps, ResultTemplate } from '../../types';

interface Props extends Pick<ResultsProps, 'resultContainerTemplateElement' | 'showVariantImage'> {
  resultTemplate: ResultTemplate;
  results: { values: ResultValues; onClick?: () => void }[];
}

export type TemplateResultsProps = Props;
