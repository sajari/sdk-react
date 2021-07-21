import { ResultValues } from '@sajari/react-hooks';

import { ResultsProps, ResultTemplate } from '../../types';

interface Props extends Pick<ResultsProps, 'resultContainerTemplateElement'> {
  resultTemplate: ResultTemplate;
  results: ResultValues[];
}

export type TemplateResultsProps = Props;
