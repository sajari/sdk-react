import { ResultValues } from '@sajari/react-hooks';

import { ResultsProps, Template } from '../../types';

interface Props extends Pick<ResultsProps, 'resultContainerTemplateElement'> {
  template: Template;
  results: ResultValues[];
}

export type TemplateResultsProps = Props;
